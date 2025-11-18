import { BoardQueryResponse } from "../admin/association_info/board/interface.dto";
import axiosInstance from "./axiosinstance";

export const queryBoards = async (): Promise<BoardQueryResponse> => {
    const requestBody = {};
    const res = await axiosInstance.post('/boards/queryAll', requestBody);
    return res.data;
}

export const createBoards = async (): Promise<BoardQueryResponse> => {
    const requestBody = {};
    const res = await axiosInstance.post('/boards/queryAll', requestBody);
    return res.data;
}
