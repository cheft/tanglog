import {
  ZONES,
  SHIPPING_METHODS,
  GLOBAL_SURCHARGES,
  CARGO_TYPES,
  OVERSIZED_SURCHARGE,
  SEA_TRUCK_OVERSIZE_DATA,
  SUPER_OVERSIZE_SURCHARGE,
} from "../data/pricingData";

export interface CalculationResult {
  id: string;
  methodName: string;
  channelName: string;
  totalPrice: number;
  unitPrice: number;
  billableWeight: number;
  originalBillableWeight?: number;
  totalActualWeight: number;
  totalVolumeWeight: number;
  totalVolumeCBM: number;
  transitTime: string;
  fees: { key: string; amount: number; params?: Record<string, any> }[];
  isApproximate?: boolean;
}

export interface CargoItem {
  cargoType: string;
  weight: number;
  l: number;
  w: number;
  h: number;
  quantity: number;
}

export function getZoneFromZip(zip: string): string {
  if (!zip) return "east";
  const prefix2 = zip.substring(0, 2);
  const prefix1 = zip.charAt(0);

  if (ZONES.LA.includes(prefix2)) return "la";
  if (ZONES.CENTRAL.includes(prefix2) || ZONES.CENTRAL.includes(prefix1)) return "central";
  if (ZONES.WEST.includes(prefix1)) return "west";
  return "east";
}

export function calculateRates(
  zip: string,
  items: CargoItem[],
  isResidential: boolean = false,
  isRemote: boolean = false,
  isSuperRemote: boolean = false,
  isPublic: boolean = false
): CalculationResult[] {
  const zone = getZoneFromZip(zip);

  let totalActualWeight = 0;
  let totalVolumeWeight = 0;
  let totalVolumeCBM = 0;
  let totalCartons = 0;
  let maxDimVal = 0;
  let maxWeightPerPiece = 0;
  let maxL = 0;
  let maxW = 0; // Second longest
  let maxGirth = 0;

  items.forEach(item => {
    const q = item.quantity;
    totalActualWeight += item.weight * q;
    totalVolumeWeight += (item.l * item.w * item.h / 6000) * q;
    totalVolumeCBM += (item.l * item.w * item.h / 1000000) * q;
    totalCartons += q;
    maxDimVal = Math.max(maxDimVal, item.l, item.w, item.h);
    maxWeightPerPiece = Math.max(maxWeightPerPiece, item.weight);

    // Sort dims for L1, L2 logic
    const dims = [item.l, item.w, item.h].sort((a, b) => b - a);
    maxL = Math.max(maxL, dims[0]);
    maxW = Math.max(maxW, dims[1]); // approximate worst case across items
    maxGirth = Math.max(maxGirth, (dims[1] + dims[2]) * 2 + dims[0]);
  });

  const billableWeight = Math.ceil(Math.max(totalActualWeight, totalVolumeWeight));
  const results: CalculationResult[] = [];

  const primaryCargoTypeKey = items[0]?.cargoType || "GENERAL";
  const cargoType = CARGO_TYPES[primaryCargoTypeKey as keyof typeof CARGO_TYPES] || CARGO_TYPES.GENERAL;

  // Helper to determine mode for surcharge lookup
  const getSimpleMode = (methodType: string): "AIR" | "SEA" | "EXPRESS" => {
    if (methodType === "AIR_FREIGHT" || methodType === "AIR_TRUCK") return "AIR";
    if (methodType === "EXPRESS") return "EXPRESS";
    return "SEA";
  };

  const applyFeesAndSurcharges = (
    baseResult: CalculationResult,
    methodType: string
  ): CalculationResult | null => {
    const fees = [...baseResult.fees];
    let totalPrice = baseResult.totalPrice;
    const mode = getSimpleMode(methodType);

    // 1. Block channels
    if (cargoType.blockChannels && cargoType.blockChannels.includes(mode)) return null;

    // 2. Size/Weight Restrictions Blockers
    // Express, Air Freight, Sea Pier: Block if L1 > 230, Girth > 315, or Single ActW > 40
    if (mode === "EXPRESS" || methodType === "AIR_FREIGHT" || methodType === "SEA_PIER") {
      if (maxL > 230 || maxGirth > 315 || maxWeightPerPiece > 40) return null;
    }

    // Air/Sea Truck (Standard): Block if L1 >= 500 (Must use Sea Truck Oversize)
    // Sea Truck Oversize: Block if L1 >= 600 (Global Limit)
    if ((methodType === "AIR_TRUCK" || methodType === "SEA_TRUCK") && maxL >= 500) return null;
    if (methodType === "SEA_TRUCK_OVERSIZE" && maxL >= 600) return null;

    // 3. Global Surcharges (Remote, Residential, Public)

    // Remote Area Surcharges
    if (mode === "EXPRESS") {
      if (isRemote || isSuperRemote) {
        const amount = baseResult.billableWeight * GLOBAL_SURCHARGES.EXPRESS_REMOTE_PER_KG;
        fees.push({ key: "pricing.fees.remote", amount });
        totalPrice += amount;
      }
    } else if (methodType === "AIR_FREIGHT" || methodType === "SEA_PIER") {
      if (isSuperRemote) {
        const amount = Math.max(GLOBAL_SURCHARGES.REMOTE_AREA_MIN, totalCartons * GLOBAL_SURCHARGES.SUPER_REMOTE_AREA_PER_CARTON);
        fees.push({ key: "pricing.fees.remote", amount });
        totalPrice += amount;
      } else if (isRemote) {
        const amount = Math.max(GLOBAL_SURCHARGES.REMOTE_AREA_MIN, totalCartons * GLOBAL_SURCHARGES.REMOTE_AREA_PER_CARTON);
        fees.push({ key: "pricing.fees.remote", amount });
        totalPrice += amount;
      }
    }

    // Residential (Private Address) Surcharge
    if (mode === "EXPRESS" || methodType === "AIR_FREIGHT" || methodType === "SEA_PIER") {
      if (isResidential) {
        const amount = totalCartons * GLOBAL_SURCHARGES.RESIDENTIAL_PER_CARTON;
        fees.push({ key: "pricing.fees.residential", amount });
        totalPrice += amount;
      }
    }

    // Public Special Address Surcharge
    if (methodType === "AIR_TRUCK") {
      if (isPublic) {
        const amount = GLOBAL_SURCHARGES.PUBLIC_AREA_FLAT;
        fees.push({ key: "pricing.fees.public_address", amount });
        totalPrice += amount;
      }
    }

    // 4. Cargo Type Surcharges
    const cargoSurcharges = cargoType.surcharges as any;
    if (cargoSurcharges && cargoSurcharges[mode]) {
      const s = cargoSurcharges[mode];
      if (s.block) return null;

      let amount = 0;
      if (s.amount) {
        amount = s.amount * baseResult.billableWeight;
      }
      if (s.minTotal && amount < s.minTotal) {
        amount = s.minTotal;
      }
      if (amount > 0) {
        fees.push({ key: "pricing.fees.cargo_surcharge", amount, params: { cargo: cargoType.name } });
        totalPrice += amount;
      }
    }

    // 5. Oversize/Overweight Surcharges
    // Unified Logic for Express, Air Freight, Sea Pier
    if (mode === "EXPRESS" || methodType === "AIR_FREIGHT" || methodType === "SEA_PIER") {
      // A. Overweight Surcharge: >22KG Act OR >40KG Vol -> +290
      let overweightFee = 0;
      items.forEach(item => {
        const volW = (item.l * item.w * item.h) / 6000;
        if (item.weight > 22 || volW > 40) {
          overweightFee += 290 * item.quantity;
        }
      });
      if (overweightFee > 0) {
        fees.push({ key: "pricing.fees.overweight_general", amount: overweightFee });
        totalPrice += overweightFee;
      }

      // B. Overlength Surcharge: Stackable +210 for conditions >120, >74, >264
      let overlengthFee = 0;
      items.forEach(item => {
        const dims = [item.l, item.w, item.h].sort((a, b) => b - a);
        const girth = (dims[1] + dims[2]) * 2 + dims[0];
        let multiplier = 0;
        if (dims[0] > 120) multiplier++;
        if (dims[1] > 74) multiplier++;
        if (girth > 264) multiplier++;

        if (multiplier > 0) {
          overlengthFee += (210 * multiplier) * item.quantity;
        }
      });
      if (overlengthFee > 0) {
        fees.push({ key: "pricing.fees.overlength", amount: overlengthFee });
        totalPrice += overlengthFee;
      }
    }

    // Truck Specific Oversize Surcharges (Air Truck & Sea Truck)
    // Rule: maxL >= 150 -> +1/kg, >= 200 -> +2/kg, >= 300 -> +4/kg
    if (methodType === "SEA_TRUCK" || methodType === "AIR_TRUCK") {
      // Blocking Rule: If maxL >= 500cm, cannot go Air/Sea Truck. Must go Sea Truck Oversize.
      if (maxL >= 500) return null;

      if (maxL >= 150) {
        let rate = 0;
        if (maxL >= 300) rate = 4;
        else if (maxL >= 200) rate = 2;
        else if (maxL >= 150) rate = 1;

        if (rate > 0) {
          const amount = rate * baseResult.billableWeight;
          fees.push({ key: "pricing.fees.super_overlength", amount, params: { rate } });
          totalPrice += amount;
        }
      }
    }

    return { ...baseResult, totalPrice, fees };
  };

  // --- CALCULATE CHANNELS ---

  // 1. EXPRESS
  SHIPPING_METHODS.EXPRESS.channels.forEach(channel => {
    // Logic: Small < 21kg, Large >= 21kg (or implied split)
    let unitPrice = 0;
    let basePrice = 0;

    // Calculate Split-Ticket Billable Weight for Express
    // Formula: Sum of Max(Actual, Volumetric, MinPieceWeight) for each box
    let expressBillableWeight = 0;
    items.forEach(item => {
      const volW = (item.l * item.w * item.h) / 6000;
      // Per user request: Round up if there are decimals "in between" (per box)
      let pieceChargeWeight = Math.ceil(Math.max(item.weight, volW));

      // Minimum Piece Weight Logic:
      // If multi-piece shipment (totalCartons > 1), each piece min 6KG.
      // If single-piece shipment, piece min 1KG.
      if (totalCartons > 1) {
        pieceChargeWeight = Math.max(pieceChargeWeight, 6);
      } else {
        pieceChargeWeight = Math.max(pieceChargeWeight, 1);
      }

      expressBillableWeight += pieceChargeWeight * item.quantity;
    });
    // expressBillableWeight is already sum of integers
    expressBillableWeight = Math.ceil(expressBillableWeight);

    // Updated Price Logic regarding Small/Large:
    // Prompt implied usage of billable weight calculation for pricing breaks?
    // Usually pricing breaks use the Charge Weight.
    // If Billable < 21: Small formula.
    // If Billable >= 21: Check for "Big" discount?

    const rules = (channel as any).rules.all;
    const smallRule = rules.small;
    const largeRule = rules.large;

    // Use the logic suggested by the config comments:
    // Small < 21kg (Billable)
    // Large >= 21kg (Billable), OR (Total Vol >= 31 OR Total Act >= 25)

    const isLargeShipment = expressBillableWeight >= 21 || totalActualWeight >= 25 || totalVolumeWeight >= 31;

    if (isLargeShipment) {
      unitPrice = largeRule.base;
      basePrice = expressBillableWeight * unitPrice;
    } else {
      // Small Package Price
      // basePrice = base + (weight - 1) * per_kg
      basePrice = smallRule.base + Math.max(0, expressBillableWeight - 1) * smallRule.per_kg;
      unitPrice = basePrice / expressBillableWeight;
    }

    const commonFees = SHIPPING_METHODS.EXPRESS.commonFees.map(f => ({ key: f.description, amount: f.amount }));
    const commonTotal = commonFees.reduce((s, f) => s + f.amount, 0);

    const res = applyFeesAndSurcharges({
      id: channel.id,
      methodName: SHIPPING_METHODS.EXPRESS.name,
      channelName: channel.name,
      totalPrice: basePrice + commonTotal,
      unitPrice,
      billableWeight: expressBillableWeight, // Use the new Split Weight
      originalBillableWeight: billableWeight, // Keep global "simple" weight for display reference
      totalActualWeight,
      totalVolumeWeight,
      totalVolumeCBM,
      transitTime: channel.transitTime,
      fees: commonFees
    }, "EXPRESS");
    if (res) results.push(res);
  });

  // 2. AIR FREIGHT
  SHIPPING_METHODS.AIR_FREIGHT.channels.forEach(channel => {
    // Rules: 21-74, 75-100, 101+
    const zoneKey = (zone === 'la') ? 'west' : zone;
    const rules = channel.rules[zoneKey as keyof typeof channel.rules];

    // Total min charge 21kg. Use global Billable Weight (Max of Total Actual vs Total Vol)
    // Enforce 12KG per carton minimum (User Request)
    const chargeWeight = Math.max(billableWeight, totalCartons * 12, 21);

    let unitPrice = 0;
    if (chargeWeight >= 101) unitPrice = rules["101+"];
    else if (chargeWeight >= 75) unitPrice = rules["75-100"];
    else unitPrice = rules["21-74"];

    if (unitPrice > 0) {
      const res = applyFeesAndSurcharges({
        id: channel.id,
        methodName: SHIPPING_METHODS.AIR_FREIGHT.name,
        channelName: channel.name,
        totalPrice: chargeWeight * unitPrice,
        unitPrice,
        billableWeight: chargeWeight,
        originalBillableWeight: billableWeight,
        totalActualWeight,
        totalVolumeWeight,
        totalVolumeCBM,
        transitTime: channel.transitTime,
        fees: []
      }, "AIR_FREIGHT");
      if (res) results.push(res);
    }
  });

  // 3. AIR TRUCK
  SHIPPING_METHODS.AIR_TRUCK.channels.forEach(channel => {
    if (billableWeight < 40) return;
    const rules = channel.rules[zone as keyof typeof channel.rules];
    // Enforce Min Charge of 101kg for Air Truck if weight is low
    const chargeWeight = Math.max(billableWeight, 101); // Min charge 100kg (tier starts at 101 usually)

    // Use chargeWeight for looking up properties
    let unitPrice = 0;
    if (chargeWeight >= 1000) unitPrice = rules["1000+"];
    else if (chargeWeight >= 501) unitPrice = rules["501-1000"];
    else if (chargeWeight >= 301) unitPrice = rules["301-500"];
    else if (chargeWeight >= 101) unitPrice = rules["101-300"];

    if (unitPrice > 0) {
      const commonFees = SHIPPING_METHODS.AIR_TRUCK.commonFees.map(f => ({ key: f.description, amount: f.amount }));
      const commonTotal = commonFees.reduce((s, f) => s + f.amount, 0);

      const res = applyFeesAndSurcharges({
        id: channel.id,
        methodName: SHIPPING_METHODS.AIR_TRUCK.name,
        channelName: channel.name,
        totalPrice: chargeWeight * unitPrice + commonTotal,
        unitPrice,
        billableWeight: chargeWeight, // Reflect charged weight
        originalBillableWeight: billableWeight,
        totalActualWeight,
        totalVolumeWeight,
        totalVolumeCBM,
        transitTime: channel.transitTime,
        fees: commonFees
      }, "AIR_TRUCK");
      if (res) results.push(res);
    }
  });

  // 4. SEA PIER
  SHIPPING_METHODS.SEA_PIER.channels.forEach(channel => {
    const zoneKey = (zone === 'la') ? 'west' : zone;
    const rules = channel.rules[zoneKey as keyof typeof channel.rules];

    // Total min charge 21kg. Use global Billable Weight (Max of Total Actual vs Total Vol)
    // Enforce 12KG per carton minimum (User Request)
    const chargeWeight = Math.max(billableWeight, totalCartons * 12, 21);

    let unitPrice = 0;
    if (chargeWeight >= 101) unitPrice = rules["101+"];
    else unitPrice = rules["21-99"];

    if (unitPrice > 0) {
      const res = applyFeesAndSurcharges({
        id: channel.id,
        methodName: SHIPPING_METHODS.SEA_PIER.name,
        channelName: channel.name,
        totalPrice: chargeWeight * unitPrice,
        unitPrice,
        billableWeight: chargeWeight,
        originalBillableWeight: billableWeight,
        totalActualWeight,
        totalVolumeWeight,
        totalVolumeCBM,
        transitTime: channel.transitTime,
        fees: []
      }, "SEA_PIER");
      if (res) results.push(res);
    }
  });

  // 5. SEA TRUCK
  // SHIPPING_METHODS.SEA_TRUCK.channels.forEach(channel => {
  //   if (billableWeight < 40) return;
  //   const rules = channel.rules[zone as keyof typeof channel.rules];

  //   // Enforce Min Charge 350kg for Sea Truck to ensure visibility alongside Oversize
  //   const chargeWeight = Math.max(billableWeight, 101);

  //   let unitPrice = 0;
  //   if (chargeWeight >= 1000) unitPrice = rules["1000+"];
  //   else if (chargeWeight >= 350) unitPrice = rules["350-999"];
  //   else if (chargeWeight >= 101) unitPrice = rules["101-349"];

  //   if (unitPrice > 0) {
  //     const commonFees = SHIPPING_METHODS.SEA_TRUCK.commonFees.map(f => ({ key: f.description, amount: f.amount }));
  //     const commonTotal = commonFees.reduce((s, f) => s + f.amount, 0);

  //     const res = applyFeesAndSurcharges({
  //       id: channel.id,
  //       methodName: SHIPPING_METHODS.SEA_TRUCK.name,
  //       channelName: channel.name,
  //       totalPrice: chargeWeight * unitPrice + commonTotal,
  //       unitPrice,
  //       billableWeight: chargeWeight, // Reflect charged weight
  //       originalBillableWeight: billableWeight,
  //       totalActualWeight,
  //       totalVolumeWeight,
  //       totalVolumeCBM,
  //       transitTime: channel.transitTime,
  //       fees: commonFees
  //     }, "SEA_TRUCK");
  //     if (res) results.push(res);
  //   }
  // });

  // ... Previous loops for SHIPPING_METHODS
  // Add logic for SEA_TRUCK_OVERSIZE_DATA

  // Need to import SEA_TRUCK_OVERSIZE_DATA and SUPER_OVERSIZE_SURCHARGE at top, but adding logic here first
  // Assuming imports are updated separately or I will update them in a follow up.

  SEA_TRUCK_OVERSIZE_DATA.forEach(channel => {
    if (billableWeight < 40) return;
    // Block if > 600cm (Trigger Custom Quote Card)
    if (maxL >= 600) return;

    let matchedRule = null;

    // 1. Strict Zip Matching
    for (const rule of channel.rules) {
      let isMatch = false;
      // Check includes
      for (const prefix of rule.zips) {
        if (zip.startsWith(prefix)) {
          isMatch = true;
          break;
        }
      }
      // Check excludes
      if (isMatch && rule.exclude) {
        for (const ex of rule.exclude) {
          if (zip.startsWith(ex)) {
            isMatch = false;
            break;
          }
        }
      }

      if (isMatch) {
        matchedRule = rule;
        break;
      }
    }

    if (!matchedRule) return;
    // 2. Weight Pricing
    // Enforce Min Charge 100kg
    const chargeWeight = Math.max(billableWeight, 101);
    let unitPrice = 0;

    // Tiers: 101-300, 301-500, 501-1000, 1001+
    if (chargeWeight >= 101 && chargeWeight <= 300) unitPrice = matchedRule.prices["101"];
    else if (chargeWeight >= 301 && chargeWeight <= 500) unitPrice = matchedRule.prices["301"];
    else if (chargeWeight >= 501 && chargeWeight <= 1000) unitPrice = matchedRule.prices["501"];
    else if (chargeWeight >= 1001) unitPrice = matchedRule.prices["1001"];

    if (unitPrice === 0) return; // Weight mismatch (too light?)

    // 3. Base Calculation
    let finalUnitPrice = unitPrice;
    const fees = [];

    // 4. Surcharges
    // Sensitive Goods +2
    if (cargoType !== CARGO_TYPES.GENERAL) {
      finalUnitPrice += 2;
      fees.push({ key: "pricing.fees.cargo_surcharge", amount: 2 * chargeWeight, params: { cargo: cargoType.name } });
    }

    // Super Oversize Logic
    let superOversizeFee = 0;
    if (maxL >= 300) {
      let rate = 0;
      let minTotal = 0;

      // Find highest applicable threshold
      if (maxL >= 500) {
        // Special logic for bulk > 3000kg
        if (chargeWeight > 3000) {
          rate = 2.5;
        } else {
          rate = 5;
        }
        minTotal = 4500;
      } else if (maxL >= 400) {
        rate = 4;
        minTotal = 3000;
      } else {
        rate = 3;
        minTotal = 1500;
      }

      superOversizeFee = Math.max(rate * chargeWeight, minTotal);
      fees.push({ key: "pricing.fees.super_overlength", amount: superOversizeFee });
    }

    // Delivery Fee
    fees.push({ key: "pricing.fees.truck_delivery", amount: GLOBAL_SURCHARGES.TRUCK_DELIVERY_FEE });

    // Public Special Address Fee
    let publicFee = 0;
    if (isPublic) {
      publicFee = GLOBAL_SURCHARGES.PUBLIC_AREA_FLAT;
      fees.push({ key: "pricing.fees.public_address", amount: publicFee });
    }

    const totalPrice = finalUnitPrice * chargeWeight + superOversizeFee + GLOBAL_SURCHARGES.TRUCK_DELIVERY_FEE + publicFee;

    // Push Result
    results.push({
      id: channel.id,
      methodName: "pricing.methods.sea_truck_oversize",
      channelName: channel.name,
      totalPrice,
      unitPrice: finalUnitPrice,
      billableWeight: chargeWeight, // Reflect charged weight
      originalBillableWeight: billableWeight,
      totalActualWeight,
      totalVolumeWeight,
      totalVolumeCBM: totalVolumeCBM,
      transitTime: channel.transitTime,
      fees
    });
  });

  // Check for duplicates
  const seenIds = new Set();
  results.forEach(r => {
    if (seenIds.has(r.id)) {
      console.error(`DUPLICATE ID FOUND: ${r.id}`);
    }
    seenIds.add(r.id);
  });
  console.log(`Total results: ${results.length}`);

  return results.sort((a, b) => a.totalPrice - b.totalPrice);
}
