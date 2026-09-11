import React, { useState } from 'react';
import { Home, Search, Mic, Bell, ChevronDown, Globe, LogOut, User, Settings, Check } from 'lucide-react';
import { LOGO_IMAGE, AVATAR_IMAGE } from '../assets/assets';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/mockData';
import { LanguageCode } from '../types';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const {
    currentView,
    setCurrentView,
    userProfile,
    language,
    setLanguage,
    unreadNotificationsCount,
    setIsSearchModalOpen,
    setIsNotificationsModalOpen,
  } = useApp();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-purple-100/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] px-3 sm:px-6 py-2.5 flex items-center justify-between">
      {/* Left: Hamburger & Horizontal Logo and Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation Menu"
          className="p-2 rounded-xl text-slate-700 hover:text-purple-700 hover:bg-purple-50 transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full p-1 border border-purple-200 bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <img src={LOGO_IMAGE} alt="Yosti Siddhikhsa Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-['Outfit',sans-serif] text-base sm:text-lg font-extrabold tracking-wider text-[#3D1A56] uppercase">
                YOSTI SIDDHIKSHA
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-pink-600 font-medium tracking-tight hidden sm:block">
              — • From Self-Help to Self-Sustained Growth. • —
            </span>
          </div>
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-1.5 sm:gap-3">
        {/* Home Symbol */}
        <button
          onClick={() => setCurrentView('home')}
          title="Go to Home"
          className={`p-2 rounded-xl border transition-all cursor-pointer ${
            currentView === 'home'
              ? 'bg-purple-50 border-purple-300 text-purple-700'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-purple-700'
          }`}
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Search Symbol */}
        <button
          onClick={() => setIsSearchModalOpen(true)}
          title="Search anything (Finance, Schemes, Advisory, Markets)"
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-purple-700 transition-all cursor-pointer"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Live Voice Interaction Button */}
        <button
          onClick={() => setCurrentView('live-voice')}
          title="Live Voice Interaction (Instant Spoken Responses)"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border shadow-sm transition-all cursor-pointer ${
            currentView === 'live-voice'
              ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white border-transparent ring-2 ring-purple-300'
              : 'bg-pink-50 border-pink-200 text-pink-700 hover:bg-pink-100'
          }`}
        >
          <Mic className="w-3.5 h-3.5 text-pink-600 animate-pulse" />
          <span className="hidden md:inline">Live Voice</span>
        </button>

        {/* Language Switcher */}
        <div className="relative">
          <button
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-purple-600" />
            <span className="font-semibold">{LANGUAGES[language].nativeName}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isLangMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
              <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Select Language
              </div>
              {(Object.keys(LANGUAGES) as LanguageCode[]).map((code) => {
                const lang = LANGUAGES[code];
                const isSelected = language === code;
                return (
                  <button
                    key={code}
                    onClick={() => {
                      setLanguage(code, true);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-purple-50 cursor-pointer ${
                      isSelected ? 'font-bold text-purple-700 bg-purple-50/60' : 'text-slate-700'
                    }`}
                  >
                    <span>{lang.nativeName} ({lang.name})</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-purple-700" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Clean Flat-Vector Notification Bell Icon with circular badge showing "1" / unread count */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsModalOpen(true)}
            title="Notifications"
            className="p-2 rounded-xl bg-white border border-slate-200 shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-slate-600 hover:text-purple-700 hover:bg-slate-50 transition-all relative cursor-pointer"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-600 text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow-sm border border-white">
                {unreadNotificationsCount}
              </span>
            )}
          </button>
        </div>

        {/* Clean, modern profile avatar of a woman with long dark hair, peach skin tone, and soft green top */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full border border-slate-200 bg-white hover:border-purple-300 transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-emerald-300 shadow-sm bg-[#E6F4EA] flex items-center justify-center">
              <img
                src={AVATAR_IMAGE}
                alt="Savitri Devi"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden lg:flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-slate-800">{userProfile.name}</span>
              <span className="text-[10px] text-purple-600 font-medium">{userProfile.role}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-800">{userProfile.name}</p>
                <p className="text-[11px] text-purple-600 font-medium">{userProfile.shgName}</p>
                <p className="text-[10px] text-slate-400">{userProfile.locationDistrict}, {userProfile.locationState}</p>
              </div>

              <button
                onClick={() => {
                  setCurrentView('profile');
                  setIsProfileMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-purple-50 flex items-center gap-2 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-purple-600" />
                <span>My Profile & SHG Members</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('profile');
                  setIsProfileMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-purple-50 flex items-center gap-2 cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 text-purple-600" />
                <span>Settings & Preferences</span>
              </button>

              <div className="border-t border-slate-100 my-1" />

              <button
                onClick={() => {
                  setCurrentView('auth');
                  setIsProfileMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-600" />
                <span>Switch Profile / Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
