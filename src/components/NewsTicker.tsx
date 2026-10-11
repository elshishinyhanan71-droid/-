import React, { useState } from 'react';
import { Megaphone, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NEWS_ARTICLES } from '../data/mockData';

export const NewsTicker: React.FC = () => {
  const { navigate } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  const headlines = NEWS_ARTICLES.map(a => ({
    id: a.id,
    title: a.title,
    category: a.category
  }));

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % headlines.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + headlines.length) % headlines.length);
  };

  const current = headlines[currentIndex];

  return (
    <div className="bg-emerald-50 border-b border-emerald-100/80 px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 overflow-hidden flex-1">
          <div className="flex items-center gap-1.5 text-emerald-800 font-bold shrink-0 bg-emerald-100/80 px-2 py-0.5 rounded text-[11px]">
            <Megaphone className="w-3.5 h-3.5 text-emerald-700" />
            <span>شريط الأخبار</span>
          </div>

          <span className="text-slate-400 shrink-0 font-light">|</span>

          <button
            onClick={() => navigate('news')}
            className="text-right text-slate-800 hover:text-emerald-700 transition-colors truncate font-medium hover:underline text-xs"
            title={current.title}
          >
            <span className="text-emerald-700 font-semibold ml-1">[{current.category}]</span>
            {current.title}
          </button>
        </div>

        <div className="flex items-center gap-1 shrink-0 text-slate-500">
          <button
            onClick={handlePrev}
            className="p-1 hover:bg-emerald-100/60 rounded text-slate-600 transition-colors"
            title="الخبر السابق"
            aria-label="الخبر السابق"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="text-[11px] tabular-nums font-mono text-slate-500">
            {currentIndex + 1}/{headlines.length}
          </span>
          <button
            onClick={handleNext}
            className="p-1 hover:bg-emerald-100/60 rounded text-slate-600 transition-colors"
            title="الخبر التالي"
            aria-label="الخبر التالي"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
