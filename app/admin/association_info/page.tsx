"use client";
import React from 'react';
import Link from 'next/link';

const aboutMenuItems = [
  {
    id: 'constitution',
    title: '組織章程與架構',
    href: '/about/constitution',
    description: '校友會組織章程、架構及相關規定'
  },
  {
    id: 'ceo',
    title: '理事長的話',
    href: '/about/ceo',
    description: '理事長致詞與願景'
  },
  {
    id: 'contact',
    title: '相關聯絡訊息',
    href: '/about/contact',
    description: '校友會聯絡方式與地址'
  },
  {
    id: 'board',
    title: '理監事名單',
    href: '/about/board',
    description: '現任理監事成員名單'
  },
  {
    id: 'clubs',
    title: '社團介紹/系友會介紹',
    href: '/about/clubs',
    description: '各社團與系友會資訊'
  },
  {
    id: 'voice',
    title: '交大友聲',
    href: '/about/voice',
    description: '校友會刊物與訊息'
  }
];

const AssociationInfoPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">關於校友會管理</h1>
        <p className="text-gray-600">管理校友會相關頁面內容</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aboutMenuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {item.description}
              </p>
              <div className="flex gap-2">
                <Link
                  href={`/admin/association_info/${item.id}`}
                  className="flex-1  text-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  編輯內容
                </Link>
                {/* <Link
                  href={item.href}
                  className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  查看頁面
                </Link> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/admin"
          className="inline-block px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          ← 返回管理頁面
        </Link>
      </div>
    </div>
  );
};

export default AssociationInfoPage;
