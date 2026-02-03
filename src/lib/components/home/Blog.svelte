<script lang="ts">
    import { page } from "$app/stores";
    import { t, currentLang } from "$lib/i18n";

    $: activePrefix = $page.params.lang ? `/${$page.params.lang}` : "";
    import { ArrowRight } from "lucide-svelte";

    // In a real app, these might come from data.
    // This component seems to use hardcoded posts for the landing page.
    const posts = [
        {
            date: "25 Dec, 2023",
            title: "新增中美特快专线",
            titleEn: "New China-US Express Line",
            desc: "为了满足日益增长的跨境电商需求，我们新开通了中美特快空运专线，时效提升至3天。",
            descEn: "To meet the growing demand, we launched a new express air line, reducing delivery time to 3 days.",
            img: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=600&auto=format&fit=crop&q=60",
            slug: "new-express-line",
        },
        {
            date: "20 Dec, 2023",
            title: "绿色物流可持续发展",
            titleEn: "Green Logistics Sustainability",
            desc: "棠洛国际致力于推行绿色物流，通过优化路线和包装减少碳排放。",
            descEn: "Tanglog is committed to green logistics, reducing carbon emissions through route and packaging optimization.",
            img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=60",
            slug: "green-logistics",
        },
        {
            date: "15 Dec, 2023",
            title: "洛杉矶海外仓扩建完工",
            titleEn: "LA Overseas Warehouse Expansion",
            desc: "我们位于洛杉矶的全新智能化仓库已正式投入使用，仓储能力提升200%。",
            descEn: "Our new smart warehouse in Los Angeles is now operational, increasing capacity by 200%.",
            img: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=60",
            slug: "la-warehouse-expansion",
        },
    ];
</script>

<section id="blog" class="py-24 bg-slate-50 text-[#0f172a] font-['Sarabun']">
    <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
                <h2
                    class="text-xs font-bold uppercase tracking-widest text-[#3b82f6] mb-4"
                >
                    {$t.blog.label}
                </h2>
                <h3 class="text-3xl md:text-5xl font-bold leading-tight">
                    {$t.blog.title}
                </h3>
            </div>
            <a
                href="{activePrefix}/blog"
                class="mt-6 md:mt-0 px-8 py-3 bg-white border border-[#0f172a] rounded-full font-bold hover:bg-[#0f172a] hover:text-white transition-colors"
            >
                {$t.blog.moreBlogs}
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
                            alt={$currentLang === "zh"
                                ? post.title
                                : post.titleEn}
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div
                            class="absolute top-4 left-4 bg-[#3b82f6] text-white text-xs font-bold px-3 py-1 rounded"
                        >
                            {post.date}
                        </div>
                    </div>
                    <div class="p-8">
                        <h4
                            class="text-xl font-bold mb-4 group-hover:text-[#3b82f6] transition-colors"
                        >
                            {$currentLang === "zh" ? post.title : post.titleEn}
                        </h4>
                        <p class="text-gray-500 mb-6 line-clamp-2">
                            {$currentLang === "zh" ? post.desc : post.descEn}
                        </p>
                        <a
                            href="{activePrefix}/blog/{post.slug}"
                            class="inline-flex items-center text-sm font-bold border-b border-[#0f172a] pb-1 hover:text-[#3b82f6] hover:border-[#3b82f6] transition-colors"
                        >
                            {$t.blog.readMore}
                            <ArrowRight class="w-4 h-4 ml-2" />
                        </a>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
