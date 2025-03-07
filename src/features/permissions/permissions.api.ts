import axiosInstance from "../../api/axios";
import { QueryPermission } from "./types/query-permission";



export const getPermissions = async (queryPermission: QueryPermission) => {
    const res = await axiosInstance.get('permissions',{
        params: queryPermission
    })
    return res.data.data;
}


