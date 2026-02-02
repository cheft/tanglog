<script lang="ts">
    import { t } from "$lib/i18n";
    import { ChevronLeft, ChevronRight, Quote } from "lucide-svelte";
    import { fly, fade } from "svelte/transition";
    import { onMount } from "svelte";

    let currentIndex = 0;
    $: items = $t.testimonials.items;

    function next() {
        currentIndex = (currentIndex + 1) % items.length;
    }

    function prev() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
    }

    // Auto-slide every 8 seconds
    let interval: any;
    onMount(() => {
        interval = setInterval(next, 8000);
        return () => clearInterval(interval);
    });

    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(next, 8000);
    }
</script>

<section
    class="py-24 bg-slate-50 text-[#0f172a] font-['Sarabun'] overflow-hidden"
>
    <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-end mb-16">
            <div class="max-w-xl">
                <h2
                    class="text-xs font-bold uppercase tracking-widest text-[#3b82f6] mb-4"
                >
                    {$t.testimonials.label}
                </h2>
                <h3 class="text-3xl md:text-5xl font-bold leading-tight">
                    {$t.testimonials.title}
                </h3>
            </div>
            <!-- Nav Buttons -->
            <div class="flex space-x-4 mt-8 md:mt-0">
                <button
                    on:click={() => {
                        prev();
                        resetInterval();
                    }}
                    class="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#0f172a] hover:text-white transition-all duration-300 group shadow-sm bg-white"
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft
                        class="w-6 h-6 group-hover:-translate-x-1 transition-transform"
                    />
                </button>
                <button
                    on:click={() => {
                        next();
                        resetInterval();
                    }}
                    class="w-14 h-14 rounded-full bg-[#0f172a] text-white flex items-center justify-center hover:bg-[#3b82f6] transition-all duration-300 group shadow-lg shadow-[#0f172a]/20"
                    aria-label="Next testimonial"
                >
                    <ChevronRight
                        class="w-6 h-6 group-hover:translate-x-1 transition-transform"
                    />
                </button>
            </div>
        </div>

        <div class="relative min-h-[400px] md:min-h-[300px]">
            {#key currentIndex}
                <div
                    in:fly={{ x: 100, duration: 600, opacity: 0 }}
                    out:fly={{ x: -100, duration: 600, opacity: 0 }}
                    class="absolute inset-0 grid lg:grid-cols-5 gap-12 items-center"
                >
                    <!-- Left: Large Image Profile -->
                    <div class="lg:col-span-2 relative">
                        <div
                            class="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative group"
                        >
                            <img
                                src={items[currentIndex].img}
                                alt={items[currentIndex].name}
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                            ></div>
                            <div class="absolute bottom-8 left-8 text-white">
                                <h4 class="text-2xl font-bold mb-1">
                                    {items[currentIndex].name}
                                </h4>
                                <p
                                    class="text-white/80 text-sm uppercase tracking-widest"
                                >
                                    {items[currentIndex].role}
                                </p>
                            </div>
                        </div>

                        <!-- Decorative Quote Icon -->
                        <div
                            class="absolute -top-6 -left-6 w-20 h-20 bg-[#3b82f6] rounded-2xl flex items-center justify-center shadow-xl shadow-[#3b82f6]/30 animate-bounce-slow"
                        >
                            <Quote class="w-10 h-10 text-white fill-white/20" />
                        </div>
                    </div>

                    <!-- Right: Content -->
                    <div
                        class="lg:col-span-3 flex flex-col justify-center space-y-8"
                    >
                        <div class="flex space-x-1">
                            {#each Array(5) as _}
                                <svg
                                    class="w-5 h-5 text-yellow-400 fill-current"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-1.103 1.821-1.902 1.103l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.799.718-2.202-.182-1.902-1.103l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                    />
                                </svg>
                            {/each}
                        </div>

                        <p
                            class="text-2xl md:text-3xl lg:text-4xl font-semibold italic leading-tight text-gray-800"
                        >
                            "{items[currentIndex].text}"
                        </p>

                        <div class="h-1 w-20 bg-[#3b82f6] rounded-full"></div>

                        <!-- Pagination dots -->
                        <div class="flex space-x-3 pt-4">
                            {#each items as _, i}
                                <button
                                    on:click={() => {
                                        currentIndex = i;
                                        resetInterval();
                                    }}
                                    class="h-2 transition-all duration-300 rounded-full {i ===
                                    currentIndex
                                        ? 'w-10 bg-[#3b82f6]'
                                        : 'w-2 bg-gray-300 hover:bg-gray-400'}"
                                    aria-label="Go to testimonial {i + 1}"
                                ></button>
                            {/each}
                        </div>
                    </div>
                </div>
            {/key}
        </div>
    </div>
</section>

<style>
    @keyframes bounce-slow {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    .animate-bounce-slow {
        animation: bounce-slow 4s infinite ease-in-out;
    }
</style>
