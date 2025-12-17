"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import boardDataJson from '@/app/data/boardData.json';

// Local imports
import { BoardListFieldKey, BoardDataMap, BoardRegion, BoardRegionKey, Member } from './interface.dto';
import { aboutMenuItems } from '../constants';

const boardRegionTabs = [
  { key: 'general', label: '總會' },
  { key: 'taipei', label: '台北分會' },
  { key: 'hsinchu', label: '新竹分會' },
  { key: 'taichung', label: '台中分會' },
  { key: 'kaohsiung', label: '高雄分會' },
  { key: 'shanghai', label: '上海分會' },
] as const;

const boardListFieldConfigs: { key: BoardListFieldKey; label: string }[] = [
  { key: 'viceChairmen', label: '副理事長' },
  { key: 'executiveSecratary', label: '常務秘書' },
  { key: 'executiveDirectors', label: '常務理事' },
  { key: 'directors', label: '理事' },
  { key: 'altDirectors', label: '候補理事' },
  { key: 'convener', label: '監事召集人' },
  { key: 'executiveSupervisors', label: '常務監事' },
  { key: 'supervisors', label: '監事' },
  { key: 'altSupervisors', label: '候補監事' },
];

const createInitialBoardData = (): BoardDataMap => {
  type BoardDataRaw = Record<string, {
  title?: string;
  description?: string;
  chairman?: {
    name?: string;
    title?: string;
    img?: string;
  };
  [key: string]: unknown; // Define other fields explicitly if possible
}>;

const raw = boardDataJson as BoardDataRaw;


  return boardRegionTabs.reduce((acc, { key }) => {
    const region = raw[key] ?? {};

    const baseRegion: BoardRegion = {
      title: region.title ?? '',
      description: region.description ?? '',
      chairman: {
        name: region.chairman?.name ?? '',
        title: region.chairman?.title ?? '',
        img: region.chairman?.img ?? '',
      },
      viceChairmen: [],
      executiveSecratary: [],
      executiveDirectors: [],
      directors: [],
      altDirectors: [],
      convener: [],
      executiveSupervisors: [],
      supervisors: [],
      altSupervisors: [],
    };

    boardListFieldConfigs.forEach(({ key: fieldKey }) => {
      const values = region[fieldKey];
      if (Array.isArray(values)) {
        // value may be string[] from JSON or Member[] already
        baseRegion[fieldKey] = values.map((v: string | Member) =>
          typeof v === 'string'
            ? { name: v, email: '', phone: '' } as Member
            : {
                name: v?.name ?? '',
                email: v?.email ?? '',
                phone: v?.phone ?? '',
              } as Member
        );
      } else {
        baseRegion[fieldKey] = [];
      }
    });

    acc[key] = baseRegion;
    return acc;
  }, {} as BoardDataMap);
};


/**
 * Association Info Edit Page Component
 * Manages the editing interface for association information pages
 */
const AssociationInfoEditPage = () => {
  // ==================== Config ====================
  const item = aboutMenuItems['board'];

  // ==================== State Management ====================
  const [boardData, setBoardData] = useState<BoardDataMap>(createInitialBoardData());
  const [activeBoardRegion, setActiveBoardRegion] = useState<BoardRegionKey>('general');
  const [newMemberNames, setNewMemberNames] = useState<Record<BoardListFieldKey, string>>({
    viceChairmen: '',
    executiveSecratary: '',
    executiveDirectors: '',
    directors: '',
    altDirectors: '',
    convener: '',
    executiveSupervisors: '',
    supervisors: '',
    altSupervisors: '',
  });

  const handleBoardRegionChange = (region: BoardRegionKey) => {
    setActiveBoardRegion(region);
  };

  const handleBoardBasicInfoChange = (
    field: 'title' | 'description' | 'chairman.name' | 'chairman.title' | 'chairman.img',
    value: string
  ) => {
    setBoardData((prev) => {
      const updated = { ...prev };
      const region = { ...updated[activeBoardRegion] };

      if (field === 'title' || field === 'description') {
        region[field] = value;
      } else {
        const [, key] = field.split('.') as ['chairman', 'name' | 'title' | 'img'];
        region.chairman = {
          ...region.chairman,
          [key]: value,
        };
      }

      updated[activeBoardRegion] = region;
      return updated;
    });
  };

  const handleAddBoardListItem = (field: BoardListFieldKey) => {
    const newName = newMemberNames[field].trim();
    if (!newName) return;

    setBoardData((prev) => {
      const updated = { ...prev };
      const region = { ...updated[activeBoardRegion] };
      region[field] = [
        ...region[field],
        { name: newName, email: '', phone: '' } as Member,
      ];
      updated[activeBoardRegion] = region;
      return updated;
    });

    setNewMemberNames((prev) => ({ ...prev, [field]: '' }));
  };

  const handleRemoveBoardListItem = (field: BoardListFieldKey, index: number) => {
    // 使用 setTimeout 來避免阻塞 UI
    setTimeout(() => {
      setBoardData((prev) => {
        const updated = { ...prev };
        const region = { ...updated[activeBoardRegion] };
        region[field] = region[field].filter((_, idx) => idx !== index);
        updated[activeBoardRegion] = region;
        return updated;
      });
    }, 0);
  };

  const handleNewMemberInputChange = (field: BoardListFieldKey, value: string) => {
    setNewMemberNames((prev) => ({ ...prev, [field]: value }));
  };
  // ==================== Main Render (Board/Member only) ====================
  const regionData = boardData[activeBoardRegion];
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
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
                      ? 'bg-blue-50 border-blue-600 text-blue-700 font-semibold'
                      : 'border-transparent text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          <section className="flex-1 p-6">
            <div className="grid gap-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">基礎資訊</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">分會名稱</label>
                    <input
                      type="text"
                      value={regionData.title}
                      onChange={(e) => handleBoardBasicInfoChange('title', e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">理事長職稱</label>
                    <input
                      type="text"
                      value={regionData.chairman.title}
                      onChange={(e) => handleBoardBasicInfoChange('chairman.title', e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">分會描述</label>
                    <textarea
                      value={regionData.description}
                      onChange={(e) => handleBoardBasicInfoChange('description', e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                    />
                  </div>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">理事長姓名</label>
                      <input
                        type="text"
                        value={regionData.chairman.name}
                        onChange={(e) => handleBoardBasicInfoChange('chairman.name', e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">理事長照片 URL</label>
                      <input
                        type="text"
                        value={regionData.chairman.img}
                        onChange={(e) => handleBoardBasicInfoChange('chairman.img', e.target.value)}
                        placeholder="例如：https://example.com/chairman.jpg"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="mt-1 text-xs text-gray-500">請提供公開圖片 URL，後續可改為上傳檔案</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">成員名單</h2>
                <div className="space-y-8">
                  {boardListFieldConfigs.map(({ key, label }) => (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium text-gray-700">{label}</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newMemberNames[key]}
                            onChange={(e) => handleNewMemberInputChange(key, e.target.value)}
                            placeholder={`新增${label}姓名`}
                            className="w-48 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddBoardListItem(key)}
                            className="px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            新增
                          </button>
                        </div>
                      </div>

                      {regionData[key].length === 0 ? (
                        <p className="text-sm text-gray-500 border border-dashed border-gray-300 rounded-md px-4 py-3">
                          尚未有資料，請新增成員。
                        </p>
                      ) : (
                        <div className="overflow-x-auto border border-gray-200 rounded-md">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">電話</th>
                                <th className="px-4 py-2" />
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {regionData[key].map((member, index) => (
                                <tr key={`${key}-${index}`}>
                                  <td className="px-4 py-2 text-sm text-gray-500 w-10">{index + 1}</td>
                                  <td className="px-4 py-2 text-sm text-gray-900">{member.name}</td>
                                  <td className="px-4 py-2 text-sm text-gray-900">{member.email}</td>
                                  <td className="px-4 py-2 text-sm text-gray-900">{member.phone}</td>
                                  <td className="px-4 py-2 text-right">
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveBoardListItem(key, index)}
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
                onClick={() => alert('保存功能開發中')}
              >
                保存變更
              </button>
              <button
                type="button"
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                onClick={() => alert('即將支援預覽功能')}
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
