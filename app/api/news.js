import axiosInstance from "./axiosinstance";

export const news = async (userData) => {
    const res = await axiosInstance.post('/news', userData );
    return res.data;
};
