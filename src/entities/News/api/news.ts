import { buildUrl } from "@/shared/lib/buildApiUrl";
import { ArticleItem, } from "../../Article";
import { isPreviewMode } from "@/shared/lib/preview";

interface NewsListResponse {
    data: ArticleItem[];
    meta: {
        pagination: {
            start: number;
            limit: number;
            total: number;
            hasMore: boolean;
        };
    };
}

export const getNews = async (
    limit = 8,
    offset = 0,
    search?: string
): Promise<NewsListResponse> => {
    const res = await fetch(
        buildUrl('/api/news-articles', {
            populate: 'image',
            sort: 'publishedAt:desc',
            'pagination[limit]': limit,
            'pagination[start]': offset,
            ...(search ? { 'filters[title][$containsi]': search } : {}),
        })
    );
    const json = await res.json();
    return {
        data: json.data,
        meta: {
            pagination: {
                start: offset,
                limit,
                total: json.meta.pagination.total,
                hasMore: offset + limit < json.meta.pagination.total,
            },
        },
    };
};

export const getNewsArticleBySlug = async (slug: string): Promise<ArticleItem | null> => {
    const res = await fetch(
        buildUrl('/api/news-articles', {
            'filters[slug][$eq]': slug,
            populate: '*',
            ...(isPreviewMode() && { status: 'draft' }),
        })
    );
    const json = await res.json();
    return json.data?.length > 0 ? json.data[0] : null;
};

export const getLatestNewsArticles = async (count = 3, excludeSlug?: string): Promise<ArticleItem[]> => {
    const res = await fetch(
        buildUrl('/api/news-articles', {
            populate: 'image',
            sort: 'publishedAt:desc',
            'pagination[limit]': count + (excludeSlug ? 1 : 0),
            'pagination[start]': 0,
        })
    );
    const json = await res.json();
    const data: ArticleItem[] = json.data ?? [];
    return data.filter(a => a.slug !== excludeSlug).slice(0, count);
};

export const getCarouselNews = async (
    limit = 8
): Promise<NewsListResponse> => {
    const res = await fetch(
        buildUrl('/api/news-articles', {
            populate: 'image',
            sort: 'publishedAt:desc',
            'pagination[limit]': limit,
            'filters[ShowInCarousel][$eq]': 'true',
        })
    );
    const json = await res.json();
    return {
        data: json.data,
        meta: {
            pagination: {
                start: 0,
                limit,
                total: json.meta.pagination.total,
                hasMore: false,
            },
        },
    };
};