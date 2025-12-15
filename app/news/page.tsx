"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { queryNews } from '../api/news';
import { NewsItem } from '../admin/latest_news/interface.dto';
import { formatISOToDateTime } from '../utils/dateFormatter';

export default function NewsPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 12; // 每頁顯示12個消息

  const fetchNews = async (page: number) => {
    setLoading(true);
    try {
      const requestBody = {
        items: [],
        pageItem: { pageNumber: page, pageSize, totalCount: 0 },
      };
      const res = await queryNews(requestBody);
      console.log('API Response:', res);
      console.log('Response structure:', {
        hasItems: !!res?.items,
        itemsLength: res?.items?.length,
        itemsType: typeof res?.items,
        items: res?.items,
        pageItem: res?.pageItem
      });
      
      const items = (res?.items || []) as NewsItem[];
      const total = res?.pageItem?.totalCount || 0;

      console.log('Processed data:', {
        items,
        itemsLength: items.length,
        total,
        totalPages: Math.ceil(total / pageSize)
      });

      setNewsList(items);
      setTotalCount(total);
      setTotalPages(Math.ceil(total / pageSize));
    } catch (error) {
      console.error('queryNews error:', error);
      setNewsList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // 滾動到頁面頂部
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 上一頁按鈕
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-2 mx-1 text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50"
        >
          上一頁
        </button>
      );
    }

    // 頁碼按鈕
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 mx-1 border rounded ${
            i === currentPage
              ? 'bg-blue-600 text-white border-blue-600'
              : 'text-gray-600 bg-white border-gray-300 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }

    // 下一頁按鈕
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-2 mx-1 text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50"
        >
          下一頁
        </button>
      );
    }

    return pages;
  };

  console.log('Render state:', {
    loading,
    newsListLength: newsList.length,
    newsList: newsList.slice(0, 2), // 只顯示前2個項目避免過多輸出
    totalCount,
    totalPages,
    currentPage
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">載入中...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 頁面標題 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">所有消息</h1>
          <div className="w-20 h-1 bg-blue-600 rounded"></div>
          <p className="mt-4 text-gray-600">共 {totalCount} 則消息</p>
        </div>

        {/* 消息列表 */}
        {newsList.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">目前沒有消息</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {newsList.map((item) => (
                <Link
                  key={item.newsId}
                  href={`/news/${item.newsId}`}
                  className="group block"
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
                    {/* 圖片 */}
                    <div className="relative w-full h-48 bg-gray-100">
                      <Image
                        src={item.imageUrl || '/news-default.jpg'}
                        alt={item.imageAlt || item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>

                    {/* 內容 */}
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-1">
                        {item.content}
                      </p>
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>發布日期: {formatISOToDateTime(item.publishDate)}</p>
                        {/* {item.expireDate && (
                          <p>有效期限: {formatISOToDateTime(item.expireDate)}</p>
                        )} */}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* 分頁 */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8">
                <div className="flex items-center space-x-1">
                  {renderPagination()}
                </div>
              </div>
            )}

            {/* 分頁資訊 */}
            <div className="text-center mt-4 text-sm text-gray-600">
              第 {currentPage} 頁，共 {totalPages} 頁 | 顯示 {newsList.length} 則消息，共 {totalCount} 則
            </div>
          </>
        )}
      </div>
    </div>
  );
}