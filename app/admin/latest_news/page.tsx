"use client";
import React from 'react';
import { queryNews, removeNews } from '../../api/news';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatISOToDateTime } from '@/app/utils/dateFormatter';
import { NewsItem } from './interface.dto';

const LatestNewsPage = () => {
  const router = useRouter();
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  const handleDelete = async (newsId?: string) => {
    if (!newsId) return;
    try {
      const requestBody = {
        mwHeader: { requestId: `req-${Date.now()}` },
        tranRq: { items: { newsId } }
      };
      await removeNews(requestBody);
      // 重新查詢最新列表
      const queryBody = {
        mwHeader: { requestId: `req-${Date.now()}` },
        tranRq: {
          items: {},
          pageItem: { pageNumber: 1, pageSize: 20 },
        },
      };
      const res = await queryNews(queryBody);
      setNewsData(res.tranRs?.items || []);
    } catch {
      alert('刪除失敗');
    }
  };

  useEffect(() => {
    const requestBody = {
      mwHeader: { requestId: `req-${Date.now()}` },
      tranRq: {
        items: {},
        pageItem: { pageNumber: 1, pageSize: 20 },
      }
    };
    queryNews(requestBody)
      .then(res => {
        console.log('查詢回傳：', res);
        setNewsData(res.tranRs?.items || []);
        console.log('newsData', res.tranRs?.items);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 hover:text-blue-500" viewBox="0 0 20 20" fill="currentColor">
      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
      <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
  );

  const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 hover:text-red-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">最新消息</h1>
        <button onClick={() => router.push('/admin/latest_news/createNews')} className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center">
          <span className="text-lg mr-2">+</span> 新增
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="py-3 px-2 font-normal w-40">標題</th>
              <th className="py-3 px-2 font-normal w-60">描述</th>
              <th className="py-3 px-2 font-normal w-24">發布日期</th>
              <th className="py-3 px-2 font-normal w-24">有效日期</th>
              {/* <th className="py-3 px-2 font-normal w-24">消息狀態</th> */}
              <th className="py-3 px-2 font-normal w-24">建立時間</th>
              <th className="py-3 px-2 font-normal w-24">更新時間</th>
              <th className="py-3 px-2 font-normal w-24">作者ID</th>
              <th className="py-3 px-2 font-normal w-24">動作</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {newsData.map((item, idx) => (
              <tr key={item.newsId || idx} className="border-b border-gray-200">
                <td className="py-4 px-2">{item.title}</td>
                <td className="py-4 px-2">
                  <div className="line-clamp-2" title={item.content}>
                    {item.content}
                  </div>
                </td>
                <td className="py-4 px-2">{formatISOToDateTime(item.publishDate)}</td>
                <td className="py-4 px-2">{formatISOToDateTime(item.expireDate || '')}</td>
                {/* <td className="py-4 px-2">{item.status}</td> */}
                <td className="py-4 px-2">{formatISOToDateTime(item.createdAt || '')}</td>
                <td className="py-4 px-2">{formatISOToDateTime(item.updatedAt || '')}</td>
                <td className="py-4 px-2">{item.authorId}</td>
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => handleDelete(item.newsId)}><DeleteIcon /></button>
                    <button onClick={() => router.push(`/admin/latest_news/editNews/${item.newsId}`)}><EditIcon /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LatestNewsPage;