export type Language = 'ar' | 'en';

export type PageRoute =
  | 'home'
  | 'welcome'
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'emergency'
  | 'governor-meeting'
  | 'tech-centers'
  | 'complaints'
  | 'education'
  | 'health'
  | 'directory'
  | 'about'
  | 'tourism'
  | 'personalities'
  | 'community'
  | 'accessibility'
  | 'news'
  | 'contact'
  | 'links'
  | 'profile'
  | 'settings'
  | 'services'
  | 'admin'
  | 'testing-guide'
  | 'my-requests'
  | 'help'
  | 'statistics'
  | 'projects'
  | 'interactive-map'
  | 'urban-plan'
  | 'ideas-bank'
  | 'investment-services'
  | 'sawtak-masmou'
  | 'request-tracking'
  | 'media-hub'
  | 'governorate-card'
  | 'general-diwan'
  | 'about-us'
  | 'history-civilization'
  | 'tourism-heritage'
  | 'maps-articles'
  | 'menoufia-achievers'
  | 'governor-bio';

export interface ProjectItem {
  id: string;
  title: string;
  city: string;
  category: 'مبادرة حياة كريمة' | 'بنية تحتية وطرق' | 'صحة ومستشفيات' | 'مرافق ومياه' | 'تطوير حضري';
  description: string;
  completionRate: number;
  startDate: string;
  expectedEndDate: string;
  status: 'قيد التنفيذ' | 'مكتمل' | 'مرحلة أولى مكتملة';
  isDemo: boolean;
}


export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationalId?: string;
  city: string;
  isGuest: boolean;
  avatar?: string;
  joinedDate: string;
}

export interface EmergencyNumber {
  id: string;
  title: string;
  number: string;
  category: 'general' | 'utilities' | 'security' | 'health' | 'operations';
  description: string;
  isVerified: boolean;
  hours: string;
  district?: string;
}

export interface TechCenter {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  workingHours: string;
  services: string[];
  googleMapsHint: string;
  isSample: boolean;
}

export interface GovernorAppointment {
  id: string;
  referenceCode: string;
  applicantName: string;
  nationalId: string;
  phone: string;
  city: string;
  subject: string;
  details: string;
  preferredDate: string;
  preferredTime: string;
  submittedAt: string;
  status: 'قيد المراجعة' | 'مقبول مبدئياً' | 'بانتظار تحديد الموعد' | 'مكتمل';
}

export interface TechCenterAppointment {
  id: string;
  referenceCode: string;
  centerId: string;
  centerName: string;
  applicantName: string;
  phone: string;
  serviceType: string;
  appointmentDate: string;
  timeSlot: string;
  tokenNumber: string;
  submittedAt: string;
}

export interface Complaint {
  id: string;
  referenceCode: string;
  category: 'نظافة وتجميل' | 'طرق وإنارة' | 'مياه وصرف صحي' | 'إشغالات ومخالفات' | 'صحة وتموين' | 'أخرى';
  city: string;
  districtOrVillage: string;
  addressDetails: string;
  address?: string;
  subject?: string;
  description: string;
  applicantName: string;
  phone: string;
  submittedAt: string;
  attachmentName?: string;
  status: 'تم الاستلام' | 'قيد الفحص الفني' | 'تمت المعاينة' | 'جاري اتخاذ الإجراء' | 'تم الحل المبدئي';
  timeline: {
    stage: string;
    date: string;
    note: string;
    done: boolean;
  }[];
}

export interface ExamResultQuery {
  stage: 'primary' | 'preparatory' | 'secondary' | 'vocational';
  year: string;
  term: 'first' | 'second';
  seatNumber: string;
  studentName?: string;
  schoolName?: string;
  administration?: string;
  totalScore?: number;
  maxScore?: number;
  percentage?: number;
  subjects?: {
    name: string;
    score: number;
    maxScore: number;
  }[];
}

export interface HealthClinic {
  id: string;
  name: string;
  city: string;
  address: string;
  type: 'تأمين صحي شامل' | 'عيادة تخصصية' | 'مستشفى عام' | 'مركز رعاية أولية' | 'لجنة طبية عليا';
  phone: string;
  workingHours: string;
  specialties: string[];
  notes: string;
}

export interface DirectoryItem {
  id: string;
  name: string;
  category: 'مكاتب تكنولوجية' | 'مستشفيات وصحة' | 'تعليم وجامعات' | 'مكاتب بريد' | 'مواقف ومواصلات' | 'شهر عقاري ومحاكم' | 'مراكز شباب ورياضة';
  city: string;
  village?: string;
  address: string;
  phone: string;
  timing: string;
  description: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'إعلانات خدمية' | 'تطوير ومشروعات' | 'تعليم' | 'صحة' | 'طوارئ وتنبيهات';
  date: string;
  summary: string;
  content: string;
  source: string;
  isDemo: boolean;
  readTime: string;
  featured?: boolean;
}

export interface HeritageSite {
  id: string;
  name: string;
  city: string;
  category: 'متاحف وتاريخ' | 'معالم أثرية' | 'طبيعة وحدائق' | 'معالم دينية';
  description: string;
  historicalSignificance: string;
  visitorInfo: string;
  imageUrl?: string;
  visitingHours?: string;
  entryFees?: string;
}

export interface NotablePersonality {
  id: string;
  name: string;
  title: string;
  birthCity: string;
  period: string;
  era?: string;
  category?: string;
  field: 'فكر وأدب' | 'سياسة وحكم' | 'علوم وطب' | 'فنون وإعلام' | 'شخصيات تاريخية';
  bio: string;
  keyContributions: string[];
}

export interface CommunityProposal {
  id: string;
  title: string;
  city: string;
  authorName: string;
  category: 'بيئة وتجميل' | 'مواصلات وطرق' | 'شباب ورياضة' | 'ثقافة ومجتمع';
  description: string;
  votesCount: number;
  submittedAt: string;
  hasVoted?: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  type: 'alert' | 'service' | 'news';
  actionRoute?: PageRoute;
}
