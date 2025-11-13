# API 整合說明

## ✅ 已完成的整合

### 1. 更新單一條文 API

**前端調用位置：** `page.tsx` → `handleSaveArticle()`

**API Endpoint：** `POST /constitution/updateArticle`

**Request 格式：**
```json
{
  "mwHeader": {
    "requestId": "cA003-updateArticles"
  },
  "tranRq": {
    "articleNo": "1",
    "content": "本會名稱為台灣交通大學校友總會 (以下簡稱本會)。"
  }
}
```

**觸發時機：**
- 用戶點擊條文的「編輯」按鈕
- 修改內容後點擊「保存」按鈕

**前端代碼：**
```typescript
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
```

---

### 2. 批量更新條文（拖曳排序）

**前端調用位置：** `page.tsx` → `handleArticleReorder()`

**API Endpoint：** `POST /constitution/updateArticle` (多次調用)

**觸發時機：**
- 用戶拖曳條文改變順序時自動觸發

**實作方式：**
由於後端只提供單一更新 API，前端使用 `Promise.all` 並行調用多次：

```typescript
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
```

---

## 🔄 數據流程

### 編輯單一條文流程
```
1. 用戶點擊「編輯」按鈕
   ↓
2. 進入編輯模式，顯示表單
   ↓
3. 用戶修改內容
   ↓
4. 點擊「保存」按鈕
   ↓
5. 調用 updateArticle API
   ↓
6. 後端更新資料庫
   ↓
7. 前端更新本地狀態
   ↓
8. 顯示「保存成功」提示
```

### 拖曳排序流程
```
1. 用戶拖曳條文到新位置
   ↓
2. 前端立即更新本地狀態（UI 即時反饋）
   ↓
3. 計算新的 articleNo（1, 2, 3...）
   ↓
4. 並行調用多個 updateArticle API
   ↓
5. 後端批量更新資料庫
   ↓
6. Console 顯示「條文順序已保存到後端」
```

---

## 📋 重要欄位說明

### articleNo
- **類型：** String
- **說明：** 條文編號（"1", "2", "3"...）
- **用途：** 後端用來識別和排序條文
- **自動生成：** 前端根據條文在陣列中的 index 自動生成

### articleLabel
- **類型：** String
- **說明：** 條文標籤（"第一條", "第二條"...）
- **用途：** 前端顯示用
- **自動生成：** 前端根據 index 自動生成，不傳給後端

### content
- **類型：** String
- **說明：** 條文內容
- **用途：** 實際的條文文字內容

---

## 🧪 測試建議

### 1. 測試單一條文編輯
```
1. 打開章程編輯頁面
2. 展開任一章節
3. 點擊某條文的「編輯」按鈕
4. 修改內容
5. 點擊「保存」
6. 檢查：
   - 是否顯示「保存成功」
   - 內容是否正確更新
   - 後端資料庫是否正確更新
```

### 2. 測試拖曳排序
```
1. 打開章程編輯頁面
2. 展開任一章節
3. 拖曳第一條到第三條的位置
4. 檢查：
   - UI 是否立即更新
   - 條文標籤是否自動重新編號（第一條、第二條...）
   - Console 是否顯示「條文順序已保存到後端」
   - 後端資料庫的 articleNo 是否正確更新
   - 刷新頁面後順序是否保持
```

### 3. 測試錯誤處理
```
1. 關閉後端服務器
2. 嘗試編輯並保存條文
3. 檢查：
   - 是否顯示錯誤提示
   - 是否不會造成頁面崩潰
```

---

## 🐛 已知問題與注意事項

### 1. 拖曳排序的性能
- 如果章節內有大量條文（>50條），並行調用多個 API 可能造成性能問題
- **建議：** 後端提供批量更新 API 會更高效

### 2. articleNo 的唯一性
- 目前 articleNo 是基於順序生成（1, 2, 3...）
- 如果需要跨章節的唯一性，需要調整邏輯

### 3. 錯誤恢復
- 如果批量更新時部分 API 失敗，可能導致數據不一致
- **建議：** 後端實作事務處理

---

## 📝 後續優化建議

1. **批量更新 API**
   - 建議後端提供真正的批量更新 API
   - 可以在一次請求中更新多條條文
   - 減少網絡請求次數

2. **樂觀更新**
   - 目前已實作（先更新 UI，再調用 API）
   - 如果 API 失敗，可以考慮回滾 UI

3. **Loading 狀態**
   - 拖曳排序時可以顯示 loading 指示器
   - 讓用戶知道正在保存

4. **成功提示**
   - 可以使用 Toast 通知替代 alert
   - 提供更好的用戶體驗
