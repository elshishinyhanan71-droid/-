import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Search,
  Filter,
  ArrowRight,
  Building2,
  HeartPulse,
  GraduationCap,
  Train,
  Landmark,
  Phone,
  Clock,
  ExternalLink,
  ShieldCheck,
  Layers,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MENOUFIA_CITIES, DIRECTORY_ITEMS, TECH_CENTERS } from '../data/mockData';

interface MapPinItem {
  id: string;
  name: string;
  category: 'مراكز تكنولوجية' | 'صحة ومستشفيات' | 'تعليم وجامعات' | 'مواصلات ومحطات' | 'مصالح ومحاكم' | 'تراث ومعالم';
  city: string;
  address: string;
  phone?: string;
  hours?: string;
  lat: number;
  lng: number;
  desc: string;
}

const MAP_ITEMS: MapPinItem[] = [
  {
    id: 'pin-1',
    name: 'مجمع المصالح والديوان العام - شبين الكوم',
    category: 'مصالح ومحاكم',
    city: 'شبين الكوم',
    address: 'شارع جمال عبد الناصر، شبين الكوم',
    phone: '048-2220000 (تجريبي)',
    hours: '8:00 ص - 3:00 م',
    lat: 52,
    lng: 48,
    desc: 'مقر ديوان عام المحافظة والمصالح الحكومية ومديريات الخدمات.'
  },
  {
    id: 'pin-2',
    name: 'المركز التكنولوجي لخدمة المواطنين - شبين الكوم',
    category: 'مراكز تكنولوجية',
    city: 'شبين الكوم',
    address: 'حي غرب، مجمع المصالح، شبين الكوم',
    phone: '048-2224111 (تجريبي)',
    hours: '8:30 ص - 2:30 م',
    lat: 50,
    lng: 50,
    desc: 'مركز الشباك الواحد لاستخراج التراخيص والإفادات وسداد الرسوم.'
  },
  {
    id: 'pin-3',
    name: 'مستشفى الجامعة التعليمي ومعهد الأورام',
    category: 'صحة ومستشفيات',
    city: 'شبين الكوم',
    address: 'شارع جمال عبد الناصر، مجمع كليات الطب',
    phone: '048-2222333 (تجريبي)',
    hours: 'طوارئ 24 ساعة',
    lat: 48,
    lng: 45,
    desc: 'أكبر مجمع طبي جامعي بالدلتا لتقديم الخدمات التخصصية المتقدمة.'
  },
  {
    id: 'pin-4',
    name: 'محطة قطارات شبين الكوم الرئيسية',
    category: 'مواصلات ومحطات',
    city: 'شبين الكوم',
    address: 'ميدان المحطة، شبين الكوم',
    phone: '1504 (استعلامات السكة الحديد)',
    hours: 'يعمل على مدار اليوم',
    lat: 55,
    lng: 52,
    desc: 'محطة ربط شبين الكوم بخطوط القاهرة والإسكندرية وطنطا.'
  },
  {
    id: 'pin-5',
    name: 'متحف دنشواي القومي',
    category: 'تراث ومعالم',
    city: 'الشهداء',
    address: 'قرية دنشواي، مركز الشهداء',
    phone: '048-2751100 (تجريبي)',
    hours: '9:00 ص - 4:00 م',
    lat: 32,
    lng: 35,
    desc: 'صرح تاريخي يوثق ملحمة صمود وبسالة أهالي دنشواي في عام 1906.'
  },
  {
    id: 'pin-6',
    name: 'المركز التكنولوجي لخدمات المواطنين - أشمون',
    category: 'مراكز تكنولوجية',
    city: 'أشمون',
    address: 'شارع عبد المنعم رياض، أشمون',
    phone: '048-3441222 (تجريبي)',
    hours: '8:30 ص - 2:30 م',
    lat: 78,
    lng: 60,
    desc: 'خدمات تراخيص البناء والمحال لجنوب محافظة المنوفية.'
  },
  {
    id: 'pin-7',
    name: 'المنطقة الصناعية ومجمع الخدمات - قويسنا',
    category: 'مصالح ومحاكم',
    city: 'قويسنا',
    address: 'طريق القاهرة - الإسكندرية الزراعي، قويسنا',
    phone: '048-2573333 (تجريبي)',
    hours: '8:00 ص - 3:00 م',
    lat: 62,
    lng: 75,
    desc: 'إدارة المنطقة الصناعية ومكتب الاستثمار وخدمات المصانع.'
  },
  {
    id: 'pin-8',
    name: 'متحف الرئيس الراحل أنور السادات',
    category: 'تراث ومعالم',
    city: 'تلا',
    address: 'قرية ميت أبو الكوم، مركز تلا',
    hours: '9:00 ص - 3:00 م',
    lat: 25,
    lng: 42,
    desc: 'مقر يضم مقتنيات وتاريخ الرئيس البطل محمد أنور السادات بمسقط رأسه.'
  },
  {
    id: 'pin-9',
    name: 'مستشفى السادات المركزي والعيادات التخصصية',
    category: 'صحة ومستشفيات',
    city: 'السادات',
    address: 'المنطقة الأولى، مدينة السادات',
    phone: '048-2601111 (تجريبي)',
    hours: '24 ساعة',
    lat: 65,
    lng: 18,
    desc: 'مرفق صحي متكامل يخدم قاطني مدينة السادات والمناطق الصناعية.'
  },
  {
    id: 'pin-10',
    name: 'كلية الهندسة الإلكترونية العريقة - منوف',
    category: 'تعليم وجامعات',
    city: 'منوف',
    address: 'شارع كلية الهندسة، منوف',
    hours: '8:30 ص - 3:30 م',
    lat: 60,
    lng: 40,
    desc: 'أول كلية متخصصة في هندسة الإلكترونيات والاتصالات في الشرق الأوسط (1964).'
  }
];

export const InteractiveMapPage: React.FC = () => {
  const { navigate, t, language } = useApp();
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeItem, setActiveItem] = useState<MapPinItem>(MAP_ITEMS[0]);
  const [copiedNotice, setCopiedNotice] = useState(false);

  const categories = [
    'all',
    'مراكز تكنولوجية',
    'صحة ومستشفيات',
    'تعليم وجامعات',
    'مواصلات ومحطات',
    'مصالح ومحاكم',
    'تراث ومعالم'
  ];

  const filteredItems = MAP_ITEMS.filter(item => {
    const matchCity = selectedCity === 'all' || item.city === selectedCity;
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.includes(searchQuery) ||
      item.address.includes(searchQuery);
    return matchCity && matchCategory && matchSearch;
  });

  const handleSimulateGPS = (item: MapPinItem) => {
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <button onClick={() => navigate('home')} className="hover:text-emerald-700 transition-colors">
            {t('navHome')}
          </button>
          <span>/</span>
          <button onClick={() => navigate('services')} className="hover:text-emerald-700 transition-colors">
            {t('navServices')}
          </button>
          <span>/</span>
          <span className="font-semibold text-slate-900">{t('serviceInteractiveMap')}</span>
        </div>

        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-1.5 rounded-lg transition-colors"
        >
          <ArrowRight className={`w-3.5 h-3.5 ${language === 'en' ? 'rotate-180' : ''}`} />
          <span>{t('backToHome')}</span>
        </button>
      </div>

      {/* Page Title & Intro */}
      <div className="bg-gradient-to-l from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
              <Compass className="w-4 h-4 text-amber-300" />
              <span>{t('serviceInteractiveMap')} — استكشاف المنوفية</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              الخريطة التفاعلية للخدمات والمرافق بالمنوفية
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              محاكاة خريطة رقمية متكاملة لاستعراض مواقع المراكز التكنولوجية لخدمة المواطنين، المستشفيات المركزية، محطات القطارات، ومجمع المصالح الحكومية والمعالم التاريخية عبر مراكز المحافظة العشرة.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-xs space-y-1.5">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>بيانات توضيحية استرشادية</span>
            </div>
            <p className="text-slate-200 text-[11px] max-w-xs">
              جميع الإحداثيات والمواقع مجهزة كنموذج استرشادي يحاكي منصات نظم المعلومات الجغرافية (GIS).
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Keyword Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم أو الشارع أو النشاط..."
              className="w-full pr-9 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>

          {/* City Filter */}
          <div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            >
              <option value="all">جميع مراكز ومدن المنوفية (10 مراكز)</option>
              {MENOUFIA_CITIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            >
              <option value="all">جميع الفئات والتصنيفات</option>
              {categories.filter(c => c !== 'all').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Map Layout: Interactive Visual Grid + Facility Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left/Main Column: Graphic Map Canvas Simulation */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              <h2 className="text-sm font-bold text-slate-900">مسقط خريطة مراكز محافظة المنوفية</h2>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              {filteredItems.length} موقع متاح
            </span>
          </div>

          {/* Stylized Visual Map Board */}
          <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-100 rounded-2xl border border-emerald-200/80 overflow-hidden shadow-inner p-4 flex flex-col justify-between">
            
            {/* Nile Delta River representation subtle lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0,20 Q 150,80 300,140 T 600,200" stroke="#0284c7" strokeWidth="6" fill="none" />
                <path d="M 200,0 Q 240,120 280,250 T 350,400" stroke="#0284c7" strokeWidth="5" fill="none" />
              </svg>
            </div>

            {/* Geographical Markers */}
            <div className="relative z-10 w-full h-full">
              {filteredItems.map((pin) => {
                const isSelected = activeItem.id === pin.id;
                return (
                  <button
                    key={pin.id}
                    onClick={() => setActiveItem(pin)}
                    style={{ top: `${pin.lat}%`, left: `${pin.lng}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-transform ${
                      isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                    }`}
                    title={pin.name}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-white shadow-md border-2 ${
                          isSelected
                            ? 'bg-amber-500 border-white ring-4 ring-amber-300/50'
                            : pin.category === 'صحة ومستشفيات'
                            ? 'bg-rose-600 border-white'
                            : pin.category === 'مراكز تكنولوجية'
                            ? 'bg-emerald-700 border-white'
                            : 'bg-indigo-700 border-white'
                        }`}
                      >
                        <MapPin className="w-4 h-4 fill-current" />
                      </div>
                      <span
                        className={`text-[9px] font-bold mt-1 px-1.5 py-0.5 rounded shadow whitespace-nowrap transition-colors ${
                          isSelected
                            ? 'bg-slate-900 text-amber-300'
                            : 'bg-white/90 text-slate-800 border border-slate-200'
                        }`}
                      >
                        {pin.city}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="relative z-10 bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-xl p-2.5 flex flex-wrap items-center gap-3 text-[10px] text-slate-700 font-medium">
              <span className="font-bold text-slate-900">دليل الرموز:</span>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-700 inline-block"></span>
                <span>مركز تكنولوجي</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block"></span>
                <span>صحي / مستشفى</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-700 inline-block"></span>
                <span>مصالح ومحاكم</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                <span>الموقع المختار</span>
              </div>
            </div>

          </div>

          <p className="text-[11px] text-slate-500 text-center">
            💡 اضغط على أي نقطة على الخريطة لعرض تفاصيل المرفق ومواعيد العمل وإرشادات الوصول المباشرة.
          </p>

        </div>

        {/* Right Column: Active Facility Card & Interactive Actions */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {activeItem.category}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1.5 leading-snug">
                  {activeItem.name}
                </h3>
              </div>
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                <Building2 className="w-5 h-5 text-emerald-700" />
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {activeItem.desc}
            </p>

            <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-semibold">{activeItem.address}</span>
              </div>

              {activeItem.hours && (
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>ساعات العمل: {activeItem.hours}</span>
                </div>
              )}

              {activeItem.phone && (
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>الهاتف: {activeItem.phone}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => handleSimulateGPS(activeItem)}
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Compass className="w-4 h-4" />
                <span>محاكاة خط السير والوصول عبر GPS</span>
              </button>

              {copiedNotice && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-[11px] text-emerald-800 font-semibold text-center animate-fadeIn">
                  ✓ تم تجهيز إحداثيات الموقع ({activeItem.city}) ومحاكاة خط السير بنجاح!
                </div>
              )}

              {activeItem.category === 'مراكز تكنولوجية' && (
                <button
                  onClick={() => navigate('tech-centers')}
                  className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>الانتقال لحجز موعد بالمركز التكنولوجي</span>
                </button>
              )}
            </div>

          </div>

          {/* Quick List of Filtered Items */}
          <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm space-y-2.5 max-h-72 overflow-y-auto">
            <h4 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">
              المواقع المتطابقة ({filteredItems.length})
            </h4>
            {filteredItems.map(item => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                  activeItem.id === item.id
                    ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-950'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate">{item.name}</span>
                  <span className="text-[10px] text-slate-500 shrink-0 mr-2">{item.city}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
