export interface StrapiMedia {
    id: number;
    documentId: string;
    name: string;
    url: string;
    alternativeText?: string;
    width: number;
    height: number;
    formats?: {
        thumbnail?: { url: string; width: number; height: number };
        small?: { url: string; width: number; height: number };
        medium?: { url: string; width: number; height: number };
    };
}

export interface Specialty {
    id: number;
    documentId: string;
    name: string;
    slug: string;
}

export interface Specialist {
    id: number;
    documentId: string;
    fullName: string;
    slug: string;
    photo: StrapiMedia | null;
    specialties: Specialty[];
}

// Strapi v5 collection response shape
export interface StrapiCollectionResponse<T> {
    data: T[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export interface StrapiSingleResponse<T> {
    data: T;
    meta: Record<string, never>;
}