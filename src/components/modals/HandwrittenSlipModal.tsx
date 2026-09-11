import React, { useState } from 'react';
import { X, Camera, Upload, CheckCircle2, Sparkles, FileText, ArrowRight, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Transaction } from '../../types';

interface SampleSlip {
  id: string;
  label: string;
  notes: string;
  parsed: Omit<Transaction, 'id'>;
}

const SAMPLE_SLIPS: SampleSlip[] = [
  {
    id: 'sample-1',
    label: 'Village Haat Pickle Sale Slip',
    notes: 'दिनांक १२ सितम्बर - आज हाट बाज़ार में ५ किलो आम का अचार और ३ बोतल नींबू का अचार बिका। नकद प्राप्त: ₹१,८००/- (सविता ग्राहक)',
    parsed: {
      date: '12 Sep 2025',
      type: 'sale',
      category: 'Food Products',
      description: 'Village Haat Pickle Sales (5kg mango + 3 bottles lemon)',
      amount: 1800,
      customerOrVendor: 'Savita (Village Haat)',
      paymentMethod: 'Cash',
    },
  },
  {
    id: 'sample-2',
    label: 'Raw Spices & Mustard Oil Purchase Slip',
    notes: 'काशी एग्रो मिल्स से ५ लीटर सरसों तेल और खड़ा मसाला खरीदा। कुल भुगतान यूपीआई से: ₹८५०/- (रसीद सं. ४४२)',
    parsed: {
      date: '11 Sep 2025',
      type: 'expense',
      category: 'Raw Materials',
      description: 'Mustard oil (5L) & whole spices from Kashi Agro',
      amount: 850,
      customerOrVendor: 'Kashi Agro Mills',
      paymentMethod: 'UPI',
    },
  },
  {
    id: 'sample-3',
    label: 'Handloom Cotton Cloth Purchase',
    notes: 'हथकरघा बुनाई केंद्र से २० मीटर सूती कपड़ा लिया झोला बनाने हेतु। नकद: ₹१,४००/-',
    parsed: {
      date: '10 Sep 2025',
      type: 'expense',
      category: 'Raw Materials',
      description: 'Handloom cotton fabric (20m) for stitched tote bags',
      amount: 1400,
      customerOrVendor: 'Weaver Community Kendra',
      paymentMethod: 'Cash',
    },
  },
  {
    id: 'sample-4',
    label: 'Festive Order Sale - 15 Embroidered Bags',
    notes: 'होटल संगम से १५ पीस कढ़ाई वाले झोले का आर्डर पूरा हुआ। कुल मिला: ₹३,०००/- बैंक ट्रांसफर।',
    parsed: {
      date: '09 Sep 2025',
      type: 'sale',
      category: 'Textiles',
      description: 'Festive order - 15 embroidered tote bags for Hotel Sangam',
      amount: 3000,
      customerOrVendor: 'Hotel Sangam Varanasi',
      paymentMethod: 'Bank Transfer',
    },
  },
];

export const HandwrittenSlipModal: React.FC = () => {
  const { isDigitizerModalOpen, setIsDigitizerModalOpen, recordHandwrittenSlip } = useApp();

  const [selectedSample, setSelectedSample] = useState<SampleSlip>(SAMPLE_SLIPS[0]);
  const [customSlipText, setCustomSlipText] = useState(SAMPLE_SLIPS[0].notes);
  const [isScanning, setIsScanning] = useState(false);
  const [extractedData, setExtractedData] = useState<Omit<Transaction, 'id'> | null>(SAMPLE_SLIPS[0].parsed);

  if (!isDigitizerModalOpen) return null;

  const handleSelectSample = (sample: SampleSlip) => {
    setSelectedSample(sample);
    setCustomSlipText(sample.notes);
    setExtractedData(sample.parsed);
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      // Parse numbers and keywords from handwritten text
      const text = customSlipText;
      const isExpense = text.includes('खरीदा') || text.includes('खर्च') || text.includes('भुगतान') || text.includes('लागत');
      const isSale = !isExpense;
      
      // Match amount
      const amountMatch = text.match(/[₹Rs\.\s]*([0-9,]+)/i);
      let parsedAmount = 1500;
      if (amountMatch && amountMatch[1]) {
        const cleaned = parseInt(amountMatch[1].replace(/,/g, ''), 10);
        if (!isNaN(cleaned) && cleaned > 0) parsedAmount = cleaned;
      }

      const parsed: Omit<Transaction, 'id'> = {
        date: 'Today',
        type: isSale ? 'sale' : 'expense',
        category: text.includes('कपड़ा') || text.includes('झोला') ? 'Textiles' : 'Food Products',
        description: text.slice(0, 50) + '...',
        amount: parsedAmount,
        customerOrVendor: text.includes('मार्ट') ? 'Local Mart' : 'Direct Bazaar',
        paymentMethod: text.includes('यूपीआई') || text.includes('UPI') ? 'UPI' : 'Cash',
      };

      setExtractedData(parsed);
      setIsScanning(false);
    }, 900);
  };

  const handleConfirmDigitize = () => {
    if (!extractedData) return;
    recordHandwrittenSlip(customSlipText, extractedData);
    setIsDigitizerModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-purple-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4A1D6D] to-[#7E22CE] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">Handwritten Slip & Ledger Digitizer (OCR AI)</h3>
              <p className="text-xs text-purple-200">
                Convert diary notebooks & paper receipts into verified digital finance data
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDigitizerModalOpen(false)}
            className="p-1 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Preset Sample Selector */}
          <div>
            <span className="block text-xs font-bold text-slate-700 mb-2">
              Select Sample Ledger Slip or Type Your Own / नमूना पर्ची चुनें:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {SAMPLE_SLIPS.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleSelectSample(sample)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    selectedSample.id === sample.id
                      ? 'border-purple-600 bg-purple-50/70 text-purple-900 font-semibold ring-1 ring-purple-600'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-purple-50/30'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold mb-0.5">
                    <FileText className="w-3.5 h-3.5 text-purple-600" />
                    <span>{sample.label}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">{sample.parsed.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Handwritten Record Preview Box */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">
                Handwritten Note / Dairy Notebook Text (हस्तलिखित प्रविष्टि)
              </label>
              <span className="text-[11px] text-purple-600 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                OCR Text Recognition Active
              </span>
            </div>
            <div className="relative">
              <textarea
                rows={3}
                value={customSlipText}
                onChange={(e) => setCustomSlipText(e.target.value)}
                className="w-full p-3 font-serif text-sm bg-amber-50/60 border-2 border-amber-200/80 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner"
                placeholder="यहाँ हस्तलिखित पर्ची या बहीखाता विवरण लिखें..."
              />
              <div className="absolute right-2 bottom-2">
                <button
                  type="button"
                  onClick={handleSimulateScan}
                  disabled={isScanning}
                  className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1 shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Scanning Slip...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-pink-300" />
                      <span>Re-Analyze OCR</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Extracted Structured Data Card */}
          {extractedData && (
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60 mb-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>AI Extracted & Structured Data / रूपांतरित डिजिटल डेटा</span>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    extractedData.type === 'sale'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {extractedData.type}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-white p-2 rounded-xl border border-emerald-100">
                  <span className="text-[10px] text-slate-400 block font-semibold">AMOUNT</span>
                  <span className="text-base font-extrabold text-emerald-700">₹{extractedData.amount.toLocaleString()}</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-emerald-100">
                  <span className="text-[10px] text-slate-400 block font-semibold">CATEGORY</span>
                  <span className="font-bold text-slate-800">{extractedData.category}</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-emerald-100">
                  <span className="text-[10px] text-slate-400 block font-semibold">PARTY / VENUE</span>
                  <span className="font-semibold text-slate-700 truncate block">{extractedData.customerOrVendor}</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-emerald-100">
                  <span className="text-[10px] text-slate-400 block font-semibold">MODE</span>
                  <span className="font-semibold text-purple-700">{extractedData.paymentMethod}</span>
                </div>
              </div>

              <p className="mt-2 text-xs text-slate-600 italic">
                "{extractedData.description}"
              </p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-slate-500">
            Digitized records are verified and immediately monitored by the AI engine.
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsDigitizerModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmDigitize}
              disabled={!extractedData}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <span>Confirm & Save to Digital Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
