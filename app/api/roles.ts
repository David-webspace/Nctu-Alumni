import { RoleItem } from "../admin/association_info/board/interface.dto";
import { ResponseTemplate } from "../components/interface.dto";
import axiosInstance from "./axiosinstance";

export const queryRoles = async (): Promise<ResponseTemplate<RoleItem>> => {
    const requestBody = {};
    const res = await axiosInstance.post('/roles/queryAll', requestBody);
    return res.data;
}
