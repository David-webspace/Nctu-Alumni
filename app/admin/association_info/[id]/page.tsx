"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import boardDataJson from '@/app/data/boardData.json';

const boardRegionTabs = [
  { key: 'general', label: '總會' },
  { key: 'taipei', label: '台北分會' },
  { key: 'hsinchu', label: '新竹分會' },
  { key: 'taichung', label: '台中分會' },
  { key: 'kaohsiung', label: '高雄分會' },
  { key: 'shanghai', label: '上海分會' },
] as const;

type BoardRegionKey = typeof boardRegionTabs[number]['key'];

type BoardListFieldKey =
  | 'viceChairmen'
  | 'executiveSecratary'
  | 'executiveDirectors'
  | 'directors'
  | 'altDirectors'
  | 'convener'
  | 'executiveSupervisors'
  | 'supervisors'
  | 'altSupervisors';

type BoardRegion = {
  title: string;
  description: string;
  chairman: {
    name: string;
    title: string;
    img: string;
  };
} & {
  [K in BoardListFieldKey]: string[];
};

type BoardDataMap = Record<BoardRegionKey, BoardRegion>;

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
  const raw = boardDataJson as Record<string, any>;

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
      baseRegion[fieldKey] = Array.isArray(values) ? [...values] : [];
    });

    acc[key] = baseRegion;
    return acc;
  }, {} as BoardDataMap);
};

// Local imports
import { queryConsitutions, updateArticle } from '@/app/api/constitutions';
import { ConstitutionData, ConstitutionResponse, Article } from './types';
import { aboutMenuItems } from './constants';
import { SortableChapterItem } from './components';

/**
 * Association Info Edit Page Component
 * Manages the editing interface for association information pages
 */
const AssociationInfoEditPage = () => {
  // ==================== Router & Config ====================
  const params = useParams();
  const id = params.id as string;
  const item = aboutMenuItems[id];

  // ==================== State Management ====================
  const [constitutionData, setConstitutionData] = useState<ConstitutionData[]>([]);
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [editedArticle, setEditedArticle] = useState<Article | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

  // ==================== Drag & Drop Sensors ====================
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // ==================== Effects ====================
  useEffect(() => {
    if (id === 'constitution') {
      fetchConstitutions();
    } else if (id === 'board') {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [id]);

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
        const [_, key] = field.split('.') as ['chairman', 'name' | 'title' | 'img'];
        region.chairman = {
          ...region.chairman,
          [key]: value,
        };
      }

      updated[activeBoardRegion] = region;
      return updated;
    });
  };

  const handleBoardListChange = (field: BoardListFieldKey, index: number, value: string) => {
    setBoardData((prev) => {
      const updated = { ...prev };
      const region = { ...updated[activeBoardRegion] };
      const list = [...region[field]];
      list[index] = value;
      region[field] = list;
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
      region[field] = [...region[field], newName];
      updated[activeBoardRegion] = region;
      return updated;
    });

    setNewMemberNames((prev) => ({ ...prev, [field]: '' }));
  };

  const handleRemoveBoardListItem = (field: BoardListFieldKey, index: number) => {
    setBoardData((prev) => {
      const updated = { ...prev };
      const region = { ...updated[activeBoardRegion] };
      region[field] = region[field].filter((_, idx) => idx !== index);
      updated[activeBoardRegion] = region;
      return updated;
    });
  };

  const handleNewMemberInputChange = (field: BoardListFieldKey, value: string) => {
    setNewMemberNames((prev) => ({ ...prev, [field]: value }));
  };

  // ==================== API Functions ====================
  /**
   * Fetch constitution data from API
   */
  const fetchConstitutions = async () => {
    try {
      setLoading(true);
      const requestData = {
        mwHeader: {
          requestId: `constitution-edit-${Date.now()}`
        },
        tranRq: {}
      };

      const response: ConstitutionResponse = await queryConsitutions(requestData);
      
      if (response && response.tranRs && response.tranRs.items) {
        setConstitutionData(response.tranRs.items);
      } else {
        setError('API 回應格式不正確');
      }
    } catch (err: unknown) {
      console.error('獲取章程資料時發生錯誤:', err);
      const error = err as { message?: string };
      setError(`無法載入章程資料: ${error.message || '未知錯誤'}`);
    } finally {
      setLoading(false);
    }
  };

  // ==================== Event Handlers ====================
  /**
   * Handle chapter drag end event
   */
  const handleChapterDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setConstitutionData((items) => {
        const oldIndex = items.findIndex((item) => item.chapter.id === active.id);
        const newIndex = items.findIndex((item) => item.chapter.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  /**
   * Handle article reordering within a chapter
   */
  const handleArticleReorder = async (chapterId: string, reorderedArticles: Article[]) => {
    // 先更新本地狀態以提供即時反饋
    setConstitutionData((items) =>
      items.map((item) =>
        item.chapter.id === chapterId
          ? { ...item, article: reorderedArticles }
          : item
      )
    );

    // 批量更新到後端（逐一調用 updateArticle）
    try {
      // 使用 Promise.all 並行更新所有條文
      const updatePromises = reorderedArticles.map((art, index) => {
        const requestData = {
          mwHeader: {
            requestId: `cA003-updateArticles`
          },
          tranRq: {
            articleNo: (index + 1).toString(),
            content: art.content
          }
        };
        return updateArticle(requestData);
      });

      await Promise.all(updatePromises);
      console.log('條文順序已保存到後端');
    } catch (err: unknown) {
      console.error('保存條文順序時發生錯誤:', err);
      alert('保存條文順序失敗，請重試');
    }
  };

  /**
   * Start editing an article
   */
  const handleEditArticle = (chapterId: string, articleId: string) => {
    const chapter = constitutionData.find((c) => c.chapter.id === chapterId);
    const article = chapter?.article.find((a) => a.id === articleId);
    if (article) {
      setEditingArticleId(articleId);
      setEditedArticle(JSON.parse(JSON.stringify(article)));
      setExpandedChapters(prev => new Set(prev).add(chapterId));
    }
  };

  /**
   * Cancel article editing
   */
  const handleCancelArticle = () => {
    setEditingArticleId(null);
    setEditedArticle(null);
  };

  /**
   * Save edited article
   */
  const handleSaveArticle = async (chapterId: string) => {
    if (!editedArticle) return;

    try {
      setSaving(true);
      
      // 使用新的 updateArticle API（根據後端格式）
      const requestData = {
        mwHeader: {
          requestId: `cA003-updateArticles`
        },
        tranRq: {
          articleNo: editedArticle.articleNo,
          content: editedArticle.content
        }
      };

      await updateArticle(requestData);
      
      // 更新本地狀態
      setConstitutionData((items) =>
        items.map((item) =>
          item.chapter.id === chapterId
            ? {
                ...item,
                article: item.article.map((art) =>
                  art.id === editedArticle.id ? editedArticle : art
                )
              }
            : item
        )
      );

      setEditingArticleId(null);
      setEditedArticle(null);
      alert('保存成功！');
    } catch (err: unknown) {
      console.error('保存條文時發生錯誤:', err);
      const error = err as { message?: string };
      alert(`保存失敗: ${error.message || '未知錯誤'}`);
    } finally {
      setSaving(false);
    }
  };

  /**
   * Handle article field changes
   */
  const handleArticleChange = (field: keyof Article, value: string) => {
    if (!editedArticle) return;
    setEditedArticle({
      ...editedArticle,
      [field]: value
    });
  };

  /**
   * Toggle chapter expand/collapse
   */
  const toggleChapterExpand = (chapterId: string) => {
    setExpandedChapters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
      }
      return newSet;
    });
  };

  // ==================== Render Functions ====================
  /**
   * Render page not found error
   */
  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-red-800 mb-2">頁面不存在</h1>
          <p className="text-red-600 mb-4">找不到該編輯頁面</p>
          <Link
            href="/admin/association_info"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            ← 返回列表
          </Link>
        </div>
      </div>
    );
  }

  /**
   * Render placeholder for non-constitution pages
   */
  if (id !== 'constitution') {
    if (id === 'board') {
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
                            <div className="space-y-2">
                              {regionData[key].map((name, index) => (
                                <div key={`${key}-${index}`} className="flex items-center gap-3">
                                  <span className="text-xs text-gray-400 w-6">{index + 1}.</span>
                                  <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => handleBoardListChange(key, index, e.target.value)}
                                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveBoardListItem(key, index)}
                                    className="px-2 py-1 text-sm text-red-600 hover:text-red-800"
                                  >
                                    刪除
                                  </button>
                                </div>
                              ))}
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
    }

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

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500 text-lg mb-2">編輯表單區域</p>
            <p className="text-gray-400 text-sm">
              此頁面的編輯功能正在開發中
            </p>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Render loading state
   */
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-xl text-gray-600">載入中...</div>
        </div>
      </div>
    );
  }

  /**
   * Render error state
   */
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-red-800 mb-2">載入錯誤</h1>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchConstitutions}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            重新載入
          </button>
        </div>
      </div>
    );
  }

  // ==================== Main Render ====================
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <Link
          href="/admin/association_info"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
        >
          ← 返回關於校友會管理
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
        <p className="text-gray-600 mb-4">{item.description}</p>
        
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>提示：</strong>拖曳 ⋮⋮ 圖標可以調整章節和條文的順序。點擊章節標題展開/折疊，點擊條文的「編輯」按鈕可單獨編輯該條文。
          </p>
        </div>
      </div>

      {/* Drag & Drop Context for Chapters */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleChapterDragEnd}
      >
        <SortableContext
          items={constitutionData.map((item) => item.chapter.id)}
          strategy={verticalListSortingStrategy}
        >
          {constitutionData.map((chapterData) => {
            const isExpanded = expandedChapters.has(chapterData.chapter.id);

            return (
              <SortableChapterItem
                key={chapterData.chapter.id}
                chapter={chapterData}
                isExpanded={isExpanded}
                onToggleExpand={() => toggleChapterExpand(chapterData.chapter.id)}
                onArticleReorder={handleArticleReorder}
                editingArticleId={editingArticleId}
                onEditArticle={handleEditArticle}
                onSaveArticle={handleSaveArticle}
                onCancelArticle={handleCancelArticle}
                onArticleChange={handleArticleChange}
                editedArticle={editedArticle}
                saving={saving}
              />
            );
          })}
        </SortableContext>
      </DndContext>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <Link
          href="/about/constitution"
          className="inline-block px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          預覽頁面
        </Link>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          onClick={() => alert('新增章節功能開發中')}
        >
          + 新增章節
        </button>
      </div>
    </div>
  );
};

export default AssociationInfoEditPage;
