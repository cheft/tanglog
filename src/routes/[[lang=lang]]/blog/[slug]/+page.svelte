<script lang="ts">
  import { page } from "$app/stores";
  import { t, currentLang } from "$lib/i18n";
  let activePrefix = $derived($page.params.lang ? `/${$page.params.lang}` : "");
  import SEOHead from "$lib/components/SEOHead.svelte";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/home/Footer.svelte";
  import { Calendar, ArrowLeft, Clock, User, Share2 } from "lucide-svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  // Reactive Selection using Svelte 5 runes
  let activePost = $derived(
    ($currentLang === "zh" ? data.post.zh : data.post.en) ||
      ($currentLang === "zh" ? data.post.en : data.post.zh),
  );

  let activeHtml = $derived(
    ($currentLang === "zh" ? data.htmlContent.zh : data.htmlContent.en) ||
      ($currentLang === "zh" ? data.htmlContent.en : data.htmlContent.zh),
  );

  // Calculate read time (approximate)
  let readTime = $derived(
    activePost
      ? Math.max(1, Math.ceil((activePost.content || "").length / 500))
      : 1,
  );
  // Breadcrumb schema for SEO
  let breadcrumbSchema = $derived({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: $t.nav.home,
        item: "https://www.tanglog.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: $t.blog.title,
        item: `https://www.tanglog.com${$currentLang === "zh" ? "/zh" : ""}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: activePost?.title || "",
        item: `https://www.tanglog.com${$currentLang === "zh" ? "/zh" : ""}/blog/${data.post.slug}`,
      },
    ],
  });

  // Process recent posts for display
  let displayRecentPosts = $derived(
    data.recentPosts
      .map((post) => {
        const content =
          ($currentLang === "zh" ? post.zh : post.en) ||
          ($currentLang === "zh" ? post.en : post.zh);
        return content ? { ...content, slug: post.slug } : null;
      })
      .filter((p) => p !== null),
  );
</script>

<SEOHead
  title={activePost ? activePost.title + " - " + $t.companyName : ""}
  description={activePost?.description}
  keywords={activePost?.keywords}
  articleSchema={activePost
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: activePost.title,
        description: activePost.description,
        image: activePost.image
          ? [`https://www.tanglog.com${activePost.image}`]
          : [],
        datePublished: activePost.date,
        author: [
          {
            "@type": "Person",
            name: activePost.author || "Tanglog Team",
            url: "https://www.tanglog.com",
          },
        ],
      }
    : null}
  {breadcrumbSchema}
/>

{#if activePost}
  <Header />

  <main class="bg-white min-h-screen">
    <!-- Hero Section -->
    <section class="bg-black pt-40 pb-24 px-6 text-center">
      <div class="container mx-auto">
        <div class="max-w-4xl mx-auto">
          <a
            href="{activePrefix}/blog"
            class="inline-flex items-center text-[#EFC743] hover:text-white transition-colors mb-8 group text-sm font-medium"
          >
            <ArrowLeft
              class="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
            />
            {$t.blog.backToBlog}
          </a>

          <h1
            class="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-8 tracking-tight"
          >
            {activePost.title}
          </h1>

          <p
            class="text-xl md:text-2xl text-white/70 leading-relaxed mb-12 font-normal"
          >
            {activePost.description}
          </p>

          <!-- Author / Meta Block -->
          <div
            class="flex flex-col md:flex-row items-center justify-center border-t border-white/10 py-8 gap-6"
          >
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/40"
              >
                <User class="w-6 h-6" />
              </div>
              <div class="text-left">
                <div class="font-bold text-white text-base">
                  {activePost.author || "Tanglog Team"}
                </div>
                <div class="text-white/50 text-sm flex items-center space-x-2">
                  <span>{activePost.date}</span>
                  <span>·</span>
                  <span>{readTime} min read</span>
                </div>
              </div>
            </div>

            <div
              class="flex items-center space-x-2 text-white/40 border-l border-white/10 pl-6 h-10 hidden md:flex"
            >
              <button
                class="p-2 hover:text-white transition-colors rounded-full hover:bg-white/5"
              >
                <Share2 class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Article Container -->
    <article class="container mx-auto px-6 max-w-4xl py-12">
      <!-- Article Header Removed as it's now in Hero -->

      <!-- Featured Image -->
      {#if activePost.image}
        <figure class="mb-16">
          <img
            src={activePost.image}
            alt={activePost.title}
            class="w-full h-auto shadow-lg rounded-2xl"
          />
        </figure>
      {/if}

      <!-- Article Content -->
      <div
        class="prose prose-lg prose-slate
        prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
        prose-p:text-slate-700 prose-p:leading-[1.8]
        prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
        prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-slate-50 prose-blockquote:py-4 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg
        prose-img:rounded-xl prose-img:shadow-md
        max-w-none"
      >
        {@html activeHtml}
      </div>

      <!-- Recent Posts Section (SEO Booster) -->
      {#if displayRecentPosts.length > 0}
        <div class="mt-24 pt-16 border-t border-slate-100">
          <h3 class="text-2xl font-bold text-slate-900 mb-8">
            {$t.blog.recentHistory || "最新文章"}
          </h3>
          <div class="grid md:grid-cols-3 gap-8">
            {#each displayRecentPosts as post}
              <a href="{activePrefix}/blog/{post.slug}" class="group block">
                {#if post.image}
                  <div class="aspect-video rounded-xl overflow-hidden mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                {/if}
                <h4
                  class="font-bold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2"
                >
                  {post.title}
                </h4>
                <div class="text-xs text-slate-400">{post.date}</div>
              </a>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Article Footer -->
      <div class="mt-16 pt-8 border-t border-slate-100">
        <div class="flex justify-between items-center">
          <div class="text-slate-500 text-sm">
            Posted in <span class="text-slate-900 font-medium">Logistics</span>
          </div>
        </div>
      </div>
    </article>
  </main>

  <Footer />
{:else}
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-slate-500">Loading...</div>
  </div>
{/if}
