import React, { useState } from 'react';
import {
  Home,
  User,
  Wallet,
  Lightbulb,
  Store,
  Mic,
  MessageSquareText,
  Gift,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Activity,
  Award,
  Sparkles,
  Layers,
  MapPin,
  Users,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ViewId } from '../types';
import { LOGO_IMAGE } from '../assets/assets';

interface SidebarProps {
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onCloseMobile }) => {
  const { currentView, setCurrentView } = useApp();

  // Accordion open states
  const [profileOpen, setProfileOpen] = useState(false);
  const [digitalFinanceOpen, setDigitalFinanceOpen] = useState(
    currentView === 'finance-track' || currentView === 'smart-finance'
  );
  const [advisoryOpen, setAdvisoryOpen] = useState(
    currentView === 'business-health' ||
      currentView === 'ai-prediction' ||
      currentView === 'ai-advisor'
  );
  const [marketOpen, setMarketOpen] = useState(
    currentView === 'market-ideas' || currentView === 'growth-impact'
  );
  const [resourcesOpen, setResourcesOpen] = useState(currentView === 'resources');

  const navigateTo = (view: ViewId) => {
    setCurrentView(view);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-30 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-14 sm:top-16 bottom-0 left-0 z-30 w-64 bg-[#FAFAFC] border-r border-purple-100 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin">
          {/* HOME */}
          <button
            onClick={() => navigateTo('home')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              currentView === 'home'
                ? 'bg-purple-700 text-white shadow-md shadow-purple-200'
                : 'text-slate-700 hover:bg-purple-50 hover:text-purple-800'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>HOME</span>
          </button>

          {/* PROFILE */}
          <div>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                currentView === 'profile'
                  ? 'bg-purple-100 text-purple-900 font-extrabold'
                  : 'text-slate-700 hover:bg-purple-50 hover:text-purple-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-purple-600" />
                <span>PROFILE</span>
              </div>
              {profileOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {profileOpen && (
              <div className="ml-5 pl-3 border-l-2 border-purple-100 mt-1 space-y-1">
                <button
                  onClick={() => navigateTo('profile')}
                  className="w-full text-left py-1.5 px-2 text-[11px] font-medium text-slate-600 hover:text-purple-700 hover:bg-purple-50/50 rounded-lg cursor-pointer"
                >
                  My Profile
                </button>
                <button
                  onClick={() => navigateTo('profile')}
                  className="w-full text-left py-1.5 px-2 text-[11px] font-medium text-slate-600 hover:text-purple-700 hover:bg-purple-50/50 rounded-lg cursor-pointer"
                >
                  Business Profile
                </button>
                <button
                  onClick={() => navigateTo('profile')}
                  className="w-full text-left py-1.5 px-2 text-[11px] font-medium text-slate-600 hover:text-purple-700 hover:bg-purple-50/50 rounded-lg cursor-pointer"
                >
                  SHG Members
                </button>
                <button
                  onClick={() => navigateTo('profile')}
                  className="w-full text-left py-1.5 px-2 text-[11px] font-medium text-slate-600 hover:text-purple-700 hover:bg-purple-50/50 rounded-lg cursor-pointer"
                >
                  Location
                </button>
                <button
                  onClick={() => navigateTo('profile')}
                  className="w-full text-left py-1.5 px-2 text-[11px] font-medium text-slate-600 hover:text-purple-700 hover:bg-purple-50/50 rounded-lg cursor-pointer"
                >
                  Settings
                </button>
              </div>
            )}
          </div>

          {/* DIGITAL FINANCE */}
          <div>
            <button
              onClick={() => setDigitalFinanceOpen(!digitalFinanceOpen)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                currentView === 'finance-track' || currentView === 'smart-finance'
                  ? 'bg-purple-100 text-purple-900'
                  : 'text-slate-700 hover:bg-purple-50 hover:text-purple-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Wallet className="w-4 h-4 text-purple-600" />
                <span>DIGITAL FINANCE</span>
              </div>
              {digitalFinanceOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {digitalFinanceOpen && (
              <div className="ml-5 pl-3 border-l-2 border-purple-100 mt-1 space-y-1">
                <button
                  onClick={() => navigateTo('finance-track')}
                  className={`w-full text-left py-1.5 px-2 text-[11px] font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'finance-track'
                      ? 'bg-pink-100 text-pink-900 font-bold'
                      : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/50'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                  <span>FinanceTrack</span>
                </button>
                <button
                  onClick={() => navigateTo('smart-finance')}
                  className={`w-full text-left py-1.5 px-2 text-[11px] font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'smart-finance'
                      ? 'bg-pink-100 text-pink-900 font-bold'
                      : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/50'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>Smart Finance & Resources</span>
                </button>
              </div>
            )}
          </div>

          {/* BUSINESS ADVISORY */}
          <div>
            <button
              onClick={() => setAdvisoryOpen(!advisoryOpen)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                currentView === 'business-health' ||
                currentView === 'ai-prediction' ||
                currentView === 'ai-advisor'
                  ? 'bg-purple-100 text-purple-900'
                  : 'text-slate-700 hover:bg-purple-50 hover:text-purple-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <BrainCircuit className="w-4 h-4 text-purple-600" />
                <span>BUSINESS ADVISORY</span>
              </div>
              {advisoryOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {advisoryOpen && (
              <div className="ml-5 pl-3 border-l-2 border-purple-100 mt-1 space-y-1">
                <button
                  onClick={() => navigateTo('business-health')}
                  className={`w-full text-left py-1.5 px-2 text-[11px] font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'business-health'
                      ? 'bg-pink-100 text-pink-900 font-bold'
                      : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/50'
                  }`}
                >
                  <Activity className="w-3 h-3 text-pink-600" />
                  <span>Business Health Monitoring</span>
                </button>
                <button
                  onClick={() => navigateTo('ai-prediction')}
                  className={`w-full text-left py-1.5 px-2 text-[11px] font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'ai-prediction'
                      ? 'bg-pink-100 text-pink-900 font-bold'
                      : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/50'
                  }`}
                >
                  <TrendingUp className="w-3 h-3 text-pink-600" />
                  <span>AI Prediction & Early Warnings</span>
                </button>
                <button
                  onClick={() => navigateTo('ai-advisor')}
                  className={`w-full text-left py-1.5 px-2 text-[11px] font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'ai-advisor'
                      ? 'bg-pink-100 text-pink-900 font-bold'
                      : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/50'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-pink-600" />
                  <span>AI Business Advisor</span>
                </button>
              </div>
            )}
          </div>

          {/* MARKET */}
          <div>
            <button
              onClick={() => setMarketOpen(!marketOpen)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                currentView === 'market-ideas' || currentView === 'growth-impact'
                  ? 'bg-purple-100 text-purple-900'
                  : 'text-slate-700 hover:bg-purple-50 hover:text-purple-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Store className="w-4 h-4 text-purple-600" />
                <span>MARKET</span>
              </div>
              {marketOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {marketOpen && (
              <div className="ml-5 pl-3 border-l-2 border-purple-100 mt-1 space-y-1">
                <button
                  onClick={() => navigateTo('market-ideas')}
                  className={`w-full text-left py-1.5 px-2 text-[11px] font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'market-ideas'
                      ? 'bg-pink-100 text-pink-900 font-bold'
                      : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/50'
                  }`}
                >
                  <Lightbulb className="w-3 h-3 text-pink-600" />
                  <span>Business Idea & Market Support</span>
                </button>
                <button
                  onClick={() => navigateTo('growth-impact')}
                  className={`w-full text-left py-1.5 px-2 text-[11px] font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'growth-impact'
                      ? 'bg-pink-100 text-pink-900 font-bold'
                      : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/50'
                  }`}
                >
                  <Award className="w-3 h-3 text-pink-600" />
                  <span>Growth & Impact Dashboard</span>
                </button>
              </div>
            )}
          </div>

          {/* 🎤 LIVE VOICE */}
          <button
            onClick={() => navigateTo('live-voice')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              currentView === 'live-voice'
                ? 'bg-gradient-to-r from-pink-600 to-purple-700 text-white shadow-md'
                : 'text-slate-700 hover:bg-pink-50 hover:text-pink-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <Mic className="w-4 h-4 text-pink-500 animate-pulse" />
              <span>LIVE VOICE</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-pink-500/20 text-pink-700 font-semibold uppercase">
              Live
            </span>
          </button>

          {/* VOICE CHAT HISTORY */}
          <button
            onClick={() => navigateTo('voice-history')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              currentView === 'voice-history'
                ? 'bg-purple-700 text-white shadow-md'
                : 'text-slate-700 hover:bg-purple-50 hover:text-purple-800'
            }`}
          >
            <MessageSquareText className="w-4 h-4 text-purple-600" />
            <span>VOICE CHAT HISTORY</span>
          </button>

          {/* RESOURCES & OPPORTUNITIES */}
          <div>
            <button
              onClick={() => setResourcesOpen(!resourcesOpen)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                currentView === 'resources'
                  ? 'bg-purple-100 text-purple-900'
                  : 'text-slate-700 hover:bg-purple-50 hover:text-purple-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Gift className="w-4 h-4 text-purple-600" />
                <span className="text-left text-[11px] leading-tight">
                  RESOURCES & OPPORTUNITIES
                </span>
              </div>
              {resourcesOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {resourcesOpen && (
              <div className="ml-5 pl-3 border-l-2 border-purple-100 mt-1 space-y-1">
                <button
                  onClick={() => navigateTo('resources')}
                  className="w-full text-left py-1 px-2 text-[11px] font-medium text-slate-600 hover:text-purple-700 rounded-lg cursor-pointer"
                >
                  • Government Schemes
                </button>
                <button
                  onClick={() => navigateTo('resources')}
                  className="w-full text-left py-1 px-2 text-[11px] font-medium text-slate-600 hover:text-purple-700 rounded-lg cursor-pointer"
                >
                  • Loans & Funding
                </button>
                <button
                  onClick={() => navigateTo('resources')}
                  className="w-full text-left py-1 px-2 text-[11px] font-medium text-slate-600 hover:text-purple-700 rounded-lg cursor-pointer"
                >
                  • Training & Skill Dev
                </button>
                <button
                  onClick={() => navigateTo('resources')}
                  className="w-full text-left py-1 px-2 text-[11px] font-medium text-slate-600 hover:text-purple-700 rounded-lg cursor-pointer"
                >
                  • Equipment & Resources
                </button>
                <button
                  onClick={() => navigateTo('resources')}
                  className="w-full text-left py-1 px-2 text-[11px] font-medium text-slate-600 hover:text-purple-700 rounded-lg cursor-pointer"
                >
                  • Markets & Selling
                </button>
                <button
                  onClick={() => navigateTo('resources')}
                  className="w-full text-left py-1 px-2 text-[11px] font-medium text-slate-600 hover:text-purple-700 rounded-lg cursor-pointer"
                >
                  • New Business Opportunities
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom branding watermark illustration */}
        <div className="p-3 border-t border-purple-100/60 bg-gradient-to-b from-transparent to-purple-50/50 flex flex-col items-center">
          <div className="w-16 h-16 opacity-30 hover:opacity-80 transition-opacity flex items-center justify-center">
            <img src={LOGO_IMAGE} alt="Watermark" className="w-full h-full object-contain" />
          </div>
          <span className="text-[10px] text-purple-400 font-medium text-center mt-1">
            Empowered Women, Stronger Nation
          </span>
        </div>
      </aside>
    </>
  );
};
