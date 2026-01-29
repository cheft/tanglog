<script lang="ts">
    const steps = [
        {
            num: "01",
            title: "Enter your product details",
            desc: "Start by entering your cargo details in our quote form.",
        },
        {
            num: "02",
            title: "Pay the service charges",
            desc: "Choose your preferred payment method and complete the transaction.",
        },
        {
            num: "03",
            title: "Ready to send product",
            desc: "Our team will pick up your cargo or you can drop it off.",
        },
        {
            num: "04",
            title: "Product successfully delivered",
            desc: "Track your shipment until it reaches the destination safely.",
        },
    ];
</script>

<section class="py-24 bg-[#FFCC00] text-black font-['Sarabun']">
    <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-2 gap-12 mb-16 items-start">
            <h2 class="text-4xl md:text-5xl font-bold leading-tight">
                Our working process is <br /> simple & easy
            </h2>
            <p class="text-black/80 leading-relaxed max-w-lg">
                We have streamlined our operations to ensure a hassle-free
                experience for our clients. Just follow these simple steps to
                get your cargo moving.
            </p>
        </div>

        <div class="grid md:grid-cols-4 gap-8 relative">
            <!-- Connecting Line (Desktop) -->
            <div
                class="hidden md:block absolute top-[28px] left-0 w-full h-[1px] bg-black/20 -z-10"
            ></div>

            {#each steps as step}
                <div class="relative group">
                    <!-- Number Circle -->
                    <div
                        class="w-14 h-14 bg-black text-[#FFCC00] rounded-full flex items-center justify-center font-bold text-xl mb-6 z-10 relative group-hover:scale-110 transition-transform duration-300"
                    >
                        {step.num}
                    </div>

                    <h3 class="text-xl font-bold mb-3 pr-4">{step.title}</h3>
                    <p class="text-sm text-black/70 leading-relaxed">
                        {step.desc}
                    </p>
                </div>
            {/each}
        </div>
    </div>
</section>
