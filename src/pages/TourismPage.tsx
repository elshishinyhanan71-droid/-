import React, { useState } from 'react';
import {
  Landmark,
  MapPin,
  Clock,
  Search,
  Filter,
  ArrowRight,
  Info,
  ChevronLeft,
  X,
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HERITAGE_SITES } from '../data/mockData';
import { HeritageSite } from '../types';

export const TourismPage: React.FC = () => {
  const { navigate } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(null);

  const categories = [
    { id: 'all', label: 'كافة المعالم' },
    { id: 'متاحف وتاريخ', label: 'متاحف وتاريخ' },
    { id: 'معالم أثرية', label: 'معالم أثرية وحرفية' },
    { id: 'معالم دينية', label: 'معالم إسلامية وتراثية' },
    { id: 'طبيعة وحدائق', label: 'طبيعة ونيل وحدائق' }
  ];

  const filteredSites = HERITAGE_SITES.filter(site => {
    return selectedCategory === 'all' || site.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </button>
        <span className="text-xs text-slate-400 font-mono">السياحة والتراث بالمنوفية</span>
      </div>

      {/* Hero Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-bold">
              معالم وتاريخ
            </span>
            <span className="text-xs text-slate-400">· محافظة المنوفية</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            المعالم السياحية والتراثية ومتاحف المنوفية
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            اكتشف متحف دنشواي، متحف السادات، الحرف اليدوية بساقية أبو شعرة، وكورنيش النيل
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
          <Landmark className="w-6 h-6" />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
              selectedCategory === cat.id
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Heritage Sites */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSites.map((site) => (
          <div
            key={site.id}
            onClick={() => setSelectedSite(site)}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div>
              {/* Site Image */}
              <div className="h-48 w-full bg-slate-100 relative overflow-hidden">
                <img
                  src={site.imageUrl || '/src/assets/images/menoufia_heritage_landmark_1791651165888.jpg'}
                  alt={site.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950/70 backdrop-blur-md text-white text-[11px] font-bold">
                    {site.city}
                  </span>
                </div>
              </div>

              {/* Site Details */}
              <div className="p-5 space-y-2">
                <span className="text-[11px] font-semibold text-emerald-700">
                  {site.category}
                </span>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {site.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {site.description}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
                <span>استكشاف الدليل والزيارة</span>
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Site Detail Modal */}
      {selectedSite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="relative h-56 w-full">
              <img
                src={selectedSite.imageUrl || '/src/assets/images/menoufia_heritage_landmark_1791651165888.jpg'}
                alt={selectedSite.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setSelectedSite(null)}
                className="absolute top-3 left-3 w-8 h-8 rounded-full bg-slate-950/70 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    {selectedSite.category}
                  </span>
                  <span className="text-slate-500 font-medium">المدينة: {selectedSite.city}</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">{selectedSite.name}</h3>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div>
                  <strong className="block font-bold text-slate-900 mb-1">نبذة عن المعلم:</strong>
                  <p className="text-slate-600">{selectedSite.description}</p>
                </div>

                <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200/80 text-amber-950">
                  <strong className="block font-bold mb-1">القيمة والأهمية التاريخية:</strong>
                  <p>{selectedSite.historicalSignificance}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-slate-700">
                  <strong className="block font-bold mb-1">إرشادات الزائرين والمواعيد:</strong>
                  <p>{selectedSite.visitorInfo}</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedSite(null)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  إغلاق نافذة المعلم
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
