import React from 'react';
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
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ConstitutionData, Article } from '../types';
import { SortableArticleItem } from './SortableArticleItem';

interface SortableChapterProps {
  chapter: ConstitutionData;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onArticleReorder: (chapterId: string, articles: Article[]) => void;
  editingArticleId: string | null;
  onEditArticle: (chapterId: string, articleId: string) => void;
  onSaveArticle: (chapterId: string) => void;
  onCancelArticle: () => void;
  onArticleChange: (field: keyof Article, value: string) => void;
  editedArticle: Article | null;
  saving: boolean;
}

export const SortableChapterItem: React.FC<SortableChapterProps> = ({
  chapter,
  isExpanded,
  onToggleExpand,
  onArticleReorder,
  editingArticleId,
  onEditArticle,
  onSaveArticle,
  onCancelArticle,
  onArticleChange,
  editedArticle,
  saving,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: chapter.chapter.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleArticleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const articles = chapter.article;
      const oldIndex = articles.findIndex((art) => art.id === active.id);
      const newIndex = articles.findIndex((art) => art.id === over.id);
      const reorderedArticles = arrayMove(articles, oldIndex, newIndex);
      onArticleReorder(chapter.chapter.id, reorderedArticles);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-3"
    >
      {/* Chapter Header */}
      <div className="p-4 flex items-center gap-3 bg-gray-50">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-2 hover:bg-gray-200 rounded"
          type="button"
        >
          <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
          </svg>
        </button>

        {/* Chapter Info */}
        <div
          className="flex-1 cursor-pointer"
          onClick={onToggleExpand}
        >
          <h2 className="text-lg font-bold text-gray-900">{chapter.chapter.title}</h2>
        </div>

        {/* Expand/Collapse Icon */}
        <button onClick={onToggleExpand} className="p-2 hover:bg-gray-200 rounded" type="button">
          <svg
            className={`w-5 h-5 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Expandable Content - Articles */}
      {isExpanded && (
        <div className="p-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleArticleDragEnd}
          >
            <SortableContext
              items={chapter.article.map((art) => art.id)}
              strategy={verticalListSortingStrategy}
            >
              {chapter.article && chapter.article.map((art, index) => {
                const isEditing = editingArticleId === art.id;
                const displayArticle = isEditing && editedArticle ? editedArticle : art;

                return (
                  <SortableArticleItem
                    key={art.id}
                    article={displayArticle}
                    chapterId={chapter.chapter.id}
                    index={index}
                    isEditing={isEditing}
                    onEdit={() => onEditArticle(chapter.chapter.id, art.id)}
                    onSave={() => onSaveArticle(chapter.chapter.id)}
                    onCancel={onCancelArticle}
                    onChange={onArticleChange}
                    saving={saving}
                  />
                );
              })}
            </SortableContext>
          </DndContext>

          {/* Add Article Button */}
          <button
            className="ml-8 mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium border border-blue-300"
            onClick={() => alert('新增條文功能開發中')}
          >
            + 新增條文到 {chapter.chapter.title}
          </button>
        </div>
      )}
    </div>
  );
};
