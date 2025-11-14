import { RoleItem } from "../admin/association_info/board/interface.dto";
import axiosInstance from "./axiosinstance";

/**
 * 查詢會員
 * @param request - 會員查詢條件
 * @returns 包含會員列表和分頁資訊的回應物件
 */
export const queryRoles = async (): Promise<RoleItem[]> => {
    const requestBody = {};
    const res = await axiosInstance.post('/roles/queryAll', requestBody);
    return res.data?.items ?? res.data ?? [];
}
