import { getPosts, getPostKeys, type BilingualPost } from "$lib/utils/posts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const posts = await getPosts();

  const debugKeys = getPostKeys();
  const fileEntries = Object.entries(import.meta.glob("/src/posts/*.md", { eager: true, query: "?raw", import: "default" }));
  const debugInfo = fileEntries.map(([path, content]) => ({
    path,
    type: typeof content,
    length: typeof content === 'string' ? content.length : 0,
    preview: typeof content === 'string' ? content.substring(0, 100) : 'N/A'
  }));

  return {
    posts: posts as BilingualPost[],
    debugInfo
  };
};
