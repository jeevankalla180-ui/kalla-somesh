import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SplashIntro } from './components/SplashIntro';
import { AuthModal } from './components/AuthModal';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { FinanceTrackView } from './components/finance/FinanceTrackView';
import { SmartFinanceView } from './components/finance/SmartFinanceView';
import { BusinessHealthView } from './components/advisory/BusinessHealthView';
import { AiPredictionView } from './components/advisory/AiPredictionView';
import { AiAdvisorView } from './components/advisory/AiAdvisorView';
import { BusinessIdeaMarketView } from './components/market/BusinessIdeaMarketView';
import { GrowthImpactView } from './components/market/GrowthImpactView';
import { LiveVoiceView } from './components/voice/LiveVoiceView';
import { VoiceHistoryView } from './components/voice/VoiceHistoryView';
import { ResourcesView } from './components/resources/ResourcesView';
import { ProfileView } from './components/profile/ProfileView';

// Global Modals
import { AddSaleModal } from './components/modals/AddSaleModal';
import { AddExpenseModal } from './components/modals/AddExpenseModal';
import { HandwrittenSlipModal } from './components/modals/HandwrittenSlipModal';
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';
import { NotificationsModal } from './components/modals/NotificationsModal';

const AppContent: React.FC = () => {
  const { currentView } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Splash Screen
  if (currentView === 'splash') {
    return <SplashIntro />;
  }

  // Auth / Registration Screen
  if (currentView === 'auth') {
    return <AuthModal />;
  }

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Fixed Header */}
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex w-full">
        {/* Left Navigation Sidebar */}
        <Sidebar isOpen={sidebarOpen} onCloseMobile={() => setSidebarOpen(false)} />

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentView === 'home' && <HomeView />}
          {currentView === 'finance-track' && <FinanceTrackView />}
          {currentView === 'smart-finance' && <SmartFinanceView />}
          {currentView === 'business-health' && <BusinessHealthView />}
          {currentView === 'ai-prediction' && <AiPredictionView />}
          {currentView === 'ai-advisor' && <AiAdvisorView />}
          {currentView === 'market-ideas' && <BusinessIdeaMarketView />}
          {currentView === 'growth-impact' && <GrowthImpactView />}
          {currentView === 'live-voice' && <LiveVoiceView />}
          {currentView === 'voice-history' && <VoiceHistoryView />}
          {currentView === 'resources' && <ResourcesView />}
          {currentView === 'profile' && <ProfileView />}
        </main>
      </div>

      {/* Global Interactive Modals */}
      <AddSaleModal />
      <AddExpenseModal />
      <HandwrittenSlipModal />
      <GlobalSearchModal />
      <NotificationsModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
