import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PageRoute,
  Language,
  User,
  GovernorAppointment,
  TechCenterAppointment,
  Complaint,
  CommunityProposal,
  AppNotification,
  NewsArticle,
  DirectoryItem
} from '../types';
import {
  COMMUNITY_PROPOSALS,
  INITIAL_NOTIFICATIONS,
  NEWS_ARTICLES,
  DIRECTORY_ITEMS
} from '../data/mockData';
import { ar, TranslationKey } from '../i18n/ar';
import { en } from '../i18n/en';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  currentRoute: PageRoute;
  previousRoutes: PageRoute[];
  navigate: (route: PageRoute) => void;
  goBack: () => void;
  user: User | null;
  login: (userData: Partial<User>) => void;
  register: (name: string, emailOrPhone: string, city: string) => void;
  continueAsGuest: () => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  
  // Data actions
  governorAppointments: GovernorAppointment[];
  addGovernorAppointment: (appointment: Omit<GovernorAppointment, 'id' | 'referenceCode' | 'submittedAt' | 'status'>) => GovernorAppointment;
  
  techAppointments: TechCenterAppointment[];
  addTechAppointment: (appointment: Omit<TechCenterAppointment, 'id' | 'referenceCode' | 'tokenNumber' | 'submittedAt'>) => TechCenterAppointment;
  
  complaints: Complaint[];
  addComplaint: (complaint: Omit<Complaint, 'id' | 'referenceCode' | 'submittedAt' | 'status' | 'timeline'>) => Complaint;
  
  proposals: CommunityProposal[];
  addProposal: (title: string, category: CommunityProposal['category'], city: string, description: string) => void;
  voteProposal: (proposalId: string) => void;
  
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  
  // News & Directory state (Admin manageable)
  newsArticles: NewsArticle[];
  addNewsArticle: (article: Omit<NewsArticle, 'id'>) => void;
  updateNewsArticle: (id: string, updated: Partial<NewsArticle>) => void;
  deleteNewsArticle: (id: string) => void;
  
  directoryItems: DirectoryItem[];
  addDirectoryItem: (item: Omit<DirectoryItem, 'id'>) => void;
  deleteDirectoryItem: (id: string) => void;

  updateComplaintStatus: (id: string, newStatus: Complaint['status']) => void;
  updateGovernorStatus: (id: string, newStatus: GovernorAppointment['status']) => void;

  // Accessibility & UI
  highContrast: boolean;
  setHighContrast: React.Dispatch<React.SetStateAction<boolean>>;
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: React.Dispatch<React.SetStateAction<'normal' | 'large' | 'xlarge'>>;
  
  // Modals & UI helpers
  isAssistantOpen: boolean;
  setIsAssistantOpen: (open: boolean) => void;
  isWhatsAppModalOpen: boolean;
  setIsWhatsAppModalOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: 'usr-demo-1',
  name: 'أحمد محمود المنوفي',
  email: 'ahmed.menoufia@demo.eg',
  phone: '01012345678',
  nationalId: '29010101700123',
  city: 'شبين الكوم',
  isGuest: false,
  joinedDate: '10 أكتوبر 2026'
};

const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'cmp-init-1',
    referenceCode: 'CMP-2026-4891',
    category: 'طرق وإنارة',
    city: 'شبين الكوم',
    districtOrVillage: 'حي شرق - شارع سعد زغلول',
    addressDetails: 'أمام مدرسة التجارة الثانوية بنات',
    description: 'انطفاء 4 أعمدة إنارة عامة بالشارع الرئيسي مما يسبب خطورة على المارة ليلاً وطلاب الدروس.',
    applicantName: 'أحمد محمود المنوفي',
    phone: '01012345678',
    submittedAt: '08 أكتوبر 2026',
    status: 'تمت المعاينة',
    timeline: [
      { stage: 'تم استلام الشكوى إلكترونياً', date: '08 أكتوبر 2026 10:15 ص', note: 'تسجيل البلاغ بالمنظومة المحلية', done: true },
      { stage: 'الإحالة لإدارة الإنارة بشرق شبين', date: '08 أكتوبر 2026 01:30 م', note: 'توجيه فنيي الصيانة للموقع', done: true },
      { stage: 'المعاينة الميدانية', date: '09 أكتوبر 2026 11:00 ص', note: 'رصد عطل في الكابل الأرضي وتغيير القواطع', done: true },
      { stage: 'جاري استبدال الكشافات المعطلة', date: '10 أكتوبر 2026', note: 'مجدول إتمام الصيانة خلال 24 ساعة', done: false },
      { stage: 'الإغلاق والحل النهائي', date: 'قريباً', note: 'التأكد من تشغيل الإنارة بالكامل', done: false }
    ]
  }
];

const INITIAL_GOV_APPOINTMENTS: GovernorAppointment[] = [
  {
    id: 'gov-init-1',
    referenceCode: 'GOV-MNF-2026-104',
    applicantName: 'أحمد محمود المنوفي',
    nationalId: '29010101700123',
    phone: '01012345678',
    city: 'شبين الكوم',
    subject: 'طلب رصف وتبطين مصرف زراعي مجاور لكتلة سكنية',
    details: 'طلب النظر في إدراج المصرف ضمن خطة الصرف المغطى لحماية منازل الأهالي من الرشح المائي.',
    preferredDate: '2026-10-22',
    preferredTime: '11:00 ص',
    submittedAt: '09 أكتوبر 2026',
    status: 'قيد المراجعة'
  }
];

const INITIAL_TECH_APPOINTMENTS: TechCenterAppointment[] = [
  {
    id: 'tc-app-1',
    referenceCode: 'TC-SHB-9021',
    centerId: 'tc-shebin',
    centerName: 'المركز التكنولوجي لخدمة المواطنين - شبين الكوم',
    applicantName: 'أحمد محمود المنوفي',
    phone: '01012345678',
    serviceType: 'شهادات الصلاحية وتحديد الموقع',
    appointmentDate: '2026-10-15',
    timeSlot: '09:30 ص - 10:00 ص',
    tokenNumber: 'B-14',
    submittedAt: '09 أكتوبر 2026'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      return hash || 'home';
    }
    return 'home';
  });
  const [previousRoutes, setPreviousRoutes] = useState<PageRoute[]>([]);

  // Language state
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('menoufia_language') as Language;
      return saved === 'en' ? 'en' : 'ar';
    }
    return 'ar';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('menoufia_language', lang);
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: TranslationKey): string => {
    if (language === 'en') {
      return en[key] || ar[key] || (key as string);
    }
    return ar[key] || (key as string);
  };
  
  // User state
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('menoufia_guide_user');
    return saved ? JSON.parse(saved) : DEMO_USER;
  });

  // Business state
  const [governorAppointments, setGovernorAppointments] = useState<GovernorAppointment[]>(() => {
    const saved = localStorage.getItem('menoufia_gov_appointments');
    return saved ? JSON.parse(saved) : INITIAL_GOV_APPOINTMENTS;
  });

  const [techAppointments, setTechAppointments] = useState<TechCenterAppointment[]>(() => {
    const saved = localStorage.getItem('menoufia_tech_appointments');
    return saved ? JSON.parse(saved) : INITIAL_TECH_APPOINTMENTS;
  });

  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem('menoufia_complaints');
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  const [proposals, setProposals] = useState<CommunityProposal[]>(() => {
    const saved = localStorage.getItem('menoufia_proposals');
    return saved ? JSON.parse(saved) : COMMUNITY_PROPOSALS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('menoufia_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('menoufia_favorites');
    return saved ? JSON.parse(saved) : ['tc-shebin', 'em-1', 'her-1'];
  });

  // UI state
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('menoufia_high_contrast') === 'true';
  });

  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>(() => {
    const saved = localStorage.getItem('menoufia_font_size');
    return (saved as 'normal' | 'large' | 'xlarge') || 'normal';
  });

  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Persist storage updates
  useEffect(() => {
    if (user) {
      localStorage.setItem('menoufia_guide_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('menoufia_guide_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('menoufia_gov_appointments', JSON.stringify(governorAppointments));
  }, [governorAppointments]);

  useEffect(() => {
    localStorage.setItem('menoufia_tech_appointments', JSON.stringify(techAppointments));
  }, [techAppointments]);

  useEffect(() => {
    localStorage.setItem('menoufia_complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('menoufia_proposals', JSON.stringify(proposals));
  }, [proposals]);

  useEffect(() => {
    localStorage.setItem('menoufia_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('menoufia_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('menoufia_high_contrast', String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('menoufia_font_size', fontSize);
  }, [fontSize]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.route) {
        setCurrentRoute(e.state.route);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: PageRoute) => {
    if (route !== currentRoute) {
      setPreviousRoutes(prev => [...prev, currentRoute]);
      setCurrentRoute(route);
      window.history.pushState({ route }, '', `#${route}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goBack = () => {
    if (previousRoutes.length > 0) {
      const nextPrevious = [...previousRoutes];
      const target = nextPrevious.pop()!;
      setPreviousRoutes(nextPrevious);
      setCurrentRoute(target);
      window.history.pushState({ route: target }, '', `#${target}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('home');
    }
  };

  const login = (userData: Partial<User>) => {
    const fullUser: User = {
      id: 'usr-' + Date.now(),
      name: userData.name || 'مواطن منوفي',
      email: userData.email || 'citizen@menoufia.demo',
      phone: userData.phone || '01099887766',
      city: userData.city || 'شبين الكوم',
      nationalId: userData.nationalId || '29505051700987',
      isGuest: false,
      joinedDate: '10 أكتوبر 2026'
    };
    setUser(fullUser);
    navigate('home');
  };

  const register = (name: string, emailOrPhone: string, city: string) => {
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name,
      email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone}@menoufia.demo`,
      phone: emailOrPhone.includes('@') ? '01011223344' : emailOrPhone,
      city: city || 'شبين الكوم',
      isGuest: false,
      joinedDate: '10 أكتوبر 2026'
    };
    setUser(newUser);
    navigate('home');
  };

  const continueAsGuest = () => {
    const guestUser: User = {
      id: 'guest-' + Date.now(),
      name: 'زائر تجريبي',
      email: 'guest@menoufia.demo',
      phone: '01000000000',
      city: 'المنوفية',
      isGuest: true,
      joinedDate: '10 أكتوبر 2026'
    };
    setUser(guestUser);
    navigate('home');
  };

  const logout = () => {
    setUser(null);
    navigate('welcome');
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const addGovernorAppointment = (appointment: Omit<GovernorAppointment, 'id' | 'referenceCode' | 'submittedAt' | 'status'>) => {
    const randomCode = `GOV-MNF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: GovernorAppointment = {
      ...appointment,
      id: 'gov-' + Date.now(),
      referenceCode: randomCode,
      submittedAt: '10 أكتوبر 2026',
      status: 'قيد المراجعة'
    };
    setGovernorAppointments(prev => [newRecord, ...prev]);
    // Also push a notification
    setNotifications(prev => [
      {
        id: 'notif-' + Date.now(),
        title: 'تم استلام طلب لقاء المحافظ',
        message: `تم تسجيل طلبك برقم مرجعي ${randomCode}. الطلب قيد المراجعة المبدئية.`,
        date: 'الآن',
        isRead: false,
        type: 'service',
        actionRoute: 'governor-meeting'
      },
      ...prev
    ]);
    return newRecord;
  };

  const addTechAppointment = (appointment: Omit<TechCenterAppointment, 'id' | 'referenceCode' | 'tokenNumber' | 'submittedAt'>) => {
    const randomCode = `TC-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomToken = `${String.fromCharCode(65 + Math.floor(Math.random() * 5))}-${Math.floor(10 + Math.random() * 80)}`;
    const newRecord: TechCenterAppointment = {
      ...appointment,
      id: 'tc-app-' + Date.now(),
      referenceCode: randomCode,
      tokenNumber: randomToken,
      submittedAt: '10 أكتوبر 2026'
    };
    setTechAppointments(prev => [newRecord, ...prev]);
    setNotifications(prev => [
      {
        id: 'notif-' + Date.now(),
        title: 'تذكرة حجز بالمركز التكنولوجي',
        message: `تم حجز موعدك بالمركز التكنولوجي برقم تذكرة ${randomToken} وكود ${randomCode}.`,
        date: 'الآن',
        isRead: false,
        type: 'service',
        actionRoute: 'tech-centers'
      },
      ...prev
    ]);
    return newRecord;
  };

  const addComplaint = (complaint: Omit<Complaint, 'id' | 'referenceCode' | 'submittedAt' | 'status' | 'timeline'>) => {
    const randomCode = `CMP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: Complaint = {
      ...complaint,
      id: 'cmp-' + Date.now(),
      referenceCode: randomCode,
      submittedAt: '10 أكتوبر 2026',
      status: 'تم الاستلام',
      timeline: [
        { stage: 'تم استلام الشكوى إلكترونياً', date: '10 أكتوبر 2026', note: 'تم تسجيل البلاغ في النظام المحلي التجريبي', done: true },
        { stage: 'الإحالة للجهة المختصة', date: 'قيد الإجراء', note: 'جاري الإحالة لمجلس المدينة أو الإدارة المعنية', done: false },
        { stage: 'المعاينة الميدانية', date: 'مجدول', note: 'إرسال مندوب المعاينة لموقع الشكوى', done: false },
        { stage: 'اتخاذ الإجراء', date: 'مجدول', note: 'تنفيذ الإجراء اللازم وإزالة سبب الشكوى', done: false },
        { stage: 'تم الحل المبدئي', date: 'مجدول', note: 'تسجيل تقرير الإنجاز النهائي', done: false }
      ]
    };
    setComplaints(prev => [newRecord, ...prev]);
    setNotifications(prev => [
      {
        id: 'notif-' + Date.now(),
        title: 'تم تسجيل شكوى جديدة',
        message: `تم قيد الشكوى برقم ${randomCode}. يمكنك متابعة مسارها الميداني مباشرة.`,
        date: 'الآن',
        isRead: false,
        type: 'service',
        actionRoute: 'complaints'
      },
      ...prev
    ]);
    return newRecord;
  };

  const addProposal = (title: string, category: CommunityProposal['category'], city: string, description: string) => {
    const newProp: CommunityProposal = {
      id: 'prop-' + Date.now(),
      title,
      category,
      city,
      authorName: user?.name || 'مواطن منوفي',
      description,
      votesCount: 1,
      submittedAt: 'اليوم',
      hasVoted: true
    };
    setProposals(prev => [newProp, ...prev]);
  };

  const voteProposal = (proposalId: string) => {
    setProposals(prev =>
      prev.map(p => {
        if (p.id === proposalId) {
          const hasVoted = p.hasVoted;
          return {
            ...p,
            votesCount: hasVoted ? p.votesCount - 1 : p.votesCount + 1,
            hasVoted: !hasVoted
          };
        }
        return p;
      })
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem('menoufia_news_articles');
    return saved ? JSON.parse(saved) : NEWS_ARTICLES;
  });

  const [directoryItems, setDirectoryItems] = useState<DirectoryItem[]>(() => {
    const saved = localStorage.getItem('menoufia_directory_items');
    return saved ? JSON.parse(saved) : DIRECTORY_ITEMS;
  });

  useEffect(() => {
    localStorage.setItem('menoufia_news_articles', JSON.stringify(newsArticles));
  }, [newsArticles]);

  useEffect(() => {
    localStorage.setItem('menoufia_directory_items', JSON.stringify(directoryItems));
  }, [directoryItems]);

  const addNewsArticle = (article: Omit<NewsArticle, 'id'>) => {
    const newItem: NewsArticle = {
      ...article,
      id: 'news-' + Date.now()
    };
    setNewsArticles(prev => [newItem, ...prev]);
  };

  const updateNewsArticle = (id: string, updated: Partial<NewsArticle>) => {
    setNewsArticles(prev => prev.map(a => a.id === id ? { ...a, ...updated } : a));
  };

  const deleteNewsArticle = (id: string) => {
    setNewsArticles(prev => prev.filter(a => a.id !== id));
  };

  const addDirectoryItem = (item: Omit<DirectoryItem, 'id'>) => {
    const newItem: DirectoryItem = {
      ...item,
      id: 'dir-' + Date.now()
    };
    setDirectoryItems(prev => [newItem, ...prev]);
  };

  const deleteDirectoryItem = (id: string) => {
    setDirectoryItems(prev => prev.filter(d => d.id !== id));
  };

  const updateComplaintStatus = (id: string, newStatus: Complaint['status']) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: newStatus,
          timeline: c.timeline.map((step, idx) => {
            if (newStatus === 'تمت المعاينة' && idx <= 2) return { ...step, done: true };
            if (newStatus === 'جاري اتخاذ الإجراء' && idx <= 3) return { ...step, done: true };
            if (newStatus === 'تم الحل المبدئي') return { ...step, done: true };
            return step;
          })
        };
      }
      return c;
    }));
  };

  const updateGovernorStatus = (id: string, newStatus: GovernorAppointment['status']) => {
    setGovernorAppointments(prev => prev.map(g => g.id === id ? { ...g, status: newStatus } : g));
  };

  const resetDemoData = () => {
    localStorage.clear();
    setUser(DEMO_USER);
    setGovernorAppointments(INITIAL_GOV_APPOINTMENTS);
    setTechAppointments(INITIAL_TECH_APPOINTMENTS);
    setComplaints(INITIAL_COMPLAINTS);
    setProposals(COMMUNITY_PROPOSALS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setNewsArticles(NEWS_ARTICLES);
    setDirectoryItems(DIRECTORY_ITEMS);
    setFavorites(['tc-shebin', 'em-1', 'her-1']);
    setHighContrast(false);
    setFontSize('normal');
    navigate('home');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentRoute,
        previousRoutes,
        navigate,
        goBack,
        user,
        login,
        register,
        continueAsGuest,
        logout,
        updateProfile,
        governorAppointments,
        addGovernorAppointment,
        techAppointments,
        addTechAppointment,
        complaints,
        addComplaint,
        proposals,
        addProposal,
        voteProposal,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        favorites,
        toggleFavorite,
        isFavorite,
        newsArticles,
        addNewsArticle,
        updateNewsArticle,
        deleteNewsArticle,
        directoryItems,
        addDirectoryItem,
        deleteDirectoryItem,
        updateComplaintStatus,
        updateGovernorStatus,
        highContrast,
        setHighContrast,
        fontSize,
        setFontSize,
        isAssistantOpen,
        setIsAssistantOpen,
        isWhatsAppModalOpen,
        setIsWhatsAppModalOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        globalSearchQuery,
        setGlobalSearchQuery,
        resetDemoData
      }}
    >
      <div
        className={`${highContrast ? 'contrast-125 saturate-150' : ''} ${
          fontSize === 'large' ? 'text-lg' : fontSize === 'xlarge' ? 'text-xl' : 'text-base'
        } min-h-screen bg-slate-50 text-slate-800 transition-colors`}
      >
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
