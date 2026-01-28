import matter from "gray-matter";

// Metadata for a single post language version
export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  image?: string;
  author?: string;
  keywords?: string;
  content?: string;
}

// Metadata for a post available in multiple languages
export interface BilingualPost {
  slug: string;
  zh?: PostMetadata;
  en?: PostMetadata;
  date: string;
  image?: string;
}

// Use import.meta.glob to eagerly load all markdown files in the posts directory.
// This works in both dev and production (Vercel) as Vite handles the bundling.
const postFiles = import.meta.glob("/src/posts/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

export async function getPosts(): Promise<BilingualPost[]> {
  const postsMap = new Map<string, BilingualPost>();

  const getEntry = (slug: string) => {
    if (!postsMap.has(slug)) {
      postsMap.set(slug, { slug, date: "", image: "" });
    }
    return postsMap.get(slug)!;
  };

  for (const path in postFiles) {
    const filename = path.split("/").at(-1) || "";
    // Match slug.lang.md
    const match = filename.match(/^(.+)\.(zh|en)\.md$/);

    if (match) {
      const [, slug, lang] = match;
      try {
        const content = postFiles[path];
        if (!content) continue;
        const { data } = matter(content);
        const entry = getEntry(slug);

        if (lang === "zh") {
          entry.zh = data as PostMetadata;
          entry.date = entry.date || data.date;
          entry.image = entry.image || data.image;
        } else {
          entry.en = data as PostMetadata;
          entry.date = entry.date || data.date;
          entry.image = entry.image || data.image;
        }
      } catch (e) {
        console.error(`Error parsing post ${path}:`, e);
      }
    }
  }

  return Array.from(postsMap.values())
    .filter((post) => post.zh || post.en) // Only return posts that have at least one valid language
    .sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
}

export async function getPost(slug: string): Promise<BilingualPost | null> {
  const post: BilingualPost = { slug, date: "", image: "" };
  let found = false;

  const zhSuffix = `${slug}.zh.md`;
  const enSuffix = `${slug}.en.md`;

  for (const path in postFiles) {
    if (path.endsWith(zhSuffix)) {
      try {
        const { data, content } = matter(postFiles[path]);
        post.zh = { ...data, content } as PostMetadata;
        post.date = data.date || post.date;
        post.image = data.image || post.image;
        found = true;
      } catch (e) {}
    } else if (path.endsWith(enSuffix)) {
      try {
        const { data, content } = matter(postFiles[path]);
        post.en = { ...data, content } as PostMetadata;
        if (!post.date) post.date = data.date;
        if (!post.image) post.image = data.image;
        found = true;
      } catch (e) {}
    }
  }

  return found ? post : null;
}
