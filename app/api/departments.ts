import { DepartmentItem } from "../admin/membership_management/interface.dto";
import { ResponseTemplate, StatusResponse } from "../components/interface.dto";
import axiosInstance from "./axiosinstance";

export const queryDepartments = async (departmentId: string): Promise<ResponseTemplate<DepartmentItem>> => {
    const requestBody = {
        departmentId: departmentId,
    };
    const res = await axiosInstance.post('/departments/queryAll', requestBody);
    return res.data;
}

export const createDepartment = async (departmentName: string): Promise<StatusResponse> => {
    const requestBody = {
        department: departmentName,
    };
    const res = await axiosInstance.post('/departments/create', requestBody);
    return res.data;
}

export const deleteDepartment = async (departmentId: string): Promise<StatusResponse> => {
    const requestBody = {
        departmentId: departmentId,
    };
    const res = await axiosInstance.post('/departments/delete', requestBody);
    return res.data;
}
