import { CreateOmitFields } from "../../../common/types/create-omit-feilds.type";
import { User } from "../../users/interfaces/user.interface";


export type Register = Omit<User, CreateOmitFields>;