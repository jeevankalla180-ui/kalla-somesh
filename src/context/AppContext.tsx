import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  ViewId,
  LanguageCode,
  UserProfile,
  SHGMember,
  Transaction,
  LoanAccount,
  BusinessHealth,
  NotificationItem,
  VoiceChatEntry,
  BusinessIdea,
  GovernmentScheme,
} from '../types';
import {
  LANGUAGES,
  INITIAL_PROFILE,
  INITIAL_SHG_MEMBERS,
  INITIAL_TRANSACTIONS,
  INITIAL_LOAN,
  INITIAL_BUSINESS_IDEAS,
  INITIAL_GOV_SCHEMES,
  INITIAL_NOTIFICATIONS,
  INITIAL_VOICE_HISTORY,
  DISTRICT_TELEMETRY,
} from '../data/mockData';

interface AppContextType {
  currentView: ViewId;
  setCurrentView: (view: ViewId) => void;
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode, playVoice?: boolean) => void;
  
  // Data
  shgMembers: SHGMember[];
  transactions: Transaction[];
  loanAccount: LoanAccount;
  businessIdeas: BusinessIdea[];
  govSchemes: GovernmentScheme[];
  notifications: NotificationItem[];
  voiceHistory: VoiceChatEntry[];
  
  // Calculated Telemetry
  todaySales: number;
  todayExpenses: number;
  todayProfit: number;
  cashAvailable: number;
  savings: number;
  businessHealth: BusinessHealth;
  unreadNotificationsCount: number;
  
  // Actions
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  recordHandwrittenSlip: (rawText: string, parsedTx: Omit<Transaction, 'id'>) => void;
  payLoanEmi: () => void;
  markNotificationAsRead: (id: string) => void;
  addVoiceChatRecord: (record: Omit<VoiceChatEntry, 'id'>) => void;
  
  // Modals & Contextual AI
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  isNotificationsModalOpen: boolean;
  setIsNotificationsModalOpen: (open: boolean) => void;
  isAddSaleModalOpen: boolean;
  setIsAddSaleModalOpen: (open: boolean) => void;
  isAddExpenseModalOpen: boolean;
  setIsAddExpenseModalOpen: (open: boolean) => void;
  isDigitizerModalOpen: boolean;
  setIsDigitizerModalOpen: (open: boolean) => void;
  
  // Live Voice context
  lastActiveFeature: string;
  setLastActiveFeature: (featureName: string) => void;
  speakText: (text: string, lang?: LanguageCode) => void;
  stopSpeaking: () => void;
  districtData: typeof DISTRICT_TELEMETRY['Varanasi'];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentViewRaw] = useState<ViewId>('splash');
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [language, setLanguageState] = useState<LanguageCode>('hi');
  const [shgMembers] = useState<SHGMember[]>(INITIAL_SHG_MEMBERS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [loanAccount, setLoanAccount] = useState<LoanAccount>(INITIAL_LOAN);
  const [businessIdeas] = useState<BusinessIdea[]>(INITIAL_BUSINESS_IDEAS);
  const [govSchemes] = useState<GovernmentScheme[]>(INITIAL_GOV_SCHEMES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [voiceHistory, setVoiceHistory] = useState<VoiceChatEntry[]>(INITIAL_VOICE_HISTORY);
  
  // Modal states
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isAddSaleModalOpen, setIsAddSaleModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isDigitizerModalOpen, setIsDigitizerModalOpen] = useState(false);
  const [lastActiveFeature, setLastActiveFeature] = useState<string>('Home Dashboard');

  // Speech helper
  const speakText = useCallback((text: string, langCode?: LanguageCode) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const code = langCode || language;
      // map language code to BCP 47
      const langMap: Record<LanguageCode, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        te: 'te-IN',
        ta: 'ta-IN',
        mr: 'mr-IN',
        bn: 'bn-IN',
        kn: 'kn-IN',
        gu: 'gu-IN',
      };
      utterance.lang = langMap[code] || 'en-IN';
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore speech errors gracefully
    }
  }, [language]);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const setLanguage = useCallback((newLang: LanguageCode, playVoice: boolean = true) => {
    setLanguageState(newLang);
    setUserProfile((prev) => ({ ...prev, language: newLang }));
    if (playVoice) {
      const greeting = LANGUAGES[newLang]?.welcomeVoiceText || LANGUAGES[newLang]?.greetingText || 'How can I help you?';
      speakText(greeting, newLang);
    }
  }, [speakText]);

  const setCurrentView = useCallback((view: ViewId) => {
    setCurrentViewRaw(view);
    // map view to descriptive title for Live Voice adaptation
    const featureMap: Record<ViewId, string> = {
      splash: 'Splash Intro',
      auth: 'Login & Verification',
      home: 'Home Dashboard',
      'finance-track': 'FinanceTrack Digital Ledger',
      'smart-finance': 'Smart Finance & Resource Guidance',
      'business-health': 'Business Health Monitoring',
      'ai-prediction': 'AI Prediction & Early Warnings',
      'ai-advisor': 'AI Business Advisor',
      'market-ideas': 'Business Ideas & Market Support',
      'growth-impact': 'Growth & Impact Dashboard',
      'live-voice': 'Live Voice Space',
      'voice-history': 'Voice Chat History',
      resources: 'Resources & Opportunities for Women',
      profile: 'Business Profile & SHG Settings',
    };
    if (featureMap[view]) {
      setLastActiveFeature(featureMap[view]);
    }
  }, []);

  const updateUserProfile = useCallback((updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
  }, []);

  // Central Financial & Health calculations
  const { todaySales, todayExpenses, todayProfit, cashAvailable, savings, businessHealth } = useMemo(() => {
    let salesTotal = 0;
    let expensesTotal = 0;
    let netCash = 8250; // base seed cash in hand
    let totalSavings = userProfile.savingsBalance;

    transactions.forEach((tx) => {
      if (tx.type === 'sale') {
        netCash += tx.amount;
        if (tx.date.includes('12 Sep') || tx.date.includes('Today')) {
          salesTotal += tx.amount;
        }
      } else if (tx.type === 'expense') {
        netCash -= tx.amount;
        if (tx.date.includes('12 Sep') || tx.date.includes('Today')) {
          expensesTotal += tx.amount;
        }
      } else if (tx.type === 'loan_repayment') {
        netCash -= tx.amount;
      }
    });

    if (salesTotal === 0) salesTotal = 4500;
    if (expensesTotal === 0) expensesTotal = 2700;
    const profitTotal = salesTotal - expensesTotal;

    // Real-time Business Health calculation
    const salesGrowthScore = Math.min(95, Math.max(65, 80 + Math.round((salesTotal - 4000) / 100)));
    const profitMarginScore = Math.min(92, Math.max(60, 72 + Math.round((profitTotal / (salesTotal || 1)) * 10)));
    const expenseControlScore = Math.min(90, Math.max(55, 75 - Math.round((expensesTotal / (salesTotal || 1)) * 20)));
    const loanRepaymentScore = loanAccount.paidEmis >= 14 ? 90 : 80;
    const activityScore = 75;

    const overallScore = Math.round(
      (salesGrowthScore * 0.3) +
      (profitMarginScore * 0.25) +
      (expenseControlScore * 0.2) +
      (loanRepaymentScore * 0.15) +
      (activityScore * 0.1)
    );

    let status: BusinessHealth['status'] = 'Good';
    if (overallScore >= 85) status = 'Excellent';
    else if (overallScore >= 70) status = 'Good';
    else if (overallScore >= 55) status = 'Fair';
    else status = 'Needs Attention';

    return {
      todaySales: salesTotal,
      todayExpenses: expensesTotal,
      todayProfit: profitTotal,
      cashAvailable: Math.max(1200, netCash),
      savings: totalSavings,
      businessHealth: {
        score: overallScore,
        status,
        salesGrowth: salesGrowthScore,
        profitMargin: profitMarginScore,
        expenseControl: expenseControlScore,
        loanRepayment: loanRepaymentScore,
        businessActivityDays: 14,
      },
    };
  }, [transactions, userProfile.savingsBalance, loanAccount.paidEmis]);

  // Add transaction with Central Monitoring Trigger
  const addTransaction = useCallback((tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: `tx-${Date.now()}`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    // Central Monitoring Engine reaction
    const isSale = tx.type === 'sale';
    const notifTitle = isSale ? `New Sale Recorded: ₹${tx.amount}` : `Expense Logged: ₹${tx.amount}`;
    const notifDesc = isSale
      ? `Successfully added sale of ₹${tx.amount} (${tx.description}). Cash in hand and business health updated.`
      : `Logged business expense of ₹${tx.amount} under ${tx.category}. Expense analytics updated.`;

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: notifTitle,
      description: notifDesc,
      time: 'Just now',
      type: isSale ? 'success' : 'info',
      read: false,
      actionView: 'finance-track',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    if (isSale && tx.amount >= 2000) {
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.8 },
        });
      } catch {}
    }
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Handwritten slip parser integration
  const recordHandwrittenSlip = useCallback((rawText: string, parsedTx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...parsedTx,
      id: `hw-${Date.now()}`,
      isHandwrittenDigitized: true,
    };
    setTransactions((prev) => [newTx, ...prev]);

    const voiceEntry: VoiceChatEntry = {
      id: `hw-voice-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      durationSeconds: 8,
      language: 'hi',
      transcription: `[Handwritten Slip Digitized]: ${rawText}`,
      understoodIntent: `Digitized Handwritten ${parsedTx.type.toUpperCase()}`,
      structuredData: {
        category: parsedTx.category,
        description: parsedTx.description,
        amount: `₹${parsedTx.amount}`,
        method: parsedTx.paymentMethod,
        source: 'Handwritten Ledger Slip OCR',
      },
      assistantResponse: `हस्तलिखित पर्ची को सफलतापूर्वक डिजिटल कर दिया गया है! ₹${parsedTx.amount} को डिजिटल बहीखाते में सुरक्षित जोड़ दिया गया है।`,
    };
    setVoiceHistory((prev) => [voiceEntry, ...prev]);

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Handwritten Record Digitized',
        description: `Successfully extracted and saved: ₹${parsedTx.amount} (${parsedTx.description}).`,
        time: 'Just now',
        type: 'success',
        read: false,
        actionView: 'finance-track',
      },
      ...prev,
    ]);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {}
  }, []);

  // Pay EMI
  const payLoanEmi = useCallback(() => {
    setLoanAccount((prev) => {
      const nextPaid = prev.paidEmis + 1;
      return {
        ...prev,
        paidEmis: nextPaid,
        nextEmiDate: '16 Oct 2025',
      };
    });

    addTransaction({
      date: 'Today',
      type: 'loan_repayment',
      category: 'Loan EMI',
      description: 'SBI SHG Term Loan EMI Repayment',
      amount: loanAccount.emiAmount,
      customerOrVendor: 'State Bank of India',
      paymentMethod: 'Bank Transfer',
    });

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}
  }, [addTransaction, loanAccount.emiAmount]);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const addVoiceChatRecord = useCallback((record: Omit<VoiceChatEntry, 'id'>) => {
    const newEntry: VoiceChatEntry = {
      ...record,
      id: `vc-${Date.now()}`,
    };
    setVoiceHistory((prev) => [newEntry, ...prev]);
  }, []);

  const unreadNotificationsCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const districtData = useMemo(() => {
    const key = (userProfile.locationDistrict as keyof typeof DISTRICT_TELEMETRY) || 'Varanasi';
    return DISTRICT_TELEMETRY[key] || DISTRICT_TELEMETRY['Varanasi'];
  }, [userProfile.locationDistrict]);

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        userProfile,
        updateUserProfile,
        language,
        setLanguage,
        shgMembers,
        transactions,
        loanAccount,
        businessIdeas,
        govSchemes,
        notifications,
        voiceHistory,
        todaySales,
        todayExpenses,
        todayProfit,
        cashAvailable,
        savings,
        businessHealth,
        unreadNotificationsCount,
        addTransaction,
        deleteTransaction,
        recordHandwrittenSlip,
        payLoanEmi,
        markNotificationAsRead,
        addVoiceChatRecord,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isNotificationsModalOpen,
        setIsNotificationsModalOpen,
        isAddSaleModalOpen,
        setIsAddSaleModalOpen,
        isAddExpenseModalOpen,
        setIsAddExpenseModalOpen,
        isDigitizerModalOpen,
        setIsDigitizerModalOpen,
        lastActiveFeature,
        setLastActiveFeature,
        speakText,
        stopSpeaking,
        districtData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
