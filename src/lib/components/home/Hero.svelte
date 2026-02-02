<script lang="ts">
    import { Motion, useAnimation } from "svelte-motion";
    import { onMount } from "svelte";
    // import logo from "$lib/../static/tanglog.png"; // Assuming alias works, or use absolute path if needed.
    // Actually in SvelteKit static assets are typically referenced as root strings like '/tanglog.png' if in static.
    // Let's use the string path.
    const logoPath = "/tanglog.png";

    // Placeholder for the truck image - keeping the high quality one but it might not match perfectly.
    // Ideally we'd use a more "blue" or neutral truck.
    const truckImage =
        "https://images.unsplash.com/photo-1586191582114-e91c366e4483?q=80&w=2670&auto=format&fit=crop";
</script>

<section
    class="relative w-full min-h-screen bg-black text-white overflow-hidden font-['Sarabun'] pt-40 pb-24"
>
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
        <img
            src="/bg.png"
            alt="Logistics Background"
            class="w-full h-full object-cover opacity-60"
        />
        <div
            class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"
        ></div>
    </div>

    <!-- Navigation / Header -->

    <!-- Hero Content -->
    <div
        class="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center"
    >
        <!-- Main Heading -->
        <div class="max-w-4xl">
            <h1
                class="text-5xl md:text-7xl leading-[1.1] font-bold tracking-tight mb-8"
            >
                中美跨境物流专家 <br />
                <span class="text-[#EFC743]">棠洛出马 驰骋洛杉矶</span>
            </h1>

            <p
                class="text-white/70 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
            >
                专注中美跨境物流服务，提供全方位的国际快递、空运、海运服务。<br
                />
                自营海外仓一件代发，为您的跨境生意保驾护航。
            </p>

            <!-- Track Order Bar -->
            <div
                class="max-w-xl bg-white/10 backdrop-blur-md p-2 rounded-full flex items-center border border-white/20"
            >
                <div class="pl-6 pr-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 text-[#EFC743]"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="输入运单号查询 (Track Order)"
                    class="bg-transparent border-none outline-none text-white placeholder-white/30 flex-1 h-12 text-lg focus:ring-0"
                />
                <button
                    class="bg-[#EFC743] text-black font-bold py-3 px-8 rounded-full hover:bg-white transition-colors cursor-pointer"
                >
                    立即查询
                </button>
            </div>
        </div>

        <!-- Truck Image Overlay -->
        <!-- <div
            class="absolute right-[-10%] bottom-10 w-[60%] md:w-[50%] z-[-1] opacity-60 md:opacity-90 pointer-events-none"
        >
            <img
                src={truckImage}
                alt="Logistics Truck"
                class="object-contain w-full h-full grayscale hover:grayscale-0 transition-all duration-700 pointer-events-none"
                style="mask-image: linear-gradient(to bottom, black 50%, transparent 100%);"
            />
        </div> -->

        <!-- Scroll Down Indicator -->
        <div
            class="absolute bottom-10 left-6 flex items-center space-x-4 cursor-pointer"
        >
            <div
                class="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center animate-bounce text-[#EFC743]"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-5 h-5"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                    />
                </svg>
            </div>
            <span
                class="text-sm font-medium tracking-widest uppercase text-white/50"
                >向下滚动 (Scroll)</span
            >
        </div>
    </div>
</section>
