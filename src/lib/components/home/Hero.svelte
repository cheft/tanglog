<script lang="ts">
    import { Motion } from "svelte-motion";
    import { t, currentLang } from "$lib/i18n";
    import {
        MessageCircle,
        Search,
        ChevronDown,
        CheckCircle2,
    } from "lucide-svelte";
    import { fade, fly } from "svelte/transition";

    let showWeChatModal = false;

    // Stats data derived from About section
    $: stats = [
        { label: $t.stats.clients, value: "1000+", sub: "Global Clients" },
        { label: $t.stats.satisfaction, value: "99.8%", sub: "Satisfaction" },
        { label: $t.stats.support, value: "24/7", sub: "Online Support" },
        {
            label: $currentLang === "zh" ? "年行业经验" : "Years Experience",
            value: "3+",
            sub: "Industry Expert",
        },
    ];

    const toggleWeChat = () => {
        showWeChatModal = !showWeChatModal;
    };
</script>

<section
    class="relative w-full min-h-screen bg-[#0f172a] text-white overflow-hidden font-['Sarabun'] pt-32 pb-20 flex items-center"
>
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
        <img
            src="/bg.png"
            alt="Logistics Background"
            class="w-full h-full object-cover opacity-30 scale-105"
        />
        <div
            class="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/90 to-transparent"
        ></div>
        <div
            class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f172a]"
        ></div>
    </div>

    <div class="relative z-10 container mx-auto px-6 h-full">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
            <!-- Left: Hero Content -->
            <div class="max-w-2xl">
                <div
                    class="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mb-8"
                >
                    <CheckCircle2 class="w-4 h-4 text-[#EFC743]" />
                    <span
                        class="text-xs font-bold uppercase tracking-wider text-white/90"
                    >
                        {$t.hero.badge} | {$currentLang === "zh"
                            ? "中美双公司认证"
                            : "China-US Certified"}
                    </span>
                </div>

                <h1
                    class="text-4xl md:text-6xl lg:text-7xl leading-[1.1] font-bold tracking-tight mb-8"
                >
                    {$t.hero.title_prefix}<br />
                    <span class="text-[#EFC743]">{$t.hero.title_suffix}</span>
                </h1>

                <p
                    class="text-white/70 text-lg md:text-xl mb-12 leading-relaxed"
                >
                    {$t.hero.description}
                    <br class="hidden md:block" />
                    {$currentLang === "zh"
                        ? "我们深知每一份托付的重量，致力于为您提供最优质的一站式物流体验。"
                        : "We understand the weight of every shipment and are committed to providing you with the best one-stop logistics experience."}
                </p>

                <!-- Action Buttons -->
                <div class="flex flex-wrap gap-4">
                    <a
                        href="/tracking"
                        class="inline-flex items-center text-base font-bold bg-[#EFC743] text-[#0f172a] py-4 px-8 rounded-full hover:bg-white transition-all duration-300 shadow-xl shadow-[#EFC743]/10 group"
                    >
                        <Search
                            class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
                        />
                        {$t.hero.cta_secondary}
                    </a>

                    <button
                        on:click={toggleWeChat}
                        class="inline-flex items-center text-base font-bold bg-white/10 backdrop-blur-md text-white border border-white/20 py-4 px-8 rounded-full hover:bg-white hover:text-[#0f172a] transition-all duration-300 group"
                    >
                        <MessageCircle
                            class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
                        />
                        {$t.hero.cta_wechat}
                    </button>
                </div>
            </div>

            <!-- Right: Stats Grid (Merged from About Section) -->
            <div class="grid grid-cols-2 gap-4 md:gap-6 relative">
                <!-- Decorative element -->
                <div
                    class="absolute -top-10 -right-10 w-40 h-40 bg-[#EFC743]/10 blur-[80px] rounded-full"
                ></div>
                <div
                    class="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 blur-[80px] rounded-full"
                ></div>

                {#each stats as stat, i}
                    <div
                        class="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-[#EFC743]/40 transition-all duration-500 group relative overflow-hidden"
                    >
                        <!-- Hover background -->
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-[#EFC743]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                        ></div>

                        <div class="relative z-10">
                            <h4
                                class="text-3xl md:text-4xl font-bold mb-2 text-[#EFC743]"
                            >
                                {stat.value}
                            </h4>
                            <div
                                class="text-[10px] md:text-xs text-white/40 uppercase tracking-widest mb-1 group-hover:text-white/60 transition-colors"
                            >
                                {stat.sub}
                            </div>
                            <div
                                class="font-semibold text-white/90 text-sm md:text-base"
                            >
                                {stat.label}
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <!-- Scroll Down Indicator - Bottom Centered -->
    <div
        class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 cursor-pointer group"
        on:click={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        on:keydown={(e) =>
            e.key === "Enter" &&
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        role="button"
        tabindex="0"
        aria-label={$currentLang === "zh" ? "向下滚动" : "Scroll down"}
    >
        <span
            class="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 group-hover:text-[#EFC743] transition-colors"
        >
            {$currentLang === "zh" ? "向下滚动" : "SCROLL"}
        </span>
        <div
            class="w-px h-12 bg-gradient-to-b from-[#EFC743] to-transparent animate-pulse"
        ></div>
    </div>
</section>

<!-- WeChat QR Modal -->
{#if showWeChatModal}
    <div
        class="fixed inset-0 z-[100] flex items-center justify-center p-6"
        transition:fade={{ duration: 200 }}
    >
        <!-- Overlay -->
        <div
            class="absolute inset-0 bg-black/80 backdrop-blur-sm"
            on:click={toggleWeChat}
            on:keydown={(e) => e.key === "Escape" && toggleWeChat()}
            role="presentation"
        ></div>

        <!-- Modal Content -->
        <div
            class="relative bg-[#1e293b] w-full max-w-sm rounded-3xl p-8 border border-white/10 shadow-2xl"
            transition:fly={{ y: 20, duration: 400 }}
        >
            <button
                on:click={toggleWeChat}
                class="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                aria-label="Close modal"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            <div class="text-center">
                <h3 class="text-2xl font-bold mb-2">{$t.hero.cta_wechat}</h3>
                <p class="text-white/60 text-sm mb-6">
                    {$currentLang === "zh"
                        ? "扫码添加专属客服，获取 1 对 1 咨询服务"
                        : "Scan to add support for 1-on-1 consultation"}
                </p>

                <div class="bg-white p-4 rounded-2xl inline-block mb-6">
                    <!-- Attempt to load wechat.jpg, fallback to placeholder if not found -->
                    <img
                        src="/wechat.jpg"
                        alt="WeChat QR Code"
                        class="w-48 h-48 object-contain"
                        on:error={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                                "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://u.wechat.com/EB_xH_8J8X-x_x";
                        }}
                    />
                </div>

                <div class="text-sm text-[#EFC743] font-medium">
                    ID: 17722561770
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    :global(html) {
        scroll-behavior: smooth;
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 0.3;
            height: 12px;
        }
        50% {
            opacity: 1;
            height: 48px;
        }
    }

    .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
</style>
