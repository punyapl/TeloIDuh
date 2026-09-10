export const buildUrl = (path: string, params?: Record<string, string | number | boolean | undefined>) => {
    const url = new URL(path, __STRAPI_URL__);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value === undefined || value === null) return;
            url.searchParams.set(key, String(value));
        });
    }
    return url.toString();
};