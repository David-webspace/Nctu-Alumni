"use client";
import Link from "next/link";
import { queryNews } from "../api/news";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { NewsItem } from "../admin/latest_news/interface.dto";
import { formatISOToDateTime } from "../utils/dateFormatter";

const LatestNews = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const requestBody = {
          items: [],
          pageItem: { pageNumber: 1, pageSize: 6, totalCount: 0 },
        };
        const res = await queryNews(requestBody);
        const items = (res?.items || []) as NewsItem[];
        setNewsList(items);
      } catch (error) {
        console.error('queryNews error:', error);
        setNewsList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <section className="w-full flex flex-col md:flex-row items-start justify-between py-8 px-2 sm:px-6 md:px-12">
    {/* Left: News List */}
      <div className="flex-3 min-w-0 p-2 sm:p-6 md:p-10">
        {/* Section Title */}
        <div className="mb-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-end sm:space-x-4 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-black">最新消息</h2>
            <div className="w-28 h-1 bg-gray-300" />
          </div>
          <div className="h-2 flex items-center mt-2">
            <div className="w-8 h-1.5 bg-blue-700 rounded" />
          </div>
        </div>
        {/* News Grid */}
        {loading ? (
          <div className="text-center py-10">載入中...</div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-6">
            {newsList.length === 0 ? (
              <div className="col-span-full text-center text-gray-400">暫無最新消息</div>
            ) : (
              newsList.map((item) => (
                <Link
                  key={item.newsId}
                  href={`/news/${item.newsId}`}
                  aria-label={`查看消息：${item.title}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow transition group-hover:shadow-lg overflow-hidden flex flex-col h-full cursor-pointer">
                    <div className="relative w-full h-48 bg-gray-100">
                      <Image
                        src={item.imageUrl || '/news-default.jpg'} 
                        alt={item.imageAlt || item.title}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-3 sm:p-4 flex-1 flex flex-col">
                      <div className="font-bold text-gray-700 text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-black">{item.title}</div>
                      <div className="text-xs text-gray-500 mt-auto">{formatISOToDateTime(item.publishDate)}</div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
        <Link href="/news" className="block mt-8 text-black font-bold hover:underline text-center w-full">
          更多最新消息...
        </Link>
      </div>
      {/* Right: Banner Image */}
      {/* <div className="w-full hidden md:flex flex-2 justify-end items-center">
        <Image
          src="/speaker.png"
          alt="最新消息 Banner"
          width={600}
          height={400}
          className="object-contain"
        />
      </div> */}
    </section>
  )
}

export default LatestNews