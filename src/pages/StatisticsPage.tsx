import React from 'react';
import {
  BarChart3,
  Users,
  MapPin,
  Building,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Percent,
  Wheat,
  Factory
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOVERNORATE_STATS } from '../data/mockData';

export const StatisticsPage: React.FC = () => {
  const { navigate } = useApp();

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
        <span className="text-xs text-slate-400 font-mono">مرصد المؤشرات الإحصائية</span>
      </div>

      {/* Main Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-xs font-bold">
              بيانات ومؤشرات تنموية
            </span>
            <span className="text-xs text-slate-400">· محافظة المنوفية</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            مؤشرات وإحصاءات محافظة المنوفية
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            بيانات السكان، التوزيع الإداري، كفاءة المراكز التكنولوجية، ونسب الاستجابة للشكاوى
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
          <BarChart3 className="w-6 h-6" />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
        <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p>
          <strong>تنويه إحصائي:</strong> الأرقام والمؤشرات المعروضة أدناه مستندة إلى تقديرات تقارير التنمية المحلية والجهاز المركزي للتعبئة العامة والإحصاء، وموسومة بأنها <strong>بيانات استرشادية لنموذج التطبيق</strong>.
        </p>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {GOVERNORATE_STATS.general.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <span className="text-xs text-slate-500">{stat.label}</span>
            <div className="font-extrabold text-xl text-slate-900 font-mono">
              {stat.value}
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 border-t border-slate-100 pt-2 block">
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      {/* Service Performance Metrics */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
          مؤشرات جودة الخدمات والمراكز التكنولوجية (استرشادي)
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {GOVERNORATE_STATS.services.map((srv, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">{srv.label}</span>
                <span className="font-mono font-extrabold text-emerald-800">{srv.value}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: srv.rate }}
                />
              </div>
              <span className="text-[10px] text-slate-400 block text-left font-mono">معدل الإنجاز: {srv.rate}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sector Demographics Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Wheat className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-sm text-slate-900">التوزيع السكاني والجغرافي</h3>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
              <span className="text-slate-600">سكان الريف والمجالس القروية:</span>
              <strong className="font-mono text-slate-900">79.5%</strong>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
              <span className="text-slate-600">سكان الحضر والمدن:</span>
              <strong className="font-mono text-slate-900">20.5%</strong>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
              <span className="text-slate-600">معدل الأمية:</span>
              <strong className="font-mono text-emerald-700">الأدنى على مستوى محافظات الدلتا</strong>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Factory className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900">الإنتاج الصناعي والعمالة</h3>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
              <span className="text-slate-600">المصانع العاملة بقويسنا والسادات:</span>
              <strong className="font-mono text-slate-900">+1,400 مصنع</strong>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
              <span className="text-slate-600">فرص العمل المباشرة الصناعية:</span>
              <strong className="font-mono text-slate-900">+180,000 عامل</strong>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
              <span className="text-slate-600">الصادرات السنوية التقديرية:</span>
              <strong className="font-mono text-slate-900">+1.2 مليار دولار</strong>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
