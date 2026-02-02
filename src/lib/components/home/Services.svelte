<script lang="ts">
    import { Ship, Plane, Truck, Package } from "lucide-svelte";

    const services = [
        {
            title: "海运整柜/拼箱",
            enTitle: "Ocean Freight",
            icon: Ship,
            desc: "经济实惠，美西15天达，美东30天。大宗货物首选，节省40%+成本，覆盖全美主要港口。",
        },
        {
            title: "国际快递/空运",
            enTitle: "Air Freight",
            icon: Plane,
            desc: "DHL/FedEx/UPS一级代理，3-7天全美达。全程实时追踪，一站式双清，时效稳定。",
        },
        {
            title: "美国本土派送",
            enTitle: "Road Freight",
            icon: Truck,
            desc: "自有卡车车队，全美覆盖。专业处理大件家具，提供末端派送及预约入户服务。",
        },
        {
            title: "一件代发/海外仓",
            enTitle: "Dropshipping",
            icon: Package,
            desc: "自营海外仓配方案，极速响应。智能库存管理，专业售后处理，助力跨境电商。",
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
                    核心服务 (Our Services)
                </h2>
                <h3
                    class="text-3xl md:text-5xl font-bold leading-tight text-[#0f172a]"
                >
                    为您提供安全 & <br /> 可靠的物流服务
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

                    <!-- Arrow Button -->
                    <!-- <a
                        href="#details"
                        class="inline-flex items-center justify-center w-10 h-10 border border-gray-200 rounded-full group-hover:bg-[#0f172a] group-hover:text-white group-hover:border-[#0f172a] transition-all"
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
                    </a> -->
                </div>
            {/each}
        </div>
    </div>
</section>
