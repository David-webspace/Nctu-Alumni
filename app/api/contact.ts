import { ContactInfoRequest, ContactInfoResponse } from "../admin/association_info/contact/interface.dto";
import { StatusResponse } from "../components/interface.dto";
import axiosInstance from "./axiosinstance";

// 獲取聯絡資訊
export const getContactInfo = async (): Promise<ContactInfoResponse> => {
    const res = await axiosInstance.get('/contact/info');
    return res.data;
}

// 更新聯絡資訊
export const updateContactInfo = async (contactData: ContactInfoRequest): Promise<StatusResponse> => {
    const res = await axiosInstance.put('/contact/info', contactData);
    return res.data;
}

// 創建聯絡資訊（如果不存在）
export const createContactInfo = async (contactData: ContactInfoRequest): Promise<StatusResponse> => {
    const res = await axiosInstance.post('/contact/info', contactData);
    return res.data;
}
