import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

const ZIP_CLASSIFY_API = "https://www.ziplucas.com/zipCodeClassify";
const ADDRESS_VERIFY_API = "https://samezip.us/streetff";

// Helper to safely parse JSON from a fetch response
async function safeJson(response: Response) {
  try {
    const text = await response.text();
    if (!text || text.trim() === "") return null;
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
}

export const GET: RequestHandler = async ({ url }) => {
  const query = (url.searchParams.get("q") || "").trim();

  if (!query) {
    return json({ success: false, message: "参数不能为空" }, { status: 400 });
  }

  // 1. Identify if it's a simple zip code (5 digits) or a fuller address
  const isOnlyZip = /^\d{5}$/.test(query);
  let extractedZip = isOnlyZip ? query : null;

  // If not only zip, try to extract zip from the end of the query (last 5 digits)
  if (!isOnlyZip) {
    const zipMatch = query.match(/\d{5}$/);
    if (zipMatch) {
      extractedZip = zipMatch[0];
    }
  }

  try {
    let addressData = null;
    let zipData = null;

    // 2. Perform Address Verification if it's not JUST a zip code
    if (!isOnlyZip) {
      try {
        const addrResp = await fetch(
          `${ADDRESS_VERIFY_API}?street=${encodeURIComponent(query)}`
        );
        const addrJson = await safeJson(addrResp);

        // Handle the specific structure provided by the user
        if (addrJson && addrJson.deliveryLine1) {
          addressData = {
            valid: true,
            street: addrJson.deliveryLine1,
            street2: addrJson.lastLine,
            city: addrJson.components?.cityName,
            state: addrJson.components?.state,
            zip: addrJson.components?.zipCode,
            type:
              addrJson.metadata?.rdi === "Commercial" ? "商业地址" : "住宅地址",
            raw: addrJson,
          };

          // Use zip from components if available and we haven't extracted one or it differs
          if (addrJson.components?.zipCode) {
            extractedZip = addrJson.components.zipCode;
          }
        }
      } catch (e) {
        console.error("Address Verification API Error:", e);
      }
    }

    // 3. Perform Zip Classification (Always try if we have a zip code)
    if (extractedZip) {
      try {
        const zipResp = await fetch(
          `${ZIP_CLASSIFY_API}?zipcode=${extractedZip}`
        );
        zipData = await safeJson(zipResp);
      } catch (e) {
        console.error("Zip Classification API Error:", e);
      }
    }

    // 4. Construct Final Response
    if (addressData || zipData) {
      return json({
        success: true,
        type: isOnlyZip ? "zip" : "address",
        addressData,
        zipData,
      });
    } else {
      return json({
        success: false,
        message: "无法从该地址中识别到详细信息，请确保地址末尾包含5位邮编。",
      });
    }
  } catch (error) {
    console.error("Zip/Address Proxy Error:", error);
    return json(
      { success: false, message: "服务暂时不可用，请稍后再试。" },
      { status: 500 }
    );
  }
};
