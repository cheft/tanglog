import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const { pathname } = event.url;

    // List of top-level paths that should be localized
    const rootPaths = ['/tracking', '/zip', '/blog'];

    // Check if the request is for the root or one of the top-level paths without a lang prefix
    const isRoot = pathname === '/';
    const isUnderivable = rootPaths.some(p => pathname === p || pathname.startsWith(p + '/'));
    const isEnOrZh = pathname.startsWith('/zh') || pathname.startsWith('/en');

    if ((isRoot || isUnderivable) && !isEnOrZh) {
        const langHeader = event.request.headers.get('accept-language') || 'en';

        // Detection logic: China, HK, TW usually send zh-CN, zh-HK, zh-TW
        // If it starts with 'zh', we default to 'zh'.
        const isChinese = langHeader.toLowerCase().split(',')[0].startsWith('zh');
        const detectedLang = isChinese ? 'zh' : 'en';

        // Redirect to the localized version
        const newPath = `/${detectedLang}${pathname === '/' ? '' : pathname}`;
        throw redirect(307, newPath);
    }

    const response = await resolve(event);
    return response;
};
