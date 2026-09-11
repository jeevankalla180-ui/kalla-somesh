import React, { useState } from 'react';
import {
  Sparkles,
  Landmark,
  Award,
  GraduationCap,
  Wrench,
  ShoppingBag,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Percent,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GOV_SCHEMES_DATA } from '../../data/mockData';

export const SmartFinanceView: React.FC = () => {
  const { userProfile, speakText } = useApp();
  const [activeTab, setActiveTab] = useState<
    'recommended' | 'loans' | 'schemes' | 'investments' | 'training'
  >('recommended');

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner matching WhatsApp Image */}
      <div className="bg-gradient-to-r from-[#3D1A56] via-[#581C87] to-[#831843] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-pink-200 text-[11px] font-bold uppercase tracking-wider">
              Smart Guidance
            </span>
            <span className="text-xs text-pink-200">• Right Finance • Right Resources • Bigger Dreams</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif]">
            Smart Finance & Resource Guidance
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-xl">
            Personalized loan schemes, government subsidies, modern machinery, and skill programs
            matched directly to {userProfile.shgName}'s profile and credit score.
          </p>
        </div>

        <button
          onClick={() =>
            speakText(
              `Based on your SHG's strong repayment history, you are eligible for the NRLM 4% interest subvention loan and a ₹15,000 food processing equipment subsidy.`
            )
          }
          className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white text-xs font-bold rounded-xl border border-white/30 flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4 text-pink-300" />
          <span>Speak Recommendations</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'recommended', label: 'Recommended for You' },
          { id: 'loans', label: 'Loans & Funding' },
          { id: 'schemes', label: 'Government Schemes' },
          { id: 'investments', label: 'Smart Savings & Investments' },
          { id: 'training', label: 'Training & Skilling' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-purple-700 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-purple-50 hover:text-purple-700 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4 Personalized Recommendation Cards matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Best Loan Option */}
        <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Landmark className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
              Best Loan Option
            </span>
            <h4 className="text-sm font-bold text-slate-900 mt-1">SHG Bank Linkage (NRLM)</h4>
            <p className="text-xs text-slate-500 mt-1">
              Sanction up to ₹2,00,000 at only 4% effective interest with subvention.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-extrabold text-emerald-700">98% Match</span>
            <span className="text-[11px] font-semibold text-purple-700 hover:underline cursor-pointer">
              Apply via Bank →
            </span>
          </div>
        </div>

        {/* Suitable Training */}
        <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block">
              Suitable Training
            </span>
            <h4 className="text-sm font-bold text-slate-900 mt-1">FSSAI Certified Food Processing</h4>
            <p className="text-xs text-slate-500 mt-1">
              Free 5-day hands-on workshop in Varanasi on hygienic bottling & shelf life.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-extrabold text-purple-700">Free Gov Pass</span>
            <span className="text-[11px] font-semibold text-purple-700 hover:underline cursor-pointer">
              Enroll Group →
            </span>
          </div>
        </div>

        {/* Market Opportunity */}
        <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-2xl bg-pink-50 text-pink-700 flex items-center justify-center mb-3">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 block">
              Market Opportunity
            </span>
            <h4 className="text-sm font-bold text-slate-900 mt-1">SARAS Aajeevika Fair & GeM Portal</h4>
            <p className="text-xs text-slate-500 mt-1">
              Direct stall allotment without middle-men. Average stall sales: ₹85,000.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-extrabold text-pink-700">High Demand</span>
            <span className="text-[11px] font-semibold text-purple-700 hover:underline cursor-pointer">
              Book Stall →
            </span>
          </div>
        </div>

        {/* Equipment Suggestion */}
        <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">
              Equipment Suggestion
            </span>
            <h4 className="text-sm font-bold text-slate-900 mt-1">Semi-Auto Bottle Capper & Sealer</h4>
            <p className="text-xs text-slate-500 mt-1">
              Boost production from 50 jars/day to 300 jars/day with 50% subsidy under PMFME.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-extrabold text-amber-700">50% Subsidy</span>
            <span className="text-[11px] font-semibold text-purple-700 hover:underline cursor-pointer">
              View Vendors →
            </span>
          </div>
        </div>
      </div>

      {/* Recommended Loans Catalog */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recommended Loans for Your Business</h3>
            <p className="text-xs text-slate-500">
              Low-interest collateral-free credit designed specifically for rural and semi-urban women SHGs
            </p>
          </div>
          <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Pre-Approved Score
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* SHG Bank Linkage */}
          <div className="p-4 rounded-2xl border-2 border-purple-200 bg-purple-50/40 relative">
            <span className="absolute -top-2.5 right-4 bg-purple-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              Recommended #1
            </span>
            <h4 className="font-bold text-sm text-slate-900">SHG Bank Linkage Loan</h4>
            <div className="text-xs text-slate-600 mt-1">State Bank of India / Baroda UP Bank</div>
            <div className="mt-3 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Amount:</span>
                <span className="font-bold text-slate-800">₹50,000 – ₹2,00,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Interest:</span>
                <span className="font-bold text-emerald-700">7% (effective 4% with subvention)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tenure:</span>
                <span className="font-bold text-slate-800">24 – 36 Months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Collateral:</span>
                <span className="font-bold text-emerald-600">None Required</span>
              </div>
            </div>
            <button className="mt-4 w-full py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl cursor-pointer">
              Apply with Group Resolution
            </button>
          </div>

          {/* Mudra Loan */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white">
            <h4 className="font-bold text-sm text-slate-900">Pradhan Mantri MUDRA (Kishore)</h4>
            <div className="text-xs text-slate-600 mt-1">Nationalized & Rural Banks</div>
            <div className="mt-3 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Amount:</span>
                <span className="font-bold text-slate-800">₹50,000 – ₹5,00,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Interest:</span>
                <span className="font-bold text-slate-800">8.5% – 10.5% p.a.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tenure:</span>
                <span className="font-bold text-slate-800">Up to 5 Years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Purpose:</span>
                <span className="font-bold text-slate-800">Expansion & Machinery</span>
              </div>
            </div>
            <button className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl cursor-pointer">
              Check Mudra Eligibility
            </button>
          </div>

          {/* Group Microfinance */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white">
            <h4 className="font-bold text-sm text-slate-900">Micro-Enterprise Top-Up</h4>
            <div className="text-xs text-slate-600 mt-1">NABARD Joint Liability Group</div>
            <div className="mt-3 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Amount:</span>
                <span className="font-bold text-slate-800">₹20,000 – ₹1,00,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Approval:</span>
                <span className="font-bold text-emerald-600">Within 48 Hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Repayment:</span>
                <span className="font-bold text-slate-800">Weekly / Monthly EMI</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Credit Score:</span>
                <span className="font-bold text-slate-800">750+ Verified</span>
              </div>
            </div>
            <button className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl cursor-pointer">
              Instant Pre-Check
            </button>
          </div>
        </div>
      </div>

      {/* Verified Government Schemes List */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Flagship Government Schemes & Grants</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GOV_SCHEMES_DATA.map((scheme) => (
            <div key={scheme.id} className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                    {scheme.category}
                  </span>
                  <span className="text-xs font-bold text-emerald-700">{scheme.fundingAmount}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mt-2">{scheme.name}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{scheme.description}</p>
                <div className="mt-2 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Eligibility:</span> {scheme.eligibility}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-purple-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Government Portal</span>
                </span>
                <a
                  href={scheme.officialPortalUrl || scheme.linkUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <span>Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
