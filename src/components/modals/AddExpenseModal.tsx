import React, { useState } from 'react';
import { X, MinusCircle, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AddExpenseModal: React.FC = () => {
  const { isAddExpenseModalOpen, setIsAddExpenseModalOpen, addTransaction } = useApp();

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Raw Materials');
  const [vendor, setVendor] = useState('');
  const [method, setMethod] = useState<'Cash' | 'UPI' | 'Bank Transfer'>('UPI');
  const [date, setDate] = useState('Today, 12 Sep 2025');

  if (!isAddExpenseModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) return;

    addTransaction({
      date: date || 'Today',
      type: 'expense',
      category,
      description: description || `Expense for ${category}`,
      amount: num,
      customerOrVendor: vendor || 'Supplier / Service Provider',
      paymentMethod: method,
    });

    setAmount('');
    setDescription('');
    setVendor('');
    setIsAddExpenseModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-pink-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <MinusCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">Record Business Expense / खर्च जोड़ें</h3>
              <p className="text-xs text-pink-100">Keep track of costs to optimize profit margins</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddExpenseModalOpen(false)}
            className="p-1 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Expense Amount (₹) / खर्च राशि
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-lg font-bold text-slate-400">₹</span>
              <input
                type="number"
                required
                autoFocus
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 750"
                className="w-full pl-8 pr-3 py-2 text-lg font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Expense Detail / विवरण
            </label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Spices, Glass jars, Auto transport, Packaging tape"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="Raw Materials">Raw Materials (कच्चा माल)</option>
                <option value="Transport">Transport / Logistics</option>
                <option value="Packaging">Packaging & Labels</option>
                <option value="Rent">Rent / Workshop</option>
                <option value="Wages">Wages / Labour</option>
                <option value="Electricity">Electricity / Fuel</option>
                <option value="Equipment">Equipment Repair</option>
                <option value="Other">Other Miscellaneous</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Payment Mode
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="UPI">UPI (Google Pay / PhonePe)</option>
                <option value="Cash">Cash (नकद)</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Supplier / Vendor Name / आपूर्तिकर्ता
            </label>
            <input
              type="text"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              placeholder="e.g. Kashi Agro Mills, Auto driver Rajesh"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddExpenseModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Record Expense</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
