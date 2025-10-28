"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getNewsById } from "../../api/news";

interface NewsDetail {
  newsId?: string;
  title?: string;
  content?: string;
  publishDate?: string;
  expireDate?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  authorId?: number;
  imageUrl?: string;
  imageAlt?: string;
}

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const requestBody = {
          mwHeader: { requestId: `req-${Date.now()}` },
          tranRq: { items: { newsId: id } },
        };
        const res = await getNewsById(requestBody as any);
        // 假設回應為 { tranRs: { item: {...} } } 或 { tranRs: { items: {...} } }
        const detail: NewsDetail = res?.tranRs?.item || res?.tranRs?.items || res?.item || res;
        setData(detail || null);
      } catch (e: any) {
        console.error("getNewsById error", e);
        setError("讀取消息內容失敗");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-600">載入中...</div>;
  }

  if (error || !data) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 mb-6">{error || "找不到此則消息"}</p>
        <Link href="/news" className="text-blue-600 hover:underline">返回列表</Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="text-sm text-gray-500 hover:text-gray-700 mb-4"
      >
        ← 返回
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">{data.title}</h1>
      <div className="text-sm text-gray-500 mb-6">
        發布日期：{data.publishDate}
        {data.expireDate ? ` ｜ 有效至：${data.expireDate}` : ""}
      </div>

      {data.imageUrl && (
        <div className="w-full mb-6 bg-gray-100 rounded overflow-hidden">
          <Image
            src={data.imageUrl}
            alt={data.imageAlt || data.title || "新聞圖片"}
            width={1200}
            height={630}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}

      <div className="prose max-w-none text-gray-800 whitespace-pre-wrap leading-relaxed">
        {data.content}
      </div>

      <div className="mt-10">
        <Link href="/news" className="text-blue-600 hover:underline">回到最新消息列表</Link>
      </div>
    </article>
  );
}
