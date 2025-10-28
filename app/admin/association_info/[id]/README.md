# Association Info Edit Page

這個目錄包含了關於校友會資訊編輯頁面的所有相關代碼。

## 📁 目錄結構

```
[id]/
├── components/           # 可重用的 React 組件
│   ├── SortableArticleItem.tsx    # 條文項目組件（可拖曳）
│   ├── SortableChapterItem.tsx    # 章節項目組件（可拖曳）
│   └── index.ts                   # 組件統一導出
├── types.ts             # TypeScript 類型定義
├── constants.ts         # 常量配置（如菜單項目）
├── page.tsx            # 主頁面組件
└── README.md           # 本文件
```

## 🎯 主要功能

### 1. 章節管理
- ✅ 拖曳排序章節
- ✅ 展開/折疊章節
- ✅ 顯示章節標題

### 2. 條文管理
- ✅ 拖曳排序條文
- ✅ 單獨編輯條文
- ✅ 自動生成條文標籤（第1條、第2條...）
- ✅ 條文內容支持換行

### 3. 數據持久化
- ✅ 保存編輯到後端 API
- ✅ 錯誤處理和重試機制

## 📦 組件說明

### `SortableArticleItem`
條文項目組件，支持：
- 拖曳排序
- 編輯模式切換
- 自動編號

**Props:**
- `article`: 條文數據
- `index`: 條文索引（用於自動編號）
- `isEditing`: 是否處於編輯狀態
- `onEdit/onSave/onCancel`: 編輯相關回調
- `onChange`: 內容變更回調
- `saving`: 保存狀態

### `SortableChapterItem`
章節項目組件，支持：
- 拖曳排序
- 展開/折疊
- 包含多個條文項目

**Props:**
- `chapter`: 章節數據
- `isExpanded`: 是否展開
- `onToggleExpand`: 展開/折疊回調
- `onArticleReorder`: 條文重新排序回調
- 其他條文相關的回調函數

## 🔧 類型定義

### `Article`
```typescript
interface Article {
  id: string;
  articleNo: string;
  articleLabel: string;
  content: string;
}
```

### `Chapter`
```typescript
interface Chapter {
  id: string;
  chapterNo: string;
  title: string;
  slug: string;
}
```

### `ConstitutionData`
```typescript
interface ConstitutionData {
  chapter: Chapter;
  article: Article[];
}
```

## 🚀 使用方式

### 添加新的菜單項目
在 `constants.ts` 中添加：

```typescript
export const aboutMenuItems = {
  // ... 現有項目
  newItem: {
    title: '新項目標題',
    description: '新項目描述'
  }
};
```

### 創建新的可排序組件
參考 `SortableArticleItem.tsx` 的結構：

1. 使用 `useSortable` hook
2. 設置拖曳手柄
3. 實現編輯/顯示模式切換

## 📝 代碼規範

- ✅ 使用 TypeScript 類型檢查
- ✅ 組件按功能分離
- ✅ 使用註釋說明複雜邏輯
- ✅ 統一的命名規範
- ✅ Props 類型定義清晰

## 🔄 數據流

```
用戶操作 → 事件處理器 → 狀態更新 → API 調用 → 重新獲取數據 → UI 更新
```

## 🐛 調試建議

1. 檢查瀏覽器 Console 的錯誤訊息
2. 確認後端 API 正常運行
3. 檢查 Network 標籤查看 API 請求/回應
4. 使用 React DevTools 查看組件狀態

## 📚 相關依賴

- `@dnd-kit/core` - 拖曳核心功能
- `@dnd-kit/sortable` - 排序功能
- `@dnd-kit/utilities` - 工具函數
- `next` - Next.js 框架
- `react` - React 庫
