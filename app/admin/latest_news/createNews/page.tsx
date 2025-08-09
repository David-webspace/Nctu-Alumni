"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { createNews } from '../../../api/news';

export default function CreateNewsPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    start_date: "",
    end_date: "",
    thumbnail: "",
    new_description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createNews(form);
      router.push("/admin/latest_news");
    } catch {
      setError("新增失敗");
    }
  };

  return (
    <div className="max-w-7xl bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-600">新增最新消息</h1>
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
              const reader = new FileReader();
              reader.onload = async (ev) => {
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
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">新增</button>
          <button type="button" className="border px-6 py-2 rounded" onClick={() => router.back()}>取消</button>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
}
