import { getPosts } from "$lib/utils/posts";

export async function GET() {
  const posts = await getPosts();
  const site = "https://www.loflog.com";

  // These are the core static pages we know exist or will exist
  const pages = [
    { url: "/", changefreq: "weekly", priority: 1.0 },
    { url: "/tracking", changefreq: "daily", priority: 0.9 },
    { url: "/shipping-calculator", changefreq: "weekly", priority: 0.9 },
    { url: "/zip", changefreq: "weekly", priority: 0.8 },
    { url: "/blog", changefreq: "daily", priority: 0.8 },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${pages
      .map(
        (page) => `
  <url>
    <loc>${site}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${site}${page.url}" />
    <xhtml:link rel="alternate" hreflang="zh" href="${site}/zh${page.url === "/" ? "" : page.url
          }" />
  </url>
  <url>
    <loc>${site}/zh${page.url === "/" ? "" : page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${site}${page.url}" />
    <xhtml:link rel="alternate" hreflang="zh" href="${site}/zh${page.url === "/" ? "" : page.url
          }" />
  </url>`
      )
      .join("")}
  ${posts
      .map(
        (post) => `
  <url>
    <loc>${site}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${site}/blog/${post.slug}" />
    <xhtml:link rel="alternate" hreflang="zh" href="${site}/zh/blog/${post.slug}" />
  </url>
  <url>
    <loc>${site}/zh/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${site}/blog/${post.slug}" />
    <xhtml:link rel="alternate" hreflang="zh" href="${site}/zh/blog/${post.slug}" />
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
