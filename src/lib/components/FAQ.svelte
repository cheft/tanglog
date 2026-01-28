<script lang="ts">
  import { t, currentLang } from "$lib/i18n";
  import { ChevronDown } from "lucide-svelte";

  let openIndex = $state(-1);

  const toggleFAQ = (index: number) => {
    openIndex = openIndex === index ? -1 : index;
  };

  const faqs = $derived(
    $currentLang === "zh"
      ? [
          {
            question: "你们提供哪些物流服务？",
            answer:
              "我们提供全方位的中美跨境物流服务，包括国际快递（DHL、FedEx、UPS）、空运、海运（整柜FCL和拼箱LCL）、美国本地配送以及一件代发服务。无论您是个人还是企业，我们都能为您提供定制化的物流解决方案。",
          },
          {
            question: "从中国到美国需要多长时间？",
            answer:
              "运输时间取决于您选择的服务类型：国际快递3-7天送达，空运5-10天，海运美西15天、美东30天。我们的准时率高达98%，确保您的货物按时送达。",
          },
          {
            question: "你们的价格相比市场如何？",
            answer:
              "我们与官方渠道合作，价格比市场平均水平低20%。我们提供透明报价，无隐形消费。具体价格取决于货物重量、体积和目的地，请联系我们获取详细报价。",
          },
          {
            question: "货物安全有保障吗？",
            answer:
              "我们为所有货物提供全程保险护航，货损率低于0.1%。我们采用最先进的监控系统和专业的包装服务，确保您的货物安全无忧。如有任何损失，我们将按保险条款进行赔付。",
          },
          {
            question: "你们的仓库在哪里？",
            answer:
              "我们在中国深圳和美国洛杉矶（阿纳海姆）设有自营仓库。深圳仓库面积1300平方米，洛杉矶仓库面积30,000平方英尺，可为您提供仓储、分拣、打包和配送等一站式服务。",
          },
          {
            question: "如何追踪我的货物？",
            answer:
              "我们提供实时轨迹追踪服务。您可以通过我们的系统随时查看货物位置和运输状态。我们的客服团队也会及时向您更新货物动态，确保您随时掌握货物信息。",
          },
          {
            question: "你们提供清关服务吗？",
            answer:
              "是的，我们提供一站式清关服务。我们的专业团队熟悉中美两国的海关法规，能够高效处理清关手续，确保您的货物顺利通关。",
          },
          {
            question: "最低起运量是多少？",
            answer:
              "我们没有最低起运量限制。无论是个人小包裹还是企业大批量货物，我们都能为您提供专业服务。一件代发服务更是专为小批量需求设计。",
          },
        ]
      : [
          {
            question: "What logistics services do you provide?",
            answer:
              "We provide comprehensive China-US cross-border logistics services, including international express (DHL, FedEx, UPS), air freight, ocean freight (FCL and LCL), US domestic delivery, and dropshipping services. Whether you're an individual or a business, we can provide customized logistics solutions.",
          },
          {
            question: "How long does shipping from China to USA take?",
            answer:
              "Shipping time depends on the service type you choose: International express 3-7 days, air freight 5-10 days, ocean freight West Coast 15 days, East Coast 30 days. Our on-time rate is up to 98%, ensuring your cargo arrives on schedule.",
          },
          {
            question: "How competitive are your prices?",
            answer:
              "We partner with official channels and offer prices 20% below market average. We provide transparent pricing with no hidden fees. Specific prices depend on cargo weight, volume, and destination. Please contact us for a detailed quote.",
          },
          {
            question: "Is my cargo safe?",
            answer:
              "We provide full insurance coverage for all shipments, with a cargo damage rate below 0.1%. We use advanced monitoring systems and professional packaging services to ensure your cargo is safe and worry-free. Any losses will be compensated according to insurance terms.",
          },
          {
            question: "Where are your warehouses located?",
            answer:
              "We have self-operated warehouses in Shenzhen, China (1,300 sqm) and Los Angeles, USA (Anaheim, 30,000 sq ft). We can provide one-stop services including warehousing, sorting, packing, and distribution.",
          },
          {
            question: "How can I track my shipment?",
            answer:
              "We provide real-time tracking services. You can check your cargo location and shipping status through our system at any time. Our customer service team will also update you on cargo movements promptly.",
          },
          {
            question: "Do you provide customs clearance services?",
            answer:
              "Yes, we provide one-stop customs clearance services. Our professional team is familiar with customs regulations in both China and the US, and can efficiently handle customs procedures to ensure smooth clearance.",
          },
          {
            question: "What is the minimum shipment quantity?",
            answer:
              "We have no minimum shipment quantity. Whether it's a personal small package or large business shipments, we can provide professional services. Our dropshipping service is specifically designed for small-batch needs.",
          },
        ]
  );

  // FAQ Schema for SEO
  const faqSchema = $derived({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  });
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`}
</svelte:head>

<section id="faq" class="py-24 bg-white">
  <div class="container mx-auto px-6">
    <div class="text-center mb-16">
      <span
        class="text-primary-600 font-semibold tracking-wider uppercase text-sm"
        >FAQ</span
      >
      <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
        {$currentLang === "zh" ? "常见问题" : "Frequently Asked Questions"}
      </h2>
      <p class="text-slate-600 max-w-2xl mx-auto">
        {$currentLang === "zh"
          ? "以下是客户最常问的问题，如有其他疑问，欢迎随时联系我们"
          : "Here are the most frequently asked questions. Feel free to contact us if you have any other inquiries"}
      </p>
    </div>

    <div class="max-w-3xl mx-auto space-y-4">
      {#each faqs as faq, index}
        <div
          class="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 hover:border-primary-200"
        >
          <button
            class="w-full px-6 py-5 text-left flex items-center justify-between"
            onclick={() => toggleFAQ(index)}
          >
            <h3 class="text-lg font-bold text-slate-900 pr-8">
              {faq.question}
            </h3>
            <ChevronDown
              class="w-5 h-5 text-primary-600 transition-transform duration-300 flex-shrink-0 {openIndex ===
              index
                ? 'rotate-180'
                : ''}"
            />
          </button>
          {#if openIndex === index}
            <div class="px-6 pb-5 text-slate-600 leading-relaxed">
              {faq.answer}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
