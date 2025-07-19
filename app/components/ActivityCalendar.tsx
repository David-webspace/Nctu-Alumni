"use client";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { parseISO } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Image from "next/image";
import moment from "moment";

const localizer = momentLocalizer(moment);

// TODO: Replace with your actual Google Calendar ID and API key
const CALENDAR_ID = "YOUR_GOOGLE_CALENDAR_ID";
const API_KEY = "YOUR_GOOGLE_API_KEY";

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
}

interface GoogleCalendarEvent {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

const fetchEvents = async (): Promise<Event[]> => {
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    CALENDAR_ID
  )}/events?key=${API_KEY}&singleEvents=true&orderBy=startTime&timeMin=${new Date().toISOString()}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.items) return [];
  return data.items.map((item: GoogleCalendarEvent) => {
    return {
      id: item.id,
      title: item.summary,
      start: parseISO(item.start.dateTime ?? item.start.date ?? ""),
      end: parseISO(item.end.dateTime ?? item.end.date ?? ""),
      allDay: !item.start.dateTime,
    };
  });
};

const ActivityCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents().then(ev => {
      setEvents(ev);
      setLoading(false);
    });
  }, []);

  return (
    <section className="w-full flex flex-col md:flex-row items-start justify-between px-6 md:px-20 py-10">
      {/* Left: Calendar Icon */}
      <div className="hidden md:flex flex-1 justify-center items-center">
        <Image
          src="/calendar-banner.png"
          alt="活動行事曆 Banner"
          width={300}
          height={300}
          className="object-contain"
        />
      </div>
      {/* Right: Calendar */}
      <div className="flex-1 min-w-0">
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
          {loading ? (
            <div className="text-center text-gray-500 py-10">載入中...</div>
          ) : (
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              popup
              messages={{
                month: "月",
                week: "週",
                day: "日",
                today: "今天",
                previous: "上個月",
                next: "下個月",
                showMore: (total) => `+${total} 更多`,
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ActivityCalendar;
