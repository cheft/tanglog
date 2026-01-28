
import { calculateRates } from "./calculator";

function test() {
    console.log("--- Test Scenarios ---");

    // Scenario 6: International Express + Multi-piece (Per piece 6KG min)
    console.log("\nScenario 6: International Express + Multi-piece (Per piece 6KG min)");
    const expressItems = [
        {
            cargoType: "GENERAL",
            weight: 3, // < 6kg
            l: 10,
            w: 10,
            h: 10,
            quantity: 1
        },
        {
            cargoType: "GENERAL",
            weight: 4, // < 6kg
            l: 10,
            w: 10,
            h: 10,
            quantity: 1
        }
    ];
    let results = calculateRates("90001", expressItems, false, false, false, false);
    let express = results.find(r => r.methodName.includes("express"));
    if (express) {
        console.log(`Channel: ${express.channelName}`);
        console.log(`Billable Weight: ${express.billableWeight} KG (Expected: 6 + 6 = 12)`);
    }

    // Scenario 7: International Express + Single Piece (1KG min)
    console.log("\nScenario 7: International Express + Single Piece (1KG min)");
    const singleItem = [
        {
            cargoType: "GENERAL",
            weight: 0.5, // < 1kg
            l: 10,
            w: 10,
            h: 10,
            quantity: 1
        }
    ];
    results = calculateRates("90001", singleItem, false, false, false, false);
    express = results.find(r => r.methodName.includes("express"));
    if (express) {
        console.log(`Channel: ${express.channelName}`);
        console.log(`Billable Weight: ${express.billableWeight} KG (Expected: 1)`);
    }

    const zip = "99501"; // Alaska (Remote/Super Remote)
    const items = [{
        cargoType: "GENERAL",
        weight: 10,
        l: 30,
        w: 30,
        h: 30,
        quantity: 2
    }];

    // Scenario 1: International Express + Remote
    console.log("\nScenario 1: International Express + Remote");
    results = calculateRates(zip, items, false, true, false, false);
    express = results.find(r => r.methodName.includes("express"));
    if (express) {
        console.log(`Channel: ${express.channelName}`);
        console.log(`Billable Weight: ${express.billableWeight} KG (Expected: 10+10=20, or if 10 is piece weight then 20)`);
        const remoteFee = express.fees.find(f => f.key === "pricing.fees.remote");
        console.log(`Remote Fee: ${remoteFee?.amount} (Expected: ${express.billableWeight * 6})`);
    }

    // Scenario 2: Air Freight + Remote
    console.log("\nScenario 2: Air Freight + Remote");
    results = calculateRates(zip, items, false, true, false, false);
    let air = results.find(r => r.methodName.includes("air_freight"));
    if (air) {
        // Air min 21kg or cartons * 12
        // cartons = 2. weight = 10. volW = 4.5.
        // max(10*2, 4.5*2, 2*12, 21) = max(20, 9, 24, 21) = 24.
        console.log(`Billable Weight: ${air.billableWeight} KG`);
        const remoteFee = air.fees.find(f => f.key === "pricing.fees.remote");
        console.log(`Remote Fee: ${remoteFee?.amount} (Expected: max(100, 2 * 30) = 100)`);
    }

    // Scenario 3: Sea Pier + Super Remote
    console.log("\nScenario 3: Sea Pier + Super Remote");
    results = calculateRates(zip, items, false, false, true, false);
    let sea = results.find(r => r.methodName.includes("sea_pier"));
    if (sea) {
        const remoteFee = sea.fees.find(f => f.key === "pricing.fees.remote");
        console.log(`Super Remote Fee: ${remoteFee?.amount} (Expected: max(100, 2 * 50) = 100)`);
    }

    // Scenario 4: Private Address
    console.log("\nScenario 4: Private Address (Express/Air/Sea)");
    results = calculateRates("90001", items, true, false, false, false);
    results.filter(r => r.methodName.includes("express") || r.methodName.includes("air_freight") || r.methodName.includes("sea_pier"))
        .forEach(r => {
            const resFee = r.fees.find(f => f.key === "pricing.fees.residential");
            console.log(`[${r.methodName}] Residential Fee: ${resFee?.amount} (Expected: 2 * 25 = 50)`);
        });

    // Scenario 5: Public Special Address (Truck)
    console.log("\nScenario 5: Public Special Address (Truck)");
    results = calculateRates("90001", items, false, false, false, true);

    // Check Air Truck
    const airTruck = results.find(r => r.methodName.includes("air_truck"));
    if (airTruck) {
        const pubFee = airTruck.fees.find(f => f.key === "pricing.fees.public_address");
        console.log(`[Air Truck] Public Fee: ${pubFee?.amount} (Expected: 560)`);
    }

    // Check Sea Truck Oversize
    const seaTruckOver = results.filter(r => r.methodName.includes("sea_truck_oversize"));
    seaTruckOver.forEach(r => {
        const pubFee = r.fees.find(f => f.key === "pricing.fees.public_address");
        console.log(`[${r.channelName}] Public Fee: ${pubFee?.amount} (Expected: 560)`);
    });
}

test();
