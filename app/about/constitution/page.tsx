"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import GoToTopButton from '@/app/hooks/GoToTopButton';
import { queryConsitutions } from '@/app/api/constitutions';
import { ConstitutionData } from '@/app/admin/association_info/constitution/interface.dto';

interface ConstitutionResponse {
  mwHeader: {
    requestId: string;
  };
  tranRs: {
    items: ConstitutionData[];
  };
}

export default function ConstitutionPage() {
  const [constitutionData, setConstitutionData] = useState<ConstitutionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConstitutions = async () => {
      try {
        setLoading(true);
        console.log('開始獲取章程資料...');

        // 構建符合後端期望的請求格式
        const requestData = {
          mwHeader: {
            requestId: `constitution-${Date.now()}`
          },
          tranRq: {}
        };

        const response: ConstitutionResponse = await queryConsitutions(requestData);
        console.log('API 回應:', response);

        if (response && response.tranRs && response.tranRs.items) {
          setConstitutionData(response.tranRs.items);
          console.log('成功載入章程資料:', response.tranRs.items.length, '個章節');
        } else {
          console.error('API 回應格式不正確:', response);
          setError('API 回應格式不正確');
        }
      } catch (err: unknown) {
        console.error('獲取章程資料時發生錯誤:', err);
        const error = err as { response?: { data?: unknown; status?: number }; message?: string };
        console.error('錯誤詳情:', error.response?.data);
        console.error('錯誤狀態:', error.response?.status);
        console.error('錯誤訊息:', error.message);
        setError(`無法載入章程資料: ${error.message || '未知錯誤'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchConstitutions();
  }, []);
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-6 px-2 sm:px-4">
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl text-gray-600">載入中...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto py-6 px-2 sm:px-4">
        <div className="mb-4">
          <Link href="/" className="inline-block px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
            ← 回首頁
          </Link>
        </div>
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-6 px-2 sm:px-4">
      {/* Go to Top Floating Button */}
      <GoToTopButton />
      <div className="mb-4">
        <Link href="/" className="inline-block px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
          ← 回首頁
        </Link>
      </div>
      <h1 className="text-2xl sm:text-4xl text-black font-extrabold mb-6 sm:mb-8 tracking-tight text-center border-b pb-3 sm:pb-4">組織章程與架構</h1>
      <nav className="mb-8 sm:mb-10">
        <ul className="flex flex-wrap justify-center gap-2 sm:gap-4 bg-blue-50 rounded-md sm:rounded-lg px-2 sm:px-4 py-1.5 sm:py-2 shadow-sm border text-xs sm:text-base">
          {constitutionData.map((item) => (
            <li key={item.chapter.id}>
              <a
                href={`#${item.chapter.slug}`}
                className="smooth-scroll font-semibold text-blue-700 hover:text-blue-900 transition underline underline-offset-2 sm:underline-offset-4 px-1.5 sm:px-2 py-0.5 rounded"
              >
                {item.chapter.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {constitutionData.map((item) => (
        <section
          key={item.chapter.id}
          id={item.chapter.slug}
          className="mb-8 sm:mb-10 text-black bg-white/80 rounded-lg sm:rounded-xl shadow p-3 sm:p-6 border text-sm sm:text-base"
        >
          <h2 className="text-2xl font-bold mb-5 border-l-4 border-blue-400 pl-3">{item.chapter.title}</h2>
          <div className="space-y-4">
            {item.article && item.article.length > 0 ? (
              item.article.map((art) => {
                // 將 \n 轉換為 <br> 標籤
                const formattedContent = art.content.replace(/\n/g, '<br/>');
                return (
                  <div key={art.id} className="flex flex-col sm:flex-row gap-1 sm:gap-2 mb-2">
                    <span className="font-bold w-20 sm:w-24 shrink-0 text-xs sm:text-base leading-8">{art.articleLabel}</span>
                    <div dangerouslySetInnerHTML={{ __html: formattedContent }} className="text-xs sm:text-base mb-2 leading-8"/>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">此章節暫無內容</p>
            )}
          </div>
        </section>
      ))}

      <section id="structure" className="mb-8 sm:mb-10 text-black bg-white/80 rounded-lg sm:rounded-xl shadow p-3 sm:p-6 border text-sm sm:text-base">
        <h2 className="text-2xl font-bold mb-1 border-l-4 border-blue-400 pl-3">組織架構</h2>
        <p className="mb-2 text-black">組織架構</p>
        <ul className="list-disc ml-6">
          <li>
            <a href="https://www.nycu.edu.tw/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-900 transition">
              國立陽明交通大學網站
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/NCTUer" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-900 transition">
              交大校友會FB
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}