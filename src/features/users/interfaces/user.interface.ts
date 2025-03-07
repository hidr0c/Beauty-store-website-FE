import { StatusActiveEnum } from "../../../constants/app.constant";


export interface User {
    id: string;
    fullName: string;
    avatar: string;
    email: string;
    gender: string;
    status: StatusActiveEnum;
    birthDate: Date;
    createdAt: Date;
    updatedAt: Date;
}