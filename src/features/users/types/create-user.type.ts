import { CreateOmitFields } from "../../../common/types/create-omit-feilds.type";
import { User } from "../interfaces/user.interface";


export type CreateUser = Omit<User, CreateOmitFields >;