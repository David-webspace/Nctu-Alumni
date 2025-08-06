"use client";
import React from "react";
import Image from "next/image";

const ActivityCalendar = () => {
  return (
    <section className="w-full flex flex-col md:flex-row items-start justify-between py-20">
      {/* Left: Calendar Icon */}
      <div className="hidden md:flex flex-1 justify-start items-center translate-y-40">
        <Image
          src="/calendar.png"
          alt="活動行事曆 Banner"
          width={600}
          height={400}
          className="object-contain"
        />
      </div>
      {/* Right: Google Calendar */}
      <div className="flex-2 min-w-0 p-20">
        <div className="mb-2">
          <div className="flex items-end space-x-4">
            <h2 className="text-2xl font-bold text-black">活動行事曆</h2>
            <div className="w-28 h-1 bg-gray-300" />
          </div>
          <div className="h-2 flex items-center mt-2">
            <div className="w-8 h-1.5 bg-blue-700 rounded" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow mt-6 p-2 overflow-x-auto">
          <iframe
            src="https://calendar.google.com/calendar/embed?src=c_5445337be15104f7a30e6b47d1e8474cb62da73ebac82b8a8c3c5b9e9d8c7c7c@group.calendar.google.com&ctz=Asia%2FTaipei"
            style={{ border: 0, width: '100%', height: '500px' }}
            frameBorder="0"
            scrolling="no"
            title="Google Calendar"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ActivityCalendar;
