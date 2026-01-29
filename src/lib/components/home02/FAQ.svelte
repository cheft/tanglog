<script lang="ts">
    import { slide } from "svelte/transition";

    const faqs = [
        {
            q: "How can I track my shipment?",
            a: "You can track your shipment by entering your tracking ID in the hero section or using our dedicated tracking page.",
        },
        {
            q: "What are your shipping rates?",
            a: "Our rates depend on the weight, dimensions, and destination of your cargo. Use our calculator for an estimate.",
        },
        {
            q: "Do you offer insurance?",
            a: "Yes, we offer comprehensive insurance coverage for all types of shipments to ensure peace of mind.",
        },
        {
            q: "How long does delivery take?",
            a: "Delivery times vary by service. Air freight takes 3-5 days, while sea freight can take 2-4 weeks.",
        },
    ];

    let openIndex = 0;

    function toggle(index: number) {
        openIndex = openIndex === index ? -1 : index;
    }
</script>

<section class="py-24 bg-white text-black font-['Sarabun']">
    <div class="container mx-auto px-6 grid md:grid-cols-2 gap-16">
        <!-- Left: Image -->
        <div class="relative h-[600px] rounded-2xl overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1613689493169-2f74ae44a03e?w=800&auto=format&fit=crop&q=60"
                alt="FAQ Worker"
                class="object-cover w-full h-full"
            />
            <!-- Overlay Box -->
            <div
                class="absolute bottom-8 left-8 right-8 bg-[#FFCC00] p-6 rounded-lg"
            >
                <div class="text-xs font-bold uppercase tracking-widest mb-2">
                    Have Question?
                </div>
                <div class="text-2xl font-bold mb-4">+1 (00) 123 456 789</div>
                <p class="text-sm">
                    Call us anytime for assistance with your shipping needs.
                </p>
            </div>
        </div>

        <!-- Right: Accordion -->
        <div class="flex flex-col justify-center">
            <h2
                class="text-xs font-bold uppercase tracking-widest text-[#FFCC00] mb-4"
            >
                FAQ
            </h2>
            <h3 class="text-4xl md:text-5xl font-bold leading-tight mb-8">
                Frequently Asked <br /> Questions
            </h3>

            <div class="space-y-4">
                {#each faqs as faq, i}
                    <div class="border-b border-gray-200 pb-4">
                        <button
                            class="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                            on:click={() => toggle(i)}
                        >
                            <span
                                class="text-xl font-bold {openIndex === i
                                    ? 'text-[#FFCC00]'
                                    : 'text-black'} transition-colors"
                                >{faq.q}</span
                            >
                            <span
                                class="text-2xl font-light {openIndex === i
                                    ? 'text-[#FFCC00] rotate-45'
                                    : 'text-gray-400'} transition-transform duration-300"
                                >+</span
                            >
                        </button>
                        {#if openIndex === i}
                            <div
                                transition:slide
                                class="text-gray-600 leading-relaxed pb-4"
                            >
                                {faq.a}
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>
