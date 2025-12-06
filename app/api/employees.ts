import { EmployeeQueryRequest, EmployeeQueryResponse } from "../admin/association_info/contact/interface.dto";
import { EmployeeItem } from "../components/interface.dto";
import { StatusResponse } from "../components/interface.dto";
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

/**
 * 創建員工
 */
export const createEmployee = async (employeeData: Omit<EmployeeItem, 'empId'>): Promise<StatusResponse> => {
    const res = await axiosInstance.post('/employees/create', employeeData);
    return res.data;
}

/**
 * 更新員工
 */
export const updateEmployee = async (employeeData: EmployeeItem): Promise<StatusResponse> => {
    const res = await axiosInstance.post(`/employees/update`, employeeData);
    return res.data;
}

/**
 * 刪除員工
 */
export const deleteEmployee = async (empId: string): Promise<StatusResponse> => {
    const res = await axiosInstance.post(`/employees/delete`, {empId});
    return res.data;
}