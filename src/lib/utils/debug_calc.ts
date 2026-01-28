
import { calculateRates } from "./calculator";

const zip = "90001"; // LA
const items = [{
    cargoType: "GENERAL",
    weight: 200, // > 101kg
    l: 100,
    w: 50,
    h: 50,
    quantity: 1
}];

const results = calculateRates(zip, items);

console.log("Results count:", results.length);
results.forEach(r => {
    console.log(`[${r.id}] ${r.methodName} - ${r.channelName}: $${r.totalPrice}`);
});
