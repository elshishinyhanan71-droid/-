import React from 'react';
import {
  Home,
  Link as LinkIcon,
  MessageCircle,
  PhoneCall,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageRoute } from '../types';

export const BottomNav: React.FC = () => {
  const { currentRoute, navigate, setIsWhatsAppModalOpen, t } = useApp();

  return (
    <nav
      aria-label="التنقل السفلي للموبايل"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-safe"
    >
      <div className="grid grid-cols-5 items-center h-16 max-w-lg mx-auto px-1 relative">
        
        {/* 1. الرئيسية (Home) */}
        <button
          onClick={() => navigate('home')}
          className={`flex flex-col items-center justify-center min-h-[48px] w-full py-1 transition-colors rounded-xl ${
            currentRoute === 'home'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className={`w-5 h-5 ${currentRoute === 'home' ? 'scale-110 text-emerald-700' : ''} transition-transform`} />
          <span className="text-[10px] tracking-tight mt-1 whitespace-nowrap">
            {t('navHome')}
          </span>
        </button>

        {/* 2. روابط مهمة (Important Links) */}
        <button
          onClick={() => navigate('links')}
          className={`flex flex-col items-center justify-center min-h-[48px] w-full py-1 transition-colors rounded-xl ${
            currentRoute === 'links'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <LinkIcon className={`w-5 h-5 ${currentRoute === 'links' ? 'scale-110 text-emerald-700' : ''} transition-transform`} />
          <span className="text-[10px] tracking-tight mt-1 whitespace-nowrap">
            {t('navLinks')}
          </span>
        </button>

        {/* 3. زر واتساب دائري في المنتصف، بحجم بارز */}
        <div className="flex flex-col items-center justify-center relative">
          <button
            onClick={() => setIsWhatsAppModalOpen(true)}
            className="w-13 h-13 -mt-6 rounded-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center ring-4 ring-white focus:outline-none"
            title="واتساب"
            aria-label="تواصل عبر واتساب"
          >
            <MessageCircle className="w-6 h-6 fill-current text-white" />
          </button>
          <span className="text-[10px] font-bold text-emerald-800 tracking-tight mt-0.5 whitespace-nowrap">
            {t('navWhatsApp')}
          </span>
        </div>

        {/* 4. تواصل معنا (Contact Us) */}
        <button
          onClick={() => navigate('contact')}
          className={`flex flex-col items-center justify-center min-h-[48px] w-full py-1 transition-colors rounded-xl ${
            currentRoute === 'contact'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <PhoneCall className={`w-5 h-5 ${currentRoute === 'contact' ? 'scale-110 text-emerald-700' : ''} transition-transform`} />
          <span className="text-[10px] tracking-tight mt-1 whitespace-nowrap">
            {t('navContact')}
          </span>
        </button>

        {/* 5. دليل المنوفية (Menoufia Guide / Directory) */}
        <button
          onClick={() => navigate('directory')}
          className={`flex flex-col items-center justify-center min-h-[48px] w-full py-1 transition-colors rounded-xl ${
            currentRoute === 'directory'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <MapPin className={`w-5 h-5 ${currentRoute === 'directory' ? 'scale-110 text-emerald-700' : ''} transition-transform`} />
          <span className="text-[10px] tracking-tight mt-1 whitespace-nowrap">
            {t('navDirectory')}
          </span>
        </button>

      </div>
    </nav>
  );
};
