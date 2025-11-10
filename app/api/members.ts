import { MemberItem } from "../components/interface.dto";
import { MemberQueryRequest, MemberQueryResponse } from "../components/interface.dto.req";
import axiosInstance from "./axiosinstance";

/**
 * 查詢會員
 * @param request - 會員查詢條件
 * @returns 包含會員列表和分頁資訊的回應物件
 */
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
    const res = await axiosInstance.post('/organizers/query', requestBody);
    return res.data;
}
