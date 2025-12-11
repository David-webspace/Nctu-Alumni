"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { queryBoards } from '@/app/api/boards';
import { queryBranches } from '@/app/api/branches';
import { queryRoles } from '@/app/api/roles';
import { BoardItem, MemberInfo, RoleItem } from '@/app/admin/association_info/board/interface.dto';
import { BranchItem } from '@/app/admin/membership_management/interface.dto';
import GoToTopButton from '@/app/hooks/GoToTopButton';
import Link from 'next/link';

interface RoleGroup {
    title: string;
    members: MemberInfo[];
}

export default function BoardPage() {
    const [roleGroups, setRoleGroups] = useState<RoleGroup[]>([]);
    const [branches, setBranches] = useState<BranchItem[]>([]);
    const [roles, setRoles] = useState<RoleItem[]>([]);
    const [allBoards, setAllBoards] = useState<BoardItem[]>([]);
    const [selectedBranch, setSelectedBranch] = useState<string>('D01');
    const [loading, setLoading] = useState(true);
    const [filtering, setFiltering] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const processBoards = useCallback((boardItems: BoardItem[], availableRoles: RoleItem[]) => {
        setFiltering(true);

        // 使用 setTimeout 來確保 UI 能夠響應，但實際上處理很快
        setTimeout(() => {
            // 根據選中的分校過濾資料
            // const filteredItems = selectedBranch === 'all'
            //     ? boardItems
            //     : boardItems.filter(item => item.branch === selectedBranch);

            const filteredItems = boardItems.filter(item => item.branch === selectedBranch);

            // 按角色分組
            const groupedData: { [key: string]: MemberInfo[] } = {};

            filteredItems.forEach((item: BoardItem) => {
                // 直接使用 item.role 作為標題
                const roleTitle = item.role;
                if (roleTitle) {
                    if (!groupedData[roleTitle]) {
                        groupedData[roleTitle] = [];
                    }
                    groupedData[roleTitle].push({
                        name: item.memberName,
                        photo: item.photo,
                        description: item.description,
                        email: item.email,
                        phone: item.phone
                    });
                }
            });

            // 根據 API 返回的角色順序來排列
            const result: RoleGroup[] = availableRoles.map(role => ({
                title: role.role,
                members: groupedData[role.role] || []
            })).filter(group => group.members.length > 0);

            setRoleGroups(result);
            setFiltering(false);
        }, 0);
    }, [selectedBranch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // 同時獲取分校、職位和理監事資料
                const [branchesResponse, rolesResponse, boardsResponse] = await Promise.all([
                    queryBranches(),
                    queryRoles(),
                    queryBoards()
                ]);

                branchesResponse.sort((a, b) => a.branchId.localeCompare(b.branchId));
                setBranches(branchesResponse);
                setRoles(rolesResponse.items);
                setAllBoards(boardsResponse.items);
                processBoards(boardsResponse.items, rolesResponse.items);

            } catch (err) {
                console.error('無法載入資料:', err);
                setError('無法載入資料');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [processBoards]);

    // 當選中的分校改變時，即時過濾資料（不需要重新請求 API）
    useEffect(() => {
        if (allBoards.length > 0 && roles.length > 0) {
            processBoards(allBoards, roles);
        }
    }, [selectedBranch, allBoards, roles, processBoards]);

    if (loading) {
        return <div className="text-center py-10">載入中...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen from-blue-50 via-indigo-50 to-purple-50 max-w-5xl mx-auto py-6 px-2 sm:px-4">
            <GoToTopButton />
            <div className="mb-4">
                <Link href="/" className="inline-block px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
                ← 回首頁
                </Link>
            </div>
            <h1 className="text-2xl sm:text-4xl text-black font-extrabold mb-6 sm:mb-8 tracking-tight text-center border-b border-gray-300 pb-3 sm:pb-4">理監事名單</h1>

            {/* 頁面標題區域 */}
            {/* <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">理監事名單</h1>
                            <p className="text-sm text-gray-500">Board Members Directory</p>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* 分校選擇按鈕 */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-3">
                        {/* <button
                            onClick={() => setSelectedBranch('all')}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                                selectedBranch === 'all'
                                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                        >
                            全部分校
                        </button> */}
                        {branches.map((branch) => (
                            <button
                                key={branch.branchId}
                                onClick={() => setSelectedBranch(branch.branchId)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                                    selectedBranch === branch.branchId
                                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                }`}
                            >
                                {branch.branchName}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 內容區域 */}
                {filtering ? (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm">
                            <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="text-gray-600">正在切換分校...</span>
                        </div>
                    </div>
                ) : roleGroups.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="bg-white rounded-2xl p-8 shadow-sm max-w-md mx-auto">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">暫無資料</h3>
                            <p className="text-gray-500">
                                {selectedBranch === 'all' ? '暫無理監事資料' : '該分校暫無理監事資料'}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {roleGroups.map((group, index) => (
                            <div key={index}>
                                {/* 職位標題 */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">{group.title}</h2>
                                        <p className="text-sm text-gray-500">{group.title === '理事長' ? 'Board Chairperson' : group.title === '副理事長' ? 'Vice Chairperson' : group.title === '監事召集人' ? 'Chief Supervisor' : 'Supervisors'}</p>
                                    </div>
                                </div>

                                {/* 理事長特殊顯示 */}
                                {group.title === '理事長' ? (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                        {group.members.map((member, memberIndex) => (
                                            <div key={memberIndex} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                                <div className="flex flex-col items-center text-center">
                                                    {/* 照片 */}
                                                    <div className="relative mb-6">
                                                        {member.photo ? (
                                                            <Image
                                                                src={member.photo}
                                                                alt={member.name}
                                                                width={120}
                                                                height={120}
                                                                className="rounded-full object-cover border-4 border-blue-100"
                                                            />
                                                        ) : (
                                                            <div className="w-[120px] h-[120px] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center border-4 border-blue-100">
                                                                <svg className="w-12 h-12 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                                                            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                                                                理事長
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* 資訊 */}
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                                                    {/* <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                                        </svg>
                                                        <span>電話聯絡中心</span>
                                                    </div> */}
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                                        </svg>
                                                        <span>{member.email}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                                        </svg>
                                                        <span>{member.phone}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    /* 其他職位的卡片顯示 */
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                                        {group.members.map((member, memberIndex) => (
                                            <div key={memberIndex} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                                                <div className="text-center">
                                                    {/* 照片 */}
                                                    <div className="mb-4">
                                                        {member.photo ? (
                                                            <Image
                                                                src={member.photo}
                                                                alt={member.name}
                                                                width={80}
                                                                height={80}
                                                                className="rounded-full object-cover mx-auto border-3 border-gray-100"
                                                            />
                                                        ) : (
                                                            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto border-3 border-gray-100">
                                                                <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {/* 資訊 */}
                                                    <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                                                    {/* <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-2">
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                                        </svg>
                                                        <span>電話聯絡中心</span>
                                                    </div> */}
                                                    {member.email && (
                                                        <p className="text-xs text-gray-500 line-clamp-2">{member.email}</p>
                                                    )}
                                                    {member.phone && (
                                                        <p className="text-xs text-gray-500 line-clamp-2">{member.phone}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* 頁尾 */}
                <div className="text-center mt-16 py-8">
                    <p className="text-sm text-gray-400">© 2025 University Alumni Association. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
