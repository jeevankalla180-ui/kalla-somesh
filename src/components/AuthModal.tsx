import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, User, MapPin, Globe, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { LOGO_IMAGE } from '../assets/assets';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/mockData';
import { LanguageCode } from '../types';

export const AuthModal: React.FC = () => {
  const { setCurrentView, updateUserProfile, setLanguage, language, userProfile } = useApp();

  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [district, setDistrict] = useState(userProfile.locationDistrict);
  const [password, setPassword] = useState('••••••••');
  const [selectedLang, setSelectedLang] = useState<LanguageCode>(language);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: name || 'Savitri Devi',
      email: email || 'savitri.shg@ruralgrowth.in',
      locationDistrict: district,
      language: selectedLang,
    });
    setLanguage(selectedLang, true); // Plays voice greeting!
    setCurrentView('home');
  };

  const handleQuickDemo = () => {
    setName('Savitri Devi');
    setEmail('savitri.shg@ruralgrowth.in');
    setDistrict('Varanasi');
    setSelectedLang('hi');
    updateUserProfile({
      name: 'Savitri Devi',
      email: 'savitri.shg@ruralgrowth.in',
      locationDistrict: 'Varanasi',
      locationState: 'Uttar Pradesh',
      role: 'SHG Leader',
      shgName: 'Sree Mahila SHG',
      businessType: 'Food Products & Traditional Handicrafts',
      language: 'hi',
    });
    setLanguage('hi', true); // "नमस्ते, मैं आपकी क्या मदद कर सकती हूँ?"
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#F5F3FF] via-[#FAF5FF] to-[#EFF6FF] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden"
      >
        {/* Header Branding */}
        <div className="bg-gradient-to-r from-[#4A1D6D] via-[#6B21A8] to-[#86198F] text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-full p-2 shadow-lg mb-3 flex items-center justify-center border-2 border-pink-300">
              <img src={LOGO_IMAGE} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-wider font-['Outfit',sans-serif] uppercase">
              YOSTI SIDDHIKSHA
            </h2>
            <p className="text-pink-200 text-xs sm:text-sm mt-1">
              — • From Self-Help to Self-Sustained Growth • —
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                {isRegisterMode ? 'Create SHG Member Account' : 'Welcome to Yosti Siddhikhsa'}
              </h3>
              <p className="text-xs text-slate-500">
                Access your digital finance ledger & AI business advisor
              </p>
            </div>
            <button
              onClick={() => setIsRegisterMode(!isRegisterMode)}
              className="text-xs font-semibold text-purple-700 hover:text-purple-900 underline cursor-pointer"
            >
              {isRegisterMode ? 'Switch to Sign In' : 'New SHG? Register'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Preferred Language selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-purple-600" />
                <span>Preferred Local Language / स्थानीय भाषा</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(Object.keys(LANGUAGES) as LanguageCode[]).map((code) => {
                  const lang = LANGUAGES[code];
                  const isSelected = selectedLang === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setSelectedLang(code)}
                      className={`px-2 py-1.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-purple-700 text-white border-purple-700 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="font-semibold">{lang.nativeName}</div>
                      <div className="text-[10px] opacity-75">{lang.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name / पूरा नाम
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Savitri Devi"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Email / Mobile */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email or Mobile Number / ईमेल या मोबाइल
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="savitri.shg@ruralgrowth.in"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Location (District & State) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Location (District & State) / स्थान व ज़िला
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Varanasi">Varanasi, Uttar Pradesh</option>
                  <option value="Warangal">Warangal, Telangana</option>
                  <option value="Pune">Pune, Maharashtra</option>
                  <option value="Madurai">Madurai, Tamil Nadu</option>
                  <option value="Jaipur">Jaipur, Rajasthan</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password / पासवर्ड
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white font-semibold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>{isRegisterMode ? 'Register & Enter Dashboard' : 'Sign In & Open Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Login Preset */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full py-2.5 px-4 bg-purple-50 hover:bg-purple-100 text-purple-800 font-semibold rounded-xl border border-purple-200 text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>1-Click Demo Login as Savitri Devi (SHG Leader)</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </button>
            <p className="text-[11px] text-slate-400 text-center">
              Pre-loaded with authentic SHG financial records, advisory data & local language audio.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
