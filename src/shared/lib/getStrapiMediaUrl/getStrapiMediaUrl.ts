interface MediaItem {
    url: string;
    name: string;
    alternativeText?: string;
}

export const getStrapiMediaUrl = (media?: MediaItem, fallback: string = '/placeholder.png'): string => {
    if (media?.url) {
        return `${__STRAPI_URL__}${media.url}`;
    }
    return fallback;
};