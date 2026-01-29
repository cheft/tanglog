<script lang="ts">
    const posts = [
        {
            date: "25 Dec, 2023",
            title: "New Shipping Routes Added",
            desc: "We have expanded our shipping routes to cover more destinations in Europe and Asia.",
            img: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=600&auto=format&fit=crop&q=60",
        },
        {
            date: "20 Dec, 2023",
            title: "Sustainable Logistics Solutions",
            desc: "Learn how we are implementing green logistics to reduce our carbon footprint.",
            img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=60",
        },
        {
            date: "15 Dec, 2023",
            title: "Warehouse Expansion Plans",
            desc: "Our new state-of-the-art warehouse facility is set to open next month.",
            img: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=60",
        },
    ];
</script>

<section class="py-24 bg-gray-50 text-black font-['Sarabun']">
    <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
                <h2
                    class="text-xs font-bold uppercase tracking-widest text-[#FFCC00] mb-4"
                >
                    Our Blog
                </h2>
                <h3 class="text-4xl md:text-5xl font-bold leading-tight">
                    Latest News & <br /> Updates
                </h3>
            </div>
            <a
                href="#blog"
                class="mt-6 md:mt-0 px-8 py-3 bg-white border border-black rounded-full font-bold hover:bg-black hover:text-white transition-colors"
            >
                View All News
            </a>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
            {#each posts as post}
                <div
                    class="group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                    <div class="relative h-60 overflow-hidden">
                        <img
                            src={post.img}
                            alt={post.title}
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div
                            class="absolute top-4 left-4 bg-[#FFCC00] text-black text-xs font-bold px-3 py-1 rounded"
                        >
                            {post.date}
                        </div>
                    </div>
                    <div class="p-8">
                        <h4
                            class="text-xl font-bold mb-4 group-hover:text-[#FFCC00] transition-colors"
                        >
                            {post.title}
                        </h4>
                        <p class="text-gray-500 mb-6 line-clamp-2">
                            {post.desc}
                        </p>
                        <a
                            href="#read"
                            class="inline-flex items-center text-sm font-bold border-b border-black pb-1 hover:text-[#FFCC00] hover:border-[#FFCC00] transition-colors"
                        >
                            Read More
                        </a>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
