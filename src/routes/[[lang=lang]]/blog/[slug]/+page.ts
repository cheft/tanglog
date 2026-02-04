import { getPosts } from '$lib/utils/posts';
import type { EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = async () => {
    const posts = await getPosts();
    const slugs = posts.map((post) => post.slug);

    const results = [];
    for (const lang of [undefined, 'zh', 'en', 'cn']) {
        for (const slug of slugs) {
            results.push({ lang, slug });
        }
    }

    return results;
};
