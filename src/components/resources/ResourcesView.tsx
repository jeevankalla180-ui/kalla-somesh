import React, { useState } from 'react';
import {
  Gift,
  Landmark,
  GraduationCap,
  Wrench,
  ShoppingBag,
  Lightbulb,
  Sparkles,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GOV_SCHEMES_DATA } from '../../data/mockData';

export const ResourcesView: React.FC = () => {
  const { userProfile, speakText, setCurrentView } = useApp();
  const [selectedSection, setSelectedSection] = useState<string>('all');

  const categories = [
    {
      id: 'schemes',
      title: 'Government Schemes',
      icon: Landmark,
      color: 'bg-purple-100 text-purple-700',
      description: 'Financial help, subsidies and support programs from central and state governments.',
      count: '6 Active Programs',
    },
    {
      id: 'loans',
      title: 'Loan & Funding Opportunities',
      icon: Gift,
      color: 'bg-emerald-100 text-emerald-700',
      description: 'Affordable loans, microfinance, grants and investment opportunities for your business.',
      count: '4 Subsidized Loans',
    },
    {
      id: 'training',
      title: 'Training & Skill Development',
      icon: GraduationCap,
      color: 'bg-pink-100 text-pink-700',
      description: 'Free and subsidized training programs to learn new business, production and digital skills.',
      count: '5 Free Workshops',
    },
    {
      id: 'equipment',
      title: 'Equipment & Resources',
      icon: Wrench,
      color: 'bg-amber-100 text-amber-700',
      description: 'Machines, tools, technology and raw material resources to improve your production.',
      count: '50% Subsidy List',
    },
    {
      id: 'markets',
      title: 'Market & Selling Opportunities',
      icon: ShoppingBag,
      color: 'bg-indigo-100 text-indigo-700',
      description: 'Exhibitions, buyer-seller meets, government procurement and e-commerce platforms to sell.',
      count: '12 Live Channels',
    },
    {
      id: 'ideas',
      title: 'New Business Opportunities',
      icon: Lightbulb,
      color: 'bg-teal-100 text-teal-700',
      description: 'Emerging business sectors, high-demand products and trending business ideas for rural women.',
      count: '8 Verified Models',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner matching WhatsApp Image */}
      <div className="bg-gradient-to-r from-[#241038] via-[#4A1D6D] to-[#701A75] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-pink-200 text-[11px] font-bold uppercase tracking-wider">
              Central Resource Portal
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif]">
            Resources & Opportunities
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-xl">
            Everything you need to grow your business — funding, skills, equipment, suppliers, and markets in one unified portal.
          </p>
        </div>

        <button
          onClick={() =>
            speakText(
              `The top active opportunities for ${userProfile.shgName} include the NRLM 4% subvention loan and the SARAS Aajeevika free stall allotment.`
            )
          }
          className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white text-xs font-bold rounded-xl border border-white/30 flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4 text-pink-300" />
          <span>Speak Active Resources</span>
        </button>
      </div>

      {/* 6 Category Tiles matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              onClick={() => setSelectedSection(cat.id)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer shadow-xs flex flex-col justify-between ${
                selectedSection === cat.id
                  ? 'border-purple-600 bg-purple-50/50 ring-2 ring-purple-600/20'
                  : 'border-slate-200 bg-white hover:border-purple-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${cat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {cat.count}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{cat.title}</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{cat.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
                <span>View Listings</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Flagship Detailed Government Directory */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Verified Government Welfare & Enterprise Schemes
            </h3>
            <p className="text-xs text-slate-500">
              Direct official applications for {userProfile.locationDistrict}, {userProfile.locationState}
            </p>
          </div>
          <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            NRLM & Ministry of MSME Link
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GOV_SCHEMES_DATA.map((scheme) => (
            <div key={scheme.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                    {scheme.category}
                  </span>
                  <span className="text-xs font-black text-emerald-700">{scheme.fundingAmount}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{scheme.name}</h4>
                <p className="text-xs text-slate-600 mt-1">{scheme.description}</p>
                <div className="mt-2 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Eligibility:</span> {scheme.eligibility}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>No Broker • Direct Portal</span>
                </span>
                <a
                  href={scheme.officialPortalUrl || scheme.linkUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Apply on Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
