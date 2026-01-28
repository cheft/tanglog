<script lang="ts">
    import { onMount } from "svelte";
    import { currentLang } from "$lib/i18n";
    import { Quote } from "lucide-svelte";

    let currentIndex = $state(0);
    let autoplayInterval: number;

    const testimonials = [
        {
            zh: {
                text: "我与多家物流供应商合作过,但棠洛国际物流脱颖而出。他们的团队总是准时、专业且沟通良好。",
                author: "张先生",
                company: "进出口贸易公司",
            },
            en: {
                text: "I've worked with several logistics providers, but Tanglog stands out. Their team is always on time, professional, and communicative.",
                author: "Mr. Zhang",
                company: "Import/Export Trading Co.",
            },
        },
        {
            zh: {
                text: "棠洛的服务质量和价格都非常优秀,已经合作3年了,非常满意。",
                author: "李女士",
                company: "电商企业",
            },
            en: {
                text: "Tanglog's service quality and pricing are excellent. We've been working together for 3 years and are very satisfied.",
                author: "Ms. Li",
                company: "E-commerce Business",
            },
        },
        {
            zh: {
                text: "专业、高效、可靠!强烈推荐给需要中美物流服务的朋友。",
                author: "王总",
                company: "制造业",
            },
            en: {
                text: "Professional, efficient, reliable! Highly recommend to anyone needing China-US logistics services.",
                author: "Mr. Wang",
                company: "Manufacturing",
            },
        },
    ];

    onMount(() => {
        autoplayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
        }, 5000);

        return () => clearInterval(autoplayInterval);
    });

    function goToSlide(index: number) {
        currentIndex = index;
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
        }, 5000);
    }

    let current = $derived(
        $currentLang === "zh"
            ? testimonials[currentIndex].zh
            : testimonials[currentIndex].en,
    );
</script>

<section class="py-24 bg-white relative overflow-hidden">
    <div
        class="absolute top-0 right-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl"
    ></div>
    <div
        class="absolute bottom-0 left-0 w-96 h-96 bg-secondary-100/30 rounded-full blur-3xl"
    ></div>

    <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-16">
            <span
                class="text-primary-600 font-semibold tracking-wider uppercase text-sm"
            >
                {$currentLang === "zh" ? "客户评价" : "Testimonials"}
            </span>
            <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
                {$currentLang === "zh" ? "客户反馈" : "What Our Clients Say"}
            </h2>
            <p class="text-slate-600 max-w-2xl mx-auto">
                {$currentLang === "zh"
                    ? "听听我们的客户怎么说"
                    : "Hear from our satisfied customers"}
            </p>
        </div>

        <div class="max-w-4xl mx-auto">
            <div
                class="relative bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100"
            >
                <div
                    class="absolute top-8 left-8 w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center opacity-50"
                >
                    <Quote class="w-8 h-8 text-primary-600" />
                </div>

                <div class="relative z-10 pt-12">
                    <div class="animate-fade-in-up" key={currentIndex}>
                        <div class="flex justify-center mb-6">
                            {#each Array(5) as _}
                                <svg
                                    class="w-6 h-6 text-primary-500 fill-current"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                                    />
                                </svg>
                            {/each}
                        </div>

                        <blockquote
                            class="text-xl md:text-2xl text-slate-700 text-center mb-8 leading-relaxed font-medium"
                        >
                            "{current.text}"
                        </blockquote>

                        <div class="text-center">
                            <div class="font-bold text-slate-900 text-lg">
                                {current.author}
                            </div>
                            <div class="text-slate-500">{current.company}</div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-center gap-2 mt-8">
                    {#each testimonials as _, i}
                        <button
                            onclick={() => goToSlide(i)}
                            class="w-3 h-3 rounded-full transition-all duration-300 {i ===
                            currentIndex
                                ? 'bg-primary-600 w-8'
                                : 'bg-slate-300 hover:bg-slate-400'}"
                            aria-label="Go to testimonial {i + 1}"
                        ></button>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</section>
