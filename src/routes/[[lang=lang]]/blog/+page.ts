import type { EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
    return [
        { lang: undefined },
        { lang: 'zh' },
        { lang: 'en' },
        { lang: 'cn' }
    ];
};
