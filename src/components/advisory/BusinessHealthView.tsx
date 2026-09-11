import React, { useState } from 'react';
import {
  Activity,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  Lightbulb,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LoanDetailsModal } from '../modals/LoanDetailsModal';

export const BusinessHealthView: React.FC = () => {
  const { businessHealth, setCurrentView, speakText, loanAccount } = useApp();
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);

  const handleSpeakHealth = () => {
    speakText(
      `Your business health score is ${businessHealth.score} percent, which is Good. Sales growth is at 85 percent and loan repayment is 100 percent on time.`
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner matching WhatsApp Image */}
      <div className="bg-gradient-to-r from-[#241038] via-[#4A1D6D] to-[#6B21A8] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[11px] font-bold uppercase tracking-wider">
              Health Status: {businessHealth.status}
            </span>
            <span className="text-xs text-purple-200">• Real-Time Diagnostic</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif]">
            Business Health Monitoring
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-xl">
            Track your business vitals, understand financial health, and take timely actions to grow.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 text-xs font-semibold">
            This Month (Aug 2025)
          </div>
          <button
            onClick={handleSpeakHealth}
            className="px-3.5 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold rounded-xl border border-white/30 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-300" />
            <span>Audio Status</span>
          </button>
        </div>
      </div>

      {/* 5 Vitals Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Monthly Sales</div>
          <div className="text-2xl font-black text-slate-900 mt-1">₹62,500</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">↑ 15% vs last month</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Monthly Profit</div>
          <div className="text-2xl font-black text-emerald-700 mt-1">₹18,750</div>
          <div className="text-[11px] text-purple-600 font-semibold mt-1">30% Net Margin</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Monthly Expenses</div>
          <div className="text-2xl font-black text-rose-700 mt-1">₹43,750</div>
          <div className="text-[11px] text-slate-500 mt-1">70% of gross sales</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Loan Repayment</div>
          <div className="text-2xl font-black text-purple-700 mt-1">₹6,000</div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>100% On Time</span>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Business Activity</div>
          <div className="text-2xl font-black text-indigo-700 mt-1">Active (12d)</div>
          <div className="text-[11px] text-indigo-600 font-semibold mt-1">Consistent production</div>
        </div>
      </div>

      {/* Main Two-Column Health Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales vs Expenses vs Profit Visual Breakdown */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Sales vs Expenses vs Profit</h3>
              <span className="text-xs px-2.5 py-1 bg-purple-50 text-purple-800 font-bold rounded-lg">
                Aug 2025
              </span>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700">Gross Sales Revenue</span>
                  <span className="font-extrabold text-slate-900">₹62,500 (100%)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700">Total Operating Expenses</span>
                  <span className="font-extrabold text-rose-600">₹43,750 (70%)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full w-[70%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700">Net Profit Retained</span>
                  <span className="font-extrabold text-purple-700">₹18,750 (30%)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full w-[30%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-emerald-900 block">Healthy Cash Flow Cushion</span>
              <span className="text-slate-600">
                After paying the ₹6,000 monthly loan EMI, your net surplus is ₹12,750, providing strong resilience.
              </span>
            </div>
          </div>
        </div>

        {/* Business Health Score Card matching 78% Good in screenshot */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Overall Business Health Score</h3>
              <span className="text-xs px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full">
                {businessHealth.status}
              </span>
            </div>

            {/* Circular / Gauge Representation */}
            <div className="flex items-center justify-center p-4">
              <div className="relative w-36 h-36 rounded-full border-8 border-purple-100 flex items-center justify-center bg-purple-50/40">
                <div
                  className="absolute inset-0 rounded-full border-8 border-purple-700 border-t-transparent border-l-transparent rotate-45"
                />
                <div className="text-center z-10">
                  <span className="text-3xl font-black font-['Outfit',sans-serif] text-purple-900 block leading-none">
                    {businessHealth.score}%
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                    {businessHealth.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Breakdown checklist */}
            <div className="space-y-2 mt-2">
              {businessHealth.metrics.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">{m.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full"
                        style={{ width: `${m.score}%` }}
                      />
                    </div>
                    <span className="font-bold text-slate-800 w-8 text-right">{m.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights & Recommended Actions matching bottom of Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Insights */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-bold text-slate-900">Key Health Insights</h3>
          </div>
          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Sales increased by 15% compared to last month. Excellent festive demand in your district!</span>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Expense ratio is slightly high (70%). Bulk purchasing raw spices through SHG clusters can save ₹4,500/month.</span>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span>100% on-time loan repayments. Creditworthiness score is rated 90/100 by the SHG grading committee.</span>
            </div>
          </div>
        </div>

        {/* Recommended Actions with instant clickable buttons */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Recommended Actions / तुरंत कार्रवाई</h3>
          <div className="space-y-2.5">
            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900 block">Increase production for high-demand pickles</span>
                <span className="text-[11px] text-slate-500">Mango & Lemon pickles have 90% sell-through rate</span>
              </div>
              <button
                onClick={() => setCurrentView('market-ideas')}
                className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-[11px] cursor-pointer"
              >
                Get Ideas
              </button>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900 block">Reduce raw material procurement cost by 10%</span>
                <span className="text-[11px] text-slate-500">Connect with wholesale farmer collective</span>
              </div>
              <button
                onClick={() => setCurrentView('resources')}
                className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-[11px] cursor-pointer"
              >
                View Suppliers
              </button>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900 block">Prepare next loan EMI due on Sep 15</span>
                <span className="text-[11px] text-slate-500">₹6,000 scheduled deduction</span>
              </div>
              <button
                onClick={() => setIsLoanModalOpen(true)}
                className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-[11px] cursor-pointer"
              >
                View Loan Details
              </button>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900 block">Register for free digital marketing workshop</span>
                <span className="text-[11px] text-slate-500">Learn to sell on WhatsApp Business & Meesho</span>
              </div>
              <button
                onClick={() => setCurrentView('smart-finance')}
                className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-[11px] cursor-pointer"
              >
                View Training
              </button>
            </div>
          </div>
        </div>
      </div>

      <LoanDetailsModal isOpen={isLoanModalOpen} onClose={() => setIsLoanModalOpen(false)} />
    </div>
  );
};
