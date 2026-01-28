<script lang="ts">
    import { currentLang } from "$lib/i18n";
    import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-svelte";

    let scrollContainer: HTMLElement;

    const services = [
        {
            zh: {
                title: "海运服务",
                description: "全球覆盖，可靠的海运解决方案",
                icon: "🚢",
            },
            en: {
                title: "Sea Freight",
                description: "Global reach, reliable sea freight solutions",
                icon: "🚢",
            },
        },
        {
            zh: {
                title: "空运服务",
                description: "快速运输高价值物品",
                icon: "✈️",
            },
            en: {
                title: "Air Freight",
                description: "Move high-value items swiftly with air freight",
                icon: "✈️",
            },
        },
        {
            zh: {
                title: "陆运服务",
                description: "全国快速陆运服务",
                icon: "🚛",
            },
            en: {
                title: "Road Freight",
                description: "Ship quickly nationwide with road freight",
                icon: "🚛",
            },
        },
        {
            zh: {
                title: "仓储服务",
                description: "安全可靠的仓储管理",
                icon: "📦",
            },
            en: {
                title: "Warehouse",
                description: "Secure and reliable warehouse management",
                icon: "📦",
            },
        },
    ];

    function scroll(direction: "left" | "right") {
        if (!scrollContainer) return;
        const scrollAmount = scrollContainer.offsetWidth * 0.8;
        scrollContainer.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    }

    let langPrefix = $derived($currentLang === "zh" ? "/zh" : "");
</script>

<section class="py-24 bg-white relative overflow-hidden">
    <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>

    <div class="container mx-auto px-6 relative z-10">
        <!-- Header -->
        <div class="text-center mb-16">
            <span
                class="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-4 block"
            >
                {$currentLang === "zh" ? "我们的服务" : "our services"}
            </span>
            <h2 class="text-4xl md:text-6xl font-black text-slate-900 mb-6">
                {$currentLang === "zh"
                    ? "高效驱动，信任赋能"
                    : "Driven by efficiency, powered by trust."}
            </h2>
        </div>

        <!-- Carousel Container -->
        <div class="relative">
            <!-- Navigation Buttons -->
            <button
                onclick={() => scroll("left")}
                class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all hover:scale-110"
                aria-label="Previous"
            >
                <ChevronLeft class="w-6 h-6" />
            </button>

            <button
                onclick={() => scroll("right")}
                class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all hover:scale-110"
                aria-label="Next"
            >
                <ChevronRight class="w-6 h-6" />
            </button>

            <!-- Scrollable Container -->
            <div
                bind:this={scrollContainer}
                class="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4"
                style="scroll-padding: 0 24px;"
            >
                {#each services as service, i}
                    {@const content =
                        $currentLang === "zh" ? service.zh : service.en}
                    <div
                        class="flex-none w-[85%] md:w-[45%] lg:w-[30%] snap-start"
                    >
                        <div
                            class="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 border border-slate-100 hover:border-primary-200 hover:shadow-2xl transition-all duration-500 group h-full flex flex-col"
                        >
                            <!-- Icon -->
                            <div
                                class="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300"
                            >
                                {service.zh.icon}
                            </div>

                            <!-- Content -->
                            <h3
                                class="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors"
                            >
                                {content.title}
                            </h3>
                            <p
                                class="text-slate-600 mb-6 flex-grow leading-relaxed"
                            >
                                {content.description}
                            </p>

                            <!-- CTA -->
                            <a
                                href="{langPrefix}/shipping-calculator"
                                class="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 group/link"
                            >
                                {$currentLang === "zh"
                                    ? "立即咨询"
                                    : "Visit now"}
                                <ArrowRight
                                    class="w-5 h-5 ml-2 group-hover/link:translate-x-1 transition-transform"
                                />
                            </a>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<style>
    .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    .hide-scrollbar::-webkit-scrollbar {
        display: none;
    }
</style>
