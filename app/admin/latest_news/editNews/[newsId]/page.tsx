"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { updateNews, getNewsById } from '../../../../api/news';

interface EditNewsPageProps {
  params: {
    newsId?: string;
  };
}

export default function EditNewsPage({ params }: EditNewsPageProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    newsId: params.newsId || '',
    title: '',
    content: '',
    publishDate: '',
    expireDate: '',
    status: '',
    createdAt: '',
    updatedAt: '',
    authorId: '',
    imageUrl: '',
    imageAlt: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      if (!params.newsId) return;
      try {
        const requestBody = {
          mwHeader: { requestId: `req-${Date.now()}` },
          tranRq: { items: { newsId: params.newsId } }
        };
        const res = await getNewsById(requestBody);
        // 根據實際回傳格式調整
        const data = res.tranRs?.items || res.items || res;
        setForm({
          newsId: data.newsId || '',
          title: data.title || '',
          content: data.content || '',
          publishDate: data.publishDate || '',
          expireDate: data.expireDate || '',
          status: data.status || '',
          createdAt: data.createdAt || '',
          updatedAt: data.updatedAt || '',
          authorId: data.authorId || '',
          imageUrl: data.imageUrl || '',
          imageAlt: data.imageAlt || '',
        });
      } catch {
        setError('載入資料失敗');
      }
    };
    fetchNews();
  }, [params.newsId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const now = new Date().toISOString();
      const requestBody = {
        mwHeader: { requestId: `req-${Date.now()}` },
        tranRq: {
          items: {
            ...form,
            updatedAt: now,
          }
        }
      };
      await updateNews(requestBody);
      router.push("/admin/latest_news");
    } catch {
        setError("更新失敗");
      }
  };

  return (
    <div className="max-w-2xl bg-white p-8 rounded shadow mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-600">編輯最新消息</h1>
      <form onSubmit={handleSubmit} className="space-y-4 text-gray-600">
        <div>
          <label className="block font-medium mb-1">標題</label>
          <input name="title" value={form.title} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="block font-medium mb-1">內容</label>
          <textarea name="content" value={form.content} onChange={handleChange} className="w-full border px-3 py-2 rounded" rows={3} />
        </div>
        <div className="flex gap-4">
          <div>
            <label className="block font-medium mb-1">發布日期</label>
            <input type="datetime-local" name="publishDate" value={form.publishDate} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block font-medium mb-1">有效日期</label>
            <input type="datetime-local" name="expireDate" value={form.expireDate} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">狀態</label>
          <input name="status" value={form.status} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block font-medium mb-1">作者ID</label>
          <input name="authorId" value={form.authorId} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block font-medium mb-1">圖片網址</label>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block font-medium mb-1">圖片描述</label>
          <input name="imageAlt" value={form.imageAlt} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="flex gap-4 mt-6">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">儲存</button>
          <button type="button" className="border px-6 py-2 rounded" onClick={() => router.back()}>取消</button>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
}
