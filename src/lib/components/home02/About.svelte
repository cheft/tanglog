<script lang="ts">
    // Simple stats data
    const stats = [
        { label: "Delivered Packages", value: "5K+", sub: "Successfully" },
        { label: "Satisfied Clients", value: "99+", sub: "Happy Clients" },
        { label: "Support Available", value: "24/7", sub: "Online Support" },
    ];
</script>

<section class="py-24 bg-white text-black font-['Sarabun']">
    <div class="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <!-- Left: Content -->
        <div>
            <h2
                class="text-xs font-bold uppercase tracking-widest text-[#FFCC00] mb-4"
            >
                About Company
            </h2>
            <h3 class="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Safe, Reliable & <br /> Express Logistics
            </h3>
            <p class="text-gray-600 mb-6 leading-relaxed">
                We provide the best logistic service for your business. We have
                a professional team to handle your package carefully and deliver
                it on time. With our global network, we can reach any
                destination you need.
            </p>

            <div class="flex items-center space-x-4">
                <a
                    href="#about"
                    class="inline-flex items-center text-sm font-bold border-b-2 border-black pb-1 hover:text-[#FFCC00] hover:border-[#FFCC00] transition-colors"
                >
                    Learn More About Us
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
                    class="bg-gray-50 p-8 rounded-lg text-center hover:bg-[#FFCC00] transition-colors duration-300 group cursor-default"
                >
                    <h4 class="text-4xl font-bold mb-2 group-hover:text-black">
                        {stat.value}
                    </h4>
                    <div
                        class="text-xs text-gray-400 uppercase tracking-wider group-hover:text-black/70 mb-1"
                    >
                        {stat.sub}
                    </div>
                    <div class="font-semibold">{stat.label}</div>
                </div>
            {/each}
            <!-- Experience Box -->
            <div
                class="bg-black text-white p-8 rounded-lg flex flex-col justify-center items-center text-center"
            >
                <span class="text-5xl font-bold text-[#FFCC00] mb-2">25</span>
                <span class="text-sm font-medium uppercase tracking-wider"
                    >Years of <br /> Experience</span
                >
            </div>
        </div>
    </div>
</section>
