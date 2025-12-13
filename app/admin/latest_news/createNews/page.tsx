"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { createNews } from '../../../api/news';
import { uploadImage } from '../../../api/imageUpload';
import { NewsCreateRequest, NewsItem } from "../interface.dto";
import SimpleImageUpload from '../../../components/SimpleImageUpload';

export default function CreateNewsPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [form, setForm] = useState<Partial<NewsItem>>({
    title: "",
    content: "",
    publishDate: "",
    expireDate: "",
    status: 0, // 0 for draft
    authorId: "1", // Default authorId
    imageUrl: "",
    imageAlt: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 處理日期型欄位
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = form.imageUrl;
      
      // 如果有選擇圖片，先上傳到 S3
      if (selectedImage) {
        const uploadResponse = await uploadImage(selectedImage);
        if (uploadResponse.success && uploadResponse.imageUrl) {
          imageUrl = uploadResponse.imageUrl;
        } else {
          setError(uploadResponse.message || "圖片上傳失敗");
          return;
        }
      }
      
      // 組裝 request 格式
      const now = new Date().toISOString();
      const requestBody: NewsCreateRequest = {
        mwHeader: {
          requestId: `req-${Date.now()}`,
        },
        tranRq: {
          items: {
            title: form.title!,
            content: form.content!,
            publishDate: form.publishDate || now,
            expireDate: form.expireDate!,
            status: form.status!,
            authorId: form.authorId!,
            imageAlt: form.imageAlt!,
            imageUrl: imageUrl,
          }
        },
      };
      await createNews(requestBody);
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
        <div>
          <label className="block font-medium mb-1 text-gray-600">描述</label>
          <div data-color-mode="light">
            <MDEditor
              value={form.content}
              onChange={val => setForm(f => ({ ...f, content: val || "" }))}
              height={200}
              preview="edit"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div>
            <label className="block font-medium mb-1 text-gray-600">發布日期</label>
            <input type="datetime-local" name="publishDate" value={form.publishDate} onChange={handleDateChange} className="w-full border px-3 py-2 rounded text-gray-600" />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-600">結束日期</label>
            <input type="datetime-local" name="expireDate" value={form.expireDate} onChange={handleDateChange} className="w-full border px-3 py-2 rounded text-gray-600" />
          </div>
        </div>
        <div className="flex gap-4">
          <div>
            <label className="block font-medium mb-1 text-gray-600">狀態</label>
            <select name="status" value={form.status} onChange={handleSelectChange} className="w-full border px-3 py-2 rounded text-gray-600">
              <option value={0}>草稿</option>
              <option value={1}>發布</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-600">作者ID</label>
            <input name="authorId" value={form.authorId} onChange={handleChange} className="w-full border px-3 py-2 rounded text-gray-600" />
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1 text-gray-600">圖片描述</label>
          <input name="imageAlt" value={form.imageAlt} onChange={handleChange} className="w-full border px-3 py-2 rounded text-gray-600" />
        </div>
        <SimpleImageUpload
          currentImageUrl={form.imageUrl}
          onImageSelected={(file: File | null) => setSelectedImage(file)}
          onImageRemoved={() => {
            setSelectedImage(null);
            setForm(f => ({ ...f, imageUrl: "" }));
          }}
        />
        <div className="flex gap-4 mt-6">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">新增</button>
          <button type="button" className="border px-6 py-2 rounded" onClick={() => router.back()}>取消</button>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
}
