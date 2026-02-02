<script lang="ts">
    import { t } from "$lib/i18n";
    import { ChevronLeft, ChevronRight, Quote } from "lucide-svelte";
    import { fly } from "svelte/transition";

    let currentIndex = 0;
    $: items = $t.testimonials.items;
    $: visibleItems = [
        items[currentIndex % items.length],
        items[(currentIndex + 1) % items.length],
    ];

    function next() {
        currentIndex = (currentIndex + 2) % items.length;
    }

    function prev() {
        currentIndex = (currentIndex - 2 + items.length) % items.length;
    }

    // Helper to check if image failed to load
    let imageErrors: Record<string, boolean> = {};

    function handleImageError(name: string) {
        imageErrors[name] = true;
    }

    const placeholderColors = [
        "bg-blue-500",
        "bg-purple-500",
        "bg-emerald-500",
        "bg-orange-500",
        "bg-rose-500",
        "bg-amber-500",
    ];
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
                    on:click={prev}
                    class="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#0f172a] hover:text-white transition-all duration-300 group shadow-sm bg-white"
                    aria-label="Previous testimonials"
                >
                    <ChevronLeft
                        class="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                    />
                </button>
                <button
                    on:click={next}
                    class="w-12 h-12 rounded-full bg-[#0f172a] text-white flex items-center justify-center hover:bg-[#3b82f6] transition-all duration-300 group shadow-lg shadow-[#0f172a]/20"
                    aria-label="Next testimonials"
                >
                    <ChevronRight
                        class="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    />
                </button>
            </div>
        </div>

        <div class="grid md:grid-cols-2 gap-8 relative min-h-[350px]">
            {#key currentIndex}
                {#each visibleItems as item, i}
                    <div
                        in:fly={{
                            x: 30,
                            duration: 600,
                            delay: i * 100,
                            opacity: 0,
                        }}
                        class="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                    >
                        <!-- Quote Icon -->
                        <Quote
                            class="absolute top-8 right-8 w-10 h-10 text-[#3b82f6]/10"
                        />

                        <div>
                            <div class="flex space-x-1 mb-6">
                                {#each Array(5) as _}
                                    <svg
                                        class="w-4 h-4 text-yellow-400 fill-current"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-1.103 1.821-1.902 1.103l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.799.718-2.202-.182-1.902-1.103l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        />
                                    </svg>
                                {/each}
                            </div>

                            <p
                                class="text-base md:text-lg text-gray-700 leading-relaxed italic mb-8"
                            >
                                "{item.text}"
                            </p>
                        </div>

                        <div class="flex items-center space-x-4">
                            <div
                                class="w-12 h-12 rounded-full overflow-hidden border-2 border-[#3b82f6]/10 flex-shrink-0"
                            >
                                {#if item.img && !imageErrors[item.name]}
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        class="w-full h-full object-cover"
                                        on:error={() =>
                                            handleImageError(item.name)}
                                    />
                                {:else}
                                    <div
                                        class="w-full h-full flex items-center justify-center text-white font-bold text-lg {placeholderColors[
                                            items.indexOf(item) %
                                                placeholderColors.length
                                        ]}"
                                    >
                                        {item.name.charAt(0)}
                                    </div>
                                {/if}
                            </div>
                            <div>
                                <h4
                                    class="font-bold text-[#0f172a] text-sm md:text-base"
                                >
                                    {item.name}
                                </h4>
                                <p
                                    class="text-[10px] text-gray-400 uppercase tracking-widest"
                                >
                                    {item.role}
                                </p>
                            </div>
                        </div>
                    </div>
                {/each}
            {/key}
        </div>

        <!-- Pagination dots -->
        <div class="flex justify-center space-x-3 mt-12">
            {#each Array(Math.ceil(items.length / 2)) as _, i}
                <button
                    on:click={() => {
                        currentIndex = i * 2;
                    }}
                    class="h-1 transition-all duration-300 rounded-full {Math.floor(
                        currentIndex / 2,
                    ) === i
                        ? 'w-10 bg-[#3b82f6]'
                        : 'w-2 bg-gray-300 hover:bg-gray-400'}"
                    aria-label="Go to page {i + 1}"
                ></button>
            {/each}
        </div>
    </div>
</section>
