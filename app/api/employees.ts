import { EmployeeItem } from "../components/interface.dto";
import { EmployeeQueryRequest, EmployeeQueryResponse } from "../components/interface.dto.re";
import axiosInstance from "./axiosinstance";

/**
 * 查詢所有員工（模糊查詢）
 * @param text - 搜尋文字（可為空字串）
 * @param pageNumber - 頁碼（預設為 1）
 * @param pageSize - 每頁筆數（預設為 10）
 * @returns 包含員工列表和分頁資訊的回應物件
 */
export const getEmployees = async <T = EmployeeItem>(
    text: string = "",
    pageNumber: number = 1,
    pageSize: number = 10
): Promise<EmployeeQueryResponse<T>> => {
    const requestBody: EmployeeQueryRequest = {
        text,
        pageItem: {
            pageNumber,
            pageSize
        }
    };
    const res = await axiosInstance.post('/employees/fuzzyQuery', requestBody);
    return res.data;
}