"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

// Local imports
import { BoardItem, RoleItem } from "./interface.dto";
import { aboutMenuItems } from "../constants";
import { createBoards, deleteBoard, queryBoards } from "@/app/api/boards";
import { queryRoles } from "@/app/api/roles";
import { queryMemberByIdAndName } from "@/app/api/members";
import { ResponseTemplate } from "@/app/components/interface.dto";
import { MemberItem } from "../../membership_management/interface.dto";
import { useRef } from "react";
import { queryBranches } from "@/app/api/branches";

// Dynamic roles are fetched from API; render will be based on roles list.


/**
 * Association Info Edit Page Component
 * Manages the editing interface for association information pages
 */
const AssociationInfoEditPage = () => {
  // ==================== Config ====================
  const item = aboutMenuItems["board"];

  // ==================== State Management ====================
  const [activeBoardRegion, setActiveBoardRegion] = useState<string>("");
  const [newMemberNames, setNewMemberNames] = useState<Record<string, string>>(
    {}
  );
  const [boardItems, setboardItems] = useState<BoardItem[]>([]);
  const [roles, setRoles] = useState<RoleItem[]>([]);
  const [suggestions, setSuggestions] = useState<Record<string, MemberItem[]>>(
    {}
  );
  const [boardRegionTabs, setBoardRegionTabs] = useState<{ key: string; label: string; }[]>([]);
  const searchTimersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>(
    {}
  );

  const fetchBoards = () => {
    queryBoards()
      .then((res) => {
        const boardItems = res.items || [];
        setboardItems(boardItems);
      })
      .catch(() => {
        // ignore
      });
  };

  useEffect(() => {
    fetchBoards();


    queryRoles()
      .then((res) => {
        const rolesTemplate = res as ResponseTemplate<RoleItem>;
        const rolesArr = rolesTemplate.items;
        setRoles(rolesArr);
        console.log("rolesArray = ", rolesArr);
      })
      .catch(() => {
        // ignore
      });

    const fetchBranches = async () => {
      try {
        const branches = await queryBranches();

        // Sort by branchId ascending
        branches.sort((a, b) => a.branchId.localeCompare(b.branchId));

        const formattedTabs = branches.map(branch => ({
          key: branch.branchId,
          label: branch.branchName,
        }));
        setBoardRegionTabs(formattedTabs);
        if (branches.length > 0) {
          setActiveBoardRegion(branches[0].branchId);
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();


  }, []);

  // Build grouped structure: by region, then by roleId
    const groupedByRegionAndRole = useMemo(() => {
    const acc: Record<string, Record<string, BoardItem[]>> = {};
    const roleNameToId = new Map(roles.map(r => [r.role, r.roleId]));

    for (const item of boardItems) {
      const branchId = item.branch;
      if (!branchId) continue;

      const roleId = roleNameToId.get(item.role) ?? item.role; // Fallback to name if no ID found

      if (!acc[branchId]) {
        acc[branchId] = {};
      }

      if (!acc[branchId][roleId]) {
        acc[branchId][roleId] = [];
      }
      acc[branchId][roleId].push(item);
    }
    return acc;
  }, [boardItems, roles]);

  const handleBoardRegionChange = (branchId: string) => {
    setActiveBoardRegion(branchId);
  };

  const handleDeleteBoard = async (boardId: string) => {
    if (window.confirm("您確定要刪除這位成員嗎？")) {
      try {
        const res = await deleteBoard(boardId);
        if (res.status === 'SUCCESS') {
          setboardItems(prevItems => prevItems.filter(item => item.boardId !== boardId));
          alert("成員已成功刪除");
        } else {
          alert(`刪除失敗: ${res.status}`);
        }
      } catch (error) {
        console.error("Error deleting board member:", error);
        alert("刪除過程中發生錯誤");
      }
    }
  };

  const handleNewMemberInputChange = (field: string, value: string) => {
    setNewMemberNames((prev) => ({ ...prev, [field]: value }));
    // debounce per-role searches
    const timers = searchTimersRef.current;
    if (timers[field]) {
      clearTimeout(timers[field]);
    }
    if (!value.trim()) {
      setSuggestions((prev) => ({ ...prev, [field]: [] }));
      return;
    }
    timers[field] = setTimeout(async () => {
      try {
        const res = await queryMemberByIdAndName(value.trim());
        const tmpl = res as ResponseTemplate<MemberItem>;
        setSuggestions((prev) => ({ ...prev, [field]: tmpl.items || [] }));
      } catch {
        setSuggestions((prev) => ({ ...prev, [field]: [] }));
      }
    }, 300);
  };

  const handleAddMemberToRole = async (roleId: string, member: MemberItem) => {
    try {
      // Call createBoards API
      const response = await createBoards(member.memberId, roleId);

      if (response && response.status === 'SUCCESS') {
        // Refetch the board list to show the new member
        fetchBoards();
        alert("成員已成功新增");
      } else {
        console.error('Failed to add board member', response);
        alert(`新增成員失敗: ${response?.status}`);
      }
    } catch (error) {
      console.error('Error adding board member:', error);
    }
    // clear input and suggestions for this role
    setNewMemberNames((prev) => ({ ...prev, [roleId]: "" }));
    setSuggestions((prev) => ({ ...prev, [roleId]: [] }));
  };

  return (
    <div className="max-w-7xl px-4 py-8">
      <div className="mb-8">
        <Link
          href="/admin/association_info"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
        >
          ← 返回關於校友會管理
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
        <p className="text-gray-600">{item.description}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="flex flex-col lg:flex-row">
          <aside className="lg:w-60 border-b lg:border-b-0 lg:border-r border-gray-200">
            <nav className="flex lg:flex-col flex-row overflow-x-auto">
              {boardRegionTabs.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleBoardRegionChange(key)}
                  className={`flex-1 lg:flex-none px-4 py-3 text-left border-b lg:border-b-0 lg:border-l-4 transition-colors ${
                    activeBoardRegion === key
                      ? "bg-blue-50 border-blue-600 text-blue-700 font-semibold"
                      : "border-transparent text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          <section className="flex-1 p-6">
            <div className="grid gap-6">
              {/* <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">基礎資訊</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">分會名稱</label>
                    <input
                      type="text"
                      value={regionData.title}
                      // onChange={(e) => handleBoardBasicInfoChange('title', e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">理事長職稱</label>
                    <input
                      type="text"
                      value={regionData.chairman.title}
                      // onChange={(e) => handleBoardBasicInfoChange('chairman.title', e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">分會描述</label>
                    <textarea
                      value={regionData.description}
                      // onChange={(e) => handleBoardBasicInfoChange('description', e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                    />
                  </div>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">理事長姓名</label>
                      <input
                        type="text"
                        value={regionData.chairman.name}
                        // onChange={(e) => handleBoardBasicInfoChange('chairman.name', e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">理事長照片 URL</label>
                      <input
                        type="text"
                        value={regionData.chairman.img}
                        // onChange={(e) => handleBoardBasicInfoChange('chairman.img', e.target.value)}
                        placeholder="例如：https://example.com/chairman.jpg"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="mt-1 text-xs text-gray-500">請提供公開圖片 URL，後續可改為上傳檔案</p>
                    </div>
                  </div>
                </div>
              </div> */}

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  成員名單
                </h2>
                <div className="space-y-8">
                  {roles.map(({ roleId, role }) => (
                    <div key={roleId}>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium text-gray-700">
                          {role}
                        </label>
                        <div className="flex gap-2 relative">
                          <input
                            type="text"
                            value={newMemberNames[roleId] ?? ''}
                            onChange={(e) =>
                              handleNewMemberInputChange(roleId, e.target.value)
                            }
                            placeholder={`新增${role}姓名`}
                            className="w-48 rounded-md border border-gray-300 text-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          {/* Suggestions dropdown */}
                          {suggestions[roleId] &&
                            suggestions[roleId].length > 0 && (
                              <div className="mt-2 border border-gray-200 rounded-md bg-white shadow-sm divide-y absolute top-10 left-0 w-full z-50">
                                {suggestions[roleId].map((m) => (
                                  <div
                                    key={m.memberId}
                                    className="flex items-center justify-between px-3 py-2 bg-white"
                                  >
                                    <span className="text-sm text-gray-900">
                                      {m.memberName}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleAddMemberToRole(roleId, m)
                                      }
                                      className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                                    >
                                      新增
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          <button
                            type="button"
                            onClick={() => {}}
                            className="px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            新增
                          </button>
                        </div>
                      </div>

                      {(() => {
                        const members = groupedByRegionAndRole[activeBoardRegion]?.[roleId] ?? [];
                        return members.length === 0;
                      })() ? (
                        <p className="text-sm text-gray-500 border border-dashed border-gray-300 rounded-md px-4 py-3">
                          尚未有資料，請新增成員。
                        </p>
                      ) : (
                        <div className="overflow-x-auto border border-gray-200 rounded-md">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  #
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  姓名
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  學號
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Email
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  電話
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  分校
                                </th>
                                <th className="px-4 py-2" />
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {(
                                groupedByRegionAndRole[activeBoardRegion][
                                  roleId
                                ] ??
                                groupedByRegionAndRole[activeBoardRegion][
                                  role
                                ] ??
                                []
                              ).map((member, index) => (
                                <tr key={member.boardId}>
                                  <td className="px-4 py-2 text-sm text-gray-500 w-10">
                                    {index + 1}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900">
                                    {member.memberName}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900">
                                    {member.memberId}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900">
                                    {member.email}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900">
                                    {member.phone}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900">
                                    {member.branchName}
                                  </td>
                                  <td className="px-4 py-2 text-right">
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteBoard(member.boardId)}
                                      className="px-2 py-1 text-sm text-red-600 hover:text-red-800"
                                    >
                                      刪除
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                type="button"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                onClick={() => alert("保存功能開發中")}
              >
                保存變更
              </button>
              <button
                type="button"
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                onClick={() => alert("即將支援預覽功能")}
              >
                預覽前台
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AssociationInfoEditPage;
