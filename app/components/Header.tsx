import React from 'react';
import Link from "next/link";
import Image from "next/image";

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
        {/* Profile Icon & Dropdown */}
        <div className="relative group ml-6">
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 focus:outline-none">
            {/* You can replace this SVG with an Image if you have a user icon */}
            <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a8.963 8.963 0 01-6.879-3.196z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
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
    </header>
  );
};

export default Header;
