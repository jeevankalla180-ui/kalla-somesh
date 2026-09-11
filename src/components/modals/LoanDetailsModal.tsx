import React, { useState } from 'react';
import { X, Landmark, CheckCircle2, AlertCircle, Calendar, ArrowUpRight, DollarSign, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface LoanDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoanDetailsModal: React.FC<LoanDetailsModalProps> = ({ isOpen, onClose }) => {
  const { loanAccount, payLoanEmi, cashAvailable } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayEmi = () => {
    setIsProcessing(true);
    setTimeout(() => {
      payLoanEmi();
      setIsProcessing(false);
    }, 600);
  };

  const totalSpent = loanAccount.utilization.reduce((acc, curr) => acc + curr.spent, 0);
  const utilizationPercentage = Math.round((totalSpent / loanAccount.sanctionedAmount) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-purple-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2D1B4E] to-[#581C87] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Landmark className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">{loanAccount.loanName}</h3>
              <p className="text-xs text-purple-200">{loanAccount.bankName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Key Loan Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Sanctioned Amount</span>
              <span className="text-base font-extrabold text-slate-900">₹{loanAccount.sanctionedAmount.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Effective Interest</span>
              <span className="text-base font-extrabold text-emerald-600">{loanAccount.interestRate}% p.a.</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Monthly EMI</span>
              <span className="text-base font-extrabold text-purple-700">₹{loanAccount.emiAmount.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Repayment Progress</span>
              <span className="text-base font-extrabold text-slate-900">{loanAccount.paidEmis} / {loanAccount.totalEmis} EMIs</span>
            </div>
          </div>

          {/* Planned Purpose vs Actual Utilization Tracker */}
          <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-purple-900 uppercase tracking-wide">
                Planned Purpose vs Realized Utilization
              </span>
              <span className="text-xs font-extrabold text-purple-700">{utilizationPercentage}% Used</span>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              <span className="font-semibold text-slate-800">Stated Purpose:</span> {loanAccount.plannedPurpose}
            </p>

            <div className="space-y-2.5">
              {loanAccount.utilization.map((item, idx) => {
                const pct = Math.round((item.spent / item.allocated) * 100);
                return (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-purple-100">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-800">{item.category}</span>
                      <span className="font-bold text-purple-900">
                        ₹{item.spent.toLocaleString()} / ₹{item.allocated.toLocaleString()} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"
                        style={{ width: `${Math.min(100, pct)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Repayment Box & Direct Action */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-0.5">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Next EMI Due: {loanAccount.nextEmiDate}</span>
              </div>
              <p className="text-xs text-slate-600">
                Amount: <span className="font-bold text-slate-800">₹{loanAccount.emiAmount.toLocaleString()}</span> • Cash in hand: ₹{cashAvailable.toLocaleString()}
              </p>
            </div>

            <button
              onClick={handlePayEmi}
              disabled={isProcessing}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isProcessing ? 'Processing...' : 'Pay EMI Now'}</span>
            </button>
          </div>

          {/* Credit Health summary */}
          <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-2xl flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-emerald-900 block">Excellent SHG Repayment Record (100% On-Time)</span>
              <span className="text-slate-600">
                Your group qualifies for interest subvention under NRLM and is pre-approved for loan limit enhancement to ₹2,50,000.
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded-xl cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
