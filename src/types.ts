export type ViewId =
  | 'splash'
  | 'auth'
  | 'home'
  | 'finance-track'
  | 'smart-finance'
  | 'business-health'
  | 'ai-prediction'
  | 'ai-advisor'
  | 'market-ideas'
  | 'growth-impact'
  | 'live-voice'
  | 'voice-history'
  | 'resources'
  | 'profile';

export type LanguageCode = 'en' | 'hi' | 'te' | 'ta' | 'mr' | 'bn' | 'kn' | 'gu';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  welcomeVoiceText: string;
  greetingText: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  shgName: string;
  locationState: string;
  locationDistrict: string;
  locationBlock: string;
  businessType: string;
  language: LanguageCode;
  phone: string;
  memberSince: string;
  savingsBalance: number;
}

export interface SHGMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  savingsContribution: number;
  attendanceRate: number;
  activeLoanAmount: number;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'sale' | 'expense' | 'loan_repayment';
  category: string;
  description: string;
  amount: number;
  customerOrVendor?: string;
  paymentMethod: 'Cash' | 'UPI' | 'Bank Transfer';
  isHandwrittenDigitized?: boolean;
}

export interface LoanAccount {
  id: string;
  loanName: string;
  bankName: string;
  sanctionedAmount: number;
  disbursedAmount: number;
  interestRate: number;
  tenureMonths: number;
  emiAmount: number;
  paidEmis: number;
  totalEmis: number;
  nextEmiDate: string;
  plannedPurpose: string;
  utilization: {
    category: string;
    allocated: number;
    spent: number;
  }[];
}

export interface BusinessHealth {
  score: number; // e.g. 78%
  status: 'Excellent' | 'Good' | 'Fair' | 'Needs Attention';
  salesGrowth: number;
  profitMargin: number;
  expenseControl: number;
  loanRepayment: number;
  businessActivityDays: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'warning' | 'info' | 'success' | 'opportunity';
  read: boolean;
  actionView?: ViewId;
}

export interface VoiceChatEntry {
  id: string;
  timestamp: string;
  durationSeconds: number;
  language: LanguageCode;
  transcription: string;
  understoodIntent: string;
  structuredData: Record<string, string | number>;
  assistantResponse: string;
  audioUrl?: string;
}

export interface BusinessIdea {
  id: string;
  title: string;
  category: string;
  demand: 'High' | 'Medium';
  demandPercentage: number;
  investmentNeeded: string;
  profitMargin: string;
  description: string;
  localResources: string[];
  govSupport: string;
  targetMarkets: string[];
  matchPercentage?: number;
  initialInvestment?: string;
  monthlyProfit?: string;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  eligibility: string[] | string;
  fundingAmount: string;
  interestRate?: string;
  subsidyRate?: string;
  applicationGuidance: string;
  linkUrl: string;
  officialPortalUrl?: string;
}
