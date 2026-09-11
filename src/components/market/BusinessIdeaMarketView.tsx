import React, { useState } from 'react';
import {
  Lightbulb,
  Sparkles,
  ShoppingBag,
  TrendingUp,
  MapPin,
  Users,
  Building2,
  Globe,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BUSINESS_IDEAS_DATA } from '../../data/mockData';

export const BusinessIdeaMarketView: React.FC = () => {
  const { userProfile, speakText, setCurrentView } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredIdeas = BUSINESS_IDEAS_DATA.filter(
    (item) => selectedCategory === 'All' || item.category.toLowerCase().includes(selectedCategory.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner matching WhatsApp Image */}
      <div className="bg-gradient-to-r from-[#241038] via-[#4A1D6D] to-[#831843] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-pink-200 text-[11px] font-bold uppercase tracking-wider">
              Market Discovery
            </span>
            <span className="text-xs text-pink-200">• Skill-Based • High Demand • Low Investment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif]">
            Business Idea & Market Support
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-xl">
            Discover the best business ideas based on your SHG's skills, available resources, and local market demand.
          </p>
        </div>

        <button
          onClick={() =>
            speakText(
              `Based on Varanasi market demand, Homemade Pickles and Handloom Bags have the highest customer interest right now with up to 95% match.`
            )
          }
          className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white text-xs font-bold rounded-xl border border-white/30 flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4 text-pink-300" />
          <span>Speak Market Insights</span>
        </button>
      </div>

      {/* Profile & Context Filter Bar matching screenshot */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-600" />
            <span className="text-slate-500">Your SHG:</span>
            <span className="font-bold text-slate-800">{userProfile.shgName} (5 members)</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-pink-600" />
            <span className="text-slate-500">Location:</span>
            <span className="font-bold text-slate-800">
              {userProfile.locationDistrict}, {userProfile.locationState}
            </span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', 'Food', 'Textiles', 'Agro', 'Handicraft'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-purple-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Business Ideas Grid (4 Cards matching WhatsApp Image) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-slate-900">
            Recommended Business Ideas for Your Group
          </h3>
          <span className="text-xs text-purple-700 font-bold">Matched with Rural Mission Benchmarks</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredIdeas.map((idea) => (
            <div
              key={idea.id}
              className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-purple-300 transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                    {idea.category}
                  </span>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {idea.matchPercentage ?? idea.demandPercentage}% Match
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 mt-1">{idea.title}</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{idea.description}</p>

                {/* Investment & Profit Details */}
                <div className="grid grid-cols-2 gap-2 mt-4 p-3 bg-slate-50 rounded-2xl text-xs">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                      Initial Investment
                    </span>
                    <span className="font-bold text-slate-800">{idea.initialInvestment || idea.investmentNeeded}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                      Expected Monthly Profit
                    </span>
                    <span className="font-extrabold text-emerald-700">{idea.monthlyProfit || idea.profitMargin}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Market Demand:</span>
                  <span className="font-bold text-purple-900 bg-purple-50 px-2 py-0.5 rounded-md">
                    {idea.demand}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  Includes raw material supplier list
                </span>
                <button
                  onClick={() => setCurrentView('smart-finance')}
                  className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Financing</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Insights Box matching screenshot */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-purple-700" />
          <h3 className="text-base font-bold text-slate-900">
            Real-Time Market Insights ({userProfile.locationDistrict} Cluster)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-100">
            <span className="text-[10px] font-bold text-purple-800 uppercase block mb-1">
              Top Selling Products
            </span>
            <p className="font-bold text-slate-800 leading-snug">
              Mango & Stuffed Chili Pickles, Handloom Cotton Bags, Mustard Oil, Organic Turmeric
            </p>
          </div>

          <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100">
            <span className="text-[10px] font-bold text-indigo-800 uppercase block mb-1">
              Top Market Places
            </span>
            <p className="font-bold text-slate-800 leading-snug">
              Weekly Haats, Local Departmental Stores, SARAS Aajeevika Fair, ONDC & Meesho
            </p>
          </div>

          <div className="p-4 bg-pink-50/60 rounded-2xl border border-pink-100">
            <span className="text-[10px] font-bold text-pink-800 uppercase block mb-1">
              Peak Selling Season
            </span>
            <p className="font-bold text-slate-800 leading-snug">
              October – January (Diwali, Dussehra & Wedding Festival Season)
            </p>
          </div>

          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100">
            <span className="text-[10px] font-bold text-emerald-800 uppercase block mb-1">
              Consumer Preference
            </span>
            <p className="font-bold text-slate-800 leading-snug">
              Heavy preference for preservative-free, pure home-style recipes with hygienic packaging
            </p>
          </div>
        </div>
      </div>

      {/* Find Customers & Markets (4 Channels matching screenshot) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4">
          Find Customers & Market Linkages / ग्राहक एवं बाज़ार खोजें
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Channel 1: Local Customers */}
          <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-2">
              <Users className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">1. Local Customers</h4>
            <p className="text-[11px] text-slate-600 mt-1">
              Connect with neighborhood stores, village haats, and word-of-mouth WhatsApp groups.
            </p>
            <span className="text-[10px] font-bold text-purple-700 mt-3 block">
              Direct cash flow • Zero commission
            </span>
          </div>

          {/* Channel 2: Online Markets */}
          <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-700 flex items-center justify-center mb-2">
              <Globe className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">2. Online & E-Commerce</h4>
            <p className="text-[11px] text-slate-600 mt-1">
              List products on ONDC, Amazon Karigar, Flipkart Samarth, and Meesho with zero onboarding fee.
            </p>
            <span className="text-[10px] font-bold text-pink-700 mt-3 block">
              Pan-India deliveries
            </span>
          </div>

          {/* Channel 3: Gov Market Linkages */}
          <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-2">
              <Building2 className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">3. Gov Market Linkages</h4>
            <p className="text-[11px] text-slate-600 mt-1">
              Supply directly to government Anganwadis, Mid-Day Meal ration contracts, and GeM portal.
            </p>
            <span className="text-[10px] font-bold text-indigo-700 mt-3 block">
              High-volume bulk orders
            </span>
          </div>

          {/* Channel 4: Exhibitions & Fairs */}
          <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">4. Exhibitions & Fairs</h4>
            <p className="text-[11px] text-slate-600 mt-1">
              Apply for subsidized stalls in SARAS Mela, Dastkar, and district trade festivals.
            </p>
            <span className="text-[10px] font-bold text-amber-700 mt-3 block">
              High profit margin event sales
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
