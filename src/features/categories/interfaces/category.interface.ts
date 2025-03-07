import { StatusActiveEnum } from "../../../constants/app.constant";


export interface Category {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    status: StatusActiveEnum;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}