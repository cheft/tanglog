<script lang="ts">
    import { onMount } from "svelte";
    import { currentLang } from "$lib/i18n";
    import { Users, Package, Star, Calendar } from "lucide-svelte";

    let mounted = false;
    let counts = $state({
        clients: 0,
        delivery: 0,
        rating: 0,
        years: 0,
    });

    onMount(() => {
        mounted = true;
        // Animate counters
        animateCounter("clients", 5000, 2000);
        animateCounter("delivery", 99, 2000);
        animateCounter("rating", 4.9, 2000);
        animateCounter("years", 10, 2000);
    });

    function animateCounter(
        key: keyof typeof counts,
        target: number,
        duration: number,
    ) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counts[key] = target;
                clearInterval(timer);
            } else {
                counts[key] = Math.floor(current * 10) / 10;
            }
        }, 16);
    }

    let stats = $derived([
        {
            icon: Users,
            value:
                counts.clients >= 1000
                    ? `${Math.floor(counts.clients / 1000)}K+`
                    : counts.clients.toString(),
            label: $currentLang === "zh" ? "满意客户" : "Happy Clients",
            color: "primary",
        },
        {
            icon: Package,
            value: `${counts.delivery}%`,
            label: $currentLang === "zh" ? "准时送达率" : "On-Time Delivery",
            color: "accent",
        },
        {
            icon: Star,
            value: counts.rating.toFixed(1),
            label: $currentLang === "zh" ? "客户评分" : "Customer Rating",
            color: "secondary",
        },
        {
            icon: Calendar,
            value: `${counts.years}+`,
            label: $currentLang === "zh" ? "年行业经验" : "Years Experience",
            color: "primary",
        },
    ]);
</script>

<section
    class="py-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden"
>
    <!-- Background decoration -->
    <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]"></div>

    <div class="container mx-auto px-6 relative z-10">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            {#each stats as stat, i}
                <div
                    class="text-center animate-fade-in-up"
                    style="animation-delay: {i * 100}ms"
                >
                    <div
                        class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-{stat.color}-100 to-{stat.color}-200 mb-4 shadow-lg shadow-{stat.color}-200/50"
                    >
                        <svelte:component
                            this={stat.icon}
                            class="w-8 h-8 text-{stat.color}-600"
                        />
                    </div>
                    <div
                        class="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight"
                    >
                        {stat.value}
                    </div>
                    <div
                        class="text-sm md:text-base text-slate-600 font-medium"
                    >
                        {stat.label}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
