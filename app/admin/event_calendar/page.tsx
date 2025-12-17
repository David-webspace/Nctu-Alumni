"use client";
import React, { useState } from 'react';

const DEFAULT_CALENDAR_URL = 'https://calendar.google.com/calendar/embed?src=c_5445337be15104f7a30e6b47d1e8474cb62da73ebac82b8a8c3c5b9e9d8c7c7c@group.calendar.google.com&ctz=Asia%2FTaipei';

const EventCalendarPage = () => {
  const [calendarUrl, setCalendarUrl] = useState(DEFAULT_CALENDAR_URL);
  const [inputValue, setInputValue] = useState(DEFAULT_CALENDAR_URL);

  const handleSave = () => {
    setCalendarUrl(inputValue);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">行事曆</h1>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">設定目標 Google Calendar URL</label>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            onClick={handleSave}
          >
            儲存設定
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 mt-4">
        <iframe
          src={calendarUrl}
          style={{ border: 0, width: '100%', height: '600px' }}
          frameBorder="0"
          scrolling="no"
          title="Google Calendar"
        ></iframe>
        <div className="text-sm text-gray-600 mt-2">
          NYCU AA Demo<br />
          顯示活動時區的時間： (GMT+08:00) 台北標準時間<br />
          <a href="https://calendar.google.com/calendar/u/0/r?cid=c_5445337be15104f7a30e6b47d1e8474cb62da73ebac82b8a8c3c5b9e9d8c7c7c@group.calendar.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">新增至 Google 日曆</a>
        </div>
        <div className="flex justify-end mt-2">
          <span className="text-xs text-gray-400">Google 日曆</span>
        </div>
      </div>
    </div>
  );
};

export default EventCalendarPage;