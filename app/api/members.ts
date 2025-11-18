import { MemberItem, MemberQueryRequest, MemberQueryResponse } from "../admin/membership_management/interface.dto";
import { ResponseTemplate } from "../components/interface.dto";
import axiosInstance from "./axiosinstance";

export const queryMembers = async(request: Partial<MemberQueryRequest>): Promise<MemberQueryResponse<MemberItem>> => {
    const requestBody = {
        memberId: request.memberId || "",
        memberName: request.memberName || "",
        personalId: request.personalId || "",
        gender: request.gender || "",
        phone: request.phone || "",
        email: request.email || "",
        department: request.department || "",
        minor: request.minor || "",
        branch: request.branch || "",
        role: request.role || "",
        graduatedYear: request.graduatedYear || "",
        startYear: request.startYear || "",
        pageItem: {
            pageNumber: request.pageItem?.pageNumber ?? 1,
            pageSize: request.pageItem?.pageSize ?? 10
        }
    };
    const res = await axiosInstance.post('/members/query', requestBody);
    return res.data;
}

export const queryMemberByIdAndName = async (queryInput: string): Promise<ResponseTemplate<MemberItem>> => {
    const requestBody = {
        queryInput: queryInput
    };
    const res = await axiosInstance.post('/members/queryByIdAndName', requestBody);
    return res.data;
}