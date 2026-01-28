<script lang="ts">
  import { t, currentLang } from "$lib/i18n";
  import SEOHead from "$lib/components/SEOHead.svelte";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { Calendar, ArrowRight, Share2 } from "lucide-svelte";
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

<main class="pt-32 pb-24 bg-gradient-to-b from-slate-50 to-white min-h-screen">
  <div class="container mx-auto px-6">
    <div class="text-center mb-16">
      <span
        class="text-primary-600 font-semibold tracking-wider uppercase text-sm"
        >{$t.blog.label}</span
      >
      <h1 class="text-4xl md:text-6xl font-black text-slate-900 mt-2 mb-4">
        {$t.blog.title}
      </h1>
      <p class="text-slate-600 max-w-2xl mx-auto text-lg">
        {$t.blog.description}
      </p>
    </div>

    {#if displayPosts.length > 0}
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each displayPosts as post, i}
          <article
            class="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:translate-y-[-8px] transition-all duration-500 group flex flex-col h-full"
            style="animation-delay: {i * 100}ms"
          >
            {#if post.image}
              <div class="aspect-[16/10] relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>

                <!-- Category badge -->
                <div class="absolute top-4 left-4">
                  <span
                    class="px-4 py-1.5 bg-primary-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg"
                  >
                    {$currentLang === "zh" ? "物流" : "LOGISTICS"}
                  </span>
                </div>
              </div>
            {/if}

            <div class="p-6 flex flex-col flex-grow">
              <div
                class="flex items-center text-sm text-slate-500 mb-4 space-x-3"
              >
                <div class="flex items-center">
                  <Calendar class="w-4 h-4 mr-2 text-primary-500" />
                  <span>{post.date}</span>
                </div>
                {#if post.author}
                  <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span>{post.author}</span>
                {/if}
              </div>

              <h2
                class="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight"
              >
                <a
                  href="{$currentLang === 'zh' ? '/zh' : ''}/blog/{post.slug}"
                  class="focus:outline-none"
                >
                  {post.title}
                </a>
              </h2>

              <p
                class="text-slate-600 mb-6 line-clamp-3 flex-grow leading-relaxed"
              >
                {post.description}
              </p>

              <div
                class="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto"
              >
                <a
                  href="{$currentLang === 'zh' ? '/zh' : ''}/blog/{post.slug}"
                  class="flex items-center text-primary-600 font-semibold hover:text-primary-700 group/link"
                >
                  {$currentLang === "zh" ? "阅读更多" : "Read More"}
                  <ArrowRight
                    class="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform"
                  />
                </a>

                <button
                  class="text-slate-400 hover:text-primary-600 transition-colors p-2 rounded-full hover:bg-primary-50"
                  title={$t.blog.share}
                >
                  <Share2 class="w-4 h-4" />
                </button>
              </div>
            </div>
          </article>
        {/each}
      </div>
    {:else}
      <div class="text-center py-24 text-slate-500">
        <p class="text-lg">No posts found.</p>
      </div>
    {/if}
  </div>
</main>

<Footer />
