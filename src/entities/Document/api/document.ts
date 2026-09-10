import { buildUrl } from "@/shared/lib/buildApiUrl";
import { DocumentGroup } from "../types";

interface DocumentListResponse {
    data: DocumentGroup[];
    // meta: {
    //     pagination: {
    //         start: number;
    //         limit: number;
    //         total: number;
    //         hasMore: boolean;
    //     };
    // };
}

export const getDocuments = async (): Promise<DocumentListResponse> => {
    const res = await fetch(
        buildUrl('/api/document-groups', {
            'populate[cards][populate]': 'file',
            sort: 'order:asc',
            // 'pagination[limit]': -1,
        })
    );
    const json = await res.json();
    return {
        data: json.data,
    };
};

// export const getPromotionBySlug = async (slug: string): Promise<DocumentGroup | null> => {
//     const res = await fetch(
//         buildUrl('/api/document-groups', {
//             'filters[slug][$eq]': slug,
//             populate: '*',
//         })
//     );
//     const json = await res.json();
//     return json.data?.length > 0 ? json.data[0] : null;
// };