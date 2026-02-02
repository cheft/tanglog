<script lang="ts">
    // Simple stats data - adapted from analysis
    const stats = [
        { label: "全球客户", value: "1000+", sub: "Global Clients" },
        { label: "服务满意度", value: "99.8%", sub: "Satisfaction" },
        { label: "在线支持", value: "24/7", sub: "Online Support" },
    ];
</script>

<section id="about" class="py-24 bg-white text-[#0f172a] font-['Sarabun']">
    <div class="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <!-- Left: Content -->
        <div>
            <h2
                class="text-xs font-bold uppercase tracking-widest text-[#3b82f6] mb-4"
            >
                关于我们 (About Us)
            </h2>
            <h3 class="text-3xl md:text-5xl font-bold leading-tight mb-6">
                安全、可靠 & <br /> 高效的跨境物流专家
            </h3>
            <p class="text-gray-600 mb-6 leading-relaxed">
                棠洛国际物流（TangLog）专注中美跨境物流服务，中美双公司认证运营。我们深知每一份托付的重量，致力于为您提供最优质的物流体验。
                无论是国际快递、海运还是海外仓配，我们都能为您提供一站式解决方案。
            </p>

            <div class="flex items-center space-x-4">
                <a
                    href="#about"
                    class="inline-flex items-center text-sm font-bold border-b-2 border-[#0f172a] pb-1 hover:text-[#3b82f6] hover:border-[#3b82f6] transition-colors"
                >
                    了解更多 (Learn More)
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
                    >Years of <br /> Experience</span
                >
            </div>
        </div>
    </div>
</section>
