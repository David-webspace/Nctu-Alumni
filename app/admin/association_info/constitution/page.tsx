"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

// Local imports
import { queryConsitutions, updateArticle } from '@/app/api/constitutions';
import { ConstitutionData, ConstitutionResponse, Article } from './interface.dto';
import { aboutMenuItems } from './constants';
import { SortableChapterItem } from './components';

const AssociationInfoEditPage = () => {
const item = aboutMenuItems['constitution'];

  // ==================== State Management ====================
  const [constitutionData, setConstitutionData] = useState<ConstitutionData[]>([]);
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

  useEffect(() => {
    fetchConstitutions();
  }, []);

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

  const handleEditArticle = (chapterId: string, articleId: string) => {
    const chapter = constitutionData.find((c) => c.chapter.id === chapterId);
    const article = chapter?.article.find((a) => a.id === articleId);
    if (article) {
      setEditingArticleId(articleId);
      setEditedArticle(JSON.parse(JSON.stringify(article)));
      setExpandedChapters(prev => new Set(prev).add(chapterId));
    }
  };

  const handleCancelArticle = () => {
    setEditingArticleId(null);
    setEditedArticle(null);
  };

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

  const handleArticleChange = (field: keyof Article, value: string) => {
    if (!editedArticle) return;
    setEditedArticle({
      ...editedArticle,
      [field]: value
    });
  };

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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-xl text-gray-600">載入中...</div>
        </div>
      </div>
    );
  }

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
