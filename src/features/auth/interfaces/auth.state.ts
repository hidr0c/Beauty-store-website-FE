import { LoadingConstant } from "../../../constants/loading.constant";


export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    resetToken: string | null;
    isAuth: boolean;
    loading: LoadingConstant;
    error: null | string;
    expiresIn: number; //SECOND
    roleId: string | null;
}