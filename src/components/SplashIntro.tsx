import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake, Mic } from 'lucide-react';
import { LOGO_IMAGE } from '../assets/assets';
import { useApp } from '../context/AppContext';

export const SplashIntro: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#1F1735] via-[#2D1B4E] to-[#431B49] text-white flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Dynamic ambient background circles */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-xl w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10 shadow-2xl text-center flex flex-col items-center"
      >
        {/* Animated Logo Container */}
        <motion.div
          initial={{ rotate: -15, scale: 0.7 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.9, type: 'spring', bounce: 0.4 }}
          className="relative w-32 h-32 sm:w-40 sm:h-40 mb-6 flex items-center justify-center"
        >
          {/* Animated pulsing rings */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 blur-md"
          />
          <div className="relative w-full h-full rounded-full bg-white p-3 shadow-xl overflow-hidden flex items-center justify-center border-2 border-pink-200">
            <img
              src={LOGO_IMAGE}
              alt="YOSTI SIDDHIKSHA Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Title and Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider font-['Outfit',sans-serif] text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-purple-200 uppercase">
            YOSTI SIDDHIKSHA
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2 text-pink-300 font-medium text-sm sm:text-base">
            <span className="w-8 h-[1px] bg-pink-400/60" />
            <span>From Self-Help to Self-Sustained Growth</span>
            <span className="w-8 h-[1px] bg-pink-400/60" />
          </div>
        </motion.div>

        <p className="mt-4 text-purple-100/90 text-sm sm:text-base leading-relaxed max-w-md">
          Empowering Women Entrepreneurs & Self-Help Groups with Real-Time Digital Finance,
          AI Advisory, Market Linkages & Multilingual Voice Assistance.
        </p>

        {/* Feature Badges */}
        <div className="grid grid-cols-3 gap-2 w-full mt-6 text-xs text-purple-200">
          <div className="bg-white/10 rounded-xl p-2.5 border border-white/10 flex flex-col items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Digital Ledger</span>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 border border-white/10 flex flex-col items-center gap-1">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI Advisory</span>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 border border-white/10 flex flex-col items-center gap-1">
            <Mic className="w-4 h-4 text-pink-300" />
            <span>Live Voice</span>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentView('auth')}
          className="mt-8 w-full py-3.5 px-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-semibold rounded-2xl shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Get Started / เข้าสู่ระบบ</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-purple-300">
          <HeartHandshake className="w-4 h-4 text-pink-400" />
          <span>Supporting 8.5 Crore+ Women SHG Members across India</span>
        </div>
      </motion.div>
    </div>
  );
};
