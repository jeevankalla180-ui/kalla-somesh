import React from 'react';
import {
  Award,
  TrendingUp,
  Users,
  HeartHandshake,
  CheckCircle2,
  DollarSign,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GrowthImpactView: React.FC = () => {
  const { userProfile, speakText } = useApp();

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner matching WhatsApp Image */}
      <div className="bg-gradient-to-r from-[#241038] via-[#4A1D6D] to-[#701A75] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-pink-200 text-[11px] font-bold uppercase tracking-wider">
              Livelihood Transformation
            </span>
            <span className="text-xs text-pink-200">• Real Community Impact</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif]">
            Growth & Impact Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-xl">
            Track how {userProfile.shgName} is growing financially, creating sustainable employment for women,
            and building generational stability.
          </p>
        </div>

        <button
          onClick={() =>
            speakText(
              `Congratulations! Your SHG has achieved 3,45,000 rupees in total sales, created jobs for 8 women, and maintains a 95 percent loan repayment rate.`
            )
          }
          className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white text-xs font-bold rounded-xl border border-white/30 flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4 text-pink-300" />
          <span>Speak Impact Summary</span>
        </button>
      </div>

      {/* 4 Impact Metric Cards matching screenshot */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Total Sales Generated</div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">₹3,45,000</div>
          <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+68% Year-on-Year</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Total Net Profit</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">₹1,12,000</div>
          <div className="text-xs text-purple-600 font-semibold mt-1">Shared among SHG members</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Employment Created</div>
          <div className="text-2xl sm:text-3xl font-black text-pink-700 mt-1">8 Women</div>
          <div className="text-xs text-pink-600 font-semibold mt-1">Earning recurring income</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Loan Performance</div>
          <div className="text-2xl sm:text-3xl font-black text-indigo-700 mt-1">95%</div>
          <div className="text-xs text-indigo-600 font-semibold mt-1">Top-tier NRLM rating</div>
        </div>
      </div>

      {/* Two Column Charts: Growth Trend & Overall Impact Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Growth Trend */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Quarterly Business Growth Trend</h3>
              <p className="text-[11px] text-slate-500">Cumulative sales across 4 quarters</p>
            </div>
            <span className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg">
              Strong Trajectory
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { q: 'Q1 (Oct - Dec 2024)', sales: 55000, profit: 16000, pct: '35%' },
              { q: 'Q2 (Jan - Mar 2025)', sales: 82000, profit: 24000, pct: '55%' },
              { q: 'Q3 (Apr - Jun 2025)', sales: 98000, profit: 32000, pct: '70%' },
              { q: 'Q4 (Jul - Sep 2025)', sales: 110000, profit: 40000, pct: '92%' },
            ].map((q, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{q.q}</span>
                  <span className="font-bold text-slate-900">₹{q.sales.toLocaleString()}</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"
                    style={{ width: q.pct }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Net Profit: ₹{q.profit.toLocaleString()}</span>
                  <span className="text-emerald-600 font-semibold">Growth +{25 + idx * 10}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Impact Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-purple-700" />
              <h3 className="text-sm font-bold text-slate-900">Overall Social & Economic Impact</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                <span className="text-xs font-semibold text-slate-700">Total Income Growth:</span>
                <span className="text-xs font-extrabold text-emerald-700">+68% Since Join</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                <span className="text-xs font-semibold text-slate-700">Women Empowered in Cluster:</span>
                <span className="text-xs font-extrabold text-purple-700">25 Members Trained</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                <span className="text-xs font-semibold text-slate-700">Full-Time Livelihoods Created:</span>
                <span className="text-xs font-extrabold text-pink-700">8 Sustainable Jobs</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                <span className="text-xs font-semibold text-slate-700">NRLM Loan Repayment Rate:</span>
                <span className="text-xs font-extrabold text-indigo-700">95% (Grade A SHG)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                <span className="text-xs font-semibold text-slate-700">Business Viability Index:</span>
                <span className="text-xs font-extrabold text-emerald-700">Strong & Expanding</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-purple-50 rounded-2xl text-xs text-purple-900 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-purple-700 shrink-0" />
            <span>Qualified for Lakhpati Didi State Recognition by Uttar Pradesh SRLM.</span>
          </div>
        </div>
      </div>

      {/* Top Performing Products Table matching screenshot */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">Top Performing Products & Revenue Share</h3>
          <p className="text-xs text-slate-500">Breakdown of product line performance</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Units Sold</th>
                <th className="py-3 px-4">Total Revenue</th>
                <th className="py-3 px-4">Gross Margin</th>
                <th className="py-3 px-4">Contribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {[
                { name: 'Traditional Mango Pickle (1kg jar)', cat: 'Food', units: '580 jars', rev: '₹1,45,000', margin: '42%', share: '42%' },
                { name: 'Stuffed Red Chili Pickle (500g)', cat: 'Food', units: '340 jars', rev: '₹68,000', margin: '38%', share: '20%' },
                { name: 'Handloom Stitched Cotton Bags', cat: 'Textiles', units: '420 pcs', rev: '₹84,000', margin: '45%', share: '24%' },
                { name: 'Organic Cold-Pressed Mustard Oil', cat: 'Agro', units: '240 L', rev: '₹48,000', margin: '28%', share: '14%' },
              ].map((p, i) => (
                <tr key={i} className="hover:bg-purple-50/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{p.name}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-semibold">
                      {p.cat}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold">{p.units}</td>
                  <td className="py-3 px-4 font-extrabold text-emerald-700">{p.rev}</td>
                  <td className="py-3 px-4 text-purple-700 font-bold">{p.margin}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-600 rounded-full" style={{ width: p.share }} />
                      </div>
                      <span className="font-bold text-slate-800">{p.share}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspirational Bottom Banner */}
      <div className="p-6 bg-gradient-to-r from-purple-900 via-indigo-900 to-pink-900 text-white rounded-3xl text-center shadow-lg">
        <p className="text-base font-extrabold font-['Outfit',sans-serif]">
          "When a woman earns, her children study, her home prospers, and the entire village grows."
        </p>
        <span className="text-xs text-pink-200 mt-1 block">
          YOSTI SIDDHIKSHA — Empowering 8.5 Crore+ SHG Women Across India
        </span>
      </div>
    </div>
  );
};
