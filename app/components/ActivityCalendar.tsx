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
      {/* Right: Calendar */}
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
