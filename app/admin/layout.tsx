"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/context/AuthContext';

function AdminContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // If not loading and user is not admin, redirect to login
    if (!loading && !user?.isAdmin) {
      const loginUrl = new URL('/login', window.location.origin);
      loginUrl.searchParams.set('from', pathname);
      router.push(loginUrl.toString());
    }
  }, [user, loading, pathname, router]);

  // Show loading state or nothing while checking auth
  if (loading || !isClient || !user?.isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">驗證中...</p>
        </div>
      </div>
    );
  }

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
      <main className="flex-1 flex flex-col overflow-y-auto">
        <div className="flex-grow p-10">
          {children}
        </div>
      </main>
    </div>
  );
}

const adminPages = [
  { name: '管理主頁', path: '/admin' },
  { name: '最新消息', path: '/admin/latest_news' },
  { name: '行事曆', path: '/admin/event_calendar' },
  { name: '會員管理', path: '/admin/membership_management' },
  // { name: '校友會介紹/組織', path: '/admin/association_intro' },
  { name: '校友會資訊', path: '/admin/association_info' },
  // { name: '校友社團資訊', path: '/admin/club_info' },
  // { name: '募款進度', path: '/admin/donation_progress' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminContent>{children}</AdminContent>
    </AuthProvider>
  );
}
