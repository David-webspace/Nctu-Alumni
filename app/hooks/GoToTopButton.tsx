"use client";
import { useState, useEffect } from 'react';

export default function GoToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return visible ? (
    <button
      onClick={handleClick}
      aria-label="回到頂部"
      className="fixed bottom-10 right-30 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center text-2xl transition focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      ▲
    </button>
  ) : null;
}