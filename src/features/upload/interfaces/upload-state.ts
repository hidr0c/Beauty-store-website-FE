import { LoadingConstant } from "../../../constants/loading.constant";



export interface UploadState {
    url: string | null;
    urls: string[];
    loading: LoadingConstant;
    error: null | unknown
}