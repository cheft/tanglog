import { writable, derived } from "svelte/store";
import { currentLang } from "./i18n";

export const seoData = derived(currentLang, ($currentLang) => {
  const data = {
    zh: {
      title: "棠洛国际物流 - 中美跨境物流专家 | 美国海运空运自营海外仓",
      description:
        "棠洛国际物流（Tanglog）专注中美跨境物流，提供国际快递、空运、海运、美国自营仓一件代发服务。中美双公司认证，准时率98%，一手价格。深圳至洛杉矶极速直达，助力跨境电商高效出海。",
      keywords:
        "棠洛国际物流,中美物流,美国海运,美国空运,美森快船,美国海外仓,一件代发,亚马逊FBA头程,跨境电商物流,国际货代",
      ogTitle: "棠洛国际物流 - 中美跨境物流领航者",
      ogDescription:
        "专业中美物流解决方案，全链路可视追踪，自营海外仓助力品牌出海。",
      author: "棠洛国际物流",
    },
    en: {
      title:
        "Tanglog Logistics - Expert China-US Cross-Border Logistics Solutions",
      description:
        "Tanglog International Logistics specializing in China-US logistics, including Express, Air & Ocean Freight, and US fulfillment. Dual-company presence ensuring 98% on-time delivery. Direct Shenzhen to LA routes.",
      keywords:
        "Tanglog, China US logistics, ocean freight, international shipping, US fulfillment, Amazon FBA, cross-border shipping, air freight China to US",
      ogTitle: "Tanglog Logistics - China-US Shipping Experts",
      ogDescription:
        "Seamless China-US logistics with self-operated warehouses and full-track visibility.",
      author: "Tanglog International Logistics",
    },
  };

  return data[$currentLang];
});
