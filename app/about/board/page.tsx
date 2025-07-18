"use client";
import React, { useState } from 'react';
import Image from 'next/image';

// Placeholder image for 理事長 (replace with actual image path in /public)
const chairmanImg = '/general_director.jpg';

const boardData = {
  chairman: {
    name: '姜長安',
    title: '理事長',
    img: chairmanImg,
  },
  viceChairmen: ['吳廣義', '汪秉龍'],
  directors: [
    '王震緒', '何俊輝', '余孝先', '吳宗賢', '吳銘雄', '李正中', '李志強', '李明哲', '杜彥宏', '杜書全',
    '周世傑', '林行憲', '林志明', '姜長安', '柯富仁', '翁順峰', '張財銘', '陳永富', '陳冠州', '陳國源',
    '楊明芳', '歐耿良', '蔡宜謙', '盧豐裕', '顏光裕',
  ],
  altDirectors: ['周賢穎', '郭加永', '曹暘正', '陳榮邦', '黃才丞', '黃貞凱', '黃建平', '楊偉森', '鄭竹明'],
  convener: ['郝挺'],
  supervisors: ['方振洲', '沈文義', '林嘉勳', '馬鴻方', '趙書華', '劉家瑞', '鄭光遠', '鍾惠民'],
  altSupervisors: ['江國泉', '黃源南', '葉明水'],
};

function BlueLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block w-40 bg-blue-700 text-white font-bold rounded px-6 py-1 text-lg mb-2 shadow-md">
      {children}
    </span>
  );
}

const tabs = [
  '總會',
  '台北分會',
  '新竹分會',
  '台中分會',
  '高雄分會',
  '上海分會',
];

import boardDataJson from '@/app/data/boardData.json';
const data = boardDataJson;

export default function BoardPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="relative min-h-screen bg-[#fcfaec] overflow-x-hidden text-black">
      {/* Artistic SVG background */}
      <svg className="absolute left-0 top-1/3 w-full opacity-20 z-0" height="400" viewBox="0 0 1200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 300 Q400 100 1200 350" stroke="#bdbdbd" strokeWidth="24" fill="none" />
      </svg>
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">
        {/* Tabs */}
        <aside className="md:w-52 w-full mb-4 md:mb-0">
          <nav className="flex md:flex-col flex-row gap-2 md:gap-4">
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-lg font-semibold transition-all border-l-4 md:border-l-4 border-b-4 md:border-b-0 border-transparent text-left hover:bg-blue-50 hover:border-blue-300 ${
                  activeTab === idx ? 'bg-blue-700 text-white border-blue-700 shadow-md' : 'bg-white text-blue-900'
                }`}
                onClick={() => setActiveTab(idx)}
              >
                {tab}
              </button>
            ))}
          </nav>
        </aside>
        {/* Content */}
        <section className="flex-1">
          {activeTab === 0 ? (
            // 總會
            <>
              <h1 className="text-4xl font-extrabold tracking-wider mb-6 flex items-center">
                <span className="border-l-8 border-blue-700 mr-4 h-10 inline-block" />理監事名單
              </h1>
              <div className="flex items-center mb-4">
                <span className="w-4 h-4 rounded-full bg-blue-700 mr-3" />
                <span className="text-2xl font-bold mr-4">理監事名單 - 總會</span>
                <span className="text-gray-500 text-lg">國立交通大學總會 第8屆理監事名單</span>
              </div>
              {/* 理事長區塊 */}
              <div className="flex flex-col md:flex-row items-center gap-8 mt-10 mb-8">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-200 shadow-md flex-shrink-0">
                  <Image src={boardData.chairman.img} alt="理事長" width={192} height={192} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="text-2xl font-bold mb-2">{boardData.chairman.title} {boardData.chairman.name}</div>
                </div>
              </div>
              {/* 副理事長 */}
              <div className="flex items-center mb-4">
                <BlueLabel>副理事長</BlueLabel>
                <span className="ml-4 text-xl">{boardData.viceChairmen.join('、')}</span>
              </div>
              {/* 理事 */}
              <div className="flex items-start mb-4">
                <BlueLabel>理事</BlueLabel>
                <span className="ml-4 flex-1 flex flex-wrap gap-x-4 gap-y-2 text-xl">
                  {boardData.directors.map((name, i) => (
                    <span key={i}>{name}</span>
                  ))}
                </span>
              </div>
              {/* 候補理事 */}
              <div className="flex items-center mb-4">
                <BlueLabel>候補理事</BlueLabel>
                <span className="ml-4 text-xl flex flex-wrap gap-x-4 gap-y-2">
                  {boardData.altDirectors.map((name, i) => (
                    <span key={i}>{name}</span>
                  ))}
                </span>
              </div>
              {/* 監事召集人 */}
              <div className="flex items-center mb-4">
                <BlueLabel>監事召集人</BlueLabel>
                <span className="ml-4 text-xl">{boardData.convener.join('、')}</span>
              </div>
              {/* 監事 */}
              <div className="flex items-center mb-4">
                <BlueLabel>監事</BlueLabel>
                <span className="ml-4 text-xl flex flex-wrap gap-x-4 gap-y-2">
                  {boardData.supervisors.map((name, i) => (
                    <span key={i}>{name}</span>
                  ))}
                </span>
              </div>
              {/* 候補監事 */}
              <div className="flex items-center mb-4">
                <BlueLabel>候補監事</BlueLabel>
                <span className="ml-4 text-xl flex flex-wrap gap-x-4 gap-y-2">
                  {boardData.altSupervisors.map((name, i) => (
                    <span key={i}>{name}</span>
                  ))}
                </span>
              </div>
            </>
          ) : activeTab === 1 ? (
            // 台北分會
            <>
              <h1 className="text-4xl font-extrabold tracking-wider mb-6 flex items-center">
                <span className="border-l-8 border-blue-700 mr-4 h-10 inline-block" />理監事名單
              </h1>
              <div className="flex items-center mb-4">
                <span className="w-4 h-4 rounded-full bg-blue-700 mr-3" />
                <span className="text-2xl font-bold mr-4">理監事名單 - 台北分會</span>
                <span className="text-gray-500 text-lg">國立交通大學台北分會 第11屆理監事名單</span>
              </div>
              {/* 理事長區塊 */}
              <div className="flex flex-col md:flex-row items-center gap-8 mt-10 mb-8">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-200 shadow-md flex-shrink-0">
                  <Image src={data.taipei.chairman.img} alt="理事長" width={192} height={192} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="text-2xl font-bold mb-2">{data.taipei.chairman.title} {data.taipei.chairman.name}</div>
                </div>
              </div>
              {/* 副理事長 */}
              <div className="flex items-center mb-4">
                <BlueLabel>副理事長</BlueLabel>
                <span className="ml-4 text-xl">{data.taipei.viceChairmen.join('、')}</span>
              </div>
              {/* 常務理事 */}
              <div className="flex items-center mb-4">
                <BlueLabel>常務理事</BlueLabel>
                <span className="ml-4 text-xl flex flex-wrap gap-x-4 gap-y-2">
                  {data.taipei.executiveDirectors.map((name: string, i: number) => (
                    <span key={i}>{name}</span>
                  ))}
                </span>
              </div>
              {/* 理事 */}
              <div className="flex items-start mb-4">
                <BlueLabel>理事</BlueLabel>
                <span className="ml-4 flex-1 flex flex-wrap gap-x-4 gap-y-2 text-xl">
                  {data.taipei.directors.map((name: string, i: number) => (
                    <span key={i}>{name}</span>
                  ))}
                </span>
              </div>
              {/* 候補理事 */}
              <div className="flex items-center mb-4">
                <BlueLabel>候補理事</BlueLabel>
                <span className="ml-4 text-xl flex flex-wrap gap-x-4 gap-y-2">
                  {data.taipei.altDirectors.map((name: string, i: number) => (
                    <span key={i}>{name}</span>
                  ))}
                </span>
              </div>
              {/* 監事召集人 */}
              <div className="flex items-center mb-4">
                <BlueLabel>監事召集人</BlueLabel>
                <span className="ml-4 text-xl">{data.taipei.convener.join('、')}</span>
              </div>
              {/* 常務監事 */}
              <div className="flex items-center mb-4">
                <BlueLabel>常務監事</BlueLabel>
                <span className="ml-4 text-xl flex flex-wrap gap-x-4 gap-y-2">
                  {data.taipei.executiveSupervisors.map((name: string, i: number) => (
                    <span key={i}>{name}</span>
                  ))}
                </span>
              </div>
              {/* 監事 */}
              <div className="flex items-center mb-4">
                <BlueLabel>監事</BlueLabel>
                <span className="ml-4 text-xl flex flex-wrap gap-x-4 gap-y-2">
                  {data.taipei.supervisors.map((name: string, i: number) => (
                    <span key={i}>{name}</span>
                  ))}
                </span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-32 text-2xl text-gray-400">
              <span className="mb-2">{tabs[activeTab]}</span>
              <span>尚未有資料</span>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
