import { MemberItem } from "../admin/membership_management/interface.dto";
import { ResponseTemplate } from "../components/interface.dto";
import { MemberQueryRequest, MemberQueryResponse } from "../components/interface.dto.req";
import axiosInstance from "./axiosinstance";

export const queryMembers = async <T = MemberItem>(
    request: Partial<MemberQueryRequest>
): Promise<MemberQueryResponse<T>> => {
    const requestBody: MemberQueryRequest = {
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
        pageItem: request.pageItem || {
            pageNumber: 1,
            pageSize: 10
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