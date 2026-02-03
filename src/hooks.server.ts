import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const { pathname } = event.url;

    // List of top-level paths that should be localized (for matching purposes if needed)
    const rootPaths = ['/tracking', '/zip', '/blog'];

    // Detect language from URL param if available (though hooks handle before param is parsed by kit usually)
    // Actually, we'll check the prefix manually for locals
    const isZh = pathname.startsWith('/zh');
    const isEn = pathname.startsWith('/en');

    let detectedLang: 'zh' | 'en' = 'en';

    if (isZh) {
        detectedLang = 'zh';
    } else if (isEn) {
        detectedLang = 'en';
    } else {
        // Transparent detection for root paths
        const langHeader = event.request.headers.get('accept-language') || 'en';
        const isChinese = langHeader.toLowerCase().split(',')[0].startsWith('zh');
        detectedLang = isChinese ? 'zh' : 'en';
    }

    event.locals.lang = detectedLang;

    const response = await resolve(event);
    return response;
};
