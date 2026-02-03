<script lang="ts">
    import { Ship, Plane, Truck, Package } from "lucide-svelte";
    import { t, currentLang } from "$lib/i18n";

    $: services = [
        {
            title: $t.services.items[1].title, // Ocean Freight (indexed differently in i18n.ts)
            enTitle: "Ocean Freight",
            icon: Ship,
            desc: $t.services.items[1].description,
        },
        {
            title: $t.services.items[0].title, // International Express
            enTitle: "Air Freight",
            icon: Plane,
            desc: $t.services.items[0].description,
        },
        {
            title: $t.services.items[2].title, // US Domestic
            enTitle: "Road Freight",
            icon: Truck,
            desc: $t.services.items[2].description,
        },
        {
            title: $t.services.items[3].title, // Dropshipping
            enTitle: "Dropshipping",
            icon: Package,
            desc: $t.services.items[3].description,
        },
    ];
</script>

<section id="services" class="py-24 bg-slate-50 font-['Sarabun']">
    <div class="container mx-auto px-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-end mb-16">
            <div class="max-w-xl">
                <h2
                    class="text-xs font-bold uppercase tracking-widest text-[#3b82f6] mb-4"
                >
                    {$t.services.label}
                </h2>
                <h3
                    class="text-3xl md:text-5xl font-bold leading-tight text-[#0f172a]"
                >
                    {$t.services.title}
                </h3>
            </div>
        </div>

        <!-- Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {#each services as service}
                <div
                    class="group bg-white p-8 rounded-xl border border-transparent hover:border-[#3b82f6]/20 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                    <!-- Icon Circle -->
                    <div
                        class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#3b82f6] transition-colors duration-300"
                    >
                        <svelte:component
                            this={service.icon}
                            class="w-8 h-8 text-[#3b82f6] group-hover:text-white transition-colors"
                        />
                    </div>

                    <h4 class="text-xl font-bold mb-1 text-[#0f172a]">
                        {service.title}
                    </h4>
                    <p
                        class="text-xs text-blue-500 font-bold uppercase tracking-wider mb-4"
                    >
                        {service.enTitle}
                    </p>

                    <p class="text-gray-500 text-sm leading-relaxed mb-6">
                        {service.desc}
                    </p>
                </div>
            {/each}
        </div>
    </div>
</section>
