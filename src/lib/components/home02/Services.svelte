<script lang="ts">
    import { Ship, Plane, Truck, Train } from "lucide-svelte";

    const services = [
        {
            title: "Sea Freight",
            icon: Ship,
            desc: "Efficient and cost-effective sea freight solutions for large volume cargo globally.",
        },
        {
            title: "Air Freight",
            icon: Plane,
            desc: "Fast and reliable air freight services for time-sensitive shipments worldwide.",
        },
        {
            title: "Road Freight",
            icon: Truck,
            desc: "Flexible road transport network connecting major cities and remote locations.",
        },
        {
            title: "Rail Freight",
            icon: Train,
            desc: "Eco-friendly and secure rail transport options for bulk goods across continents.",
        },
    ];
</script>

<section id="services" class="py-24 bg-gray-50 font-['Sarabun']">
    <div class="container mx-auto px-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-end mb-16">
            <div class="max-w-xl">
                <h2
                    class="text-xs font-bold uppercase tracking-widest text-[#FFCC00] mb-4"
                >
                    Our Services
                </h2>
                <h3 class="text-4xl md:text-5xl font-bold leading-tight">
                    We Provide Safe & <br /> Reliable Services
                </h3>
            </div>
            <div class="mt-6 md:mt-0">
                <button
                    class="bg-white border border-black px-8 py-3 rounded-full font-bold hover:bg-black hover:text-white transition-colors"
                >
                    View All Services
                </button>
            </div>
        </div>

        <!-- Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {#each services as service}
                <div
                    class="group bg-white p-8 rounded-xl border border-transparent hover:border-black/5 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                    <!-- Icon Circle -->
                    <div
                        class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#FFCC00] transition-colors duration-300"
                    >
                        <svelte:component
                            this={service.icon}
                            class="w-8 h-8 text-black"
                        />
                    </div>

                    <h4 class="text-xl font-bold mb-4">{service.title}</h4>
                    <p class="text-gray-500 text-sm leading-relaxed mb-6">
                        {service.desc}
                    </p>

                    <!-- Arrow Button -->
                    <a
                        href="#details"
                        class="inline-flex items-center justify-center w-10 h-10 border border-gray-200 rounded-full group-hover:bg-black group-hover:text-white group-hover:border-black transition-all"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </a>
                </div>
            {/each}
        </div>
    </div>
</section>
