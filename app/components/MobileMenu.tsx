"use client";
import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";

const MobileMenu = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="max-w-7xl mx-auto md:hidden flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-black">
          <Image src="/logo.png" alt="NCTU Alumni Logo" width={48} height={48} className="w-12" />
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

      {/* Mobile menu */}
      {mobileMenuOpen && (
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
                <li><Link href="https://nctu-alumni-voice.sec.nycu.edu.tw/" target='_blank' className="block py-2 font-bold text-black hover:bg-blue-100">交大友聲</Link></li>
              </ul>
            </details>
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
