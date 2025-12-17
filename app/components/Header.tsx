import Link from "next/link";
import Image from "next/image";
import { headers } from 'next/headers';
import MobileMenu from './MobileMenu';

const Header = async () => {
  // 獲取路徑信息
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';

  // 檢查是否在後台路由
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* 如果是後台路由，只顯示簡化版本 */}
      {isAdminRoute ? (
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Link href="/admin" className="flex items-center space-x-6 text-xl font-bold text-black hover:text-blue-900 transition-colors">
            <Image src="/logo.png" alt="NCTU Alumni Logo" width={80} height={80} className="w-auto h-auto" />
            <span>NCTU Alumni - 管理後台</span>
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop Navigation - 服務器端渲染 */}
          <div className="max-w-7xl mx-auto px-4 py-3 hidden md:flex items-center justify-between flex-wrap gap-4">
            {/* Logo / Site Title */}
            <Link href="/" className="flex items-center space-x-6 text-xl font-bold text-black hover:text-blue-900 transition-colors">
              <Image src="/logo.png" alt="NCTU Alumni Logo" width={80} height={80} className="w-auto h-auto" />
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
                    <li>
                      <Link href="https://nctu-alumni-voice.sec.nycu.edu.tw/" target='_blank' className="block px-4 py-3 hover:bg-blue-100 font-bold text-black">交大友聲</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>

          {/* Mobile Navigation - 只有手機版需要客戶端交互 */}
          <MobileMenu />
        </>
      )}
    </header>
  );
};

export default Header;
