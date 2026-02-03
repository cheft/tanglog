<script lang="ts">
  import { page } from "$app/stores";
  import { t, currentLang } from "$lib/i18n";
  let activePrefix = $derived($page.params.lang ? `/${$page.params.lang}` : "");
  import SEOHead from "$lib/components/SEOHead.svelte";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/home/Footer.svelte";
  import { ArrowRight } from "lucide-svelte";
  import type { PageData } from "./$types";
  import type { PostMetadata } from "$lib/utils/posts";

  let { data }: { data: PageData } = $props();

  // Reactive posts based on current language using Svelte 5 $derived
  let displayPosts = $derived(
    data.posts
      .map((post) => {
        // Try to get content in current language, fallback to other
        const content =
          ($currentLang === "zh" ? post.zh : post.en) ||
          ($currentLang === "zh" ? post.en : post.zh);

        // Return enhanced object with slug
        return content ? { ...content, slug: post.slug } : null;
      })
      .filter((p): p is PostMetadata & { slug: string } => p !== null),
  );
</script>

<SEOHead
  title="{$t.blog.title} - {$t.companyName}"
  description={$t.blog.description}
/>

<Header />

<main class="min-h-screen bg-[#E6E6E6]">
  <!-- Hero Section -->
  <section class="relative bg-black pt-40 pb-24 px-6 overflow-hidden">
    <!-- CSS-based Abstract Background -->
    <div class="absolute inset-0 z-0 bg-[#0B1121]">
      <!-- Subway/Network abstract pattern using radial gradients -->
      <div
        class="absolute inset-0 opacity-10"
        style="background-image: radial-gradient(#64748b 2px, transparent 2px); background-size: 30px 30px;"
      ></div>
      <!-- Blue Glow -->
      <div
        class="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[80px] translate-y-1/4 -translate-x-1/4"
      ></div>
    </div>

    <div class="container mx-auto relative z-10">
      <div class="max-w-4xl">
        <h1
          class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          <span class="text-[#EFC743]">{$t.blog.title}</span> & Feeds
        </h1>
        <p class="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed">
          {$t.blog.description}
        </p>
      </div>
    </div>
  </section>

  <!-- Blog Posts Section -->
  <section class="py-20 px-6">
    <div class="container mx-auto">
      {#if displayPosts.length > 0}
        <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {#each displayPosts as post, i}
            <article
              class="group relative h-[540px] overflow-hidden bg-gray-900 shadow-xl rounded-xl"
              style="animation-delay: {i * 100}ms"
            >
              <a
                href="{activePrefix}/blog/{post.slug}"
                class="block h-full w-full"
              >
                <!-- Background Image -->
                {#if post.image}
                  <img
                    src={post.image}
                    alt={post.title}
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                {/if}

                <!-- Overlay Gradient (for legibility if image is light/missing) -->
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"
                ></div>

                <!-- Glassmorphism Content Box -->
                <div
                  class="absolute bottom-5 left-5 right-5 p-8 backdrop-blur-xl bg-black/40 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 group-hover:bg-black/50"
                >
                  <div class="flex flex-col h-full justify-end">
                    <!-- Meta -->
                    <div class="flex items-center justify-between mb-4">
                      <span
                        class="text-xs font-bold tracking-widest text-white/80 uppercase"
                      >
                        {post.date}
                      </span>
                      <span
                        class="text-xs font-bold tracking-widest text-[#EFC743] uppercase"
                      >
                        {$currentLang === "zh" ? "物流" : "LOGISTICS"}
                      </span>
                    </div>

                    <!-- Title -->
                    <h2
                      class="text-2xl font-bold text-white leading-tight mb-2 line-clamp-2 group-hover:text-[#EFC743] transition-colors"
                    >
                      {post.title}
                    </h2>

                    <!-- Read More Link (Optional visual indicator) -->
                    <div
                      class="text-white/60 text-sm mt-4 flex items-center opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                    >
                      {$currentLang === "zh" ? "阅读更多" : "Read Article"}
                      <ArrowRight class="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </a>
            </article>
          {/each}
        </div>
      {:else}
        <div class="text-center py-24 text-slate-500">
          <p class="text-lg">No posts found.</p>
          {#if data.debugKeys}
            <div
              class="mt-8 p-4 bg-gray-800 text-left text-xs font-mono text-gray-400 overflow-auto max-w-2xl mx-auto rounded"
            >
              <p class="mb-2 font-bold text-white">
                Debug Info (Files detected by glob):
              </p>
              <pre>{JSON.stringify(data.debugKeys, null, 2)}</pre>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </section>
</main>

<Footer />
