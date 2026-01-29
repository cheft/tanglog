<script lang="ts">
    import { slide } from "svelte/transition";

    const faqs = [
        {
            q: "如何追踪我的订单状态？",
            a: "您可以在首页的搜索框中输入运单号，或者登录客户后台系统实时查看。",
        },
        {
            q: "海运和空运的时效大概是多久？",
            a: "美西海运一般15天左右，美东30天左右；空运普货3-5天，特快2-3天。",
        },
        {
            q: "是否提供货物保险服务？",
            a: "是的，我们建议并提供全面的货物运输保险，保障您的货物安全。",
        },
        {
            q: "大件家具可以派送上楼吗？",
            a: "可以的，我们的美国本土卡车团队提供预约送货上门及搬运上楼服务。",
        },
    ];

    let openIndex = 0;

    function toggle(index: number) {
        openIndex = openIndex === index ? -1 : index;
    }
</script>

<section class="py-24 bg-white text-[#0f172a] font-['Sarabun']">
    <div class="container mx-auto px-6 grid md:grid-cols-2 gap-16">
        <!-- Left: Image -->
        <div class="relative h-[600px] rounded-2xl overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1613689493169-2f74ae44a03e?w=800&auto=format&fit=crop&q=60"
                alt="FAQ Worker"
                class="object-cover w-full h-full"
            />
            <!-- Overlay Box -->
            <div
                class="absolute bottom-8 left-8 right-8 bg-[#3b82f6] p-6 rounded-lg text-white"
            >
                <div class="text-xs font-bold uppercase tracking-widest mb-2">
                    有疑问?
                </div>
                <div class="text-2xl font-bold mb-4">(+86) 177 2256 1770</div>
                <p class="text-sm text-blue-100">
                    随时拨打我们的热线电话，我们随时为您服务。
                </p>
            </div>
        </div>

        <!-- Right: Accordion -->
        <div class="flex flex-col justify-center">
            <h2
                class="text-xs font-bold uppercase tracking-widest text-[#3b82f6] mb-4"
            >
                常见问题 (FAQ)
            </h2>
            <h3 class="text-3xl md:text-5xl font-bold leading-tight mb-8">
                关于物流的 <br /> 常见疑问
            </h3>

            <div class="space-y-4">
                {#each faqs as faq, i}
                    <div class="border-b border-gray-100 pb-4">
                        <button
                            class="w-full flex justify-between items-center py-4 text-left focus:outline-none group"
                            on:click={() => toggle(i)}
                        >
                            <span
                                class="text-xl font-bold {openIndex === i
                                    ? 'text-[#3b82f6]'
                                    : 'text-[#0f172a]'} group-hover:text-[#3b82f6] transition-colors"
                                >{faq.q}</span
                            >
                            <span
                                class="text-2xl font-light {openIndex === i
                                    ? 'text-[#3b82f6] rotate-45'
                                    : 'text-gray-300'} transition-transform duration-300"
                                >+</span
                            >
                        </button>
                        {#if openIndex === i}
                            <div
                                transition:slide
                                class="text-gray-500 leading-relaxed pb-4"
                            >
                                {faq.a}
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>
