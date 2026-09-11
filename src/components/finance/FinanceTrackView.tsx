import React, { useState } from 'react';
import {
  Plus,
  MinusCircle,
  Camera,
  FileText,
  Landmark,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Search,
  Filter,
  Trash2,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Download,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LoanDetailsModal } from '../modals/LoanDetailsModal';

export const FinanceTrackView: React.FC = () => {
  const {
    transactions,
    todaySales,
    todayExpenses,
    todayProfit,
    cashAvailable,
    savings,
    loanAccount,
    deleteTransaction,
    setIsAddSaleModalOpen,
    setIsAddExpenseModalOpen,
    setIsDigitizerModalOpen,
    speakText,
  } = useApp();

  const [filterType, setFilterType] = useState<'all' | 'sale' | 'expense'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [reportTimeframe, setReportTimeframe] = useState<'Day' | 'Week' | 'Month'>('Month');
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);

  // Filtered transactions
  const filteredTransactions = transactions.filter((t) => {
    const matchesType = filterType === 'all' || t.type === filterType;
    const matchesSearch =
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.customerOrVendor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleReadSummaryVoice = () => {
    speakText(
      `Today's sales are ${todaySales} rupees. Expenses are ${todayExpenses} rupees. Your net profit is ${todayProfit} rupees. Cash available is ${cashAvailable} rupees.`
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner matching WhatsApp Image */}
      <div className="bg-gradient-to-r from-[#4A1D6D] via-[#6B21A8] to-[#9D174D] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-pink-200 text-[11px] font-bold uppercase tracking-wider">
              Digital Book
            </span>
            <span className="text-xs text-pink-200">• Record • Track • Grow</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif]">
            FinanceTrack — Your Business Money in One Place
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-xl">
            Keep clear daily records of every rupee earned, spent, and saved.
            Track loans, repayments, and cash flow automatically.
          </p>
        </div>

        <button
          onClick={handleReadSummaryVoice}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white text-xs font-bold rounded-xl border border-white/30 flex items-center gap-2 cursor-pointer shrink-0 transition-all"
        >
          <Sparkles className="w-4 h-4 text-pink-300" />
          <span>Listen in Local Audio</span>
        </button>
      </div>

      {/* 5 KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Sales */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Sales / Income</div>
          <div className="text-2xl font-black text-emerald-700 mt-1">₹{todaySales.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>↑ 12% vs yesterday</span>
          </div>
        </div>

        {/* Expenses */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Expenses</div>
          <div className="text-2xl font-black text-rose-700 mt-1">₹{todayExpenses.toLocaleString()}</div>
          <div className="text-[11px] text-rose-500 font-semibold flex items-center gap-1 mt-1">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>↑ 8% from yesterday</span>
          </div>
        </div>

        {/* Today's Profit */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Today's Profit</div>
          <div className="text-2xl font-black text-purple-700 mt-1">₹{todayProfit.toLocaleString()}</div>
          <div className="text-[11px] text-purple-600 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>↑ 20% vs yesterday</span>
          </div>
        </div>

        {/* Cash Available */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Cash Available</div>
          <div className="text-2xl font-black text-indigo-700 mt-1">₹{cashAvailable.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 mt-1">Cash in hand + Bank</div>
        </div>

        {/* Savings */}
        <div className="col-span-2 sm:col-span-1 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase">SHG Group Savings</div>
          <div className="text-2xl font-black text-amber-700 mt-1">₹{savings.toLocaleString()}</div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1">₹1,000 saved this week</div>
        </div>
      </div>

      {/* Action Buttons Bar matching Image */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          {/* Add Sale button */}
          <button
            onClick={() => setIsAddSaleModalOpen(true)}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Sale</span>
          </button>

          {/* Add Expense button */}
          <button
            onClick={() => setIsAddExpenseModalOpen(true)}
            className="px-4 py-2.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <MinusCircle className="w-4 h-4" />
            <span>+ Add Expense</span>
          </button>

          {/* Digitize Handwritten Slip button */}
          <button
            onClick={() => setIsDigitizerModalOpen(true)}
            className="px-4 py-2.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Camera className="w-4 h-4 text-pink-300" />
            <span>Digitize Handwritten Slip</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Timeframe selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            {(['Day', 'Week', 'Month'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setReportTimeframe(t)}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  reportTimeframe === t ? 'bg-white text-purple-800 shadow-xs' : 'text-slate-600'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Loan & EMI Tracker */}
          <button
            onClick={() => setIsLoanModalOpen(true)}
            className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold rounded-xl border border-purple-200 flex items-center gap-1.5 cursor-pointer"
          >
            <Landmark className="w-4 h-4 text-purple-700" />
            <span>Loan & EMI Tracker</span>
          </button>
        </div>
      </div>

      {/* Two Column Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Profit & Loss Visualizer */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Monthly Profit & Loss (₹)</h3>
              <p className="text-[11px] text-slate-500">Comparing Income, Expenses & Net Profit across past 4 months</p>
            </div>
            <span className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg">
              Net Margin: 29%
            </span>
          </div>

          {/* CSS Bar Chart */}
          <div className="space-y-4 pt-2">
            {[
              { month: 'May 2025', income: 42000, expense: 31000, profit: 11000 },
              { month: 'Jun 2025', income: 51000, expense: 36000, profit: 15000 },
              { month: 'Jul 2025', income: 58000, expense: 41000, profit: 17000 },
              { month: 'Aug 2025', income: 62500, expense: 43750, profit: 18750 },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{item.month}</span>
                  <span className="text-emerald-700">Profit: +₹{item.profit.toLocaleString()}</span>
                </div>
                {/* Visual stacked bars */}
                <div className="grid grid-cols-2 gap-2 h-3">
                  <div className="bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${(item.income / 70000) * 100}%` }}
                      title={`Income: ₹${item.income}`}
                    />
                  </div>
                  <div className="bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      className="bg-rose-500 h-full rounded-full"
                      style={{ width: `${(item.expense / 70000) * 100}%` }}
                      title={`Expense: ₹${item.expense}`}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Income: ₹{item.income.toLocaleString()}</span>
                  <span>Expenses: ₹{item.expense.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-6 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" /> Income
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500" /> Expenses
            </span>
          </div>
        </div>

        {/* Expense Breakdown Card */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Expense Breakdown</h3>
              <span className="text-[11px] text-purple-700 font-semibold">Total: ₹43,750 / mo</span>
            </div>

            <div className="space-y-3 pt-1">
              {[
                { label: 'Raw Materials (Oil, Spices, Fabric)', pct: 40, color: 'bg-pink-600' },
                { label: 'Transport & Logistics', pct: 20, color: 'bg-purple-600' },
                { label: 'Workshop Rent & Storage', pct: 15, color: 'bg-indigo-600' },
                { label: 'Wages & SHG Member Work', pct: 10, color: 'bg-amber-500' },
                { label: 'Electricity & Fuel', pct: 5, color: 'bg-emerald-500' },
                { label: 'Packaging & Labels', pct: 10, color: 'bg-slate-400' },
              ].map((cat, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">{cat.label}</span>
                    <span className="font-bold text-slate-900">{cat.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${cat.color}`}
                      style={{ width: `${cat.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 bg-purple-50 rounded-2xl text-xs text-purple-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-700 shrink-0" />
            <span>AI Advice: Raw materials form 40% of costs. Purchasing in bulk through group SHG federations can save up to 15%.</span>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Transactions / हालिया लेनदेन</h3>
            <p className="text-xs text-slate-500">Every digitized record is tracked with timestamp and verified details</p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search transaction..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              {(['all', 'sale', 'expense'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-2.5 py-1 rounded-lg capitalize cursor-pointer transition-colors ${
                    filterType === type ? 'bg-white text-purple-800 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Party / Vendor</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-purple-50/30 transition-colors">
                  <td className="py-3 px-4 font-medium whitespace-nowrap">{t.date}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        t.type === 'sale'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{t.category}</td>
                  <td className="py-3 px-4 max-w-xs truncate">{t.description}</td>
                  <td className="py-3 px-4 font-extrabold whitespace-nowrap">
                    <span className={t.type === 'sale' ? 'text-emerald-700' : 'text-rose-700'}>
                      {t.type === 'sale' ? '+' : '-'}₹{t.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{t.customerOrVendor}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">
                      {t.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => deleteTransaction(t.id)}
                      title="Delete entry"
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Financial Summary & AI Insights matching bottom of Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Financial Summary card */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Financial Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-purple-50/60 rounded-2xl border border-purple-100">
              <span className="text-[10px] font-bold text-purple-700 uppercase block">This Week</span>
              <div className="mt-1 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Sales:</span>
                  <span className="font-bold text-emerald-700">₹28,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Expenses:</span>
                  <span className="font-bold text-rose-700">₹14,200</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-purple-200">
                  <span className="font-bold text-purple-900">Profit:</span>
                  <span className="font-extrabold text-purple-900">₹14,300</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100">
              <span className="text-[10px] font-bold text-emerald-700 uppercase block">This Month</span>
              <div className="mt-1 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Sales:</span>
                  <span className="font-bold text-emerald-700">₹1,15,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Expenses:</span>
                  <span className="font-bold text-rose-700">₹58,000</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-emerald-200">
                  <span className="font-bold text-emerald-900">Profit:</span>
                  <span className="font-extrabold text-emerald-900">₹57,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights Card matching the screenshot */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-bold text-slate-900">AI Finance Insights & Alerts</h3>
          </div>
          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Your profit is 20% higher than last month. Good job keeping production consistent!</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Transport expense increased by 18%. Try grouping deliveries to save money.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-200 flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>₹2,500 due from Hotel Sangam order. Send a polite WhatsApp receipt reminder.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="text-center p-3 bg-slate-100 rounded-2xl text-xs text-slate-500 font-medium">
        FinanceTrack | Better Records → Smarter Decisions → Stronger Business
      </div>

      {/* Loan & EMI Tracker Modal */}
      <LoanDetailsModal isOpen={isLoanModalOpen} onClose={() => setIsLoanModalOpen(false)} />
    </div>
  );
};
