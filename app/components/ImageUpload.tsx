"use client";
import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageSelected: (file: File | null) => void;
  onImageRemoved: () => void;
  disabled?: boolean;
}

export default function ImageUpload({ 
  currentImageUrl, 
  onImageSelected, 
  onImageRemoved,
  disabled = false
}: ImageUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      onImageSelected(null);
      setPreviewUrl(null);
      return;
    }

    // 驗證文件類型
    if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
      setError('只支援 JPG, JPEG, PNG 格式的圖片');
      onImageSelected(null);
      setPreviewUrl(null);
      return;
    }

    // 驗證文件大小 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('圖片大小不能超過 10MB');
      onImageSelected(null);
      setPreviewUrl(null);
      return;
    }

    setError(null);
    
    // 創建預覽 URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // 通知父組件
    onImageSelected(file);
  };

  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageRemoved();
    onImageSelected(null);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="block font-medium mb-1 text-gray-600">
          封面圖片
        </label>
        
        {/* 隱藏的文件輸入 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled || uploading}
        />

        {/* 上傳按鈕 */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleButtonClick}
            disabled={disabled || uploading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
{(previewUrl || currentImageUrl) ? '更換圖片' : '選擇圖片'}
          </button>
          
          {(previewUrl || currentImageUrl) && (
            <button
              type="button"
              onClick={handleRemoveImage}
              disabled={disabled || uploading}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              移除圖片
            </button>
          )}
        </div>

        {/* 檔案格式說明 */}
        <p className="text-sm text-gray-500">
          支援 JPG, JPEG, PNG 格式，檔案大小不超過 10MB
        </p>
      </div>

      {/* 錯誤訊息 */}
      {error && (
        <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200">
          {error}
        </div>
      )}

      {/* 圖片預覽 */}
      {(previewUrl || currentImageUrl) && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">預覽圖片：</p>
          <div className="relative w-full max-w-md">
            <Image
              src={previewUrl || currentImageUrl || ''}
              alt="預覽圖片"
              width={400}
              height={300}
              className="rounded border object-cover"
              style={{ maxHeight: '200px', width: 'auto' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
