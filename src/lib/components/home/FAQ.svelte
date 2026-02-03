<script lang="ts">
    import { slide } from "svelte/transition";
    import { t, currentLang } from "$lib/i18n";
    import { Plus, Minus, PhoneCall } from "lucide-svelte";

    let openIndex = 0;

    function toggle(index: number) {
        openIndex = openIndex === index ? -1 : index;
    }
</script>

<section id="faq" class="py-24 bg-white text-[#0f172a] font-['Sarabun']">
    <div class="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left: Image with Stats Overlay -->
        <div
            class="relative h-[700px] rounded-[2.5rem] overflow-hidden group shadow-2xl"
        >
            <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop"
                alt="Logistics Operations"
                class="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
            />

            <!-- Floating Contact Card -->
            <div
                class="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 text-white shadow-2xl"
            >
                <div class="flex items-center space-x-4 mb-4">
                    <div
                        class="w-12 h-12 bg-[#3b82f6] rounded-2xl flex items-center justify-center animate-pulse"
                    >
                        <PhoneCall class="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <div
                            class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60"
                        >
                            {$currentLang === "zh"
                                ? "24/7 服务热线"
                                : "24/7 Support Line"}
                        </div>
                        <div class="text-2xl font-bold tracking-tight">
                            (+86) 133 1646 3314
                        </div>
                    </div>
                </div>
                <p class="text-sm text-white/70 leading-relaxed">
                    {$currentLang === "zh"
                        ? "我们的物流专家团队随时准备回答您的问题，确保快速响应。"
                        : "Our team of logistic experts are ready to answer your questions any time. Swift response guaranteed."}
                </p>
            </div>

            <!-- Top Status Badge -->
            <div
                class="absolute top-10 left-10 flex items-center space-x-2 bg-[#0f172a]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
            >
                <div
                    class="w-2 h-2 bg-green-500 rounded-full animate-ping"
                ></div>
                <span
                    class="text-[10px] font-bold uppercase tracking-widest text-white"
                    >{$currentLang === "zh"
                        ? "在线客服活动中"
                        : "Live Support Active"}</span
                >
            </div>
        </div>

        <!-- Right: Accordion -->
        <div class="flex flex-col">
            <div class="mb-12">
                <h2
                    class="text-xs font-bold uppercase tracking-widest text-[#3b82f6] mb-4"
                >
                    {$t.faq.label}
                </h2>
                <h3
                    class="text-4xl md:text-5xl font-bold leading-[1.1] mb-6 tracking-tight"
                >
                    {$t.faq.title}
                </h3>
            </div>

            <div class="space-y-4">
                {#each $t.faq.items as faq, i}
                    <div class="group">
                        <button
                            class="w-full flex justify-between items-center p-6 text-left focus:outline-none transition-all duration-300 rounded-2xl border {openIndex ===
                            i
                                ? 'bg-[#0f172a] border-[#0f172a] shadow-xl shadow-[#0f172a]/20'
                                : 'bg-slate-50 border-gray-100 hover:border-[#3b82f6]'}"
                            on:click={() => toggle(i)}
                        >
                            <span
                                class="text-lg font-bold transition-colors duration-300 {openIndex ===
                                i
                                    ? 'text-white'
                                    : 'text-[#0f172a] group-hover:text-[#3b82f6]'}"
                                >{faq.q}</span
                            >
                            <div class="flex-shrink-0 ml-4">
                                {#if openIndex === i}
                                    <Minus class="w-5 h-5 text-[#EFC743]" />
                                {:else}
                                    <Plus
                                        class="w-5 h-5 text-gray-400 group-hover:text-[#3b82f6]"
                                    />
                                {/if}
                            </div>
                        </button>

                        {#if openIndex === i}
                            <div
                                transition:slide={{ duration: 300, axis: "y" }}
                                class="overflow-hidden"
                            >
                                <div
                                    class="px-8 py-6 text-gray-600 leading-relaxed border-l-2 border-[#EFC743] ml-6 mt-2"
                                >
                                    {faq.a}
                                </div>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>
