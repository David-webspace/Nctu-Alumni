import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Article } from '../types';

interface SortableArticleProps {
  article: Article;
  index: number;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (field: keyof Article, value: string) => void;
  saving: boolean;
}

export const SortableArticleItem: React.FC<SortableArticleProps> = ({
  article,
  index,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onChange,
  saving,
}) => {
  // Generate article label based on index
  const articleLabel = `第${index + 1}條`;
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: article.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-50 rounded-lg border border-gray-200 mb-2 ml-8"
    >
      <div className="p-3 flex items-start gap-3">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded mt-1"
          type="button"
        >
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
          </svg>
        </button>

        {/* Article Content */}
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">條文標籤（自動生成）</label>
                <input
                  type="text"
                  value={articleLabel}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 text-sm cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">內容</label>
                <textarea
                  value={article.content}
                  onChange={(e) => onChange('content', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={onSave}
                  disabled={saving}
                  type="button"
                  className="px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium disabled:bg-gray-400"
                >
                  {saving ? '保存中...' : '保存'}
                </button>
                <button
                  onClick={onCancel}
                  disabled={saving}
                  type="button"
                  className="px-4 py-1.5 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors text-sm font-medium"
                >
                  取消
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <span className="font-bold text-gray-900 text-sm">{articleLabel}</span>
                  <div className="mt-1 text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }} />
                </div>
                <button
                  onClick={onEdit}
                  type="button"
                  className="ml-3 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium"
                >
                  編輯
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
