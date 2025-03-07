import { RcFile } from "antd/es/upload";
import axiosInstance from "../../api/axios"



export const uploadSingleAPI = async (formData: FormData) => {
    const res = await axiosInstance.post('upload/single',formData,{
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return res.data.data;
}

export const uploadMultiAPI = async (formData: FormData) => {
    const res = await axiosInstance.post("upload/multi", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data.data;
}