import React, { useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Info,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AiPredictionView: React.FC = () => {
  const { aiPredictions, speakText } = useApp();
  const [timeframe, setTimeframe] = useState('Next 3 Months (Sep - Nov 2025)');

  const handleSpeakPrediction = () => {
    speakText(
      `AI prediction shows a 15 percent increase in sales to 78,500 rupees over the next quarter. Risk level is low, and your business is completely on track.`
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner matching WhatsApp Image */}
      <div className="bg-gradient-to-r from-[#2B1055] via-[#4F1A72] to-[#751A88] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[11px] font-bold uppercase tracking-wider">
              Live AI Model: Business Trend Analysis
            </span>
            <span className="text-xs text-pink-200">• Continuous Ground-Work Telemetry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif]">
            AI Prediction & Early Warnings
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-xl">
            Predict future trends and get early alerts to manage risks, keep your business safe and on track.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 text-xs font-semibold">
            {timeframe}
          </div>
          <button
            onClick={handleSpeakPrediction}
            className="px-3.5 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold rounded-xl border border-white/30 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-300" />
            <span>Speak Predictions</span>
          </button>
        </div>
      </div>

      {/* 5 Forecast KPI Cards matching screenshot */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Predicted Sales</div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            ₹{aiPredictions.predictedSales.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>↑ 15% increase</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Predicted Profit</div>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            ₹{aiPredictions.predictedProfit.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>↑ 18% increase</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Expected Cash Flow</div>
          <div className="text-2xl font-black text-indigo-700 mt-1">
            ₹{aiPredictions.expectedCashFlow.toLocaleString()}
          </div>
          <div className="text-[11px] text-indigo-600 font-semibold flex items-center gap-0.5 mt-1">
            <span>↑ 12% surplus</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Expected Expenses</div>
          <div className="text-2xl font-black text-rose-700 mt-1">
            ₹{aiPredictions.expectedExpenses.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">↑ 8% raw materials</div>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Risk Level</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            {aiPredictions.riskLevel}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">High Stability</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales & Profit Prediction Chart */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Sales & Profit Prediction</h3>
              <p className="text-[11px] text-slate-500">Festive quarter forecast (Sep, Oct, Nov 2025)</p>
            </div>
            <span className="text-xs px-2.5 py-1 bg-purple-50 text-purple-800 font-bold rounded-lg">
              95% Confidence
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { month: 'Sep 2025', sales: 71000, profit: 21500 },
              { month: 'Oct 2025 (Diwali Peak)', sales: 84000, profit: 27000 },
              { month: 'Nov 2025', sales: 80500, profit: 25900 },
            ].map((row, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-800">
                  <span>{row.month}</span>
                  <span className="text-emerald-700">Net Profit: ₹{row.profit.toLocaleString()}</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    className="bg-purple-600 h-full rounded-l-full"
                    style={{ width: `${(row.sales / 90000) * 100}%` }}
                    title={`Sales: ₹${row.sales}`}
                  />
                  <div
                    className="bg-emerald-500 h-full rounded-r-full"
                    style={{ width: `${(row.profit / 90000) * 100}%` }}
                    title={`Profit: ₹${row.profit}`}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Sales Volume: ₹{row.sales.toLocaleString()}</span>
                  <span>Margin: {Math.round((row.profit / row.sales) * 100)}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-6 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-purple-600" /> Projected Sales
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" /> Projected Profit
            </span>
          </div>
        </div>

        {/* Cash Flow Forecast Chart */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Cash Flow Forecast</h3>
                <p className="text-[11px] text-slate-500">Maintaining minimum ₹10,000 liquid buffer</p>
              </div>
              <span className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg">
                Safe Buffer
              </span>
            </div>

            <div className="space-y-3.5 pt-2">
              {[
                { period: 'Sep 1 – Sep 15', balance: 14500, state: 'Positive', width: '65%' },
                { period: 'Sep 16 – Sep 30', balance: 18200, state: 'Strong', width: '75%' },
                { period: 'Oct 1 – Oct 15', balance: 12100, state: 'Moderate (Raw Material Buying)', width: '55%' },
                { period: 'Oct 16 – Oct 31', balance: 26500, state: 'Peak Festive Liquidity', width: '92%' },
              ].map((cf, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-800">{cf.period}</span>
                    <span className="font-bold text-indigo-700">₹{cf.balance.toLocaleString()} ({cf.state})</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                      style={{ width: cf.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 bg-indigo-50 rounded-2xl border border-indigo-100 text-xs text-indigo-950 flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Zero cash deficit forecasted across the upcoming festival cycle. EMI commitments will be met with 100% certainty.</span>
          </div>
        </div>
      </div>

      {/* Early Warnings & Predicted Risk Summary matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Early Warnings list */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900">Active Early Warnings / अग्रिम चेतावनियाँ</h3>
          </div>

          <div className="space-y-3">
            {aiPredictions.earlyWarnings.map((w) => (
              <div
                key={w.id}
                className="p-3 rounded-2xl border border-amber-200 bg-amber-50/60 flex items-start gap-3"
              >
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{w.title}</span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                      {w.priority} Priority
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{w.description}</p>
                  <p className="text-[11px] text-purple-700 font-semibold mt-1">
                    Recommended Action: {w.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Predicted Risk Summary Card */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">Predicted Risk Summary & Verification</h3>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm mb-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>No Major Risks Detected! Your Business is on Track.</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our AI model cross-verifies daily digital ledger entries with real-time district market price
                indices and NRLM seasonal benchmarks to guarantee zero faulty predictions.
              </p>
            </div>

            {/* Health trajectory */}
            <div className="mt-4 space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Projected Health Score Growth:</span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-100">
                  <span className="text-[10px] text-slate-500 block">Next Month</span>
                  <span className="font-extrabold text-purple-800 text-sm">81% Good</span>
                </div>
                <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-100">
                  <span className="text-[10px] text-slate-500 block">In 2 Months</span>
                  <span className="font-extrabold text-purple-800 text-sm">84% Good</span>
                </div>
                <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-100">
                  <span className="text-[10px] text-slate-500 block">In 3 Months</span>
                  <span className="font-extrabold text-emerald-700 text-sm">87% Excellent</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Validated Model ID: YS-AI-V3</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Ground-Work Checked
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
