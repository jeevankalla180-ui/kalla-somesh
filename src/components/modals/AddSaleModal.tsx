import React, { useState } from 'react';
import { X, Plus, Calendar, Tag, User, CreditCard, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AddSaleModal: React.FC = () => {
  const { isAddSaleModalOpen, setIsAddSaleModalOpen, addTransaction } = useApp();

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food Products');
  const [customer, setCustomer] = useState('');
  const [method, setMethod] = useState<'Cash' | 'UPI' | 'Bank Transfer'>('Cash');
  const [date, setDate] = useState('Today, 12 Sep 2025');

  if (!isAddSaleModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) return;

    addTransaction({
      date: date || 'Today',
      type: 'sale',
      category,
      description: description || `Sales of ${category}`,
      amount: num,
      customerOrVendor: customer || 'Direct Customer',
      paymentMethod: method,
    });

    setAmount('');
    setDescription('');
    setCustomer('');
    setIsAddSaleModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">Record Daily Sale / बिक्री जोड़ें</h3>
              <p className="text-xs text-emerald-100">Instantly update digital book & health score</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddSaleModalOpen(false)}
            className="p-1 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Sale Amount (₹) / बिक्री राशि
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-lg font-bold text-slate-400">₹</span>
              <input
                type="number"
                required
                autoFocus
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 1500"
                className="w-full pl-8 pr-3 py-2 text-lg font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Product / Item Description / विवरण
            </label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Mango Pickles 10 jars or Handloom Dupatta"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Food Products">Food Products</option>
                <option value="Textiles">Textiles & Handloom</option>
                <option value="Agriculture">Organic Produce</option>
                <option value="Handicrafts">Handicrafts</option>
                <option value="Services">Services</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Payment Mode
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Cash">Cash (नकद)</option>
                <option value="UPI">UPI (Google Pay / PhonePe)</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Customer or Market Place / ग्राहक
            </label>
            <input
              type="text"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              placeholder="e.g. Village Haat, Local Wholesale Mart, Sita Devi"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddSaleModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Save & Update Records</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
