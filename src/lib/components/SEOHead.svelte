<script lang="ts">
  import { seoData } from "$lib/seo";

  let {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    canonical,
    author,
    articleSchema,
    breadcrumbSchema,
  } = $props<{
    title?: string;
    description?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    canonical?: string;
    author?: string;
    articleSchema?: any;
    breadcrumbSchema?: any;
  }>();

  import { t } from "$lib/i18n";

  import { page } from "$app/stores";

  // Use provided values or fall back to defaults from seoData
  const finalTitle = $derived(title || $seoData.title);
  const finalDescription = $derived(description || $seoData.description);
  const finalKeywords = $derived(keywords || $seoData.keywords);
  const finalOgTitle = $derived(ogTitle || $seoData.ogTitle);
  const finalOgDescription = $derived(ogDescription || $seoData.ogDescription);
  const finalCanonical = $derived(canonical);
  const finalAuthor = $derived(author || $seoData.author);

  // Hreflang Logic
  let pathNoLang = $derived($page.url.pathname.replace(/^\/zh/, ""));
  let cleanPath = $derived(
    pathNoLang === "" || pathNoLang === "/" ? "" : pathNoLang,
  );

  let enUrl = $derived(`https://www.loflog.com${cleanPath}`);
  let zhUrl = $derived(`https://www.loflog.com/zh${cleanPath}`);
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{finalTitle}</title>
  <meta name="title" content={finalTitle} />
  <meta name="description" content={finalDescription} />
  <meta name="keywords" content={finalKeywords} />
  <meta name="author" content={finalAuthor} />
  <meta name="robots" content="index, follow" />
  <meta name="language" content="Chinese, English" />
  <meta name="revisit-after" content="7 days" />

  <!-- Canonical URL -->
  <link
    rel="canonical"
    href={finalCanonical ||
      ($page.url.pathname.startsWith("/zh") ? zhUrl : enUrl)}
  />

  <!-- Hreflang Tags -->
  <link rel="alternate" hreflang="en" href={enUrl} />
  <link rel="alternate" hreflang="zh" href={zhUrl} />
  <link rel="alternate" hreflang="x-default" href={enUrl} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta
    property="og:url"
    content={finalCanonical ||
      ($page.url.pathname.startsWith("/zh") ? zhUrl : enUrl)}
  />
  <meta property="og:title" content={finalOgTitle} />
  <meta property="og:description" content={finalOgDescription} />
  <meta property="og:image" content="https://www.loflog.com/og-image.jpg" />
  <meta property="og:site_name" content={$t.companyName} />
  <meta
    property="og:locale"
    content={$page.url.pathname.startsWith("/zh") ? "zh_CN" : "en_US"}
  />
  <meta
    property="og:locale:alternate"
    content={$page.url.pathname.startsWith("/zh") ? "en_US" : "zh_CN"}
  />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta
    property="twitter:url"
    content={finalCanonical ||
      ($page.url.pathname.startsWith("/zh") ? zhUrl : enUrl)}
  />
  <meta property="twitter:title" content={finalOgTitle} />
  <meta property="twitter:description" content={finalOgDescription} />
  <meta
    property="twitter:image"
    content="https://www.loflog.com/og-image.jpg"
  />

  <!-- Additional SEO -->
  <meta name="format-detection" content="telephone=no" />
  <meta name="theme-color" content="#294686" />

  {#if articleSchema}
    <script type="application/ld+json">
      {JSON.stringify(articleSchema)}
    </script>
  {/if}

  {#if breadcrumbSchema}
    <script type="application/ld+json">
      {JSON.stringify(breadcrumbSchema)}
    </script>
  {/if}
</svelte:head>
