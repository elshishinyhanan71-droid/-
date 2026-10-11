import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { NewsTicker } from './components/NewsTicker';
import { BottomNav } from './components/BottomNav';
import { AssistantModal } from './components/AssistantModal';
import { NotificationModal } from './components/NotificationModal';
import { WhatsAppModal } from './components/WhatsAppModal';

// Pages
import { HomePage } from './pages/HomePage';
import { WelcomePage } from './pages/WelcomePage';
import { AuthPage } from './pages/AuthPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { GovernorMeetingPage } from './pages/GovernorMeetingPage';
import { TechCentersPage } from './pages/TechCentersPage';
import { ComplaintsPage } from './pages/ComplaintsPage';
import { EducationPage } from './pages/EducationPage';
import { HealthPage } from './pages/HealthPage';
import { DirectoryPage } from './pages/DirectoryPage';
import { AboutMenoufiaPage } from './pages/AboutMenoufiaPage';
import { TourismPage } from './pages/TourismPage';
import { PersonalitiesPage } from './pages/PersonalitiesPage';
import { CommunityPage } from './pages/CommunityPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { NewsPage } from './pages/NewsPage';
import { ContactPage } from './pages/ContactPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { ServicesHubPage } from './pages/ServicesHubPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { TestingGuidePage } from './pages/TestingGuidePage';
import { MyRequestsPage } from './pages/MyRequestsPage';
import { HelpPage } from './pages/HelpPage';
import { StatisticsPage } from './pages/StatisticsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { InteractiveMapPage } from './pages/InteractiveMapPage';
import { UrbanPlanPage } from './pages/UrbanPlanPage';
import { IdeasBankPage } from './pages/IdeasBankPage';
import { InvestmentServicesPage } from './pages/InvestmentServicesPage';
import { SawtakMasmouPage } from './pages/SawtakMasmouPage';
import { RequestTrackingPage } from './pages/RequestTrackingPage';
import { MediaHubPage } from './pages/MediaHubPage';
import { GovernorateCardPage } from './pages/GovernorateCardPage';
import { GeneralDiwanPage } from './pages/GeneralDiwanPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { HistoryCivilizationPage } from './pages/HistoryCivilizationPage';
import { TourismHeritagePage } from './pages/TourismHeritagePage';
import { MapsArticlesPage } from './pages/MapsArticlesPage';
import { MenoufiaAchieversPage } from './pages/MenoufiaAchieversPage';
import { ImportantLinksPage } from './pages/ImportantLinksPage';
import { GovernorBioPage } from './pages/GovernorBioPage';

import { MessageCircle, ShieldCheck, Heart } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentRoute, navigate, setIsWhatsAppModalOpen } = useApp();

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'welcome':
        return <WelcomePage />;
      case 'login':
        return <AuthPage initialMode="login" />;
      case 'register':
        return <AuthPage initialMode="register" />;
      case 'forgot-password':
        return <AuthPage initialMode="forgot-password" />;
      case 'emergency':
        return <EmergencyPage />;
      case 'governor-meeting':
        return <GovernorMeetingPage />;
      case 'tech-centers':
        return <TechCentersPage />;
      case 'complaints':
        return <ComplaintsPage />;
      case 'education':
        return <EducationPage />;
      case 'health':
        return <HealthPage />;
      case 'directory':
        return <DirectoryPage />;
      case 'about':
        return <AboutMenoufiaPage />;
      case 'tourism':
        return <TourismPage />;
      case 'personalities':
        return <PersonalitiesPage />;
      case 'community':
        return <CommunityPage />;
      case 'accessibility':
        return <AccessibilityPage />;
      case 'news':
        return <NewsPage />;
      case 'contact':
        return <ContactPage />;
      case 'links':
        return <ImportantLinksPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      case 'services':
        return <ServicesHubPage />;
      case 'admin':
        return <AdminDashboardPage />;
      case 'testing-guide':
        return <TestingGuidePage />;
      case 'my-requests':
        return <MyRequestsPage />;
      case 'help':
        return <HelpPage />;
      case 'statistics':
        return <StatisticsPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'interactive-map':
        return <InteractiveMapPage />;
      case 'urban-plan':
        return <UrbanPlanPage />;
      case 'ideas-bank':
        return <IdeasBankPage />;
      case 'investment-services':
        return <InvestmentServicesPage />;
      case 'sawtak-masmou':
        return <SawtakMasmouPage />;
      case 'request-tracking':
        return <RequestTrackingPage />;
      case 'media-hub':
        return <MediaHubPage />;
      case 'governorate-card':
        return <GovernorateCardPage />;
      case 'general-diwan':
        return <GeneralDiwanPage />;
      case 'about-us':
        return <AboutUsPage />;
      case 'history-civilization':
        return <HistoryCivilizationPage />;
      case 'tourism-heritage':
        return <TourismHeritagePage />;
      case 'maps-articles':
        return <MapsArticlesPage />;
      case 'menoufia-achievers':
        return <MenoufiaAchieversPage />;
      case 'governor-bio':
        return <GovernorBioPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  const isAuthOrWelcome = ['welcome', 'login', 'register', 'forgot-password'].includes(currentRoute);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 pb-16 md:pb-0">
      
      {/* Header and News Ticker (visible on all primary content pages) */}
      {!isAuthOrWelcome && (
        <>
          <Header />
          <NewsTicker />
        </>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full animate-fadeIn">
        {renderCurrentPage()}
      </main>

      {/* Floating WhatsApp Action Button */}
      {!isAuthOrWelcome && (
        <button
          onClick={() => setIsWhatsAppModalOpen(true)}
          className="fixed bottom-20 md:bottom-6 left-5 z-40 w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
          title="تواصل عبر واتساب (تجريبي)"
          aria-label="تواصل عبر واتساب (تجريبي)"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Modals */}
      <AssistantModal />
      <NotificationModal />
      <WhatsAppModal />

      {/* Mobile Bottom Navigation */}
      {!isAuthOrWelcome && <BottomNav />}

      {/* Footer */}
      {!isAuthOrWelcome && (
        <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800 mt-12 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6 text-center md:text-right">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-700 text-amber-300 font-bold flex items-center justify-center text-base">
                  م
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">دليل المنوفية | Menoufia Guide</h3>
                  <p className="text-[11px] text-slate-400">بوابة تجريبية مستقلة للخدمات والمرافق والمراكز التكنولوجية</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-400">
                <button onClick={() => navigate('emergency')} className="hover:text-white transition-colors">
                  أرقام الطوارئ
                </button>
                <button onClick={() => navigate('tech-centers')} className="hover:text-white transition-colors">
                  المراكز التكنولوجية
                </button>
                <button onClick={() => navigate('complaints')} className="hover:text-white transition-colors">
                  منظومة الشكاوى
                </button>
                <button onClick={() => navigate('about')} className="hover:text-white transition-colors">
                  عن المنوفية
                </button>
                <button onClick={() => navigate('accessibility')} className="hover:text-white transition-colors">
                  ذوي الهمم
                </button>
                <button onClick={() => navigate('contact')} className="hover:text-white transition-colors">
                  اتصل بنا
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>نموذج تجريبي مستقل غير تابع رسمياً لديوان عام محافظة المنوفية · جميع الحقوق محفوظة 2026</span>
              </div>
              <div className="flex items-center gap-1">
                <span>صنع لأهالي محافظة المنوفية الكرام</span>
                <Heart className="w-3 h-3 text-rose-500 inline fill-current" />
              </div>
            </div>

          </div>
        </footer>
      )}

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
