import React from 'react';
import Link from 'next/link';

export default function ClubsPage() {
  return (
    <div className="min-h-screen bg-[#fcfaf0] text-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-12 flex items-center">
          <span className="inline-block w-2 h-8 bg-blue-600 mr-4"></span>
          社團介紹 / 系友會介紹
        </h1>

        <div className="space-y-10">
          {/* 社團介紹 Section */}
          <div>
            <div className="flex items-center mb-4">
              <span className="w-4 h-4 bg-blue-600 rounded-full mr-3"></span>
              <h2 className="text-2xl font-semibold">社團介紹</h2>
            </div>
            <p className="ml-7 text-lg">
              各社團名單：
              <Link href="/">
                <span className="text-blue-600 hover:underline">連結頁面</span>
              </Link>
            </p>
          </div>

          {/* 系友會介紹 Section */}
          <div>
            <div className="flex items-center mb-4">
              <span className="w-4 h-4 bg-blue-600 rounded-full mr-3"></span>
              <h2 className="text-2xl font-semibold">系友會介紹</h2>
            </div>
            <p className="ml-7 text-lg">
              各系友會名單：
              <Link href="/">
                <span className="text-blue-600 hover:underline">連結頁面</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
