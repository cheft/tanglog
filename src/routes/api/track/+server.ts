import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

const COUNTRY_API = "https://business.logistic.mobi/api/Country/GetSelectAsync";
const TRACKING_API =
  "https://business.logistic.mobi/api/WayBillTrackInfo/GetTracksNoAuthAsync?branchId=3528";

export const GET: RequestHandler = async ({ url }) => {
  const trackingNumber = url.searchParams.get("number");

  if (!trackingNumber) {
    return json(
      { success: false, message: "Tracking number is required" },
      { status: 400 }
    );
  }

  try {
    // 1. Fetch Country List
    const countryResponse = await fetch(COUNTRY_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const countryResult = await countryResponse.json();
    const countries = countryResult.data || [];

    // 2. Fetch Tracking Data
    const trackingResponse = await fetch(TRACKING_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([trackingNumber]),
    });
    const trackingResult = await trackingResponse.json();

    if (
      trackingResult.code === 200 &&
      trackingResult.data &&
      trackingResult.data.length > 0
    ) {
      const mainData = trackingResult.data[0];

      // Find matching country
      const country = countries.find(
        (c: any) => c.id === mainData.consigneeCountryId
      );

      const formattedData = {
        waybillCode: mainData.waybillCode,
        preBillCode: mainData.preBillCode,
        tranBillCode: mainData.tranBillCode,
        countryCnName: country?.cnName || "未知",
        countryEnName: country?.enName || "Unknown",
        events: mainData.details.map((detail: any) => ({
          time: detail.createTime,
          status: detail.description,
          location: detail.location,
          title: detail.description.split(" ")[0], // Simple title extraction
        })),
      };

      return json({
        success: true,
        data: formattedData,
      });
    } else {
      return json({
        success: false,
        message: trackingResult.message || "No tracking information found.",
      });
    }
  } catch (error) {
    console.error("Tracking API Error:", error);
    return json(
      {
        success: false,
        message: "Error fetching tracking data from external service",
      },
      { status: 500 }
    );
  }
};
