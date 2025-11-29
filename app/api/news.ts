import { NewsByIdRequest, NewsCreateRequest, NewsItem, NewsQueryRequest, NewsRemoveRequest, NewsUpdateRequest } from "../admin/latest_news/interface.dto";
import { RequestTemplate } from "../components/interface.dto";
import axiosInstance from "./axiosinstance";

export const getNews = async () => {
    const res = await axiosInstance.get('/news');
    return res.data;
}

export const getNewsById = async (userData: NewsByIdRequest) => {
    const res = await axiosInstance.post(`/news/getNews`, userData);
    return res.data;
};

// 查詢最新消息，userData 格式需符合後端 Spring Boot API 要求
export const queryNews = async (userData: RequestTemplate<NewsItem>) => {
    const res = await axiosInstance.post('/news/query', userData );
    return res.data;
};

export const createNews = async (userData: RequestTemplate<NewsCreateRequest>) => {
    const res = await axiosInstance.post('/news/create', userData );
    return res.data;
};

export const updateNews = async (userData: RequestTemplate<NewsUpdateRequest>) => {
    const res = await axiosInstance.post('/news/update', userData );
    return res.data;
};

export const removeNews = async (userData: RequestTemplate<NewsRemoveRequest>) => {
    const res = await axiosInstance.post('/news/remove', userData );
    return res.data;
};