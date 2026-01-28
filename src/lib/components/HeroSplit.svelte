<script lang="ts">
    import { onMount } from "svelte";
    import { currentLang } from "$lib/i18n";
    import { ArrowRight, Mail, Phone, Building2 } from "lucide-svelte";
    import { Motion, useAnimation } from "svelte-motion";

    let mounted = false;

    onMount(() => {
        mounted = true;
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    let langPrefix = $derived($currentLang === "zh" ? "/zh" : "");
</script>

<section
    class="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-primary-50/30 overflow-hidden"
>
    <!-- Background decoration -->
    <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>

    <div
        class="absolute top-20 right-0 w-[600px] h-[600px] bg-primary-100/20 rounded-full blur-3xl"
    ></div>
    <div
        class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-100/20 rounded-full blur-3xl"
    ></div>

    <div class="container mx-auto px-6 py-20 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <!-- Left Column: Main Content -->
            <Motion
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                let:motion
            >
                <div use:motion class="space-y-8">
                    <Motion variants={itemVariants} let:motion>
                        <div use:motion>
                            <h1
                                class="text-6xl lg:text-8xl font-black text-slate-900 leading-tight mb-6"
                            >
                                {#if $currentLang === "zh"}
                                    <span class="block">简单</span>
                                    <span
                                        class="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600"
                                        >运输</span
                                    >
                                {:else}
                                    <span class="block">simple</span>
                                    <span
                                        class="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600"
                                        >moving</span
                                    >
                                {/if}
                            </h1>
                            <p
                                class="text-xl text-slate-600 leading-relaxed max-w-xl"
                            >
                                {$currentLang === "zh"
                                    ? "运输不仅仅是移动——而是准时交付的信任。"
                                    : "Transport is more than movement — it's trust delivered on time."}
                            </p>
                        </div>
                    </Motion>

                    <Motion variants={itemVariants} let:motion>
                        <div use:motion class="flex flex-wrap gap-4">
                            <a
                                href="{langPrefix}/shipping-calculator"
                                class="px-10 py-5 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold text-lg transition-all shadow-2xl shadow-primary-900/30 flex items-center group transform hover:scale-105"
                            >
                                {$currentLang === "zh"
                                    ? "获取报价"
                                    : "Get Quote"}
                                <ArrowRight
                                    class="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform"
                                />
                            </a>
                            <a
                                href="{langPrefix}/tracking"
                                class="px-10 py-5 rounded-full border-2 border-slate-300 hover:border-primary-500 hover:bg-primary-50 text-slate-700 hover:text-primary-700 font-bold text-lg transition-all"
                            >
                                {$currentLang === "zh"
                                    ? "追踪货物"
                                    : "Track Shipment"}
                            </a>
                        </div>
                    </Motion>
                </div>
            </Motion>

            <!-- Right Column: Contact Card -->
            <Motion variants={itemVariants} let:motion>
                <div
                    use:motion
                    class="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl border border-slate-100 space-y-6"
                >
                    <!-- Email -->
                    <a
                        href="mailto:info@tanglog.com"
                        class="flex items-start gap-4 p-4 rounded-2xl hover:bg-primary-50 transition-colors group"
                    >
                        <div
                            class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform"
                        >
                            <Mail class="w-6 h-6" />
                        </div>
                        <div class="flex-1">
                            <div class="text-sm text-slate-500 mb-1">
                                {$currentLang === "zh"
                                    ? "邮箱地址"
                                    : "Email address"}
                            </div>
                            <div class="font-semibold text-slate-900">
                                info@tanglog.com
                            </div>
                        </div>
                    </a>

                    <!-- Phone -->
                    <a
                        href="tel:+1234567890"
                        class="flex items-start gap-4 p-4 rounded-2xl hover:bg-primary-50 transition-colors group"
                    >
                        <div
                            class="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center text-secondary-600 group-hover:scale-110 transition-transform"
                        >
                            <Phone class="w-6 h-6" />
                        </div>
                        <div class="flex-1">
                            <div class="text-sm text-slate-500 mb-1">
                                {$currentLang === "zh"
                                    ? "电话号码"
                                    : "Phone number"}
                            </div>
                            <div class="font-semibold text-slate-900">
                                +123 456 789 00
                            </div>
                        </div>
                    </a>

                    <!-- About Company -->
                    <div
                        class="flex items-start gap-4 p-4 rounded-2xl bg-slate-50"
                    >
                        <div
                            class="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center text-accent-600"
                        >
                            <Building2 class="w-6 h-6" />
                        </div>
                        <div class="flex-1">
                            <div class="text-sm text-slate-500 mb-2">
                                {$currentLang === "zh"
                                    ? "关于公司"
                                    : "About company"}
                            </div>
                            <p class="text-sm text-slate-600 leading-relaxed">
                                {$currentLang === "zh"
                                    ? "凭借多年的行业经验，我们提供端到端的运输和物流解决方案，满足您的需求。"
                                    : "With years of industry experience, we provide end-to-end transportation and logistics solutions tailored to your needs."}
                            </p>
                        </div>
                    </div>
                </div>
            </Motion>
        </div>
    </div>
</section>
