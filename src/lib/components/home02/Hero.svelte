<script lang="ts">
    // Placeholder for the truck image - using a high quality Unsplash alternative that matches the vibe
    const truckImage =
        "https://images.unsplash.com/photo-1586191582114-e91c366e4483?q=80&w=2670&auto=format&fit=crop";
</script>

<section
    class="relative w-full min-h-screen bg-black text-white overflow-hidden font-['Sarabun']"
>
    <!-- Navigation / Header (Simple version for this clone) -->
    <nav
        class="absolute top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center"
    >
        <div class="text-2xl font-bold tracking-tighter">outraze</div>
        <div class="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#home" class="hover:text-[#FFCC00] transition-colors"
                >Home</a
            >
            <a href="#about" class="hover:text-[#FFCC00] transition-colors"
                >About</a
            >
            <a href="#services" class="hover:text-[#FFCC00] transition-colors"
                >Services</a
            >
            <a href="#pages" class="hover:text-[#FFCC00] transition-colors"
                >Pages</a
            >
            <a href="#contact" class="hover:text-[#FFCC00] transition-colors"
                >Contact</a
            >
        </div>
        <div class="flex items-center space-x-4">
            <span class="text-sm font-semibold hidden md:block"
                >Call Us: (00) 112 365 489</span
            >
            <button
                class="w-10 h-10 bg-[#FFCC00] rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform"
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
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                </svg>
            </button>
        </div>
    </nav>

    <!-- Hero Content -->
    <div
        class="relative z-10 container mx-auto px-6 h-screen flex flex-col justify-center"
    >
        <!-- Main Heading -->
        <div class="max-w-4xl mt-20">
            <h1
                class="text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] font-bold tracking-tight mb-8"
            >
                All about making <br />
                <span class="text-[#FFCC00]">simple moving</span>
            </h1>

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
                        class="w-6 h-6 text-[#FFCC00]"
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
                    placeholder="Track your order"
                    class="bg-transparent border-none outline-none text-white placeholder-gray-300 flex-1 h-12 text-lg focus:ring-0"
                />
                <button
                    class="bg-[#FFCC00] text-black font-bold py-3 px-8 rounded-full hover:bg-white transition-colors cursor-pointer"
                >
                    Track Now
                </button>
            </div>
        </div>

        <!-- Truck Image Overlay -->
        <!-- Positioned absolutely to the right/bottom -->
        <div
            class="absolute right-[-10%] bottom-10 w-[60%] md:w-[50%] z-[-1] opacity-90 pointing-events-none"
        >
            <img
                src={truckImage}
                alt="Logistics Truck"
                class="object-contain w-full h-full grayscale hover:grayscale-0 transition-all duration-700 pointer-events-none"
                style="mask-image: linear-gradient(to bottom, black 50%, transparent 100%);"
            />
        </div>

        <!-- Scroll Down Indicator -->
        <div
            class="absolute bottom-10 left-6 flex items-center space-x-4 cursor-pointer"
        >
            <div
                class="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center animate-bounce"
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
            <span class="text-sm font-medium tracking-widest uppercase"
                >Scroll Down</span
            >
        </div>
    </div>
</section>
