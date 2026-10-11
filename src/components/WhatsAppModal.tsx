import React, { useState } from 'react';
import { MessageCircle, X, ShieldAlert, Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WhatsAppModal: React.FC = () => {
  const { isWhatsAppModalOpen, setIsWhatsAppModalOpen } = useApp();
  const [chatInput, setChatInput] = useState('');
  const [simulatedSent, setSimulatedSent] = useState(false);

  if (!isWhatsAppModalOpen) return null;

  const handleSimulatedSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setSimulatedSent(true);
    setTimeout(() => {
      setChatInput('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm">التواصل عبر تطبيق واتساب (تجريبي)</h3>
              <p className="text-[11px] text-emerald-100">خدمة دعم المواطنين التجريبية</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsWhatsAppModalOpen(false);
              setSimulatedSent(false);
            }}
            className="p-1 rounded text-white/80 hover:text-white"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2.5 items-start text-xs text-amber-900 leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">تنويه إخلاء المسؤولية:</strong>
              رابط التواصل الرسمي لم يُضف بعد، وسيتم إضافة وتفعيل قناة واتساب الرسمية فور التحقق منها واعتمادها رسمياً من ديوان عام المحافظة. هذه الواجهة توفر محاكاة استرشادية لخدمة الدعم والاستفسارات.
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs space-y-1">
            <div className="flex justify-between text-slate-500">
              <span>جهة الاستقبال:</span>
              <span className="font-medium text-slate-800">وحدة التواصل المجتمعي الافتراضية</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>الرقم المخصص (تجريبي):</span>
              <span className="font-mono text-slate-800 dir-ltr">+20 (048) 222-DEMO</span>
            </div>
          </div>

          {simulatedSent ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="text-xs font-bold text-emerald-800">
                تمت محاكاة إرسال رسالتك بنجاح!
              </p>
              <p className="text-[11px] text-slate-600">
                في النسخة الإنتاجية المعتمدة سيتم توجيهك مباشرة لمحادثة الواتساب الرسمية الموثقة.
              </p>
              <button
                onClick={() => setSimulatedSent(false)}
                className="mt-2 text-xs font-semibold text-emerald-700 underline"
              >
                إرسال رسالة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleSimulatedSend} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  نص الرسالة أو الاستفسار:
                </label>
                <textarea
                  rows={3}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="اكتب استفسارك أو اقتراحك هنا لتجربة الإرسال..."
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 rtl:-scale-x-100" />
                  <span>محاكاة الإرسال إلى واتساب</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsWhatsAppModalOpen(false)}
                  className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  إلغاء
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
