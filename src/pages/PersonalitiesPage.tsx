import React, { useState } from 'react';
import {
  Users,
  Award,
  BookOpen,
  ArrowRight,
  ChevronLeft,
  X,
  Star
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NOTABLE_PERSONALITIES } from '../data/mockData';
import { NotablePersonality } from '../types';

export const PersonalitiesPage: React.FC = () => {
  const { navigate } = useApp();

  const [selectedField, setSelectedField] = useState<string>('all');
  const [selectedPerson, setSelectedPerson] = useState<NotablePersonality | null>(null);

  const fields = [
    { id: 'all', label: 'كافة الشخصيات' },
    { id: 'سياسة وحكم', label: 'سياسة وحكم' },
    { id: 'فكر وأدب', label: 'فكر وأدب' },
    { id: 'علوم وطب', label: 'علوم وطب' },
    { id: 'شخصيات تاريخية', label: 'شخصيات تاريخية وقراء' }
  ];

  const filtered = NOTABLE_PERSONALITIES.filter(p => {
    return selectedField === 'all' || p.field === selectedField;
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
        <span className="text-xs text-slate-400 font-mono">أعلام ورموز المنوفية</span>
      </div>

      {/* Main Title Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-xs font-bold">
              لوحة الشرف الوطنية
            </span>
            <span className="text-xs text-slate-400">· محافظة المنوفية</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            شخصيات وأعلام أثروا تاريخ مصر والأمة
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            سير ومسيرات لقادة الفكر والسياسة والعلوم والأدب وتلاوة القرآن الكريم من أبناء المنوفية
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
          <Users className="w-6 h-6" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {fields.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedField(f.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
              selectedField === f.id
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Personality Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((person) => (
          <div
            key={person.id}
            onClick={() => setSelectedPerson(person)}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white flex items-center justify-center font-extrabold text-xl shadow-sm">
                  {person.name.charAt(person.name.startsWith('ال') ? 2 : 0)}
                </div>
                <div className="text-left">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    {person.field}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block mt-1">
                    {person.period}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {person.name}
                </h3>
                <p className="text-xs font-medium text-emerald-700 mt-0.5">
                  {person.title}
                </p>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  مسقط الرأس: {person.birthCity}
                </span>
                <p className="text-xs text-slate-500 mt-2.5 line-clamp-3 leading-relaxed">
                  {person.bio}
                </p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
              <span>السيرة الذاتية وأبرز الإنجازات</span>
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Biography Modal */}
      {selectedPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {selectedPerson.field}
              </span>
              <button
                onClick={() => setSelectedPerson(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white flex items-center justify-center font-extrabold text-2xl shrink-0">
                {selectedPerson.name.charAt(selectedPerson.name.startsWith('ال') ? 2 : 0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedPerson.name}</h3>
                <p className="text-xs font-semibold text-emerald-700">{selectedPerson.title}</p>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                  <span>{selectedPerson.birthCity}</span>
                  <span>·</span>
                  <span className="font-mono">{selectedPerson.period}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs leading-relaxed">
              <div>
                <strong className="block font-bold text-slate-900 mb-1.5">السيرة ونشأة الرمز:</strong>
                <p className="text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  {selectedPerson.bio}
                </p>
              </div>

              <div>
                <strong className="block font-bold text-slate-900 mb-2">أبرز المحطات والإسهامات التاريخية:</strong>
                <ul className="space-y-2">
                  {selectedPerson.keyContributions.map((contrib, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700">
                      <Star className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{contrib}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedPerson(null)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
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
