<script lang="ts">
  import { currentLang } from "$lib/i18n";

  const organizationSchema = $derived({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "棠洛国际物流有限公司",
    alternateName: "Lofeng International Logistics Co., Ltd.",
    url: "https://www.loflog.com",
    logo: "https://www.loflog.com/logo.png",
    description:
      $currentLang === "zh"
        ? "专业的中美跨境物流服务提供商，提供国际快递、空运、海运、仓储和一件代发服务"
        : "Professional China-US cross-border logistics service provider offering international express, air freight, ocean freight, warehousing and dropshipping services",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+86-177-2256-1770",
        contactType: "customer service",
        areaServed: ["CN", "US"],
        availableLanguage: ["Chinese", "English"],
      },
    ],
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "新田社区新塘路28号天佑第二工业区B栋107",
        addressLocality: "深圳市",
        addressRegion: "广东省",
        addressCountry: "CN",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "****",
        addressLocality: "Anaheim",
        addressRegion: "CA",
        postalCode: "92807",
        addressCountry: "US",
      },
    ],
    sameAs: [
      "https://www.youtube.com/@LofengNow/shorts",
      "https://www.douyin.com/user/MS4wLjABAAAArcg1J0RxAXw2BNbl80No5f54briaQeB3xcN3xe5klvQ2gsG2o1BjEeGcgMDopYJZ",
    ],
  });

  const localBusinessSchema = $derived({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.loflog.com/#localbusiness",
    name: "棠洛国际物流",
    image: "https://www.loflog.com/warehouse.jpg",
    telephone: "+86-177-2256-1770",
    email: "services@loflog.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "新田社区新塘路28号天佑第二工业区B栋107",
      addressLocality: "深圳市",
      addressRegion: "广东省",
      addressCountry: "CN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "22.7539",
      longitude: "113.8795",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    priceRange: "$$",
  });

  const serviceSchema = $derived({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType:
      $currentLang === "zh"
        ? "国际物流服务"
        : "International Logistics Services",
    provider: {
      "@type": "Organization",
      name: "棠洛国际物流",
    },
    areaServed: ["CN", "US"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: $currentLang === "zh" ? "物流服务" : "Logistics Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name:
              $currentLang === "zh"
                ? "国际快递/空运"
                : "International Express/Air Freight",
            description:
              $currentLang === "zh"
                ? "DHL、FedEx、UPS等主流快递渠道，3-7天极速送达"
                : "DHL, FedEx, UPS mainstream express channels, 3-7 days delivery",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name:
              $currentLang === "zh" ? "海运整柜/拼箱" : "Ocean Freight FCL/LCL",
            description:
              $currentLang === "zh"
                ? "适合大批量货物运输，美西15天，美东30天"
                : "Suitable for large volume cargo, West Coast 15 days, East Coast 30 days",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name:
              $currentLang === "zh" ? "美国本地配送" : "US Domestic Delivery",
            description:
              $currentLang === "zh"
                ? "自有卡车车队，覆盖全美配送网络"
                : "Own truck fleet covering US-wide delivery network",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name:
              $currentLang === "zh" ? "一件代发服务" : "Dropshipping Service",
            description:
              $currentLang === "zh"
                ? "专为独立站商家打造的仓储代发解决方案"
                : "Warehousing and dropshipping solution for independent merchants",
          },
        },
      ],
    },
  });

  const breadcrumbSchema = $derived({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: $currentLang === "zh" ? "首页" : "Home",
        item: "https://www.loflog.com",
      },
    ],
  });
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(organizationSchema)}</script>`}
  {@html `<script type="application/ld+json">${JSON.stringify(localBusinessSchema)}</script>`}
  {@html `<script type="application/ld+json">${JSON.stringify(serviceSchema)}</script>`}
  {@html `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`}
</svelte:head>
