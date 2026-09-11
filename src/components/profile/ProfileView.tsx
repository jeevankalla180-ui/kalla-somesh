import React, { useState } from 'react';
import {
  User,
  Building2,
  Users,
  MapPin,
  Settings,
  ShieldCheck,
  Globe,
  Save,
  CheckCircle2,
  Volume2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AVATAR_IMAGE } from '../../assets/assets';
import { LANGUAGES } from '../../data/mockData';
import { LanguageCode } from '../../types';

export const ProfileView: React.FC = () => {
  const { userProfile, updateUserProfile, shgMembers, districtData, language, setLanguage } = useApp();

  const [activeTab, setActiveTab] = useState<'personal' | 'business' | 'members' | 'location' | 'settings'>('personal');
  const [name, setName] = useState(userProfile.name);
  const [phone, setPhone] = useState(userProfile.phone);
  const [email, setEmail] = useState(userProfile.email);
  const [shgName, setShgName] = useState(userProfile.shgName);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      phone,
      email,
      shgName,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Profile Card */}
      <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-purple-200 shadow-md bg-[#E6F4EA] shrink-0">
          <img src={AVATAR_IMAGE} alt="Profile Avatar" className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              {userProfile.name}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
              {userProfile.role}
            </span>
          </div>

          <p className="text-xs text-slate-600 mt-1">
            {userProfile.shgName} • {userProfile.locationDistrict}, {userProfile.locationState}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-slate-500">
            <span>📞 {userProfile.phone}</span>
            <span>✉️ {userProfile.email}</span>
            <span className="font-semibold text-purple-700">
              Preferred Language: {LANGUAGES[language].nativeName}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'personal', label: 'My Profile', icon: User },
          { id: 'business', label: 'Business Profile', icon: Building2 },
          { id: 'members', label: `SHG Members (${shgMembers.length})`, icon: Users },
          { id: 'location', label: 'Location & Government Data', icon: MapPin },
          { id: 'settings', label: 'Settings & Voice', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-purple-50 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Personal Details */}
      {activeTab === 'personal' && (
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 max-w-xl">
          <h3 className="text-base font-bold text-slate-900">Personal & Contact Details</h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-between">
            {savedNotice && (
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Profile Updated Successfully!
              </span>
            )}
            <button
              type="submit"
              className="ml-auto px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Business Profile */}
      {activeTab === 'business' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 max-w-2xl">
          <h3 className="text-base font-bold text-slate-900">Self-Help Group (SHG) Profile</h3>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-purple-50/60 rounded-2xl border border-purple-100">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">SHG Group Name</span>
              <span className="text-sm font-extrabold text-purple-900 mt-1 block">{userProfile.shgName}</span>
            </div>

            <div className="p-3.5 bg-purple-50/60 rounded-2xl border border-purple-100">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Primary Business</span>
              <span className="text-sm font-extrabold text-slate-800 mt-1 block">{userProfile.businessType}</span>
            </div>

            <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100">
              <span className="text-[10px] text-emerald-700 uppercase font-bold block">Udyam Registration</span>
              <span className="text-xs font-bold text-slate-800 mt-1 block">UDYAM-UP-67-0045192 (Verified)</span>
            </div>

            <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100">
              <span className="text-[10px] text-emerald-700 uppercase font-bold block">FSSAI Food License</span>
              <span className="text-xs font-bold text-slate-800 mt-1 block">Reg. # 22724558000189</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: SHG Members */}
      {activeTab === 'members' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Registered SHG Members</h3>
              <p className="text-xs text-slate-500">Every member's monthly contribution and role</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Member Name</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Monthly Savings</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {shgMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-purple-50/30">
                    <td className="py-3 px-4 font-bold text-slate-900">{m.name}</td>
                    <td className="py-3 px-4 text-purple-700 font-semibold">{m.role}</td>
                    <td className="py-3 px-4 text-slate-600">{m.phone}</td>
                    <td className="py-3 px-4 font-extrabold text-emerald-700">₹{m.contribution}/mo</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Location Telemetry */}
      {activeTab === 'location' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Location & District Mission Benchmarks ({districtData.districtName})
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-purple-50 rounded-2xl">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">District SHGs</span>
              <span className="text-lg font-black text-purple-900 mt-1 block">{districtData.shgGroups}</span>
            </div>
            <div className="p-3 bg-purple-50 rounded-2xl">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Women Empowered</span>
              <span className="text-lg font-black text-pink-700 mt-1 block">{districtData.womenEmpowered}</span>
            </div>
            <div className="p-3 bg-purple-50 rounded-2xl">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Lakhpati Didis</span>
              <span className="text-lg font-black text-amber-700 mt-1 block">{districtData.lakhpatiDidiCount}</span>
            </div>
            <div className="p-3 bg-purple-50 rounded-2xl">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Active Loans</span>
              <span className="text-lg font-black text-emerald-700 mt-1 block">{districtData.activeLoansDisbursed}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Settings & Voice */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 max-w-xl">
          <h3 className="text-base font-bold text-slate-900">Language & Voice Preferences</h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Preferred Spoken Language / स्थानीय भाषा
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(LANGUAGES) as LanguageCode[]).map((code) => {
                const lang = LANGUAGES[code];
                const isSelected = language === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setLanguage(code, true)}
                    className={`p-2.5 rounded-xl text-xs text-left border cursor-pointer ${
                      isSelected
                        ? 'bg-purple-700 text-white font-bold border-purple-700 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-bold">{lang.nativeName}</div>
                    <div className="text-[10px] opacity-75">{lang.name}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
