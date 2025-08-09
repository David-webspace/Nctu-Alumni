"use client";
import React from 'react';
import { getNews } from '../../api/news';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface NewsItem {
  id: number;
  title: string;
  start_date: string;
  end_date?: string;
  thumbnail?: string;
}

const LatestNewsPage = () => {
  const router = useRouter();
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getNews()
      .then(data => {
        setNewsData(data);
      })
      .catch(() => {
        setError("取得最新消息失敗");
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
              {/* <th className="py-3 px-2 font-normal w-12">#</th> */}
              <th className="py-3 px-2 font-normal">標題</th>
              <th className="py-3 px-2 font-normal w-64">有效時間</th>
              <th className="py-3 px-2 font-normal w-24">動作</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {newsData.map((item) => (
              <tr key={item.id} className="border-b border-gray-200">
                {/* <td className="py-4 px-2">{item.id}</td> */}
                <td className="py-4 px-2">{item.title}</td>
                <td className="py-4 px-2 text-gray-600">
                  <div>{item.start_date}</div>
                  <div>{item.end_date}</div>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => router.push(`/admin/latest_news/${item.id}`)}><DeleteIcon /></button>
                    <button onClick={() => router.push(`/admin/latest_news/${item.id}`)}><EditIcon /></button>
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