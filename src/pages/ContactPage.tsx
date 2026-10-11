import React, { useState } from 'react';
import {
  PhoneCall,
  Mail,
  MapPin,
  ExternalLink,
  Send,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  Building,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { navigate, user, setIsWhatsAppModalOpen } = useApp();

  const [activeTab, setActiveTab] = useState<'contact' | 'links'>('contact');

  // Form states
  const [name, setName] = useState(user?.name || '');
  const [emailOrPhone, setEmailOrPhone] = useState(user?.email || user?.phone || '');
  const [category, setCategory] = useState('استفسار عام');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const importantLinks = [
    {
      title: 'بوابة مصر الرقمية (Digital Egypt)',
      desc: 'المنصة القومية الموحدة لكافة المعاملات الحكومية (بطاقات التموين، التوثيق، المرور).',
      url: 'https://digital.gov.eg',
      category: 'خدمات حكومية مركزية'
    },
    {
      title: 'بوابة النيابة العامة لخدمات المرور',
      desc: 'الاستعلام الفوري عن مخالفات رخص القيادة وتسيير المركبات وسداد الغرامات إلكترونياً.',
      url: 'https://ppo.gov.eg',
      category: 'مرور وتراخيص'
    },
    {
      title: 'منظومة الشكاوى الحكومية الموحدة (مجلس الوزراء)',
      desc: 'المنظومة المركزية لتلقي وفحص ومعالجة شكاوى المواطنين على مستوى كافة الوزارات.',
      url: 'https://www.shakwa.eg',
      category: 'شكاوى مركزية'
    },
    {
      title: 'الموقع الرسمي لجامعة المنوفية',
      desc: 'بوابة الكليات، الجداول الدراسية، نتائج الامتحانات الجامعية، والدراسات العليا.',
      url: 'https://mu.menofia.edu.eg',
      category: 'تعليم عالي'
    },
    {
      title: 'صندوق الإسكان الاجتماعي ودعم التمويل العقاري',
      desc: 'طروحات شقق «سكن لكل المصريين» والوحدات السكنية المطروحة بمدن المحافظة وسداد الأقساط.',
      url: 'https://cff.gov.eg',
      category: 'إسكان ومرافق'
    },
    {
      title: 'شركة مياه الشرب والصرف الصحي بالمنوفية',
      desc: 'تسجيل قراءات العدادات، استعلام الفواتير، وبلاغات أعطال الخطوط والشبكات.',
      url: 'https://mcww.com.eg',
      category: 'مرافق وخدمات'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { [key: string]: string } = {};

    if (!name.trim()) errs.name = 'يرجى إدخال اسمك الكريم';
    if (!emailOrPhone.trim()) errs.emailOrPhone = 'يرجى إدخال وسيلة تواصل (هاتف أو بريد)';
    if (!message.trim() || message.length < 15) errs.message = 'يرجى كتابة رسالتك بوضوح (15 حرفاً على الأقل)';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitted(true);
    setErrors({});
  };

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
        <span className="text-xs text-slate-400 font-mono">قنوات التواصل والروابط</span>
      </div>

      {/* Main Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
              تواصل معنا
            </span>
            <span className="text-xs text-slate-400">· محافظة المنوفية</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            قنوات الاتصال المعتمدة والروابط الحكومية الهامة
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            أرسل استفسارك لفريق الدليل أو تصفح البوابات الرسمية للدولة المصرية
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsWhatsAppModalOpen(true)}
            className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>واتساب تجريبي</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('contact')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'contact'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>نموذج مراسلة الدليل</span>
        </button>
        <button
          onClick={() => setActiveTab('links')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'links'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>دليل الروابط الحكومية ({importantLinks.length})</span>
        </button>
      </div>

      {/* TAB 1: CONTACT FORM */}
      {activeTab === 'contact' && (
        <div className="grid md:grid-cols-12 gap-6">
          
          {/* Form Column */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-8 space-y-3 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  تم استلام رسالتك التجريبية بنجاح!
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  شكراً لتواصلك. هذه المحاكاة توضح كيفية تلقي استفسارات المواطنين واقتراحاتهم وتوثيقها.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="py-2 px-5 bg-emerald-700 text-white rounded-xl text-xs font-bold"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                  نموذج المراسلة والاقتراحات
                </h2>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    اسم الراسل *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="الاسم بالكامل"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  {errors.name && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    رقم الهاتف أو البريد الإلكتروني *
                  </label>
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="010XXXXXXXX أو user@example.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  {errors.emailOrPhone && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.emailOrPhone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    تصنيف الرسالة
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="استفسار عام">استفسار عام عن خدمة</option>
                    <option value="مقترح لتطوير التطبيق">مقترح لتطوير تطبيق دليل المنوفية</option>
                    <option value="تصحيح بيانات أو أرقام">إبلاغ عن تحديث بيانات أو رقم هاتف</option>
                    <option value="تعاون مجتمعي">تعاون مجتمعي أو رعاية</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    نص الرسالة أو الاستفسار *
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="اكتب ملاحظاتك أو استفسارك بالتفصيل..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 rtl:-scale-x-100" />
                  <span>إرسال الرسالة</span>
                </button>
              </form>
            )}
          </div>

          {/* Info Card Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 text-xs">
              <h3 className="font-bold text-sm text-slate-900">بيانات وقنوات التواصل المتاحة:</h3>
              
              <div className="space-y-3 text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>مجمع المصالح الحكومية - شارع الجلاء - شبين الكوم، المنوفية</span>
                </div>
                
                <div className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="font-mono dir-ltr">048-2224890 (هاتف تجريبي استرشادي)</span>
                </div>
                
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="font-mono">contact@menoufia-guide.demo</span>
                </div>

                {/* Facebook channel status */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700">صفحة فيسبوك الرسمية</span>
                    <span className="text-[10px] text-amber-800 bg-amber-100 font-bold px-2 py-0.5 rounded">غير مفعلة</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    الرابط معطل حالياً: سيتم إضافة بيانات التواصل الرسمية بعد التحقق منها واعتمادها من الجهات المعنية.
                  </p>
                </div>
              </div>

              {/* Strict Disclaimer Notice */}
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 text-[11px] space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>تنويه حول خصوصية ونموذج المراسلة:</span>
                </div>
                <p className="leading-relaxed">
                  هذا النموذج لأغراض التجربة والاستعراض؛ ولا يتم إرسال الرسائل فعلياً إلى ديوان عام محافظة المنوفية أو أي جهة حكومية.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
                ساعات العمل التجريبية: من الأحد إلى الخميس من الساعة 8:30 صباحاً حتى 2:30 ظهراً.
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-3xl border border-emerald-200/80 text-xs text-emerald-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-900">
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>خدمة التواصل التجريبي عبر واتساب</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                يمكنك الضغط على زر واتساب للاطلاع على الواجهة التفاعلية لتلقي الرسائل المحلية السريعة مع إيضاح حالة الرقم الرسمي.
              </p>
              <button
                onClick={() => setIsWhatsAppModalOpen(true)}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                فتح نافذة محادثة واتساب
              </button>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: IMPORTANT LINKS */}
      {activeTab === 'links' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {importantLinks.map((link, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  {link.category}
                </span>
                <h3 className="font-bold text-sm text-slate-900 leading-snug">
                  {link.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {link.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
                >
                  <span>زيارة البوابة الرسمية</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
