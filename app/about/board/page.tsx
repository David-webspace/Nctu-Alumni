"use client";
import React, { useState, useEffect } from 'react';
import { queryBoards } from '@/app/api/boards';
import { queryBranches } from '@/app/api/branches';
import { queryRoles } from '@/app/api/roles';
import { BoardItem, RoleItem } from '@/app/admin/association_info/board/interface.dto';
import { BranchItem } from '@/app/admin/membership_management/interface.dto';

interface MemberInfo {
    name: string;
    photo?: string;
    description?: string;
}

interface RoleGroup {
    title: string;
    members: MemberInfo[];
}

export default function BoardPage() {
    const [roleGroups, setRoleGroups] = useState<RoleGroup[]>([]);
    const [branches, setBranches] = useState<BranchItem[]>([]);
    const [roles, setRoles] = useState<RoleItem[]>([]);
    const [allBoards, setAllBoards] = useState<BoardItem[]>([]);
    const [selectedBranch, setSelectedBranch] = useState<string>('all');
    const [loading, setLoading] = useState(true);
    const [filtering, setFiltering] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

                setBranches(branchesResponse);
                setRoles(rolesResponse.items);
                setAllBoards(boardsResponse.items);
                processBoards(boardsResponse.items, rolesResponse.items);

            } catch (err) {
                setError('無法載入資料');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // 當選中的分校改變時，即時過濾資料（不需要重新請求 API）
    useEffect(() => {
        if (allBoards.length > 0 && roles.length > 0) {
            processBoards(allBoards, roles);
        }
    }, [selectedBranch, allBoards, roles]);

    const processBoards = (boardItems: BoardItem[], availableRoles: RoleItem[]) => {
        setFiltering(true);

        // 使用 setTimeout 來確保 UI 能夠響應，但實際上處理很快
        setTimeout(() => {
            // 根據選中的分校過濾資料
            const filteredItems = selectedBranch === 'all'
                ? boardItems
                : boardItems.filter(item => item.branch === selectedBranch);

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
                        description: item.description
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
    };

    if (loading) {
        return <div className="text-center py-10">載入中...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">理監事名單</h1>

            <div className="flex gap-6">
                {/* 左側分校選單 */}
                <div className="w-64 flex-shrink-0">
                    <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">選擇分校</h3>
                        <div className="space-y-2">
                            <button
                                onClick={() => setSelectedBranch('all')}
                                className={`w-full text-left px-3 py-2 rounded transition-colors ${
                                    selectedBranch === 'all'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                }`}
                            >
                                全部分校
                            </button>
                            {branches.map((branch) => (
                                <button
                                    key={branch.branchId}
                                    onClick={() => setSelectedBranch(branch.branchId)}
                                    className={`w-full text-left px-3 py-2 rounded transition-colors ${
                                        selectedBranch === branch.branchId
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                    }`}
                                >
                                    {branch.branchName}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 右側理監事名單 */}
                <div className="flex-1">
                    {filtering ? (
                        <div className="text-center py-10 text-gray-500">
                            <div className="inline-flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                正在切換分校...
                            </div>
                        </div>
                    ) : roleGroups.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            {selectedBranch === 'all' ? '暫無理監事資料' : '該分校暫無理監事資料'}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {roleGroups.map((group, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                                    <h2 className="text-xl font-semibold mb-4 text-blue-700 border-b-2 border-blue-200 pb-2">
                                        {group.title}
                                    </h2>
                                    {/* 理事長特殊顯示 */}
                                    {group.title === '理事長' ? (
                                        <div className="space-y-4">
                                            {group.members.map((member, memberIndex) => (
                                                <div key={memberIndex} className="flex flex-col md:flex-row items-center md:items-start gap-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                                                    {/* 照片 */}
                                                    <div className="flex-shrink-0">
                                                        {member.photo ? (
                                                            <img 
                                                                src={member.photo} 
                                                                alt={member.name}
                                                                className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow-lg"
                                                            />
                                                        ) : (
                                                            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center border-4 border-blue-200 shadow-lg">
                                                                <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* 姓名和描述 */}
                                                    <div className="flex-1 text-center md:text-left">
                                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h3>
                                                        <p className="text-lg font-medium text-blue-600 mb-3">理事長</p>
                                                        {member.description && (
                                                            <p className="text-gray-700 leading-relaxed">{member.description}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        // 其他職位正常顯示
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-gray-700">
                                            {group.members.map((member, memberIndex) => (
                                                <div key={memberIndex} className="bg-gray-50 rounded px-3 py-2 text-center">
                                                    {member.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
