import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsById } from "../../api/news";
import { NewsItem } from "../../admin/latest_news/interface.dto";
import BackButton from "./BackButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function fetchNewsDetail(id: string): Promise<NewsItem | null> {
  try {
    const requestBody = {
      mwHeader: { requestId: `req-${Date.now()}` },
      tranRq: { items: { newsId: id } },
    };
    
    const res = await getNewsById(requestBody);
    // 假設回應為 { tranRs: { item: {...} } } 或 { tranRs: { items: {...} } }
    const detail: NewsItem = res?.tranRs?.item || res?.tranRs?.items || res?.item || res;
    
    return detail || null;
  } catch (error) {
    console.error("getNewsById error", error);
    return null;
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  if (!id) {
    notFound();
  }

  const data = await fetchNewsDetail(id);

  if (!data) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <BackButton />

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
