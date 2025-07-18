"use client"
import { newsList } from "./newsData";
import { FaRegClock } from "react-icons/fa";

import { useState } from "react";

type NewsItem = {
  title: string;
  description?: string;
  date: string;
  tags?: string;
};

type NewsForm = {
  title: string;
  description: string;
  date: string;
  tags: string;
};

const NewsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<NewsForm>({
    title: "",
    description: "",
    date: "",
    tags: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle save logic here
    setShowModal(false);
    setForm({ title: "", description: "", date: "", tags: "" });
  };

  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [editForm, setEditForm] = useState<NewsForm>({ title: '', description: '', date: '', tags: '' });
  const [news, setNews] = useState<NewsItem[]>(newsList);

  return (
    <div className="max-w-7xl mx-auto min-h-screen px-4 py-8">
      <h1 className="text-4xl font-bold text-black mb-2 flex items-center">
        <span className="border-l-4 border-blue-700 pl-3 mr-2">最新消息</span>
      </h1>
      <div className="flex items-center mt-2 mb-8">
        {/* <span className="text-lg font-semibold text-gray-700 mr-4">更多消息</span> */}
        <button
          type="button"
          className="inline-flex items-center px-4 py-1.5 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold text-base ml-2 transition"
          onClick={() => setShowModal(true)}
        >
          <span className="mr-1 text-xl leading-none">＋</span>新增
        </button>
        {/* 新增消息 Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fade-in">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="關閉"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-4 text-blue-700">新增最新消息</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">標題</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">描述</label>
                  <textarea
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows={3}
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">日期</label>
                  <input
                    type="date"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={form.date}
                    onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">標籤（逗號分隔）</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={form.tags}
                    onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold"
                    onClick={() => setShowModal(false)}
                  >取消</button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800 font-semibold"
                  >儲存</button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="w-24 h-1 bg-blue-700 rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-gray-300 bg-white/80 p-6 shadow hover:shadow-lg transition cursor-pointer flex flex-col justify-between min-h-[150px]"
            onClick={() => setSelectedNews(item)}
            tabIndex={0}
            role="button"
            aria-label={`檢視 ${item.title}`}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelectedNews(item); }}
          >
            <div className="font-bold text-base md:text-lg text-black mb-2 leading-snug">
              {item.title}
            </div>
            <div className="flex items-center text-gray-600 mt-4 text-sm">
              <FaRegClock className="mr-2 text-blue-700" />
              {item.date}
            </div>
          </div>
        ))}
      </div>

      {/* 個別消息詳情 Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full h-180 max-w-7xl mx-auto relative animate-fade-in overflow-scroll">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              onClick={() => setSelectedNews(null)}
              aria-label="關閉"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 text-blue-700">{selectedNews.title}</h2>
            <div className="flex items-center text-gray-600 mb-4">
              <FaRegClock className="mr-2 text-blue-700" />
              {selectedNews.date}
            </div>
            {selectedNews.description && (
              <div className="mb-4">
                <div className="text-gray-700 font-semibold mb-1">描述</div>
                <div className="text-gray-800 whitespace-pre-line">{selectedNews.description}</div>
              </div>
            )}
            {selectedNews.tags && (
              <div className="mb-2">
                <div className="text-gray-700 font-semibold mb-1">標籤</div>
                <div className="flex flex-wrap gap-2">
                  {selectedNews.tags.split(',').map((tag, i) => (
                    <span key={i} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{tag.trim()}</span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-between items-end mt-8">
              <button
                type="button"
                className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800 font-semibold shadow"
                onClick={() => {
                  setEditForm({
                    title: selectedNews?.title || '',
                    description: selectedNews?.description || '',
                    date: selectedNews?.date || '',
                    tags: selectedNews?.tags || '',
                  });
                  setEditModal(true);
                }}
              >
                編輯
              </button>
              <div />
            </div>
          </div>
        </div>
      )}

      {/* 新增消息 Modal */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-7xl mx-auto relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              onClick={() => setEditModal(false)}
              aria-label="關閉"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 text-blue-700">編輯最新消息</h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                if (!selectedNews) return;
                setNews(news.map(n =>
                  n === selectedNews ? { ...n, ...editForm } : n
                ));
                setEditModal(false);
                setSelectedNews(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-700 font-semibold mb-1">標題</label>
                <input
                  type="text"
                  className="w-full text-black border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={editForm.title}
                  onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">描述</label>
                <textarea
                  className="w-full text-black border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={3}
                  value={editForm.description}
                  onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">日期</label>
                <input
                  type="date"
                  className="w-full text-black border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={editForm.date}
                  onChange={e => setEditForm(f => ({ ...f, date: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">標籤（逗號分隔）</label>
                <input
                  type="text"
                  className="w-full text-black border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={editForm.tags}
                  onChange={e => setEditForm(f => ({ ...f, tags: e.target.value }))}
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold"
                  onClick={() => setEditModal(false)}
                >取消</button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800 font-semibold"
                >儲存</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
