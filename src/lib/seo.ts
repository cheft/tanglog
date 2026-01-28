import { writable, derived } from "svelte/store";
import { currentLang } from "./i18n";

export const seoData = derived(currentLang, ($currentLang) => {
  const data = {
    zh: {
      title: "洛风国际物流 - 专业中美跨境物流服务 | 美国海运空运仓储",
      description:
        "洛风国际物流提供专业的中美跨境物流服务，包括国际快递、空运、海运、美国仓储和一件代发。中美双公司运营，服务1000+客户，准时率98%，价格优惠20%。深圳-洛杉矶直达，3-15天送达全美。",
      keywords:
        "中美物流,美国海运,国际快递,跨境物流,美国仓储,一件代发,洛杉矶仓库,深圳国际物流,中国到美国物流,海运拼箱,空运服务",
      ogTitle: "洛风国际物流 - 中美跨境物流专家",
      ogDescription:
        "专业中美跨境物流服务，自营海外仓，一件代发，为您的跨境业务保驾护航。",
      author: "洛风国际物流有限公司",
    },
    en: {
      title:
        "Lofeng International Logistics - China-US Cross-Border Logistics | Ocean & Air Freight",
      description:
        "Lofeng International Logistics offers professional China-US cross-border logistics services including international express, air freight, ocean freight, US warehousing and dropshipping. Dual companies in China and US, serving 1000+ clients, 98% on-time rate, 20% cost savings. Shenzhen-LA direct, 3-15 days US-wide delivery.",
      keywords:
        "China US logistics,ocean freight,international express,cross-border logistics,US warehouse,dropshipping,Los Angeles warehouse,Shenzhen logistics,China to USA shipping,LCL shipping,air freight services",
      ogTitle: "Lofeng International Logistics - China-US Logistics Expert",
      ogDescription:
        "Professional China-US cross-border logistics with self-operated overseas warehouses and dropshipping services.",
      author: "Lofeng International Logistics Co., Ltd.",
    },
  };

  return data[$currentLang];
});
