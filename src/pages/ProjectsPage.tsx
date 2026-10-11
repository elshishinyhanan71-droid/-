import React, { useState } from 'react';
import {
  Hammer,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PROJECTS_DATA } from '../data/mockData';

export const ProjectsPage: React.FC = () => {
  const { navigate } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'all',
    'مبادرة حياة كريمة',
    'بنية تحتية وطرق',
    'مرافق ومياه',
    'صحة ومستشفيات',
    'تطوير حضري'
  ];

  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    return selectedCategory === 'all' || proj.category === selectedCategory;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </button>
        <span className="text-xs text-slate-400 font-mono">المشروعات التنموية الكبرى</span>
      </div>

      {/* Main Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
              البناء والتطوير
            </span>
            <span className="text-xs text-slate-400">· محافظة المنوفية</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            المشروعات القومية والمبادرات التنموية بالمنوفية
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            مشروعات حياة كريمة بأشمون والشهداء، محاور الطرق، تبطين الترع، وتوسعات المناطق الصناعية
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
          <Hammer className="w-6 h-6" />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-3.5 bg-slate-100 border border-slate-200 rounded-2xl flex items-start gap-3 text-xs text-slate-600">
        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <p>
          <strong>بيانات استرشادية:</strong> المشروعات المعروضة توثق أبرز محاور التنمية الجارية بمراكز وقرى المحافظة، ونسب التنفيذ معلنة استرشادياً لنموذج التطبيق.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              selectedCategory === c
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {c === 'all' ? 'كافة المشروعات' : c}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 hover:border-emerald-300 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  {proj.category}
                </span>
                <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{proj.city}</span>
                </span>
              </div>

              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-lg self-start sm:self-auto ${
                proj.status === 'مكتمل'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}>
                {proj.status}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-base text-slate-900">{proj.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">{proj.description}</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">نسبة الإنجاز الميداني:</span>
                <span className="font-mono font-extrabold text-emerald-800 tabular-nums">
                  %{proj.completionRate}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200/60">
                <div
                  className="bg-gradient-to-r from-emerald-600 to-emerald-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${proj.completionRate}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-3">
              <span>تاريخ الانطلاق: {proj.startDate}</span>
              <span>الموعد المستهدف: {proj.expectedEndDate}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
