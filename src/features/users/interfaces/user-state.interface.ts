import { GeneralInitialState } from "../../../common/interfaces/general-initial-state";
import { User } from "./user.interface";



export interface UserState extends GeneralInitialState<User> {
    currentUser: User | null
}