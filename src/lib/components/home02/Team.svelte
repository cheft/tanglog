<script lang="ts">
    const team = [
        {
            name: "Edward Norton",
            role: "运营总监 (Director)",
            img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=60",
        },
        {
            name: "Jane Cooper",
            role: "海运经理 (Sea Freight)",
            img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60",
        },
        {
            name: "Guy Hawkins",
            role: "技术支持 (Tech Lead)",
            img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60",
        },
        {
            name: "Jerome Bell",
            role: "客户经理 (Sales)",
            img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=60",
        },
    ];
</script>

<section class="py-24 bg-white text-[#0f172a] font-['Sarabun']">
    <div class="container mx-auto px-6">
        <div class="text-center max-w-2xl mx-auto mb-16">
            <h2
                class="text-xs font-bold uppercase tracking-widest text-[#3b82f6] mb-4"
            >
                专业团队 (Our Team)
            </h2>
            <h3 class="text-3xl md:text-5xl font-bold leading-tight mb-6">
                遇见我们的 <br /> 专家团队
            </h3>
            <p class="text-gray-500">
                我们拥有一支经验丰富的专业团队，时刻准备着为您解决物流难题。
            </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {#each team as member}
                <div class="group relative overflow-hidden rounded-xl">
                    <img
                        src={member.img}
                        alt={member.name}
                        class="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />

                    <!-- Hover Overlay -->
                    <div
                        class="absolute inset-0 bg-[#0f172a]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
                    >
                        <h4 class="text-white text-xl font-bold">
                            {member.name}
                        </h4>
                        <p
                            class="text-[#3b82f6] text-sm uppercase tracking-wider"
                        >
                            {member.role}
                        </p>
                        <div class="flex space-x-3 mt-4">
                            <!-- Social Icons Placeholder -->
                            <div
                                class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#3b82f6] hover:text-white transition-colors cursor-pointer"
                            >
                                <span class="text-xs">We</span>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
