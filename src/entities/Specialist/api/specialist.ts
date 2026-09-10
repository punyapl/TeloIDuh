import type { Specialist, StrapiCollectionResponse, StrapiSingleResponse } from '../types';
import { buildUrl } from '@/shared/lib/buildApiUrl/BuildApiUrl';
import { isPreviewMode } from '@/shared/lib/preview';

interface GetSpecialistsResult {
    data: Specialist[];
    meta: {
        pagination: {
            total: number;
            hasMore: boolean;
        };
    };
}

export const specialistApi = {
    async getSpecialists(
        limit: number,
        offset: number,
        search?: string
    ): Promise<GetSpecialistsResult> {
        const url = buildUrl(`${__STRAPI_URL__}/api/specialists`, {
            'populate[photo]': 'true',
            'populate[specialties]': 'true',
            'pagination[start]': offset,
            'pagination[limit]': limit,
            ...(search && { 'filters[name][$containsi]': search }),
            ...(isPreviewMode() && { status: 'draft' }),
        });

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch specialists: ${res.status}`);

        const json: StrapiCollectionResponse<Specialist> = await res.json();

        const data = json.data.map((specialist) => ({
        ...specialist,
        photo: specialist.photo
            ? { ...specialist.photo, alternativeText: specialist.photo.alternativeText ?? undefined }
            : null,
        }));
        const total = json.meta.pagination.total;

        return {
            data: data,
            meta: {
                pagination: {
                    total,
                    hasMore: offset + limit < total,
                },
            },
        };
    },
};