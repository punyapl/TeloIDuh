import { ArticleItem } from "@/entities/Article";

export interface PromotionItem extends ArticleItem {
    dateStart: string;
    dateEnd: string;
    discount: string;
    conditions: string[];
}