"use client";

import React, { useState } from 'react';
import Image from 'next/image';

// Define types for the content blocks
type ContentBlockType = 'image' | 'text';

interface Block {
  id: number;
  type: ContentBlockType;
  content: string; // For text content or image URL
}

// Placeholder for a rich text editor component
const RichTextEditor = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  return (
    <div className="border border-gray-300 rounded-md">
      <div className="flex items-center p-2 border-b border-gray-300 bg-gray-50 space-x-2">
        {/* This is a mock toolbar. A real implementation would require a library like React-Quill. */}
        <button type="button" className="font-bold">B</button>
        <button type="button" className="italic">I</button>
        <button type="button" className="underline">U</button>
      </div>
      <textarea 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-48 p-2 focus:outline-none"
        placeholder="第一章 總則..."
      />
    </div>
  );
};

const AssociationIntroPage = () => {
  const [title, setTitle] = useState('校友會組織章程');
  const [blocks, setBlocks] = useState<Block[]>([
    { id: 1, type: 'image', content: 'https://i.imgur.com/gS1yG3d.png' }, // Placeholder image
    { id: 2, type: 'text', content: '第一章 總則\n第一條 本會名稱為台灣交通大學校友總會(以下簡稱本會)。\n第二條 本會為依法設立、非以營利為目的之社會團體，以連繫校友情誼、切磋學術、服務社會、宏揚校譽為宗旨。' },
  ]);

  const addBlock = (type: ContentBlockType) => {
    const newBlock: Block = { id: Date.now(), type, content: '' };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlockContent = (id: number, newContent: string) => {
    setBlocks(blocks.map(block => block.id === id ? { ...block, content: newContent } : block));
  };

  const removeBlock = (id: number) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;

    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]]; // Swap
    setBlocks(newBlocks);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">編輯 校友會介紹/組織</h1>

      {/* Title Input */}
      <div className="mb-6">
        <label htmlFor="pageTitle" className="block mb-1 text-sm font-medium text-gray-700">標題</label>
        <div className="relative">
          <input 
            type="text" 
            id="pageTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={64}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-14"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">{title.length}/64</span>
        </div>
      </div>

      {/* Content Blocks */}
      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div key={block.id} className="p-4 border border-gray-300 rounded-md bg-white">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <button onClick={() => moveBlock(index, 'up')} className="hover:text-gray-900 disabled:opacity-50" disabled={index === 0}>&#x2191; 上移</button>
                <button onClick={() => moveBlock(index, 'down')} className="hover:text-gray-900 disabled:opacity-50" disabled={index === blocks.length - 1}>&#x2193; 下移</button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{index + 1}/{blocks.length}</span>
                <button onClick={() => removeBlock(block.id)} className="text-red-500 hover:text-red-700">&#x1F5D1;</button>
              </div>
            </div>

            {block.type === 'image' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="border-2 border-dashed border-gray-300 p-2 rounded-md">
                  <Image 
                    src={block.content || 'https://via.placeholder.com/400x200'} 
                    alt="Image preview" 
                    width={400} 
                    height={200} 
                    className="w-full h-auto object-contain rounded" 
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">圖片 - {index + 1}</h3>
                  <p className="text-xs text-gray-500 mt-1 mb-3">單張圖片大小10MB以下，建議尺寸 1000x500</p>
                  <label htmlFor={`imageUrl-${block.id}`} className="block mb-1 text-sm font-medium text-gray-700">圖片的外連網址</label>
                  <input 
                    type="text"
                    id={`imageUrl-${block.id}`}
                    value={block.content}
                    onChange={(e) => updateBlockContent(block.id, e.target.value)}
                    placeholder="https://example.com/image.png"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}

            {block.type === 'text' && (
              <div>
                 <RichTextEditor value={block.content} onChange={(newContent) => updateBlockContent(block.id, newContent)} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Block Buttons */}
      <div className="mt-6 p-4 border-t border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-2">點擊選項新增區塊</p>
        <div className="flex items-center space-x-4">
          <button onClick={() => addBlock('image')} className="px-4 py-2 border border-indigo-500 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors">圖片</button>
          <button onClick={() => addBlock('text')} className="px-4 py-2 border border-indigo-500 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors">文字區塊</button>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end items-center mt-8 pt-6 border-t border-gray-200 space-x-4">
        <button type="button" className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">取消</button>
        <button type="button" className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">確認</button>
      </div>
    </div>
  );
};

export default AssociationIntroPage;

