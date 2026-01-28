<script lang="ts">
    import { currentLang } from "$lib/i18n";
    import { FileText, Calculator, CheckCircle, MapPin } from "lucide-svelte";

    const steps = [
        {
            number: "01",
            icon: FileText,
            zh: {
                title: "填写报价表单",
                description: "提供货物详情和目的地信息",
            },
            en: {
                title: "Fill Quote Form",
                description: "Provide cargo details and destination",
            },
        },
        {
            number: "02",
            icon: Calculator,
            zh: {
                title: "获取即时报价",
                description: "系统自动计算最优运费方案",
            },
            en: {
                title: "Get Instant Quote",
                description: "System calculates optimal shipping solution",
            },
        },
        {
            number: "03",
            icon: CheckCircle,
            zh: { title: "确认并发货", description: "确认订单并安排取件发货" },
            en: {
                title: "Confirm & Ship",
                description: "Confirm order and arrange pickup",
            },
        },
        {
            number: "04",
            icon: MapPin,
            zh: { title: "实时追踪", description: "全程跟踪货物运输状态" },
            en: {
                title: "Real-time Tracking",
                description: "Track your shipment status",
            },
        },
    ];
</script>

<section class="py-24 bg-slate-50 relative overflow-hidden">
    <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>

    <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-16">
            <span
                class="text-primary-600 font-semibold tracking-wider uppercase text-sm"
            >
                {$currentLang === "zh" ? "工作流程" : "Our Process"}
            </span>
            <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
                {$currentLang === "zh" ? "我们的运输流程" : "How We Work"}
            </h2>
            <p class="text-slate-600 max-w-2xl mx-auto">
                {$currentLang === "zh"
                    ? "简单四步,轻松完成国际物流"
                    : "Four simple steps to complete international logistics"}
            </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {#each steps as step, i}
                {@const content = $currentLang === "zh" ? step.zh : step.en}
                <div
                    class="relative group animate-fade-in-up"
                    style="animation-delay: {i * 100}ms"
                >
                    {#if i < steps.length - 1}
                        <div
                            class="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary-200 to-transparent"
                        ></div>
                    {/if}

                    <div
                        class="relative bg-white rounded-2xl p-8 border border-slate-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 h-full"
                    >
                        <div
                            class="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-primary-500/30"
                        >
                            {step.number}
                        </div>

                        <div
                            class="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                        >
                            <svelte:component
                                this={step.icon}
                                class="w-7 h-7 text-primary-600"
                            />
                        </div>

                        <h3 class="text-xl font-bold text-slate-900 mb-3">
                            {content.title}
                        </h3>
                        <p class="text-slate-600 leading-relaxed">
                            {content.description}
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
