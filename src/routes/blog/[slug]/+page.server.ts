import { getPost, getPosts, type BilingualPost } from "$lib/utils/posts";
import { error } from "@sveltejs/kit";
import { marked } from "marked";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const postSource = await getPost(params.slug);

  if (!postSource || (!postSource.zh && !postSource.en)) {
    throw error(404, "Post not found");
  }

  // Fetch recent posts for internal linking (SEO & UX)
  const allPosts = await getPosts();
  const recentPosts = allPosts
    .filter((p) => p.slug !== params.slug)
    .slice(0, 3);

  // Pre-render HTML for available languages
  const htmlContent: { zh?: string; en?: string } = {};

  if (postSource.zh?.content) {
    htmlContent.zh = await marked(postSource.zh.content);
  }

  if (postSource.en?.content) {
    htmlContent.en = await marked(postSource.en.content);
  }

  return {
    post: postSource,
    htmlContent,
    recentPosts: recentPosts as BilingualPost[],
  };
};
