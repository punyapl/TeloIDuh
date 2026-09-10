// shared/lib/analytics/yandexMetrika.ts

const COUNTER_ID = 110358279;
const DISABLE_FLAG_KEY = `disableYaCounter${COUNTER_ID}`;

let isLoaded = false;

const getWindow = () => window as unknown as Record<string, unknown> & {
    ym?: (...args: unknown[]) => void;
};

export const loadYandexMetrika = () => {
    if (isLoaded) return;
    isLoaded = true;

    const w = getWindow();
    w[DISABLE_FLAG_KEY] = false;

    (function (m: any, e: Document, t: string, r: string, i: string) {
        m[i] =
            m[i] ||
            function (...args: unknown[]) {
                (m[i].a = m[i].a || []).push(args);
            };
        m[i].l = 1 * Number(new Date());
        for (let j = 0; j < e.scripts.length; j++) {
            if (e.scripts[j].src === r) return;
        }
        const k = e.createElement(t) as HTMLScriptElement;
        const a = e.getElementsByTagName(t)[0];
        k.async = true;
        k.src = r;
        a.parentNode?.insertBefore(k, a);
    })(w, document, 'script', `https://mc.yandex.ru/metrika/tag.js?id=${COUNTER_ID}`, 'ym');

    w.ym?.(COUNTER_ID, 'init', {
        ssr: true,
        webvisor: true,
        clickmap: true,
        ecommerce: 'dataLayer',
        referrer: document.referrer,
        url: location.href,
        accurateTrackBounce: true,
        trackLinks: true,
    });
};

export const disableYandexMetrika = () => {
    getWindow()[DISABLE_FLAG_KEY] = true;
};