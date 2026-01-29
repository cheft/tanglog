<script lang="ts">
    const testimonials = [
        {
            name: "李先生 (Mr. Li)",
            role: "跨境电商卖家",
            text: "发货速度非常快，客服也很专业。特别是海外仓的一件代发服务，帮我省去了很多库存管理的麻烦。强烈推荐！",
            img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
        },
        {
            name: "Sarah Jenkins",
            role: "Import Manager",
            text: "I've been working with TangLog for 2 years. Their sea freight rates are competitive and goods always arrive on time.",
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
        },
    ];
</script>

<section class="py-24 bg-white text-[#0f172a] font-['Sarabun']">
    <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
                <h2
                    class="text-xs font-bold uppercase tracking-widest text-[#3b82f6] mb-4"
                >
                    客户评价 (Testimonials)
                </h2>
                <h3 class="text-3xl md:text-5xl font-bold leading-tight">
                    客户对我们的 <br /> 真实评价
                </h3>
            </div>
            <!-- Simple Nav Buttons -->
            <div class="flex space-x-4 mt-6 md:mt-0">
                <button
                    class="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#0f172a] hover:text-white transition-colors"
                >
                    &larr;
                </button>
                <button
                    class="w-12 h-12 rounded-full bg-[#0f172a] text-white flex items-center justify-center hover:bg-[#3b82f6] hover:text-white transition-colors"
                >
                    &rarr;
                </button>
            </div>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
            {#each testimonials as item}
                <div
                    class="bg-slate-50 p-10 rounded-xl relative hover:bg-white hover:shadow-lg transition-all border border-gray-100"
                >
                    <!-- Quote Icon -->
                    <div
                        class="text-[#3b82f6] text-6xl opacity-20 font-serif absolute top-6 right-8"
                    >
                        "
                    </div>

                    <p
                        class="text-lg md:text-xl font-medium leading-relaxed mb-8 relative z-10 text-gray-700"
                    >
                        {item.text}
                    </p>

                    <div class="flex items-center space-x-4">
                        <img
                            src={item.img}
                            alt={item.name}
                            class="w-14 h-14 rounded-full object-cover grayscale"
                        />
                        <div>
                            <h4 class="font-bold text-lg">{item.name}</h4>
                            <span
                                class="text-xs text-gray-500 uppercase tracking-widest"
                                >{item.role}</span
                            >
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
