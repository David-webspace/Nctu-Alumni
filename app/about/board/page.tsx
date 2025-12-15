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
                        jobTitle: item.jobTitle,
                        companyName: item.companyName
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
        <div className="min-h-screen bg-white max-w-4xl mx-auto py-6 px-4">
            <GoToTopButton />

            {/* 返回首頁按鈕 */}
            <div className="mb-6">
                <Link href="/" className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    回首頁
                </Link>
            </div>

            {/* 頁面標題 */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">理監事名單</h1>
                {/* <p className="text-gray-600">Board Members Directory</p> */}
            </div>

            {/* 分校選擇 */}
            <div className="mb-8">
                <div className="flex flex-wrap justify-center gap-2">
                    {branches.map((branch) => (
                        <button
                            key={branch.branchId}
                            onClick={() => setSelectedBranch(branch.branchId)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                selectedBranch === branch.branchId
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {branch.branchName}
                        </button>
                    ))}
                </div>
            </div>

            {/* 內容區域 */}
            {filtering ? (
                <div className="text-center py-12">
                    <div className="inline-flex items-center gap-2 text-gray-600">
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        載入中...
                    </div>
                </div>
            ) : roleGroups.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-500">
                        <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="text-lg font-medium">目前沒有理監事資料</p>
                        <p className="text-sm text-gray-400 mt-1">請選擇其他分校或稍後再試</p>
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    {roleGroups.map((group, index) => (
                        <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                            {/* 職位標題 */}
                            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                                {group.title}
                            </h2>

                            {/* 成員列表 */}
                            <div className="space-y-2">
                                {group.members.map((member, memberIndex) => (
                                    <div key={memberIndex} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                            <span className="font-medium text-gray-900">{member.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {member.companyName && (
                                                <div className="text-sm text-gray-500 hidden sm:block">
                                                    {member.companyName}
                                                </div>
                                            )}
                                            {member.jobTitle && (
                                                <div className="text-sm text-gray-500 hidden sm:block">
                                                    {member.jobTitle}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
