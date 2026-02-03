import { getPosts } from "$lib/utils/posts";

export async function GET() {
  const posts = await getPosts();
  const site = "https://www.tanglog.com";

  // These are the core static pages we know exist
  const corePaths = ["", "/tracking", "/zip", "/blog"];
  const langs = ["zh", "en"];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${corePaths
      .flatMap((path) =>
        langs.map((lang) => ({
          url: `/${lang}${path}`,
          lang,
          path,
          priority: path === "" ? 1.0 : 0.8,
        }))
      )
      .map(
        (item) => `
  <url>
    <loc>${site}${item.url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${item.priority}</priority>
    <xhtml:link rel="alternate" hreflang="zh" href="${site}/zh${item.path}" />
    <xhtml:link rel="alternate" hreflang="en" href="${site}/en${item.path}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${site}/zh${item.path}" />
  </url>`
      )
      .join("")}
  ${posts
      .flatMap((post) =>
        langs.map((lang) => ({
          url: `/${lang}/blog/${post.slug}`,
          lang,
          slug: post.slug,
          date: post.date,
        }))
      )
      .map(
        (item) => `
  <url>
    <loc>${site}${item.url}</loc>
    <lastmod>${item.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="zh" href="${site}/zh/blog/${item.slug}" />
    <xhtml:link rel="alternate" hreflang="en" href="${site}/en/blog/${item.slug}" />
  </url>`
      )
      .join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=0, s-maxage=3600",
    },
  });
}
