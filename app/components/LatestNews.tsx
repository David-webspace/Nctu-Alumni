"use client";
import Link from "next/link";
import { getNews } from "../api/news";
import { useEffect, useState } from "react";

interface NewsItem {
  id: number;
  title: string;
  start_date: string;
  endDate: string;
  thumbnail?: string;
}

const LatestNews = () => {

  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNews()
      .then(data => {
        console.log(data);
        setNewsList(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <section className="w-full flex flex-col md:flex-row items-start justify-between py-50">
    {/* Left: News List */}
      <div className="flex-3 min-w-0 p-20">
        {/* Section Title */}
        <div className="mb-2">
          <div className="flex items-end space-x-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
            {newsList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
              >
                <div className="aspect-w-4 aspect-h-3 bg-gray-100">
                  <img
                    src={item.thumbnail || '/news-default.jpg'}
                    alt={item.title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="font-bold text-gray-700 text-lg mb-2 line-clamp-2">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.start_date}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        <Link href="/news" className="block mt-10 text-black font-bold hover:underline text-center">
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