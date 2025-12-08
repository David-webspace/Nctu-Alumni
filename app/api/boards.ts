import { BoardItem } from "../admin/association_info/board/interface.dto";
import { ResponseTemplateWithPage, StatusResponse } from "../components/interface.dto";
import axiosInstance from "./axiosinstance";

export const queryBoards = async (): Promise<ResponseTemplateWithPage<BoardItem>> => {
    const requestBody = {};
    const res = await axiosInstance.post('/boards/queryAll', requestBody);
    return res.data;
}

export const createBoards = async (memberId: string, role: string): Promise<StatusResponse | StatusResponse> => {
    const requestBody = {
        memberId: memberId,
        role: role,
    };
    const res = await axiosInstance.post('/boards/create', requestBody);
    return res.data;
}

export const deleteBoard = async (boardId: string): Promise<StatusResponse> => {
    const requestBody = {
        boardId: boardId,
    };
    const res = await axiosInstance.post('/boards/delete', requestBody);
    return res.data;
}
