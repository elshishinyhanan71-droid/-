import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ASSISTANT_PRESETS } from '../data/mockData';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  actionRoute?: string;
  actionLabel?: string;
}

export const AssistantModal: React.FC = () => {
  const { isAssistantOpen, setIsAssistantOpen, navigate } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: 'مرحباً بك! أنا المساعد الإرشادي الذكي لدليل المنوفية. يسعدني إرشادك السريع لخدمات المراكز التكنولوجية، أرقام الطوارئ، تقديم الشكاوى، أو نتائج الامتحانات. كيف أساعدك اليوم؟'
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isAssistantOpen) return null;

  const handleSelectPreset = (preset: { query: string; answer: string }) => {
    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: preset.query
    };
    const botMsg: ChatMessage = {
      id: 'bot-' + (Date.now() + 1),
      sender: 'bot',
      text: preset.answer
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: userText
    };

    // Keyword matching response
    let botReply = 'شكراً لسؤالك! يمكنك تصفح دليل الخدمات أو البحث في المراكز التكنولوجية لمزيد من التفاصيل.';
    let route = 'tech-centers';
    let label = 'استعراض المراكز التكنولوجية';

    if (userText.includes('شكوى') || userText.includes('مخالفة') || userText.includes('نظافة')) {
      botReply = 'لتقديم أو متابعة شكوى، توجه لمنظومة الشكاوى الموحدة بالمنوفية لتسجيل بلاغك والحصول على رقم تتبع فوري.';
      route = 'complaints';
      label = 'الانتقال إلى منظومة الشكاوى';
    } else if (userText.includes('طوارئ') || userText.includes('إسعاف') || userText.includes('شرطة') || userText.includes('مطافئ')) {
      botReply = 'أرقام الطوارئ المعتمدة: الإسعاف 123، الشرطة 122، المطافئ 180، الكهرباء 121، المياه 125، الغاز 129.';
      route = 'emergency';
      label = 'دليل أرقام الطوارئ السريع';
    } else if (userText.includes('محافظ') || userText.includes('لقاء') || userText.includes('مقابلة')) {
      botReply = 'يمكنك تقديم طلب استرشادي لحجز لقاء مع السيد محافظ المنوفية عبر النموذج الإلكتروني المخصص.';
      route = 'governor-meeting';
      label = 'نموذج طلب لقاء المحافظ';
    } else if (userText.includes('نتيجة') || userText.includes('امتحان') || userText.includes('شهادة') || userText.includes('إعدادية')) {
      botReply = 'للاستعلام عن نتائج الشهادات الدراسية وجداول الامتحانات، تفضل بزيارة قسم التعليم والنتائج.';
      route = 'education';
      label = 'استعلام نتائج الامتحانات';
    } else if (userText.includes('صحة') || userText.includes('تأمين') || userText.includes('عيادة') || userText.includes('مستشفى')) {
      botReply = 'يتضمن الدليل مواقع ومواعيد عيادات التأمين الصحي الشاملة ومستشفيات شبين الكوم ومراكز المحافظة.';
      route = 'health';
      label = 'دليل الخدمات الصحية';
    }

    const botMsg: ChatMessage = {
      id: 'bot-' + (Date.now() + 1),
      sender: 'bot',
      text: botReply,
      actionRoute: route,
      actionLabel: label
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-lg h-[600px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Bot className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm">المساعد الإرشادي لدليل المنوفية</h3>
              <p className="text-[11px] text-emerald-200">إجابات سريعة للخدمات والمواعيد والشكاوى</p>
            </div>
          </div>
          <button
            onClick={() => setIsAssistantOpen(false)}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'bot' && (
                <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                  m.sender === 'user'
                    ? 'bg-emerald-700 text-white rounded-tl-sm'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tr-sm'
                }`}
              >
                <p>{m.text}</p>
                {m.actionRoute && m.actionLabel && (
                  <button
                    onClick={() => {
                      setIsAssistantOpen(false);
                      navigate(m.actionRoute as any);
                    }}
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold rounded-lg border border-emerald-200 text-[11px] transition-colors"
                  >
                    <span>{m.actionLabel}</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {/* Preset Suggestions */}
          <div className="pt-2">
            <span className="text-[11px] text-slate-500 font-medium block mb-2">أسئلة شائعة مقترحة:</span>
            <div className="flex flex-wrap gap-1.5">
              {ASSISTANT_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPreset(preset)}
                  className="text-right text-[11px] bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 px-2.5 py-1.5 rounded-lg transition-colors text-right"
                >
                  {preset.query}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleCustomSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="اكتب استفسارك هنا (مثل: أرقام الطوارئ، موعد المركز التكنولوجي...)"
            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <button
            type="submit"
            className="p-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition-colors disabled:opacity-50"
            disabled={!inputText.trim()}
            aria-label="إرسال"
          >
            <Send className="w-4 h-4 rtl:-scale-x-100" />
          </button>
        </form>

      </div>
    </div>
  );
};
