<script lang="ts">
    const testimonials = [
        {
            name: "Robert Fox",
            role: "Founder, Kreo",
            text: "Quick & reliable service! The tracking system is very accurate and the customer support is always there to help.",
            img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
        },
        {
            name: "Esther Howard",
            role: "Manager, Orix",
            text: "I have been using Outraze for 2 years now. They handle our delicate shipments with care. Highly recommended!",
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
        },
    ];
</script>

<section class="py-24 bg-white text-black font-['Sarabun']">
    <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
                <h2
                    class="text-xs font-bold uppercase tracking-widest text-[#FFCC00] mb-4"
                >
                    Testimonials
                </h2>
                <h3 class="text-4xl md:text-5xl font-bold leading-tight">
                    Our clients say <br /> about us
                </h3>
            </div>
            <!-- Simple Nav Buttons -->
            <div class="flex space-x-4 mt-6 md:mt-0">
                <button
                    class="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                >
                    &larr;
                </button>
                <button
                    class="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#FFCC00] hover:text-black transition-colors"
                >
                    &rarr;
                </button>
            </div>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
            {#each testimonials as item}
                <div
                    class="bg-gray-50 p-10 rounded-xl relative hover:bg-gray-100 transition-colors"
                >
                    <!-- Quote Icon -->
                    <div
                        class="text-[#FFCC00] text-6xl opacity-20 font-serif absolute top-6 right-8"
                    >
                        "
                    </div>

                    <p
                        class="text-lg md:text-xl font-medium leading-relaxed mb-8 relative z-10"
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
