<script lang="ts">
    import { page } from "$app/stores";
    import { t, currentLang } from "$lib/i18n";

    $: activePrefix = $page.params.lang ? `/${$page.params.lang}` : "";

    $: stats = [
        {
            label: $t.stats.clients,
            value: "1000+",
            sub: $currentLang === "zh" ? "全球客户" : "Global Clients",
        },
        {
            label: $t.stats.satisfaction,
            value: "99.8%",
            sub: $currentLang === "zh" ? "服务好评" : "Satisfaction",
        },
        {
            label: $t.stats.support,
            value: "24/7",
            sub: $currentLang === "zh" ? "在线支持" : "Online Support",
        },
    ];
</script>

<section id="about" class="py-24 bg-white text-[#0f172a] font-['Sarabun']">
    <div class="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <!-- Left: Content -->
        <div>
            <h2
                class="text-xs font-bold uppercase tracking-widest text-[#3b82f6] mb-4"
            >
                {$t.advantages.label}
            </h2>
            <h3 class="text-3xl md:text-5xl font-bold leading-tight mb-6">
                {$t.advantages.title}
            </h3>
            <p class="text-gray-600 mb-6 leading-relaxed">
                {$t.advantages.description}
            </p>

            <div class="flex items-center space-x-4">
                <a
                    href="{activePrefix}/#contact"
                    class="inline-flex items-center text-sm font-bold border-b-2 border-[#0f172a] pb-1 hover:text-[#3b82f6] hover:border-[#3b82f6] transition-colors"
                >
                    {$currentLang === "zh"
                        ? "了解更多 (Learn More)"
                        : "Learn More"}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </a>
            </div>
        </div>

        <!-- Right: Stats -->
        <div class="grid grid-cols-2 gap-6">
            {#each stats as stat}
                <div
                    class="bg-gray-50 p-8 rounded-lg text-center hover:bg-[#3b82f6] hover:text-white transition-colors duration-300 group cursor-default shadow-sm border border-gray-100"
                >
                    <h4 class="text-4xl font-bold mb-2">{stat.value}</h4>
                    <div
                        class="text-xs text-gray-500 uppercase tracking-wider group-hover:text-white/80 mb-1"
                    >
                        {stat.sub}
                    </div>
                    <div class="font-semibold">{stat.label}</div>
                </div>
            {/each}
            <!-- Experience Box -->
            <div
                class="bg-[#0f172a] text-white p-8 rounded-lg flex flex-col justify-center items-center text-center"
            >
                <span class="text-5xl font-bold text-[#3b82f6] mb-2">3+</span>
                <span class="text-sm font-medium uppercase tracking-wider"
                    >{$t.stats.years}</span
                >
            </div>
        </div>
    </div>
</section>
