<script lang="ts">
    const steps = [
        {
            num: "01",
            title: "输入货物详情",
            desc: "在系统中输入您的货物重量、尺寸和目的地信息。",
        },
        {
            num: "02",
            title: "支付运费",
            desc: "选择您偏好的支付方式（支付宝/微信/银行转账）并完成支付。",
        },
        {
            num: "03",
            title: "安排发货",
            desc: "我们将安排上门取件或您可以送至指定仓库，开始运输。",
        },
        {
            num: "04",
            title: "成功送达",
            desc: "全程实时追踪货物状态，直到安全送达目的地。",
        },
    ];
</script>

<section class="py-24 bg-[#3b82f6] text-white font-['Sarabun']">
    <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-2 gap-12 mb-16 items-start">
            <h2 class="text-4xl md:text-5xl font-bold leading-tight">
                我们的服务流程 <br /> 简单 & 便捷
            </h2>
            <p class="text-white/80 leading-relaxed max-w-lg">
                我们优化了每一个操作环节，确为您提供无忧的物流体验。只需遵循以下简单步骤，即可开启全球货运之旅。
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
