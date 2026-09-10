import { buildUrl } from "@/shared/lib/buildApiUrl";
import { PromotionItem } from "../types";
import { isPreviewMode } from "@/shared/lib/preview";

interface PromotionListResponse {
    data: PromotionItem[];
    meta: {
        pagination: {
            start: number;
            limit: number;
            total: number;
            hasMore: boolean;
        };
    };
}

export const getPromotions = async (
    limit = 8,
    offset = 0,
    search?: string
): Promise<PromotionListResponse> => {
    const res = await fetch(
        buildUrl('/api/promotions', {
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

export const getPromotionBySlug = async (slug: string): Promise<PromotionItem | null> => {
    const res = await fetch(
        buildUrl('/api/promotions', {
            'filters[slug][$eq]': slug,
            populate: '*',
            ...(isPreviewMode() && { status: 'draft' }),
        })
    );
    const json = await res.json();
    return json.data?.length > 0 ? json.data[0] : null;
};

export const getCarouselPromotions = async (
    limit = 8
): Promise<PromotionListResponse> => {
    const res = await fetch(
        buildUrl('/api/promotions', {
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