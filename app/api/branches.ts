import { BranchItem, BranchQueryResponse } from "../admin/membership_management/interface.dto";
import axiosInstance from "./axiosinstance";

export const queryBranches = async (): Promise<BranchItem[]> => {
    const requestBody = {};
    const res = await axiosInstance.post<BranchQueryResponse>('/branches/queryAll', requestBody);
    return res.data.items;
}