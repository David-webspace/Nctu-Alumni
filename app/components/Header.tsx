import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Site Title */}
        <Link href="/" className="flex items-center space-x-6 text-xl font-bold text-black hover:text-blue-900 transition-colors">
          <Image src="/logo.png" alt="" width={80} height={80} className="w-20" />
          <span>NCTU Alumni</span>
        </Link>
        {/* Navigation */}
        <nav className="space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">首頁</Link>
          <Link href="/#latest-news" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">最新消息</Link>
          <Link href="/#activity-calendar" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">活動行事曆</Link>
          <Link href="/#plan-and-donation" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">計畫與捐贈</Link>
          {/* Dropdown for 關於校友會 */}
          <div className="relative group inline-block">
            <button
              className="text-gray-700 hover:text-blue-700 font-medium transition-colors focus:outline-none"
            >
              關於校友會
            </button>
            <div className="absolute left-0 mt-2 w-64 bg-white border border-blue-700 rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto z-50 transition-opacity duration-200">
              <div className="bg-blue-700 text-white px-4 py-2 font-bold rounded-t">關於校友會</div>
              <ul className="divide-y divide-blue-100">
                <li>
                  <Link href="/about/constitution" className="block px-4 py-3 hover:bg-blue-100 font-bold text-black">組織章程與架構</Link>
                </li>
                <li>
                  <Link href="/about/ceo" className="block px-4 py-3 hover:bg-blue-100 font-bold text-black">理事長的話</Link>
                </li>
                <li>
                  <Link href="/about/contact" className="block px-4 py-3 hover:bg-blue-100 font-bold text-black">相關聯絡訊息</Link>
                </li>
                <li>
                  <Link href="/about/board" className="block px-4 py-3 hover:bg-blue-100 font-bold text-black">理監事名單</Link>
                </li>
                <li>
                  <Link href="/about/clubs" className="block px-4 py-3 hover:bg-blue-100 font-bold text-black">社團介紹/系友會介紹</Link>
                </li>
                <li>
                  <Link href="/about/voice" className="block px-4 py-3 hover:bg-blue-100 font-bold text-black">交大友聲</Link>
                </li>

              </ul>
            </div>
          </div>
        </nav>
        <div className="flex items-center">
          {/* Console Button for Admins */}
          <Link
            href="/admin"
            className="ml-6 px-5 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 hover:ring-2 hover:ring-gray-400 transition-all duration-200 font-bold flex items-center gap-2 border border-gray-300"
            style={{ minWidth: '120px' }}
          >
            頁面管理
          </Link>
          {/* Profile Icon & Dropdown */}
          <div className="relative group ml-6">
            <button className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-400 focus:outline-none">
              {/* You can replace this SVG with an Image if you have a user icon */}
              <CgProfile className="w-10 h-10 text-black" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white border border-blue-700 rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto z-50 transition-opacity duration-200">
              <ul className="divide-y divide-blue-100">
                <li>
                  <button className="block w-full text-left px-4 py-3 text-blue-700 font-bold hover:bg-blue-100">登入</button>
                </li>
                <li>
                  <button className="block w-full text-left px-4 py-3 text-blue-700 font-bold hover:bg-blue-100">註冊</button>
                </li>
                <li>
                  <button className="block w-full text-left px-4 py-3 text-gray-400 font-bold cursor-not-allowed bg-gray-100">修改個人資料</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
