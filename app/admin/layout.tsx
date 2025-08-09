"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const adminPages = [
  { name: '管理主頁', path: '/admin' },
  { name: '最新消息', path: '/admin/latest_news' },
  { name: '行事曆', path: '/admin/event_calendar' },
  { name: '會員管理', path: '/admin/membership_management' },
  { name: '校友會介紹/組織', path: '/admin/association_intro' },
  { name: '校友會資訊', path: '/admin/association_info' },
  { name: '校友社團資訊', path: '/admin/club_info' },
  { name: '募款進度', path: '/admin/donation_progress' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 text-2xl font-bold text-gray-800 border-b border-gray-200">
          交大校友會管理系統
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {adminPages.map((page) => {
            const isActive = pathname === page.path;
            return (
              <Link 
                key={page.path} 
                href={page.path} 
                className={`block px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}>
                {page.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
