<script lang="ts">
    import { t, currentLang } from "$lib/i18n";

    $: steps = [
        {
            num: "01",
            title: $currentLang === "zh" ? "提供信息" : "Provide Info",
            desc:
                $currentLang === "zh"
                    ? "在系统中提供您的货物重量、尺寸和目的地信息。"
                    : "Provide your cargo weight, dimensions and destination details.",
        },
        {
            num: "02",
            title: $currentLang === "zh" ? "支付运费" : "Payment",
            desc:
                $currentLang === "zh"
                    ? "选择您偏好的支付方式（支付宝/微信/银行转账）并完成支付。"
                    : "Choose your preferred payment method and complete the payment.",
        },
        {
            num: "03",
            title: $currentLang === "zh" ? "安排发货" : "Shipment",
            desc:
                $currentLang === "zh"
                    ? "我们将安排上门取件或您可以送至指定仓库，开始运输。"
                    : "We arrange pickup or you send to our warehouse to start transit.",
        },
        {
            num: "04",
            title: $currentLang === "zh" ? "成功送达" : "Delivery",
            desc:
                $currentLang === "zh"
                    ? "全程实时追踪货物状态，直到安全送达目的地。"
                    : "Track your shipment in real-time until it safely reaches its destination.",
        },
    ];
</script>

<section class="py-24 bg-[#3b82f6] text-white font-['Sarabun']">
    <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-2 gap-12 mb-16 items-start">
            <h2 class="text-4xl md:text-5xl font-bold leading-tight">
                {$currentLang === "zh"
                    ? "我们的服务流程"
                    : "Our Service Process"} <br />
                <span class="text-[#EFC743]"
                    >{$currentLang === "zh"
                        ? "简单 & 便捷"
                        : "Simple & Efficient"}</span
                >
            </h2>
            <p class="text-white/80 leading-relaxed max-w-lg">
                {$currentLang === "zh"
                    ? "我们优化了每一个操作环节，为您提供无忧的物流体验。只需遵循以下简单步骤，即可开启全球货运之旅。"
                    : "We have optimized every operational step to provide a hassle-free logistics experience. Just follow these simple steps to start your shipping."}
            </p>
        </div>

        <div class="grid md:grid-cols-4 gap-8 relative">
            <!-- Connecting Line (Desktop) -->
            <div
                class="hidden md:block absolute top-[28px] left-0 w-full h-[1px] bg-white/20 -z-10"
            ></div>

            {#each steps as step}
                <div class="relative group">
                    <!-- Number Circle -->
                    <div
                        class="w-14 h-14 bg-white text-[#3b82f6] rounded-full flex items-center justify-center font-bold text-xl mb-6 z-10 relative group-hover:scale-110 transition-transform duration-300 shadow-lg"
                    >
                        {step.num}
                    </div>

                    <h3 class="text-xl font-bold mb-3 pr-4">{step.title}</h3>
                    <p class="text-sm text-white/70 leading-relaxed">
                        {step.desc}
                    </p>
                </div>
            {/each}
        </div>
    </div>
</section>
