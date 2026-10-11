import React, { useState } from 'react';
import {
  Compass,
  Landmark,
  MapPin,
  Clock,
  Ticket,
  Search,
  Filter,
  ArrowRight,
  Info,
  X,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HERITAGE_SITES } from '../data/mockData';
import { HeritageSite } from '../types';

export const TourismHeritagePage: React.FC = () => {
  const { navigate, t, language } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(null);

  const filteredSites = HERITAGE_SITES.filter(site => {
    return (
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.city.includes(searchQuery) ||
      site.category.includes(searchQuery) ||
      site.description.includes(searchQuery)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <button onClick={() => navigate('home')} className="hover:text-emerald-700 transition-colors">
            {t('navHome')}
          </button>
          <span>/</span>
          <button onClick={() => navigate('media-hub')} className="hover:text-emerald-700 transition-colors">
            {t('mediaHubTitle')}
          </button>
          <span>/</span>
          <span className="font-semibold text-slate-900">{t('mediaTourism')}</span>
        </div>

        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-1.5 rounded-lg transition-colors"
        >
          <ArrowRight className={`w-3.5 h-3.5 ${language === 'en' ? 'rotate-180' : ''}`} />
          <span>{t('backToHome')}</span>
        </button>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-l from-sky-950 via-teal-950 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold">
            <Compass className="w-4 h-4 text-amber-300" />
            <span>معالم ومتاحف المنوفية التراثية</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            السياحة والتراث والمعالم البارزة بمحافظة المنوفية
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            استكشف المتاحف القومية التي تروي التاريخ المصري، والمساجد الأثرية، وقرى الحرف التراثية (كصناعة الصدف والحرير)، ومناظر دلتا النيل الخلابة.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن متحف أو معلم أثري أو قرية تراثية..."
          className="w-full bg-transparent text-xs focus:outline-none"
        />
      </div>

      {/* Grid of Heritage Sites */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSites.map((site) => (
          <div
            key={site.id}
            onClick={() => setSelectedSite(site)}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between group"
          >
            {/* Visual Header */}
            <div className="h-40 bg-gradient-to-br from-emerald-100 via-teal-50 to-slate-100 p-4 flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-bold text-emerald-900 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg shadow-2xs">
                  {site.category}
                </span>
                <span className="text-[10px] font-bold text-slate-700 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                  {site.city}
                </span>
              </div>
              <div className="z-10">
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {site.name}
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {site.description}
              </p>

              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>{site.visitingHours}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Ticket className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{site.entryFees}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-bold text-emerald-800">
                <span>عرض الدليل والتفاصيل</span>
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Landmark Detail Modal */}
      {selectedSite && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 border border-slate-200 animate-scaleIn">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {selectedSite.category} · {selectedSite.city}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-1.5">
                  {selectedSite.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSite(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>{selectedSite.description}</p>
              
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>مواعيد الزيارة: {selectedSite.visitingHours}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <Ticket className="w-4 h-4 text-emerald-600" />
                  <span>رسوم الدخول: {selectedSite.entryFees}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  <span>الموقع: {selectedSite.city}، محافظة المنوفية</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedSite(null)}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
