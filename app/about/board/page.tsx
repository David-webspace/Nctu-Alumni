"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import boardDataJson from '@/app/data/boardData.json';

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

export default function BoardPage() {
    const data = boardDataJson;
    const [activeTab, setActiveTab] = useState(0);
    const regionKeys = ['general', 'taipei', 'hsinchu', 'taichung', 'kaohsiung', 'shanghai'];
    const regionKey = regionKeys[activeTab];
    const regionData = data[regionKey as keyof typeof data];
    
    return (
        <div className="relative min-h-screen overflow-x-hidden text-black">
            {/* Artistic SVG background */}
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
                    {activeTab !== null ? (
                        // 總會
                        <>
                            <h1 className="text-4xl font-extrabold tracking-wider mb-6 flex items-center">
                            <span className="border-l-8 border-blue-700 mr-4 h-10 inline-block" />理監事名單
                            </h1>
                            <div className="flex items-center mb-4">
                                <span className="w-4 h-4 rounded-full bg-blue-700 mr-3" />
                                <span className="text-2xl font-bold mr-4">理監事名單 - {regionData.title}</span>
                                <span className="text-gray-500 text-lg">{regionData.description}</span>
                            </div>
                            {/* 理事長區塊 */}
                            <div className="flex flex-col md:flex-row items-center gap-8 mt-10 mb-8">
                                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-200 shadow-md flex-shrink-0">
                                    <Image src={regionData.chairman.img} alt="理事長" width={192} height={192} className="object-cover w-full h-full" />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <div className="text-2xl font-bold mb-2">{regionData.chairman.title} {regionData.chairman.name}</div>
                                </div>
                            </div>
                            {/* 副理事長 */}
                            {regionData.viceChairmen.length > 0 && (
                            <div className="flex items-center mb-4">
                                <BlueLabel>副理事長</BlueLabel>
                                <span className="ml-4 text-xl">{regionData.viceChairmen.join('、')}</span>
                            </div>
                            )}
                            {/* 理事 */}
                            {regionData.directors.length > 0 && (
                            <div className="flex items-start mb-4">
                                <BlueLabel>理事</BlueLabel>
                                <span className="ml-4 flex-1 flex flex-wrap gap-x-4 gap-y-2 text-xl">
                                    {regionData.directors.map((name: string, i: number) => (
                                    <span key={i}>{name}</span>
                                    ))}
                                </span>
                            </div>
                            )}
                            {/* 候補理事 */}
                            {regionData.altDirectors.length > 0 && (
                            <div className="flex items-center mb-4">
                                <BlueLabel>候補理事</BlueLabel>
                                <span className="ml-4 text-xl flex flex-wrap gap-x-4 gap-y-2">
                                    {regionData.altDirectors.map((name: string, i: number) => (
                                    <span key={i}>{name}</span>
                                    ))}
                                </span>
                            </div>
                            )}
                            {/* 監事召集人 */}
                            {regionData.convener.length > 0 && (
                            <div className="flex items-center mb-4">
                                <BlueLabel>監事召集人</BlueLabel>
                                <span className="ml-4 text-xl">{regionData.convener.join('、')}</span>
                            </div>
                            )}
                            {/* 監事 */}
                            {regionData.supervisors.length > 0 && (
                            <div className="flex items-center mb-4">
                                <BlueLabel>監事</BlueLabel>
                                <span className="ml-4 text-xl flex flex-wrap gap-x-4 gap-y-2">
                                    {regionData.supervisors.map((name: string, i: number) => (
                                    <span key={i}>{name}</span>
                                    ))}
                                </span>
                            </div>
                            )}
                            {/* 候補監事 */}
                            {regionData.altSupervisors.length > 0 && (
                            <div className="flex items-center mb-4">
                                <BlueLabel>候補監事</BlueLabel>
                                <span className="ml-4 text-xl flex flex-wrap gap-x-4 gap-y-2">
                                    {regionData.altSupervisors.map((name: string, i: number) => (
                                    <span key={i}>{name}</span>
                                    ))}
                                </span>
                            </div>
                            )}
                            {/* 常務監事 */}
                            {regionData.executiveSupervisors.length > 0 && (
                            <div className="flex items-center mb-4">
                                <BlueLabel>常務監事</BlueLabel>
                                <span className="ml-4 text-xl flex flex-wrap gap-x-4 gap-y-2">
                                    {regionData.executiveSupervisors.map((name: string, i: number) => (
                                    <span key={i}>{name}</span>
                                    ))}
                                </span>
                            </div>
                            )}
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
