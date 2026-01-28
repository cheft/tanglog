<script lang="ts">
    import { currentLang } from "$lib/i18n";
    import { ArrowRight } from "lucide-svelte";

    const team = [
        {
            zh: { name: "张明", role: "创始人", image: "👨‍💼" },
            en: { name: "Ming Zhang", role: "Founder", image: "👨‍💼" },
        },
        {
            zh: { name: "李华", role: "CEO", image: "👩‍💼" },
            en: { name: "Hua Li", role: "CEO", image: "👩‍💼" },
        },
        {
            zh: { name: "王伟", role: "运营总监", image: "👨‍💻" },
            en: { name: "Wei Wang", role: "Operations Director", image: "👨‍💻" },
        },
        {
            zh: { name: "刘洋", role: "物流专家", image: "👩‍🔧" },
            en: { name: "Yang Liu", role: "Logistics Expert", image: "👩‍🔧" },
        },
    ];

    let langPrefix = $derived($currentLang === "zh" ? "/zh" : "");
</script>

<section class="py-24 bg-slate-50 relative overflow-hidden">
    <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>

    <div class="container mx-auto px-6 relative z-10">
        <!-- Header -->
        <div class="text-center mb-16">
            <span
                class="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-4 block"
            >
                {$currentLang === "zh" ? "关于公司" : "About company"}
            </span>
            <h2 class="text-4xl md:text-6xl font-black text-slate-900 mb-6">
                {$currentLang === "zh"
                    ? "用专业方案优化您的供应链"
                    : "Optimise your supply chain with expert solutions."}
            </h2>
        </div>

        <!-- Team Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {#each team as member, i}
                {@const content = $currentLang === "zh" ? member.zh : member.en}
                <div
                    class="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:translate-y-[-8px] transition-all duration-500 group"
                    style="animation-delay: {i * 100}ms"
                >
                    <!-- Avatar -->
                    <div
                        class="aspect-square bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500"
                    >
                        {member.zh.image}
                    </div>

                    <!-- Info -->
                    <div class="p-6">
                        <div
                            class="text-sm text-primary-600 font-semibold uppercase tracking-wider mb-2"
                        >
                            {content.role}
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 mb-4">
                            {content.name}
                        </h3>
                        <a
                            href="{langPrefix}/shipping-calculator"
                            class="inline-flex items-center text-slate-600 hover:text-primary-600 font-medium group/link transition-colors"
                        >
                            {$currentLang === "zh" ? "了解更多" : "Visit Now"}
                            <ArrowRight
                                class="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform"
                            />
                        </a>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
