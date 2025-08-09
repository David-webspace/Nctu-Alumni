"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getNewsById } from "../../../api/news";
import axiosInstance from "../../../api/axiosinstance";
import MDEditor from "@uiw/react-md-editor";

interface NewsItem {
  id: number;
  title: string;
  start_date: string;
  end_date?: string;
  thumbnail?: string;
  new_description?: string;
}

export default function EditNewsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    start_date: "",
    end_date: "",
    thumbnail: "",
    new_description: "",
  });

  useEffect(() => {
    // 取得單一消息資料
    getNewsById(id)
      .then(res => {
        setNews(res);
        console.log(news);
        setForm({
          title: res.title || "",
          start_date: res.start_date || "",
          end_date: res.end_date || "",
          thumbnail: res.thumbnail || "",
          new_description: res.new_description || "",
        });
        setLoading(false);
      })
      .catch(() => {
        setError("找不到該消息");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/news/${id}`, form);
      router.push("/admin/latest_news");
    } catch {
      setError("更新失敗");
    }
  };

  if (loading) return <div className="p-8">載入中...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-600">編輯最新消息</h1>
      <form onSubmit={handleSubmit} className="space-y-4 text-gray-600">
        <div>
          <label className="block font-medium mb-1 text-gray-600">標題</label>
          <input name="title" value={form.title} onChange={handleChange} className="w-full border px-3 py-2 rounded text-gray-600" required />
        </div>
        <div className="flex gap-4">
            <div>
            <label className="block font-medium mb-1 text-gray-600">開始日期</label>
            <input type="date" name="start_date" value={form.start_date} onChange={handleChange} className="w-full border px-3 py-2 rounded text-gray-600" />
            </div>
            <div>
            <label className="block font-medium mb-1 text-gray-600">結束日期</label>
            <input type="date" name="end_date" value={form.end_date} onChange={handleChange} className="w-full border px-3 py-2 rounded text-gray-600" />
            </div>
        </div>
        <div>
            <label className="block font-medium mb-1 text-gray-600">封面圖片</label>
            <input
                name="thumbnail"
                value={form.thumbnail}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-gray-600 mb-2"
                placeholder="請輸入圖片網址或直接上傳圖片"
            />
            <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                // 將圖片轉成 base64 預覽
                const reader = new FileReader();
                reader.onload = async (ev) => {
                    // 若有後端圖片上傳 API，這裡可改成 fetch/axios 上傳
                    // 這裡 demo 只做 base64 預覽與自動填入
                    setForm(f => ({ ...f, thumbnail: ev.target?.result as string }));
                };
                reader.readAsDataURL(file);
                }}
                className="mt-1"
            />
            {form.thumbnail && (
                <div className="mt-2">
                    <p>預覽圖</p>
                    <img src={form.thumbnail} alt="預覽圖" className="max-h-40 rounded border" />
                </div>
            )}
            </div>
        <div>
        <label className="block font-medium mb-1 text-gray-600">描述</label>
            <div data-color-mode="light">
                <MDEditor
                    value={form.new_description}
                    onChange={val => setForm(f => ({ ...f, new_description: val || "" }))}
                    height={200}
                    preview="edit"
                />
            </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">儲存</button>
          <button type="button" className="border px-6 py-2 rounded" onClick={() => router.back()}>取消</button>
        </div>
      </form>
    </div>
  );
}
