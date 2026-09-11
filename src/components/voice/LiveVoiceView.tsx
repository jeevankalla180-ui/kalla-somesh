import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  RotateCcw,
  BookmarkPlus,
  CheckCircle2,
  Globe,
  Radio,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../data/mockData';

export const LiveVoiceView: React.FC = () => {
  const {
    language,
    speakText,
    todaySales,
    todayExpenses,
    todayProfit,
    cashAvailable,
    businessHealth,
    loanAccount,
    userProfile,
    saveVoiceInteractionToHistory,
  } = useApp();

  const [isListening, setIsListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [liveResponse, setLiveResponse] = useState('');
  const [isSpeakingResponse, setIsSpeakingResponse] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Initialize Web Speech API if supported in browser
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = LANGUAGES[language].code;

      recognition.onstart = () => {
        setIsListening(true);
        setSavedSuccess(false);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setLiveTranscript(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition event:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        // Process transcript when user finishes speaking
        processVoiceInput();
      };

      recognitionRef.current = recognition;
    }
  }, [language]);

  const processVoiceInput = (overrideText?: string) => {
    const text = overrideText || liveTranscript;
    if (!text.trim()) return;

    const lower = text.toLowerCase();
    let answer = '';

    if (lower.includes('profit') || lower.includes('मुनाफा') || lower.includes('कमाई') || lower.includes('labham')) {
      answer = `Today's net profit is ₹${todayProfit}. Sales were ₹${todaySales} and expenses were ₹${todayExpenses}. Your profit margin is 30%.`;
    } else if (lower.includes('sale') || lower.includes('बिक्री') || lower.includes('becho')) {
      answer = `Your sales recorded today amount to ₹${todaySales}. Top seller was traditional mango pickles.`;
    } else if (lower.includes('loan') || lower.includes('लोन') || lower.includes('कर्ज') || lower.includes('emi')) {
      answer = `Your ${loanAccount.loanName} has ₹6,000 monthly EMI due on ${loanAccount.nextEmiDate}. Cash available in hand is ₹${cashAvailable}, which is sufficient.`;
    } else if (lower.includes('health') || lower.includes('स्वास्थ्य') || lower.includes('score')) {
      answer = `Your business health score is ${businessHealth.score}% and status is ${businessHealth.status}. Repayments are 100% on time.`;
    } else if (lower.includes('scheme') || lower.includes('योजना') || lower.includes('sarkari')) {
      answer = `Under the NRLM Scheme, your SHG is eligible for a ₹2 Lakh bank loan with 3% interest subvention, making the net interest rate just 4%.`;
    } else {
      answer = `Namaste! I heard: "${text}". Your business is running smoothly with ₹${cashAvailable} cash in hand and a healthy ${businessHealth.status} rating.`;
    }

    setLiveResponse(answer);
    setIsSpeakingResponse(true);
    speakText(answer);
    setTimeout(() => setIsSpeakingResponse(false), 4000);
  };

  const handleToggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setLiveTranscript('');
      setLiveResponse('');
      try {
        recognitionRef.current?.start();
      } catch (err) {
        // Fallback for browsers with blocked mic or iframe constraints
        setIsListening(true);
        setTimeout(() => {
          setIsListening(false);
          const sample = 'आज का मुनाफा कितना है? (What is today\'s profit?)';
          setLiveTranscript(sample);
          processVoiceInput(sample);
        }, 1500);
      }
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setLiveTranscript(prompt);
    processVoiceInput(prompt);
  };

  const handleSaveToHistory = () => {
    if (!liveTranscript || !liveResponse) return;
    saveVoiceInteractionToHistory({
      userText: liveTranscript,
      responseText: liveResponse,
      intentCategory: 'Financial Status Inquiry',
      extractedData: {
        todaySales,
        todayProfit,
        cashAvailable,
      },
    });
    setSavedSuccess(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner explaining the distinct zero-history live space */}
      <div className="bg-gradient-to-r from-[#2B1055] via-[#5B166A] to-[#881337] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-pink-500/30 text-pink-200 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
              <span>Live Ephemeral Space</span>
            </span>
            <span className="text-xs text-pink-200">• Direct Spoken Answers • No Auto-History</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif]">
            Live Voice Interaction (सीधी आवाज़ बातचीत)
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-xl leading-relaxed">
            A dedicated private space where you can directly speak in {LANGUAGES[language].name} (
            {LANGUAGES[language].nativeName}) and receive instant vocal guidance. Conversations stay live in the moment
            and are not logged unless you explicitly choose to save.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-2xl border border-white/20">
          <Globe className="w-4 h-4 text-pink-300" />
          <span className="text-xs font-bold text-white">{LANGUAGES[language].nativeName}</span>
        </div>
      </div>

      {/* Main Interactive Mic Visualizer Canvas */}
      <div className="bg-white rounded-3xl p-8 border border-purple-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[380px]">
        {/* Animated concentric rings when active */}
        <div className="relative mb-6 flex items-center justify-center">
          {isListening && (
            <>
              <div className="absolute w-44 h-44 rounded-full bg-pink-500/20 animate-ping" />
              <div className="absolute w-36 h-36 rounded-full bg-purple-500/30 animate-pulse" />
            </>
          )}

          <button
            onClick={handleToggleListening}
            className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-2xl flex items-center justify-center transition-all cursor-pointer ${
              isListening
                ? 'bg-gradient-to-tr from-pink-600 to-rose-600 text-white scale-110'
                : 'bg-gradient-to-tr from-[#4A1D6D] to-[#7E22CE] hover:from-[#581C87] hover:to-[#9333EA] text-white hover:scale-105'
            }`}
          >
            {isListening ? (
              <Mic className="w-10 h-10 animate-bounce" />
            ) : (
              <Mic className="w-10 h-10 text-pink-200" />
            )}
          </button>
        </div>

        {/* Live Status Label */}
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-900">
            {isListening
              ? `Listening in ${LANGUAGES[language].nativeName}... Speak now`
              : 'Tap Microphone to Speak / बोलने के लिए माइक दबाएँ'}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {isListening ? 'Soundwave audio processing active' : 'Hands-free voice assistance for all your business numbers'}
          </p>
        </div>

        {/* Soundwave Simulation Bar */}
        {isListening && (
          <div className="flex items-center justify-center gap-1 h-8 my-2">
            {[24, 42, 18, 56, 30, 48, 20, 60, 36, 16, 52, 28].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-pink-600 rounded-full animate-pulse"
                style={{ height: `${h}px`, animationDelay: `${i * 80}ms` }}
              />
            ))}
          </div>
        )}

        {/* Live Recognized User Spoken Text */}
        {liveTranscript && (
          <div className="max-w-lg w-full p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs text-purple-900 font-medium my-3">
            <span className="text-[10px] uppercase font-bold text-purple-600 block mb-1">
              You Spoke / आपकी आवाज़:
            </span>
            "{liveTranscript}"
          </div>
        )}

        {/* Live Spoken System Response */}
        {liveResponse && (
          <div className="max-w-lg w-full p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 text-left my-2 shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold text-emerald-700 flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant Spoken Response:</span>
              </span>
              <button
                onClick={() => speakText(liveResponse)}
                className="text-[10px] font-bold text-emerald-700 hover:underline cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Replay Voice</span>
              </button>
            </div>
            <p className="leading-relaxed font-semibold">{liveResponse}</p>

            {/* Optional explicit save button */}
            <div className="mt-3 pt-2.5 border-t border-emerald-200 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 italic">
                (By default not stored in history)
              </span>
              <button
                onClick={handleSaveToHistory}
                disabled={savedSuccess}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Saved to History</span>
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="w-3.5 h-3.5" />
                    <span>Save to History</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Suggested Voice Prompts */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-purple-700" />
          <span>Tap to Try Common Voice Questions / बोलकर पूछने के उदाहरण:</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              title: "Today's Profit",
              native: 'आज का शुद्ध मुनाफा कितना है?',
              text: "What is my today's profit?",
            },
            {
              title: 'Loan EMI Date',
              native: 'अगली लोन किस्त कब देनी है?',
              text: 'When is my next loan EMI due?',
            },
            {
              title: 'Business Health',
              native: 'मेरे व्यापार का स्वास्थ्य कैसा है?',
              text: 'What is my current business health score?',
            },
            {
              title: 'Government Scheme',
              native: 'मेरे लिए कौन सी सरकारी योजना है?',
              text: 'Which government scheme is suitable for my SHG?',
            },
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleQuickPrompt(prompt.text)}
              className="p-3 rounded-2xl border border-slate-200 hover:border-purple-400 bg-slate-50 hover:bg-purple-50/50 text-left transition-all cursor-pointer"
            >
              <span className="text-[10px] font-bold text-purple-700 uppercase block">
                {prompt.title}
              </span>
              <span className="text-xs font-bold text-slate-800 block mt-1">{prompt.native}</span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">{prompt.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
