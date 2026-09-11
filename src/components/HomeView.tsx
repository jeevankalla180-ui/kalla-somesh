import React from 'react';
import { motion } from 'motion/react';
import {
  Wallet,
  BrainCircuit,
  Store,
  Mic,
  ArrowRight,
  TrendingUp,
  Activity,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
  Building2,
  Users,
  Award,
  BookOpen,
} from 'lucide-react';
import { HERO_IMAGE, LOGO_IMAGE } from '../assets/assets';
import { useApp } from '../context/AppContext';

export const HomeView: React.FC = () => {
  const {
    setCurrentView,
    userProfile,
    todaySales,
    todayExpenses,
    todayProfit,
    cashAvailable,
    businessHealth,
    districtData,
    setIsDigitizerModalOpen,
  } = useApp();

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Banner with Generated High-Quality Photography of Confident Woman Entrepreneur */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg border border-purple-100 bg-slate-900 min-h-[220px] sm:min-h-[260px] flex items-center">
        {/* Background Image */}
        <img
          src={HERO_IMAGE}
          alt="Successful Women Entrepreneur"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-85"
        />
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#241038]/90 via-[#3B1556]/70 to-transparent" />

        {/* Content Box */}
        <div className="relative z-10 p-6 sm:p-8 max-w-xl text-white">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-white/20 p-1 flex items-center justify-center backdrop-blur-xs">
              <img src={LOGO_IMAGE} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xs font-bold text-pink-300 uppercase tracking-wider">
              {userProfile.shgName} • {userProfile.locationDistrict}, {userProfile.locationState}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif] leading-tight">
            Welcome back, {userProfile.name}!
          </h2>
          <p className="text-xs sm:text-sm text-purple-100/90 mt-2 leading-relaxed">
            From Self-Help to Self-Sustained Growth. Your digital financial records, live AI predictions,
            and government opportunities are updated in real-time.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <button
              onClick={() => setCurrentView('finance-track')}
              className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Wallet className="w-4 h-4" />
              <span>Open FinanceTrack</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setCurrentView('live-voice')}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white font-semibold text-xs rounded-xl border border-white/30 flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Mic className="w-4 h-4 text-pink-300 animate-pulse" />
              <span>Talk to Live Voice AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-Time Central Business Status Telemetry */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Today's Sales</div>
          <div className="text-xl font-extrabold text-emerald-700 mt-1">₹{todaySales.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
            <TrendingUp className="w-3 h-3" />
            <span>↑ 12% vs yesterday</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Today's Expenses</div>
          <div className="text-xl font-extrabold text-rose-700 mt-1">₹{todayExpenses.toLocaleString()}</div>
          <div className="text-[11px] text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
            <span>↑ 8% raw materials</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Today's Profit</div>
          <div className="text-xl font-extrabold text-purple-700 mt-1">₹{todayProfit.toLocaleString()}</div>
          <div className="text-[11px] text-purple-600 font-semibold flex items-center gap-1 mt-0.5">
            <span>↑ 20% vs yesterday</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Cash Available</div>
          <div className="text-xl font-extrabold text-indigo-700 mt-1">₹{cashAvailable.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">
            <span>In hand & bank</span>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-purple-700 to-indigo-800 text-white p-4 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-purple-200">Business Health</span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-400 text-emerald-950">
              {businessHealth.status}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black font-['Outfit',sans-serif]">{businessHealth.score}%</span>
            <span className="text-[11px] text-purple-200">Stable & Growing</span>
          </div>
          <button
            onClick={() => setCurrentView('business-health')}
            className="text-[11px] text-pink-200 hover:text-white font-semibold flex items-center gap-1 mt-1 cursor-pointer"
          >
            <span>View Full Diagnostic</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Feature Cards Grid matching the User Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Digital Finance Card */}
        <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3">
              <Wallet className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Digital Finance System</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Converts handwritten records into digital data. Track sales, expenses, profits, cash flow,
              and loan purpose utilization in one secure place.
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => setCurrentView('finance-track')}
                className="w-full py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold flex items-center justify-between cursor-pointer"
              >
                <span>1. FinanceTrack Digital Ledger</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentView('smart-finance')}
                className="w-full py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold flex items-center justify-between cursor-pointer"
              >
                <span>2. Smart Finance & Loans Guidance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsDigitizerModalOpen(true)}
                className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-between cursor-pointer border border-amber-200"
              >
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                  <span>Digitize Handwritten Ledger</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Business Advisory Card */}
        <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-pink-50 text-pink-700 flex items-center justify-center mb-3">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">AI Business Advisory</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Real-time business health diagnosis, accurate sales & profit forecasting, risk alerts,
              and cost reduction suggestions with zero faulty predictions.
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => setCurrentView('business-health')}
                className="w-full py-2 px-3 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-800 text-xs font-bold flex items-center justify-between cursor-pointer"
              >
                <span>1. Business Health Monitoring</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentView('ai-prediction')}
                className="w-full py-2 px-3 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-800 text-xs font-bold flex items-center justify-between cursor-pointer"
              >
                <span>2. AI Prediction & Early Warnings</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentView('ai-advisor')}
                className="w-full py-2 px-3 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-800 text-xs font-bold flex items-center justify-between cursor-pointer"
              >
                <span>3. AI Business Advisor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Market & Opportunities Card */}
        <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3">
              <Store className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Market & Growth Opportunities</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Discover localized business ideas based on women's skills, tap into government schemes,
              connect with buyers, and track community impact.
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => setCurrentView('market-ideas')}
                className="w-full py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-bold flex items-center justify-between cursor-pointer"
              >
                <span>1. Business Ideas & Market Support</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentView('growth-impact')}
                className="w-full py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-bold flex items-center justify-between cursor-pointer"
              >
                <span>2. Growth & Impact Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentView('resources')}
                className="w-full py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-bold flex items-center justify-between cursor-pointer"
              >
                <span>3. Schemes & Funding Resources</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Central Architecture Interactive Engine Visualizer */}
      <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Real-Time Interconnected Engine / केंद्रीय डेटा प्रणाली</span>
            </h3>
            <p className="text-xs text-slate-500">
              Every data input automatically analyzes, predicts, checks real-time business health, and triggers alerts.
            </p>
          </div>
          <span className="text-xs px-3 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-full border border-emerald-200 self-start sm:self-auto">
            100% Real-Time Synchronized
          </span>
        </div>

        {/* ASCII Flow turned into a visual interactive diagram */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
          <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-2xl flex flex-col items-center justify-center">
            <span className="font-bold text-purple-900">1. USER INPUT</span>
            <span className="text-[11px] text-slate-500 mt-1">Location • Language • Sales • Expenses</span>
          </div>

          <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-2xl flex flex-col items-center justify-center">
            <span className="font-bold text-indigo-900">2. CENTRAL STORE</span>
            <span className="text-[11px] text-slate-500 mt-1">Finance • Advisory • Market Records</span>
          </div>

          <div className="p-3 bg-pink-50/70 border border-pink-200 rounded-2xl flex flex-col items-center justify-center">
            <span className="font-bold text-pink-900">3. AI PREDICTION</span>
            <span className="text-[11px] text-slate-500 mt-1">Cash Flow • Risk • Trend Analysis</span>
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col items-center justify-center">
            <span className="font-bold text-emerald-900">4. MONITOR ENGINE</span>
            <span className="text-[11px] text-slate-500 mt-1">Ground Work Check • Early Warnings</span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-3 bg-amber-50/70 border border-amber-200 rounded-2xl flex flex-col items-center justify-center">
            <span className="font-bold text-amber-900">5. USER ACTION</span>
            <span className="text-[11px] text-slate-500 mt-1">Spoken Voice Advice • Alerts</span>
          </div>
        </div>
      </div>

      {/* Location-based Women Entrepreneurship Live Government Telemetry */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <h3 className="font-bold text-base font-['Outfit',sans-serif]">
                {userProfile.locationDistrict} District Women Entrepreneurship Telemetry
              </h3>
              <p className="text-xs text-purple-200">
                Live official data integrated with NRLM, PM Mudra & State Rural Livelihood Mission
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentView('profile')}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-xl border border-white/20 self-start sm:self-auto cursor-pointer"
          >
            Change Location
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] text-purple-200 uppercase font-bold block">Active SHGs</span>
            <span className="text-lg font-extrabold text-white mt-0.5 block">{districtData.shgGroups}</span>
            <span className="text-[10px] text-emerald-300">Registered Groups</span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] text-purple-200 uppercase font-bold block">Women Empowered</span>
            <span className="text-lg font-extrabold text-pink-300 mt-0.5 block">{districtData.womenEmpowered}</span>
            <span className="text-[10px] text-purple-200">Entrepreneurs</span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] text-purple-200 uppercase font-bold block">Lakhpati Didis</span>
            <span className="text-lg font-extrabold text-amber-300 mt-0.5 block">{districtData.lakhpatiDidiCount}</span>
            <span className="text-[10px] text-amber-200">Earning ≥ ₹1 Lakh/yr</span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] text-purple-200 uppercase font-bold block">Credit Disbursed</span>
            <span className="text-lg font-extrabold text-white mt-0.5 block">{districtData.activeLoansDisbursed}</span>
            <span className="text-[10px] text-emerald-300">NRLM Subvention</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-purple-200 font-semibold">High-demand district products:</span>
          {districtData.topProducts.map((prod, i) => (
            <span key={i} className="px-2.5 py-1 bg-white/15 rounded-full text-white text-[11px] font-medium">
              {prod}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
