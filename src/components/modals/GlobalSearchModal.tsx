import React, { useState, useMemo } from 'react';
import { X, Search, ArrowRight, Tag, Landmark, Sparkles, TrendingUp, Lightbulb } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ViewId } from '../../types';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    setCurrentView,
    transactions,
    govSchemes,
    businessIdeas,
  } = useApp();

  const [query, setQuery] = useState('');

  if (!isSearchModalOpen) return null;

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const matchedSchemes = govSchemes
      .filter((s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
      .map((s) => ({
        id: s.id,
        title: s.name,
        subtitle: `Government Scheme • ${s.fundingAmount}`,
        category: 'Scheme',
        view: 'resources' as ViewId,
      }));

    const matchedIdeas = businessIdeas
      .filter((i) => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q))
      .map((i) => ({
        id: i.id,
        title: i.title,
        subtitle: `Market Opportunity • Demand ${i.demand}`,
        category: 'Market Idea',
        view: 'market-ideas' as ViewId,
      }));

    const matchedTx = transactions
      .filter((t) => t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q))
      .map((t) => ({
        id: t.id,
        title: t.description,
        subtitle: `${t.type.toUpperCase()} • ₹${t.amount.toLocaleString()} • ${t.date}`,
        category: 'Transaction',
        view: 'finance-track' as ViewId,
      }));

    return [...matchedSchemes, ...matchedIdeas, ...matchedTx].slice(0, 8);
  }, [query, govSchemes, businessIdeas, transactions]);

  const handleSelect = (view: ViewId) => {
    setCurrentView(view);
    setIsSearchModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-start justify-center p-4 pt-20">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-purple-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-purple-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search transactions, government schemes, loans, business ideas..."
            className="w-full text-sm text-slate-800 focus:outline-none placeholder:text-slate-400 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 p-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results / Suggestions */}
        <div className="p-4 max-h-96 overflow-y-auto">
          {query.trim() === '' ? (
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Popular Quick Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'NRLM Interest Subvention',
                  'Mudra Loan',
                  'Pickles Sales',
                  'Raw Materials Expense',
                  'Handloom & Fabric',
                  'Lakhpati Didi',
                  'Equipment Subsidy',
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 text-xs text-slate-600 border border-slate-200 transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              {results.map((res) => (
                <div
                  key={res.id}
                  onClick={() => handleSelect(res.view)}
                  className="p-3 rounded-2xl hover:bg-purple-50/70 border border-transparent hover:border-purple-200 flex items-center justify-between cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      {res.category === 'Scheme' && <Landmark className="w-4 h-4" />}
                      {res.category === 'Market Idea' && <Lightbulb className="w-4 h-4" />}
                      {res.category === 'Transaction' && <Tag className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{res.title}</div>
                      <div className="text-[11px] text-slate-500">{res.subtitle}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-600" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs">
              No matching records found for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
