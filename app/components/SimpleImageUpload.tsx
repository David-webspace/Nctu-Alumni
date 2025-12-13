"use client";
import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface SimpleImageUploadProps {
  currentImageUrl?: string;
  onImageSelected: (file: File | null) => void;
  onImageRemoved: () => void;
}

export default function SimpleImageUpload({ 
  currentImageUrl, 
  onImageSelected, 
  onImageRemoved 
}: SimpleImageUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 驗證文件類型
    if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
      setError('只支援 JPG, JPEG, PNG 格式的圖片');
      return;
    }

    // 驗證文件大小 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('圖片大小不能超過 10MB');
      return;
    }

    // 清除錯誤
    setError(null);
    
    // 創建預覽 URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // 通知父組件
    onImageSelected(file);
  };

  const handleRemove = () => {
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

  const displayImageUrl = previewUrl || currentImageUrl;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {displayImageUrl && (
          <button
            type="button"
            onClick={handleRemove}
            className="px-3 py-1 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50"
          >
            移除圖片
          </button>
        )}
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      {displayImageUrl && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">圖片預覽：</p>
          <div className="relative w-full max-w-md">
            <Image
              src={displayImageUrl}
              alt="圖片預覽"
              width={400}
              height={300}
              className="rounded border object-cover"
              style={{ maxHeight: '200px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
