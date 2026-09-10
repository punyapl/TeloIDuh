import { ArticleItem } from "@/entities/Article";

export interface VacancyItem extends ArticleItem {
    category: string;
    salary: string;
}