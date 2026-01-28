export interface PricingRule {
  name: string;
  minWeight: number;
  unit: "kg" | "shipment";
  rates: {
    [zone: string]: {
      [weightBracket: string]: number;
    };
  };
  extraFees: {
    description: string;
    amount: number;
    applyPer: "kg" | "carton" | "shipment";
  }[];
  transitTime: string;
}

export const ZONES = {
  LA: ["90", "91", "92"],
  WEST: ["8", "9"], // Excludes LA range if handled in logic
  CENTRAL: ["4", "5", "6", "7", "97", "98"],
  EAST: ["0", "1", "2", "3"],
};

export const GLOBAL_SURCHARGES = {
  RESIDENTIAL_PER_CARTON: 25,
  EXPRESS_REMOTE_PER_KG: 6,
  REMOTE_AREA_MIN: 100,
  REMOTE_AREA_PER_CARTON: 30,
  SUPER_REMOTE_AREA_PER_CARTON: 50,
  PUBLIC_AREA_PER_CARTON: 110,
  PUBLIC_AREA_FLAT: 560,
  EXPRESS_OP_FEE: 150,
  TRUCK_DELIVERY_FEE: 500,
};

export const SHIPPING_METHODS = {
  EXPRESS: {
    name: "pricing.methods.express",
    channels: [
      {
        id: "ups_sz",
        name: "pricing.channels.ups_sz",
        transitTime: "1-4 work days",
        rules: {
          all: {
            "small": { base: 264, per_kg: 64 }, // Small items <21kg
            "large": { base: 46 }, // Large items >21kg (or vol>31/act>25)
          },
        },
      },
    ],
    commonFees: [
      {
        description: "pricing.fees.handling",
        amount: 150,
        applyPer: "shipment",
      },
    ],
  },
  AIR_FREIGHT: {
    name: "pricing.methods.air_freight",
    channels: [
      {
        id: "air_economic",
        name: "pricing.channels.air_economic",
        transitTime: "6-8 work days",
        rules: {
          west: { "21-74": 42, "75-100": 40, "101+": 39 },
          central: { "21-74": 43, "75-100": 41, "101+": 39 },
          east: { "21-74": 44, "75-100": 42, "101+": 40 },
        },
      },
      {
        id: "air_express",
        name: "pricing.channels.air_express",
        transitTime: "3-5 work days",
        rules: {
          west: { "21-74": 45, "75-100": 43, "101+": 41 },
          central: { "21-74": 46, "75-100": 44, "101+": 42 },
          east: { "21-74": 47, "75-100": 45, "101+": 43 },
        },
      },
    ],
    commonFees: [],
  },
  AIR_TRUCK: {
    name: "pricing.methods.air_truck",
    channels: [
      {
        id: "air_truck_normal",
        name: "pricing.channels.air_truck",
        transitTime: "6-8 work days",
        rules: {
          la: { "101-300": 49, "301-500": 46, "501-1000": 44, "1000+": 41 },
          west: { "101-300": 50, "301-500": 47, "501-1000": 44, "1000+": 42 },
          central: { "101-300": 51, "301-500": 48, "501-1000": 45, "1000+": 43 },
          east: { "101-300": 52, "301-500": 49, "501-1000": 46, "1000+": 44 },
        },
      },
    ],
    commonFees: [
      {
        description: "pricing.fees.truck_delivery",
        amount: 500,
        applyPer: "shipment",
      },
    ],
  },
  SEA_PIER: {
    name: "pricing.methods.sea_pier",
    channels: [
      {
        id: "sea_clx",
        name: "pricing.channels.sea_clx",
        transitTime: "9-11 work days",
        rules: {
          west: { "21-99": 18, "101+": 15 },
          central: { "21-99": 19, "101+": 16 },
          east: { "21-99": 20, "101+": 17 },
        },
      },
      {
        id: "sea_max",
        name: "pricing.channels.sea_max",
        transitTime: "12-14 work days",
        rules: {
          west: { "21-99": 17, "101+": 14 },
          central: { "21-99": 18, "101+": 17 },
          east: { "21-99": 19, "101+": 19 },
        },
      },
      {
        id: "sea_zim",
        name: "pricing.channels.sea_zim",
        transitTime: "13-15 work days",
        rules: {
          west: { "21-99": 14, "101+": 11 },
          central: { "21-99": 15, "101+": 12 },
          east: { "21-99": 16, "101+": 13 },
        },
      },
      {
        id: "sea_yantian",
        name: "pricing.channels.sea_yantian", // Salt field fixed delivery
        transitTime: "16-19 work days",
        rules: {
          west: { "21-99": 13, "101+": 10 },
          central: { "21-99": 14, "101+": 12 },
          east: { "21-99": 15, "101+": 13 },
        },
      },
    ],
    commonFees: [],
  },
  SEA_TRUCK: {
    name: "pricing.methods.sea_truck",
    channels: [
      {
        id: "truck_clx",
        name: "pricing.channels.truck_clx",
        transitTime: "9-11 work days",
        rules: {
          la: { "101-349": 17, "350-999": 15, "1000+": 13 },
          west: { "101-349": 18, "350-999": 16, "1000+": 14 },
          central: { "101-349": 19, "350-999": 18, "1000+": 15 },
          east: { "101-349": 20, "350-999": 19, "1000+": 16 },
        },
      },
      {
        id: "truck_max",
        name: "pricing.channels.truck_max",
        transitTime: "12-14 work days",
        rules: {
          la: { "101-349": 17, "350-999": 16, "1000+": 13 },
          west: { "101-349": 19, "350-999": 18, "1000+": 15 },
          central: { "101-349": 20, "350-999": 19.5, "1000+": 18 },
          east: { "101-349": 21, "350-999": 20.5, "1000+": 19 },
        },
      },
      {
        id: "truck_zim",
        name: "pricing.channels.truck_zim",
        transitTime: "13-15 work days",
        rules: {
          la: { "101-349": 13, "350-999": 12, "1000+": 10 },
          west: { "101-349": 15, "350-999": 14, "1000+": 12 },
          central: { "101-349": 17, "350-999": 16, "1000+": 13.5 },
          east: { "101-349": 18, "350-999": 17, "1000+": 15 },
        },
      },
      {
        id: "truck_yantian",
        name: "pricing.channels.truck_yantian",
        transitTime: "16-19 work days",
        rules: {
          la: { "101-349": 12.5, "350-999": 11.5, "1000+": 9.5 },
          west: { "101-349": 14.5, "350-999": 13.5, "1000+": 11.5 },
          central: { "101-349": 16.5, "350-999": 15.5, "1000+": 13 },
          east: { "101-349": 17.5, "350-999": 16.5, "1000+": 14 },
        },
      },
    ],
    commonFees: [
      {
        description: "pricing.fees.truck_delivery",
        amount: 500,
        applyPer: "shipment",
      },
    ],
  },
  SEA_TRUCK_OVERSIZE: {
    name: "pricing.methods.sea_truck_oversize",
    channels: [], // Channel data is in SEA_TRUCK_OVERSIZE_DATA
    commonFees: [],
  },
};

export const CARGO_TYPES = {
  GENERAL: {
    name: "pricing.cargo.general",
    surcharges: {},
    blockChannels: [],
  },
  MAGNETIC: {
    name: "pricing.cargo.magnetic",
    surcharges: {
      AIR: { amount: 1, minTotal: 480 },
      SEA: { amount: 2 },
      EXPRESS: { amount: 1, minTotal: 0 }
    },
    blockChannels: [],
  },
  BATTERY: {
    name: "pricing.cargo.battery",
    surcharges: {
      AIR: { amount: 2 },
      SEA: { amount: 2 },
      EXPRESS: { amount: 1 }
    },
    blockChannels: [],
  },
  TEXTILE: {
    name: "pricing.cargo.textile",
    surcharges: {
      AIR: { amount: 2 },
      SEA: { amount: 2 },
      EXPRESS: { amount: 1 } // Using default sensitive for express if not spec
    },
    blockChannels: [],
  },
  TOYS: {
    name: "pricing.cargo.toys",
    surcharges: {
      AIR: { amount: 2 },
      SEA: { amount: 2 },
      EXPRESS: { amount: 4 }
    },
    blockChannels: [],
  },
  HARDWARE: {
    name: "pricing.cargo.hardware", // No specific air logic in notes, assuming standard
    surcharges: {
      AIR: { amount: 2 },
      SEA: { amount: 2 },
      EXPRESS: { amount: 4 }
    },
    blockChannels: [],
  },
  HIGH_VALUE: {
    name: "pricing.cargo.high_value",
    surcharges: {
      AIR: { amount: 3 },
      SEA: { amount: 3 },
      EXPRESS: { amount: 4 } // General sensitive
    },
    blockChannels: [],
  },
  LIQUID_PASTE: { // Combined for simplicity or separate if needed
    name: "pricing.cargo.liquid_paste",
    surcharges: {
      AIR: { amount: 0, block: true }, // Usually sensitive for air
      SEA: { amount: 2 },
      EXPRESS: { amount: 5 }
    },
    blockChannels: ["AIR"],
  },
  COSMETICS_SOLID: {
    name: "pricing.cargo.cosmetics_solid",
    surcharges: {
      AIR: { amount: 0, block: true },
      SEA: { amount: 2 },
      EXPRESS: { amount: 5 }
    },
    blockChannels: ["AIR"],
  },
  FOOD_HEALTH: {
    name: "pricing.cargo.food_health",
    surcharges: {
      AIR: { amount: 0, block: true },
      SEA: { amount: 2 },
      EXPRESS: { amount: 8 }
    },
    blockChannels: ["AIR"],
  },
  KITCHEN: {
    name: "pricing.cargo.kitchen", // Knives etc
    surcharges: {
      AIR: { amount: 0, block: true },
      SEA: { amount: 3 },
      EXPRESS: { amount: 4 }
    },
    blockChannels: ["AIR", "EXPRESS"],
  },
  SOLAR: {
    name: "pricing.cargo.solar",
    surcharges: {
      AIR: { amount: 0, block: true },
      SEA: { amount: 3 },
      EXPRESS: { amount: 4 }
    },
    blockChannels: ["AIR", "EXPRESS"],
  },
  SENSITIVE_OTHER: {
    name: "pricing.cargo.sensitive_other",
    surcharges: {
      AIR: { amount: 2 },
      SEA: { amount: 2 },
      EXPRESS: { amount: 4 }
    },
    blockChannels: []
  }
};

export const OVERSIZED_SURCHARGE = {
  EXPRESS: {
    WEIGHT: 22, // kg actual
    VOL_WEIGHT: 40, // kg vol
    AMOUNT: 290,
  },
  AIR_SEA: {
    WEIGHT: 22, // kg actual
    VOL_WEIGHT: 40, // kg vol
    AMOUNT: 290,
  },
  OVERLENGTH: {
    L1: 120, L2: 74, GIRTH: 264,
    AMOUNT: 210, // Stackable
  }
};

export const SUPER_OVERSIZE_SURCHARGE = [
  { threshold: 300, rate: 3, minTotal: 1500 },
  { threshold: 400, rate: 4, minTotal: 3000 },
  { threshold: 500, rate: 5, minTotal: 4500, bulkRate: 2.5, bulkThreshold: 3000 },
];

export const SEA_TRUCK_OVERSIZE_DATA = [
  {
    id: "sea_truck_la",
    name: "pricing.channels.sea_truck_la",
    transitTime: "16-19 work days",
    rules: [
      {
        zips: ["90", "91", "92"],
        prices: { "101": 11.0, "301": 8.1, "501": 7.6, "1001": 7.4 },
      },
      {
        zips: ["84", "85", "86", "87", "88", "89", "93", "94", "95"],
        prices: { "101": 14.5, "301": 12.0, "501": 11.0, "1001": 10.6 },
      },
      {
        zips: ["8", "96"],
        exclude: ["995", "996", "997", "998", "999"], // 995-999
        prices: { "101": 17.0, "301": 14.0, "501": 13.0, "1001": 12.4 },
      },
      {
        zips: ["4", "5", "6", "7"],
        prices: { "101": 18.0, "301": 14.0, "501": 13.5, "1001": 12.6 },
      },
      {
        zips: ["0", "1", "2", "3"],
        exclude: ["006", "007", "008", "009"],
        prices: { "101": 19.5, "301": 16.5, "501": 15.5, "1001": 15.0 },
      },
    ],
  },
  {
    id: "sea_truck_oak",
    name: "pricing.channels.sea_truck_oak",
    transitTime: "18-20 work days",
    rules: [
      {
        zips: ["94", "95"],
        prices: { "101": 12.5, "301": 9.0, "501": 8.2, "1001": 7.9 },
      },
      {
        zips: ["96", "97", "98", "99"],
        exclude: ["966", "967", "968", "969", "995", "996", "997", "998", "999"],
        prices: { "101": 16.1, "301": 11.8, "501": 11.6, "1001": 11.4 },
      },
    ],
  },
  {
    id: "sea_truck_chi",
    name: "pricing.channels.sea_truck_chi",
    transitTime: "22-25 work days",
    rules: [
      {
        zips: [
          "60", "61", "62", "63", "64", "65",
          "50", "51", "52", "53", "54", "55", "56",
          "40", "41", "42", "46", "47", "48", "49",
        ],
        prices: { "101": 15.0, "301": 12.5, "501": 11.3, "1001": 10.8 },
      },
    ],
  },
  {
    id: "sea_truck_hou",
    name: "pricing.channels.sea_truck_hou",
    transitTime: "25-29 work days",
    rules: [
      {
        zips: ["75", "76", "77"],
        prices: { "101": 13.5, "301": 11.0, "501": 9.7, "1001": 9.5 },
      },
      {
        zips: ["7"],
        exclude: ["75", "76", "77"],
        prices: { "101": 14.0, "301": 11.4, "501": 10.3, "1001": 10.2 },
      },
    ],
  },
  {
    id: "sea_truck_nyc",
    name: "pricing.channels.sea_truck_nyc",
    transitTime: "29-32 work days",
    rules: [
      {
        zips: ["4"],
        prices: { "101": 14.0, "301": 11.8, "501": 11.6, "1001": 11.0 },
      },
      {
        zips: ["2"],
        exclude: ["27", "28", "29"],
        prices: { "101": 13.8, "301": 10.8, "501": 10.3, "1001": 10.0 },
      },
      {
        zips: ["0", "1"],
        exclude: ["07", "08", "10", "11"],
        prices: { "101": 12.8, "301": 10.3, "501": 9.7, "1001": 9.6 },
      },
      {
        zips: ["07", "08", "10", "11"],
        prices: { "101": 11.8, "301": 9.1, "501": 8.9, "1001": 8.8 },
      },
    ],
  },
  {
    id: "sea_truck_sav",
    name: "pricing.channels.sea_truck_sav",
    transitTime: "27-30 work days",
    rules: [
      {
        // 27-39 means 27, 28... 39
        zips: ["27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39"],
        prices: { "101": 13.5, "301": 11.0, "501": 10.8, "1001": 10.5 },
      },
    ],
  },
  {
    id: "sea_truck_matson",
    name: "pricing.channels.sea_truck_matson",
    transitTime: "9-11 work days",
    rules: [
      {
        zips: ["90", "91", "92"],
        prices: { "101": 16.0, "301": 13.3, "501": 13.1, "1001": 12.2 },
      },
      {
        zips: ["84", "85", "86", "87", "88", "89", "93", "94", "95"],
        prices: { "101": 19.3, "301": 16.0, "501": 15.0, "1001": 13.9 },
      },
      {
        zips: ["8", "96"],
        exclude: ["995", "996", "997", "998", "999"],
        prices: { "101": 22.5, "301": 18.6, "501": 17.6, "1001": 16.5 },
      },
      {
        zips: ["4", "5", "6", "7"],
        prices: { "101": 25.0, "301": 21.3, "501": 20.8, "1001": 19.3 },
      },
      {
        zips: ["0", "1", "2", "3"],
        exclude: ["006", "007", "008", "009"],
        prices: { "101": 26.4, "301": 22.7, "501": 21.4, "1001": 20.4 },
      },
    ],
  },
  {
    id: "sea_truck_zim",
    name: "pricing.channels.sea_truck_zim",
    transitTime: "13-15 work days",
    rules: [
      {
        zips: ["90", "91", "92"],
        prices: { "101": 14.0, "301": 9.7, "501": 9.5, "1001": 9.0 },
      },
      {
        zips: ["84", "85", "86", "87", "88", "89", "93", "94", "95"],
        prices: { "101": 19.7, "301": 15.7, "501": 14.7, "1001": 13.7 },
      },
      {
        zips: ["8", "96"],
        exclude: ["995", "996", "997", "998", "999"],
        prices: { "101": 19.7, "301": 15.7, "501": 14.7, "1001": 13.7 },
      },
      {
        zips: ["4", "5", "6", "7"],
        prices: { "101": 20.7, "301": 16.7, "501": 16.4, "1001": 14.7 },
      },
      {
        zips: ["0", "1", "2", "3"],
        exclude: ["006", "007", "008", "009"],
        prices: { "101": 22.7, "301": 18.0, "501": 17.0, "1001": 16.2 },
      },
    ],
  },
];
