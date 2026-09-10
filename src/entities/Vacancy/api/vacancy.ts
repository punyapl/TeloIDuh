import { buildUrl } from "@/shared/lib/buildApiUrl";
import { VacancyItem } from "../types";
import { isPreviewMode } from "@/shared/lib/preview/isPreviewMode";

interface VacancyListResponse {
    data: VacancyItem[];
    meta: {
        pagination: {
            start: number;
            limit: number;
            total: number;
            hasMore: boolean;
        };
    };
}

export const getVacancies = async (
    limit = 8,
    offset = 0,
    search?: string
): Promise<VacancyListResponse> => {
    const res = await fetch(
        buildUrl('/api/vacancies', {
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

export const getVacancyBySlug = async (slug: string): Promise<VacancyItem | null> => {
    const res = await fetch(
        buildUrl('/api/vacancies', {
            'filters[slug][$eq]': slug,
            populate: '*',
            ...(isPreviewMode() && { status: 'draft' }),
        })
    );
    const json = await res.json();
    return json.data?.length > 0 ? json.data[0] : null;
};