import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Send,
  Mic,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Package,
  Store,
  Users,
  Percent,
  TrendingDown,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AiAdvisorView: React.FC = () => {
  const { userProfile, speakText, businessHealth, todayProfit } = useApp();

  // Interactive AI conversation
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<
    Array<{ sender: 'user' | 'advisor'; text: string; time: string }>
  >([
    {
      sender: 'advisor',
      text: `Namaste ${userProfile.name}! I have analyzed your ${userProfile.shgName} financial ledger. Your current profit margin is 30% with a health score of ${businessHealth.score}%. How can I help you grow today?`,
      time: 'Just now',
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsThinking(true);

    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('cost') || lower.includes('खर्च') || lower.includes('कम')) {
        reply = `To reduce costs by 15%: 1) Procure raw mustard oil directly in 50L drums rather than 5L cans. 2) Join the district SHG procurement federation to negotiate bulk spice rates.`;
      } else if (lower.includes('profit') || lower.includes('मुनाफा') || lower.includes('margin')) {
        reply = `To improve your profit margin from 30% to 40%: Create Diwali Festive Combo Gift Hampers containing 2 bottles of pickle + 1 packet of handmade spice. You can price it at ₹450 with only ₹260 cost.`;
      } else if (lower.includes('loan') || lower.includes('लोन') || lower.includes('emi')) {
        reply = `Your next EMI of ₹6,000 is on Sep 15. You have sufficient cash in hand (₹8,250). After this EMI, your NRLM credit limit will qualify for ₹2,00,000 at only 4% interest.`;
      } else if (lower.includes('market') || lower.includes('ग्राहक') || lower.includes('दुकान')) {
        reply = `For wider market access: 1) We have linked your SHG catalog with the Government e-Marketplace (GeM). 2) The Varanasi SARAS Mela stall registration opens next week; stall charges are 100% subsidized for women SHGs.`;
      } else {
        reply = `Based on your recent transactions, your business has steady daily sales of ₹4,500. Focus on expanding product variety before Diwali and maintain ₹10,000 cash balance for festival inventory.`;
      }

      const advisorMsg = {
        sender: 'advisor' as const,
        text: reply,
        time: 'Just now',
      };

      setMessages((prev) => [...prev, advisorMsg]);
      setIsThinking(false);
      speakText(reply);
    }, 700);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner matching WhatsApp Image */}
      <div className="bg-gradient-to-r from-[#4A1D6D] via-[#701A75] to-[#9D174D] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-pink-200 text-[11px] font-bold uppercase tracking-wider">
              AI Business Advisor
            </span>
            <span className="text-xs text-pink-200">• Personalized Ground-Truth Guidance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif]">
            AI Business Advisor
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-xl">
            Analyze the business and give personalized advice on reducing costs, increasing sales,
            improving profit margins, and expanding your enterprise.
          </p>
        </div>

        <button
          onClick={() =>
            speakText(
              `Hello ${userProfile.name}! Here are your top 3 personalized actions: Group buy mustard oil to save 12%, launch Diwali gift packs for higher profit margin, and prepare your stall for SARAS Mela.`
            )
          }
          className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white text-xs font-bold rounded-xl border border-white/30 flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4 text-pink-300" />
          <span>Speak All Advice</span>
        </button>
      </div>

      {/* 4 Important Warnings Grid matching screenshot */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Important Operational Warnings & Corrective Guidance</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Warning 1 */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
              Sales Drop Alert
            </span>
            <h4 className="text-xs font-bold text-slate-900 mt-2">Pickle Sales Dip in W2</h4>
            <p className="text-[11px] text-slate-600 mt-1">
              Sales dropped 12% in the second week of August. Consider offering festive combo samples.
            </p>
          </div>

          {/* Warning 2 */}
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-200 text-rose-900">
              Expense Increase
            </span>
            <h4 className="text-xs font-bold text-slate-900 mt-2">Packaging Cost Surge</h4>
            <p className="text-[11px] text-slate-600 mt-1">
              Glass jar costs rose 15%. Direct wholesale ordering from Firozabad cluster can save ₹3,000.
            </p>
          </div>

          {/* Warning 3 */}
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-200 text-purple-900">
              Cash Flow Alert
            </span>
            <h4 className="text-xs font-bold text-slate-900 mt-2">Raw Stock Buffer</h4>
            <p className="text-[11px] text-slate-600 mt-1">
              Expected ₹10,000 raw material requirement for festive surge. Keep cash buffer intact.
            </p>
          </div>

          {/* Warning 4 */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
              Loan Repayment
            </span>
            <h4 className="text-xs font-bold text-slate-900 mt-2">EMI Scheduled (Sep 15)</h4>
            <p className="text-[11px] text-slate-600 mt-1">
              ₹6,000 EMI is due. Available cash (₹8,250) is safe. Auto-debit scheduled.
            </p>
          </div>
        </div>
      </div>

      {/* 6 Personalized Recommendations Cards matching screenshot */}
      <div>
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-700" />
          <span>Personalized Recommendations for {userProfile.shgName}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Reduce Raw Material Cost */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-colors">
            <div>
              <div className="w-9 h-9 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3">
                <TrendingDown className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">1. Reduce Raw Material Cost</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Connect with 2 neighboring SHGs in {userProfile.locationDistrict} to order mustard oil, glass jars,
                and standing pouches collectively. Saves 12% to 15% on procurement costs.
              </p>
            </div>
            <button
              onClick={() => handleSendMessage('How can I do group buying with neighboring SHGs to reduce raw material cost?')}
              className="mt-4 text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Ask Advisor for Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Increase Product Price / Margin */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-colors">
            <div>
              <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <Percent className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">2. Introduce Festive Combo Packs</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Package handmade mango pickle + stuffed red chili + embroidered cloth pouch as a festive
                gift hamper. You can price it at ₹450 (up from ₹300 individual value), boosting gross margin by 28%.
              </p>
            </div>
            <button
              onClick={() => handleSendMessage('Suggest pricing and combo ideas for Diwali gift packs.')}
              className="mt-4 text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Gift Pack Idea</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Improve Stock Management */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-colors">
            <div>
              <div className="w-9 h-9 rounded-2xl bg-pink-50 text-pink-700 flex items-center justify-center mb-3">
                <Package className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">3. Improve Stock & Batch Production</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Avoid stocking more than 20kg of finished food items in unsealed containers.
                Switch to bi-weekly batch production to ensure freshness and reduce spoilage waste to zero.
              </p>
            </div>
            <button
              onClick={() => handleSendMessage('How to schedule batch production to avoid food spoilage?')}
              className="mt-4 text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Batch Scheduling Tips</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4: Expand Your Market */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-colors">
            <div>
              <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3">
                <Store className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">4. Expand to Institutional Buyers</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Hotels and railway canteens in Varanasi require recurring bulk supplies of pickles and snacks.
                Supply agreements provide predictable monthly revenue of ₹25,000+.
              </p>
            </div>
            <button
              onClick={() => handleSendMessage('How to approach hotels and railway canteens for bulk pickle supply?')}
              className="mt-4 text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
            >
              <span>View Buyer Connect</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 5: Improve Profit Margin */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-colors">
            <div>
              <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                <DollarSign className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">5. Switch to Economy Pouches</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                For repeat customers, offer food-grade standee foil zip pouches instead of glass bottles.
                Packaging cost drops from ₹18/bottle to ₹4/pouch, directly adding ₹14 profit per unit.
              </p>
            </div>
            <button
              onClick={() => handleSendMessage('Compare cost of glass bottles versus standee foil zip pouches.')}
              className="mt-4 text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Packaging Cost Math</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 6: Build Your Team */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-colors">
            <div>
              <div className="w-9 h-9 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">6. Engage 3 More SHG Members</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                To meet the upcoming October festival volume, delegate labeling and packaging to Rekha and Geeta
                with profit-sharing incentives. Increases production capacity by 60%.
              </p>
            </div>
            <button
              onClick={() => handleSendMessage('How to set up fair profit-sharing incentives for SHG members?')}
              className="mt-4 text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Member Incentive Model</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Chat with AI Business Advisor */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-purple-50/60 border-b border-purple-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Ask AI Advisor Anything (पूछें कोई भी सवाल)</h4>
              <p className="text-[10px] text-slate-500">Instant answers grounded in your business ledger & local language</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Online & Ready
          </span>
        </div>

        {/* Messages List */}
        <div className="p-4 space-y-3 max-h-72 overflow-y-auto">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-purple-700 text-white rounded-br-none'
                    : 'bg-slate-100 text-slate-800 rounded-bl-none'
                }`}
              >
                <p>{m.text}</p>
                <div
                  className={`text-[9px] mt-1 text-right ${
                    m.sender === 'user' ? 'text-purple-200' : 'text-slate-400'
                  }`}
                >
                  {m.time}
                </div>
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-500 p-3 rounded-2xl text-xs flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-purple-600" />
                <span>AI Advisor is analyzing your records...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick prompt chips */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-1.5">
          {[
            'How can I reduce raw material cost?',
            'How to increase festive profits?',
            'When should I pay my next EMI?',
            'Which government scheme is best for me?',
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="text-[10px] px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-purple-400 hover:text-purple-800 transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-100 flex items-center gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your question or click mic to speak / सवाल पूछें..."
            className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!chatInput.trim()}
            className="p-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl disabled:opacity-40 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
