"use client";
import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // 檢查是否在後台路由
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* 如果是後台路由，不顯示任何導航 */}
      {isAdminRoute ? (
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* 後台只顯示 Logo */}
          <Link href="/admin" className="flex items-center space-x-6 text-xl font-bold text-black hover:text-blue-900 transition-colors">
            <Image src="/logo.png" alt="" width={80} height={80} className="w-auto h-auto" />
            <span>NCTU Alumni - 管理後台</span>
          </Link>
        </div>
      ) : (
        <>
          {/* Mobile Hamburger - 只在前台顯示 */}
          <div className="max-w-7xl mx-auto md:hidden flex items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-black">
              <Image src="/logo.png" alt="" width={48} height={48} className="w-12" />
              <span>NCTU Alumni</span>
            </Link>
            <button
              className="block md:hidden p-2 rounded hover:bg-gray-200 focus:outline-none"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="開啟選單"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation - 只在前台顯示 */}
          <div className="max-w-7xl mx-auto px-4 py-3 hidden md:flex items-center justify-between flex-wrap gap-4">
            {/* Logo / Site Title */}
            <Link href="/" className="flex items-center space-x-6 text-xl font-bold text-black hover:text-blue-900 transition-colors">
              <Image src="/logo.png" alt="" width={80} height={80} className="w-auto h-auto" />
              <span>NCTU Alumni</span>
            </Link>

            {/* Navigation */}
            <nav className="flex flex-wrap items-center gap-2 md:gap-6">
              <Link href="/" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">首頁</Link>
              <Link href="/news" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">最新消息</Link>
              <Link href="/#activity-calendar" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">活動行事曆</Link>
              {/* Dropdown for 關於校友會 */}
              <div className="relative group inline-block">
                <button
                  className="text-gray-700 hover:text-blue-700 font-medium transition-colors focus:outline-none"
                >
                  關於校友會
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white border border-blue-700 rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto z-50 transition-opacity duration-200">
                  <div className="bg-blue-700 text-white px-4 py-2 font-bold rounded-t">關於校友會</div>
                  <ul className="divide-y divide-blue-100">
                    <li>
                      <Link href="/about/constitution" className="block px-4 py-3 hover:bg-blue-100 font-bold text-black">組織章程與架構</Link>
                    </li>
                    <li>
                      <Link href="https://forms.gle/8QC2cLV2KFFDcgUb8" target="_blank" className="block px-4 py-3 hover:bg-blue-100 font-bold text-black">加入校友會</Link>
                    </li>
                    <li>
                      <Link href="/about/contact" className="block px-4 py-3 hover:bg-blue-100 font-bold text-black">相關聯絡訊息</Link>
                    </li>
                    <li>
                      <Link href="/about/board" className="block px-4 py-3 hover:bg-blue-100 font-bold text-black">理監事名單</Link>
                    </li>
                    {/* <li>
                      <Link href="/about/clubs" className="block px-4 py-3 hover:bg-blue-100 font-bold text-black">社團介紹/系友會介紹</Link>
                    </li> */}
                    <li>
                      <Link href="https://nctu-alumni-voice.sec.nycu.edu.tw/" target='_blank' className="block px-4 py-3 hover:bg-blue-100 font-bold text-black">交大友聲</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
      {/* Mobile menu - 只在前台顯示 */}
      {!isAdminRoute && mobileMenuOpen && (
        <div className="max-w-7xl mx-auto md:hidden bg-white shadow-lg border-t border-blue-100 px-4 pt-2 pb-4 z-50">
          <nav className="flex flex-col gap-2">
            <Link href="/" className="py-2 text-gray-700 hover:text-blue-700 font-medium transition-colors">首頁</Link>
            <Link href="/news" className="py-2 text-gray-700 hover:text-blue-700 font-medium transition-colors">最新消息</Link>
            <Link href="/#activity-calendar" className="py-2 text-gray-700 hover:text-blue-700 font-medium transition-colors">活動行事曆</Link>
            {/* Dropdown for 關於校友會 */}
            <details className="py-2">
              <summary className="cursor-pointer text-gray-700 hover:text-blue-700 font-medium">關於校友會</summary>
              <ul className="ml-4 mt-2 border-l border-blue-200 pl-2">
                <li><Link href="/about/constitution" className="block py-2 font-bold text-black hover:bg-blue-100">組織章程與架構</Link></li>
                <li><Link href="https://forms.gle/8QC2cLV2KFFDcgUb8" className="block py-2 font-bold text-black hover:bg-blue-100">加入校友會</Link></li>
                <li><Link href="/about/contact" className="block py-2 font-bold text-black hover:bg-blue-100">相關聯絡訊息</Link></li>
                <li><Link href="/about/board" className="block py-2 font-bold text-black hover:bg-blue-100">理監事名單</Link></li>
                {/* <li><Link href="/about/clubs" className="block py-2 font-bold text-black hover:bg-blue-100">社團介紹/系友會介紹</Link></li> */}
                <li><Link href="https://nctu-alumni-voice.sec.nycu.edu.tw/" target='_blank' className="block py-2 font-bold text-black hover:bg-blue-100">交大友聲</Link></li>
              </ul>
            </details>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
