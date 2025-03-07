import { Base } from "../../../common/interfaces/base.interface";
import { StatusActiveEnum } from "../../../constants/app.constant";
import { Category } from "../../categories/interfaces/category.interface";


interface Inventories {
    quantity: number;
    total: number;
}
export interface Product extends Base<string>{
    title: string;
    description: string;
    thumbnail: string;
    price: number;
    discountPercentage: number;
    status: StatusActiveEnum;
    images: string[];
    slug: string;
    inventories: Inventories;
    category: Category;
}