"use client";
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { usePathname } from 'next/navigation';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;
    
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/session', {
          cache: 'no-store',
          credentials: 'same-origin'
        });
        if (isMounted && response.ok) {
          const data = await response.json();
          setIsAdmin(data.isAdmin);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { 
        method: 'POST',
        credentials: 'same-origin'
      });
      if (response.ok) {
        setIsAdmin(false);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center justify-between px-4 py-3">
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
          {/* <Link href="/#plan-and-donation" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">計畫與捐贈</Link> */}
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
                {/* <li>
                  <Link href="/about/ceo" className="block px-4 py-3 hover:bg-blue-100 font-bold text-black">理事長的話</Link>
                </li> */}
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
          {/* Show login button for non-admin users on non-home pages */}
          {!isAdmin && !isLoading && pathname !== '/' && (
            <Link
              href="/login"
              className="ml-6 px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all duration-200 font-medium"
            >
              管理員登入
            </Link>
          )}
          
          {/* Admin controls - only show when user is admin */}
          {isAdmin && (
            <>
              <Link
                href="/admin"
                className="ml-6 px-5 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 hover:ring-2 hover:ring-gray-400 transition-all duration-200 font-bold flex items-center gap-2 border border-gray-300"
                style={{ minWidth: '120px' }}
              >
                頁面管理
              </Link>
              
              {/* Admin profile dropdown */}
              <div className="relative group ml-4">
                <button 
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
                  aria-label="管理員選單"
                >
                  <CgProfile className="w-6 h-6 text-gray-700" />
                </button>
                
                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <ul className="py-1">
                    <li>
                      <Link 
                        href="/admin" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        管理後台
                      </Link>
                    </li>
                    <li>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                      >
                        <CgLogOut className="mr-2" /> 登出
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-blue-100 px-4 pt-2 pb-4 z-50">
          <nav className="flex flex-col gap-2">
            <Link href="/" className="py-2 text-gray-700 hover:text-blue-700 font-medium transition-colors">首頁</Link>
            <Link href="/#latest-news" className="py-2 text-gray-700 hover:text-blue-700 font-medium transition-colors">最新消息</Link>
            <Link href="/#activity-calendar" className="py-2 text-gray-700 hover:text-blue-700 font-medium transition-colors">活動行事曆</Link>
            {/* <Link href="/#plan-and-donation" className="py-2 text-gray-700 hover:text-blue-700 font-medium transition-colors">計畫與捐贈</Link> */}
            {/* Dropdown for 關於校友會 */}
            <details className="py-2">
              <summary className="cursor-pointer text-gray-700 hover:text-blue-700 font-medium">關於校友會</summary>
              <ul className="ml-4 mt-2 border-l border-blue-200 pl-2">
                <li><Link href="/about/constitution" className="block py-2 font-bold text-black hover:bg-blue-100">組織章程與架構</Link></li>
                {/* <li><Link href="/about/ceo" className="block py-2 font-bold text-black hover:bg-blue-100">理事長的話</Link></li> */}
                <li><Link href="/about/contact" className="block py-2 font-bold text-black hover:bg-blue-100">相關聯絡訊息</Link></li>
                <li><Link href="/about/board" className="block py-2 font-bold text-black hover:bg-blue-100">理監事名單</Link></li>
                <li><Link href="/about/clubs" className="block py-2 font-bold text-black hover:bg-blue-100">社團介紹/系友會介紹</Link></li>
                <li><Link href="/about/voice" className="block py-2 font-bold text-black hover:bg-blue-100">交大友聲</Link></li>
              </ul>
            </details>
            {isAdmin && (
              <Link href="/admin" className="mt-2 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 font-bold border border-gray-300 block text-center">
                頁面管理
              </Link>
            )}
            {/* Profile actions */}
            <div className="mt-2">
              {!isAdmin ? (
                <>
                  <Link href="/login" className="block w-full text-left px-4 py-3 text-blue-700 font-bold hover:bg-blue-100">登入</Link>
                  <button className="block w-full text-left px-4 py-3 text-gray-400 font-bold cursor-not-allowed bg-gray-100">註冊</button>
                </>
              ) : (
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-3 text-red-600 font-bold hover:bg-red-50"
                >
                  <CgLogOut className="mr-2" /> 登出
                </button>
              )}
              <button className="block w-full text-left px-4 py-3 text-gray-400 font-bold cursor-not-allowed bg-gray-100">修改個人資料</button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
