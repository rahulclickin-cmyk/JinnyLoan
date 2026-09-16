import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  ChevronDown, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle,
  CreditCard,
  Building2,
  Home,
  UserCheck,
  Calculator,
  User
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  actions?: {
    label: string;
    actionType: 'navigate' | 'modal' | 'whatsapp';
    target?: string;
  }[];
}

interface AiChatbotProps {
  onNavigate?: (path: string) => void;
  onOpenApplyModal?: (loanType?: string) => void;
}

// High quality professional support executive avatar
const ADVISOR_AVATAR_URL = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80";

export const AiChatbot: React.FC<AiChatbotProps> = ({ onNavigate, onOpenApplyModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial welcome greeting
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: '🙏 **Namaste! I am Jinny**, your dedicated loan & financial support guide.\n\nI have complete information on all loans, credit cards, DSA agent partnerships, and 100+ partner banks on JinnyLoan. How can I assist you today?',
      timestamp: 'Just now',
      actions: [
        { label: 'Personal Loan (9.99%)', actionType: 'navigate', target: '/personal-loan' },
        { label: 'Best Credit Cards', actionType: 'navigate', target: '/credit-card' },
        { label: 'Business Loan (50L)', actionType: 'navigate', target: '/business-loan' },
        { label: 'Become Loan Agent', actionType: 'navigate', target: '/loan-agent' },
        { label: 'Home Loan @ 7.10%', actionType: 'navigate', target: '/home-loan' }
      ]
    }
  ]);

  // Quick suggestion chips
  const quickSuggestions = [
    'How are you?',
    'Personal loan interest rates?',
    'How does loan process work?',
    'Is JinnyLoan service free?',
    'Required documents for loan',
    'How to become DSA Loan Agent?',
    'Minimum CIBIL score needed?'
  ];

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  // EMI calculation helper
  const calculateEMI = (principal: number, ratePerAnnum: number, tenureYears: number) => {
    const monthlyRate = ratePerAnnum / (12 * 100);
    const months = tenureYears * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  // Knowledge & Response Generator
  const generateBotResponse = (userQuery: string): { text: string; actions?: Message['actions'] } => {
    const q = userQuery.toLowerCase().trim();

    // 1A. HOW ARE YOU / CASUAL WELL-BEING
    if (/(how are you|how r u|how do you do|how is it going|how're you|how are you doing|whats up|what's up|wassup|sup|kaise ho|kaisa hai|sab kaisa|kya haal)/i.test(q)) {
      return {
        text: 'I am doing wonderful, thank you for asking! 😊\n\nI am right here and ready to help you compare loan offers, calculate your monthly EMI, check eligibility, or guide you on becoming a loan partner.\n\nHow are you doing today? What loan or financial information can I assist you with?',
        actions: [
          { label: 'Check Personal Loan', actionType: 'navigate', target: '/personal-loan' },
          { label: 'Check Loan Offers', actionType: 'modal', target: 'Personal Loan' },
          { label: 'Chat on WhatsApp', actionType: 'whatsapp' }
        ]
      };
    }

    // 1B. GREETINGS & PLEASANTRIES (Hi, Hello, Hey, etc.)
    if (/^(hi|hello|hey|heya|hie|hiya|namaste|pranam|namaskar|salaam|good\s?(morning|afternoon|evening))/i.test(q)) {
      const timeGreeting = q.includes('morning') ? 'Good morning!' : q.includes('afternoon') ? 'Good afternoon!' : q.includes('evening') ? 'Good evening!' : 'Hello!';
      return {
        text: `${timeGreeting} 👋 It's great to connect with you! I am **Jinny**, your personal loan & finance guide at JinnyLoan.\n\nI can assist you immediately with:\n• **Instant Personal Loans** (up to ₹40 Lakhs from 9.99%)\n• **Low-Interest Home Loans** (starting at 7.10%)\n• **Collateral-Free Business Loans** (up to ₹50 Lakhs)\n• **Lifetime Free Credit Cards** with airport lounge access\n• **DSA Loan Agent Program** (earn up to 2.5% commission)\n\nWhat would you like to explore today?`,
        actions: [
          { label: 'Personal Loan (9.99%)', actionType: 'navigate', target: '/personal-loan' },
          { label: 'Apply for Loan Now', actionType: 'modal', target: 'Personal Loan' },
          { label: 'Become Loan Agent', actionType: 'navigate', target: '/loan-agent' }
        ]
      };
    }

    // 1C. WHO ARE YOU / ABOUT JINNY
    if (/(who are you|what is your name|who is jinny|what do you do|kya naam|tum kaun ho|who made you|are you real)/i.test(q)) {
      return {
        text: 'I am **Jinny**, the official digital support assistant at JinnyLoan! 🌟\n\nI am here to help borrowers across India find the most suitable loans with lowest interest rates, explain document requirements, calculate EMIs, and connect you directly with 100+ RBI-regulated bank partners without any middleman fees.\n\nFeel free to ask me any loan, credit card, or banking question!',
        actions: [
          { label: 'Explore Loan Products', actionType: 'navigate', target: '/personal-loan' },
          { label: 'Chat on WhatsApp', actionType: 'whatsapp' }
        ]
      };
    }

    // 1D. COURTESIES: THANK YOU / THANKS / APPRECIATION
    if (/(thank|thanks|thx|dhanyawad|shukriya|great job|awesome|well done|good job|helpful)/i.test(q)) {
      return {
        text: 'You are most welcome! 😊 It is always my pleasure to help you make informed financial decisions. If you have any further questions or wish to proceed with an application, I am right here for you.\n\nWishing you financial prosperity and a wonderful day ahead!',
        actions: [
          { label: 'Check Pre-Approved Deals', actionType: 'modal', target: 'Personal Loan' },
          { label: 'Talk to Advisor', actionType: 'whatsapp' }
        ]
      };
    }

    // 1E. OK / GOODBYE / EXIT
    if (/^(ok|okay|k|alright|fine|bye|goodbye|cya|see you|good night|tata|theek hai)/i.test(q)) {
      return {
        text: 'Glad I could help! If you ever need to compare interest rates, check your eligibility, or calculate EMIs, JinnyLoan is always available 24/7.\n\nTake care and have a fantastic day ahead! ✨',
        actions: [
          { label: 'Check Loan Rates', actionType: 'navigate', target: '/personal-loan' },
          { label: 'Apply for Loan', actionType: 'modal', target: 'Personal Loan' }
        ]
      };
    }

    // 1F. FORMAL: ADVANCE FEE / CHARGES / COMMISSION / FRAUD ADVISORY
    if (/(fee|charge|advance|commission|fraud|free|paisa lagega|registration fee|file charge)/i.test(q)) {
      return {
        text: '🛡️ **100% Free Service & Fraud Protection Guarantee:**\n\n• **Zero Advance Fees**: JinnyLoan **NEVER** charges any advance file processing fees, registration fees, or cash commissions from customers.\n• **Transparent Terms**: Any standard bank processing fees are deducted directly by the lending bank from the sanctioned loan amount, never collected in advance.\n• **Security**: If anyone claiming to represent JinnyLoan asks for cash or personal UPI transfers, please report it immediately to info@jinnyloan.com or +91 8006488006.',
        actions: [
          { label: 'Apply 100% Free', actionType: 'modal', target: 'Personal Loan' },
          { label: 'Report / WhatsApp', actionType: 'whatsapp' }
        ]
      };
    }

    // 1G. FORMAL: PROCEDURE / HOW TO APPLY / STEP-BY-STEP
    if (/(procedure|process|how to apply|steps|kaise apply|step by step|how it works|tarika)/i.test(q)) {
      return {
        text: '📋 **Simple 4-Step Loan Application Process on JinnyLoan:**\n\n1. **Submit Online Request**: Fill in your loan amount and basic contact details in under 2 minutes.\n2. **Bank Matching**: Our platform matches your profile with 100+ partner banks & NBFCs.\n3. **Digital KYC Verification**: Upload your PAN, Aadhaar, and income proof digitally.\n4. **Instant Sanction & Disbursal**: Receive your official sanction letter, and funds are credited directly to your bank account within 24 hours!',
        actions: [
          { label: 'Start Application Now', actionType: 'modal', target: 'Personal Loan' },
          { label: 'Check Loan Options', actionType: 'navigate', target: '/personal-loan' }
        ]
      };
    }

    // 1H. FORMAL: MINIMUM SALARY & ELIGIBILITY CRITERIA
    if (/(minimum salary|min salary|salary requirement|eligibility criteria|who can apply|patrata)/i.test(q)) {
      return {
        text: '🎯 **Eligibility Criteria for Instant Loans:**\n\n• **Age**: 21 to 58 years\n• **Salaried Applicants**: Minimum net monthly in-hand salary of **₹15,000** (₹20,000+ for Tier-1 banks like HDFC/ICICI)\n• **Self-Employed / Business**: Minimum 1 year business operation with regular bank inflow\n• **Citizenship**: Resident Indian with valid PAN & Aadhaar\n• **Credit Score**: 650+ preferred for best interest rates (special micro-loan programs available for lower scores)',
        actions: [
          { label: 'Check My Eligibility', actionType: 'modal', target: 'Personal Loan' },
          { label: 'Explore Personal Loans', actionType: 'navigate', target: '/personal-loan' }
        ]
      };
    }

    // 1I. FORMAL: CONNECT WITH HUMAN / SENIOR ADVISOR
    if (/(human|talk to person|talk to human|agent|manager|officer|talk to someone|call me|executive|real person|insan se baat)/i.test(q)) {
      return {
        text: '👨‍💼 **Connect with a Senior Loan Advisor:**\n\nOur financial advisors are ready to assist you personally:\n• **Direct Phone & WhatsApp**: **+91 8006488006**\n• **Support Email**: info@jinnyloan.com\n• **Working Hours**: Monday to Saturday, 9:00 AM – 7:00 PM\n\nYou can click below to chat directly with our advisor on WhatsApp right now!',
        actions: [
          { label: 'Chat on WhatsApp', actionType: 'whatsapp' },
          { label: 'Submit Callback Request', actionType: 'modal', target: 'Personal Loan' }
        ]
      };
    }

    // 1J. FORMAL: DISBURSAL TIME & SPEED
    if (/(how long|disbursal time|approval time|kitne din|kitne ghante|fast disbursal)/i.test(q)) {
      return {
        text: '⚡ **Fast Disbursal Timelines:**\n\n• **Instant Micro Loans (up to ₹50,000)**: Under 30 minutes with digital e-KYC!\n• **Personal Loans (up to ₹10 Lakhs)**: Disbursed within **24 hours** of document verification.\n• **Business Loans (up to ₹50 Lakhs)**: Approved in 48 to 72 hours.\n• **Home Loans**: 3 to 7 working days (subject to property legal valuation).',
        actions: [
          { label: 'Apply Instant Online', actionType: 'modal', target: 'Personal Loan' }
        ]
      };
    }

    // 2. PERSONAL LOAN INQUIRIES
    if (q.includes('personal loan') || q.includes('instant loan') || q.includes('salary loan') || q.includes('personal') || q.includes('persnal')) {
      return {
        text: '💰 **JinnyLoan Personal Loan Highlights:**\n\n• **Interest Rates**: Starting at **9.99% p.a.** (average 10.49%–14%)\n• **Loan Amount**: Up to **₹40 Lakhs** (Instant online approval up to ₹10 Lakhs in 24 hours)\n• **Tenure**: Flexible from 12 to 60 months (1 to 5 years)\n• **Zero Collateral**: 100% paperless digital sanction\n• **Lenders**: Compare offers from SBI, HDFC, ICICI, Poonawalla, mPokket, Moneyview, KreditBee, etc.\n\nWould you like to review all rates or apply directly?',
        actions: [
          { label: 'Explore Personal Loans', actionType: 'navigate', target: '/personal-loan' },
          { label: 'Apply Instant Online', actionType: 'modal', target: 'Personal Loan' },
          { label: 'WhatsApp Advisor', actionType: 'whatsapp' }
        ]
      };
    }

    // 3. HOME LOAN INQUIRIES
    if (q.includes('home loan') || q.includes('house loan') || q.includes('plot loan') || q.includes('home') || q.includes('makan')) {
      return {
        text: '🏠 **JinnyLoan Home Loans Highlights:**\n\n• **Interest Rate**: Starting as low as **7.10% p.a.**\n• **Max Amount**: Up to **₹5 Crores**\n• **Tenure**: Long repayment tenures up to **30 years**\n• **Zero Foreclosure Fees**: No penalty on prepayment for floating rate loans\n• **PMAY Subsidy Support**: Complete guidance for eligible first-time home buyers\n• **Partner Banks**: SBI, HDFC Bank, LIC HFL, ICICI Bank, Axis Bank, PNB Housing.\n\nClick below to explore home loan eligibility and options!',
        actions: [
          { label: 'Go to Home Loan Page', actionType: 'navigate', target: '/home-loan' },
          { label: 'Apply for Home Loan', actionType: 'modal', target: 'Home Loan' }
        ]
      };
    }

    // 4. BUSINESS LOAN INQUIRIES
    if (q.includes('business loan') || q.includes('business') || q.includes('msme') || q.includes('vyapar') || q.includes('working capital')) {
      return {
        text: '💼 **JinnyLoan Business Loans Highlights:**\n\n• **Loan Amount**: Up to **₹50 Lakhs**\n• **Zero Collateral**: No security or property mortgage required\n• **Express Sanction**: Approved in under 48 hours with digital underwriting\n• **Flexible Usage**: Machinery purchase, inventory expansion, working capital & vendor payments\n• **Eligibility**: Min. 1 year business vintage, GST returns & ITR.\n\nReady to scale your business with hassle-free capital?',
        actions: [
          { label: 'View Business Loans', actionType: 'navigate', target: '/business-loan' },
          { label: 'Instant Business Apply', actionType: 'modal', target: 'Business Loan' }
        ]
      };
    }

    // 5. CREDIT CARDS INQUIRIES
    if (q.includes('credit card') || q.includes('card') || q.includes('cashback') || q.includes('lounge')) {
      return {
        text: '💳 **JinnyLoan Credit Card Marketplace:**\n\n• **40+ Top Cards**: Curated from HDFC, SBI Card, ICICI, Axis Bank & AU Small Finance\n• **Lifetime Free**: Zero annual fee options with lifetime validity\n• **Rewards & Cashback**: Up to 5% unlimited cashback on Amazon, Flipkart, Swiggy, Zomato\n• **Travel Perks**: Complimentary domestic & international airport lounge visits\n• **Instant Approval**: Digital verification with fast card dispatch.',
        actions: [
          { label: 'Explore Credit Cards', actionType: 'navigate', target: '/credit-card' },
          { label: 'Apply for Card', actionType: 'modal', target: 'Credit Cards' }
        ]
      };
    }

    // 6. LOAN AGENT / DSA PARTNER PROGRAM
    if (q.includes('agent') || q.includes('dsa') || q.includes('partner') || q.includes('commission') || q.includes('franchise') || q.includes('earn')) {
      return {
        text: '🤝 **Become a JinnyLoan DSA / Partner:**\n\n• **Zero Investment**: 100% free registration & instant partner ID\n• **Industry-Leading Payouts**: Earn up to **2.5% commission** on personal loans & 1.5% on business loans\n• **100+ Lenders**: One-stop platform to process cases across top banks and NBFCs\n• **Real-Time Portal**: Track application status, approval, and weekly commission disbursements\n• **Dedicated Manager**: Complete training and branch backend assistance.',
        actions: [
          { label: 'Become Loan Agent', actionType: 'navigate', target: '/loan-agent' },
          { label: 'Register Free as Partner', actionType: 'modal', target: 'DSA Partner' }
        ]
      };
    }

    // 7. DOCUMENTS REQUIRED
    if (q.includes('document') || q.includes('kagaz') || q.includes('paper') || q.includes('proof') || q.includes('kyc')) {
      return {
        text: '📄 **Documents Required for Instant Digital Loans:**\n\n1. **Identity Proof**: PAN Card (Mandatory)\n2. **Address Proof**: Aadhaar Card (with mobile linked for fast e-KYC)\n3. **Income Proof (Salaried)**: Last 3 months salary slips\n4. **Banking**: Last 6 months bank account statements (via NetBanking or PDF)\n5. **Self-Employed / Business**: 1-2 years ITR + GST registration details\n\n*All verification is 100% digital with zero physical paperwork!*',
        actions: [
          { label: 'Start 100% Digital Apply', actionType: 'modal', target: 'Personal Loan' }
        ]
      };
    }

    // 8. CIBIL / CREDIT SCORE
    if (q.includes('cibil') || q.includes('credit score') || q.includes('score') || q.includes('kharab') || q.includes('kam cibil')) {
      return {
        text: '📊 **CIBIL Score Guidance on JinnyLoan:**\n\n• **750+ (Excellent)**: Eligible for lowest rates starting at 9.99% from tier-1 banks (HDFC, ICICI, SBI)\n• **650 to 749 (Good)**: Pre-approved offers from leading NBFCs like Poonawalla, Moneyview, KreditBee\n• **Below 650**: Can still get digital micro-loans from fintech partners like mPokket or FDPL\n• **Pro Tip**: Checking eligibility on JinnyLoan is a soft inquiry and does NOT hurt your CIBIL score!',
        actions: [
          { label: 'Check Instant Loan Offers', actionType: 'navigate', target: '/personal-loan' }
        ]
      };
    }

    // 9. EMI CALCULATION QUERY
    if (q.includes('emi') || q.includes('calculate') || q.includes('kist') || q.includes('5 lakh') || q.includes('10 lakh') || q.includes('1 lakh')) {
      const emi5L3Y = calculateEMI(500000, 10.5, 3);
      const emi10L5Y = calculateEMI(1000000, 10.5, 5);
      const emi1L1Y = calculateEMI(100000, 10.5, 1);

      return {
        text: `🧮 **Quick EMI Estimates (@ 10.5% p.a.):**\n\n• **₹1 Lakh for 1 Year**: ~₹${emi1L1Y.toLocaleString('en-IN')}/month\n• **₹5 Lakhs for 3 Years**: ~₹${emi5L3Y.toLocaleString('en-IN')}/month\n• **₹10 Lakhs for 5 Years**: ~₹${emi10L5Y.toLocaleString('en-IN')}/month\n\nYou can use our full interactive calculator on the homepage to customize loan amounts and tenure!`,
        actions: [
          { label: 'Open Apply Window', actionType: 'modal', target: 'Personal Loan' }
        ]
      };
    }

    // 10. OUR LENDING PARTNERS / BANKS
    if (q.includes('partner') || q.includes('bank') || q.includes('nbfc') || q.includes('poonawalla') || q.includes('mpokket') || q.includes('hero') || q.includes('moneyview')) {
      return {
        text: '🏛️ **Our Lending Partners:**\n\nJinnyLoan is partnered with India’s top **100+ RBI-regulated** banks and digital NBFCs:\n• **Top Banks**: HDFC Bank, ICICI Bank, SBI, Axis Bank, Kotak Mahindra\n• **Leading NBFCs**: Poonawalla Fincorp, Hero FINCORP, Tata Capital, L&T Finance, Bajaj Finserv\n• **Digital Fintechs**: mPokket, TrustPaisa, lendingplate, FDPL Finance, TezCredit, Cashvia, Branch, Moneyview, KreditBee, Fibe\n\nAll loans are disbursed directly by regulated financial institutions.',
        actions: [
          { label: 'Check All Loan Options', actionType: 'navigate', target: '/personal-loan' }
        ]
      };
    }

    // 11. CONTACT / SUPPORT / PHONE NUMBER
    if (q.includes('contact') || q.includes('number') || q.includes('phone') || q.includes('call') || q.includes('helpline') || q.includes('whatsapp') || q.includes('support')) {
      return {
        text: '📞 **JinnyLoan Official Helpdesk:**\n\n• **Helpline & WhatsApp**: +91 8006488006\n• **Email**: info@jinnyloan.com\n• **Support Hours**: Mon to Sat, 9:00 AM – 7:00 PM\n• **Branch Network**: Serving 500+ cities across India.\n\nYou can connect directly via WhatsApp anytime!',
        actions: [
          { label: 'Chat on WhatsApp', actionType: 'whatsapp' }
        ]
      };
    }

    // 12. HINDI / HINGLISH QUESTIONS
    if (q.includes('chahiye') || q.includes('kaise milega') || q.includes('kitna time') || q.includes('byaj') || q.includes('batao') || q.includes('paisa')) {
      return {
        text: '🙏 **जिन्नीलोन पर लोन पाना बहुत आसान है!**\n\n1. **पर्सनल लोन**: ₹10,000 से ₹40 लाख तक, ब्याज 9.99% से शुरू, 24 घंटे में बैंक खाते में।\n2. **डॉक्यूमेंट्स**: सिर्फ पैन कार्ड, आधार कार्ड और 3 महीने की सैलरी स्लिप / बैंक स्टेटमेंट।\n3. **ज़ीरो फ़ीस**: हमारी सर्विस बिल्कुल फ़्री है, कोई एजेंट कमीशन नहीं देना।\n\nआप कौन सा लोन अप्लाई करना चाहते हैं?',
        actions: [
          { label: 'Personal Loan देखें', actionType: 'navigate', target: '/personal-loan' },
          { label: 'Apply Now', actionType: 'modal', target: 'Personal Loan' },
          { label: 'WhatsApp पर बात करें', actionType: 'whatsapp' }
        ]
      };
    }

    // DEFAULT FALLBACK WITH HELPFUL GUIDANCE
    return {
      text: `I understand you are asking about: "${userQuery}".\n\nJinnyLoan helps you compare and apply for **Personal Loans (9.99%)**, **Home Loans (7.10%)**, **Business Loans (up to 50L)**, **Credit Cards**, and our **Loan Agent DSA Program** across 100+ RBI-regulated lenders.\n\nPlease select one of the options below or ask your specific question!`,
      actions: [
        { label: 'Personal Loans', actionType: 'navigate', target: '/personal-loan' },
        { label: 'Credit Cards', actionType: 'navigate', target: '/credit-card' },
        { label: 'Become Loan Agent', actionType: 'navigate', target: '/loan-agent' },
        { label: 'WhatsApp Support', actionType: 'whatsapp' }
      ]
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Natural support response delay
    setTimeout(() => {
      const botReply = generateBotResponse(text);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: botReply.actions
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleActionClick = (action: NonNullable<Message['actions']>[number]) => {
    if (action.actionType === 'navigate' && action.target) {
      if (onNavigate) {
        onNavigate(action.target);
      } else {
        window.location.href = action.target;
      }
      setIsMinimized(true);
    } else if (action.actionType === 'modal') {
      if (onOpenApplyModal) {
        onOpenApplyModal(action.target);
      }
      setIsMinimized(true);
    } else if (action.actionType === 'whatsapp') {
      window.open('https://wa.me/918006488006?text=Hi%20JinnyLoan,%20I%20want%20to%20know%20more%20about%20loans.', '_blank');
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: '🙏 Conversation restarted! How can I assist you with your loan, credit card, or DSA agent queries today?',
        timestamp: 'Just now',
        actions: [
          { label: 'Personal Loan (9.99%)', actionType: 'navigate', target: '/personal-loan' },
          { label: 'Best Credit Cards', actionType: 'navigate', target: '/credit-card' },
          { label: 'Become Loan Agent', actionType: 'navigate', target: '/loan-agent' }
        ]
      }
    ]);
  };

  // Helper to parse markdown bold/bullets
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, idx) => {
      const formattedLine = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');

      return (
        <p 
          key={idx} 
          className={`leading-relaxed ${line.startsWith('•') || line.startsWith('1.') ? 'ml-1 my-0.5' : 'my-1'}`}
          dangerouslySetInnerHTML={{ __html: formattedLine }} 
        />
      );
    });
  };

  return (
    <>
      {/* Floating Support Assistant Trigger Button (Bottom Right) */}
      <div className="fixed bottom-6 right-16 md:right-20 z-40 flex items-center">
        {!isOpen && (
          <button
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="group relative flex items-center gap-2 bg-gradient-to-r from-[#E81E76] via-[#d01566] to-[#1e40af] text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-xl shadow-pink-600/25 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/25"
            id="open-support-assistant-btn"
            aria-label="Hello Jinny - Loan Assistant"
          >
            {/* Real Human Support Advisor Photo Avatar */}
            <div className="relative">
              <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white/80 shadow-xs bg-slate-200">
                <img 
                  src={ADVISOR_AVATAR_URL}
                  alt="Jinny Support Advisor"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to user icon if network image fails
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              {hasUnread ? (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white animate-ping" />
              ) : (
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-1.5 ring-white" />
              )}
            </div>

            <div className="flex flex-col text-left leading-tight">
              <span className="text-[11px] font-black tracking-wide text-white flex items-center gap-1">
                Hello Jinny
              </span>
              <span className="text-[10px] text-pink-100 font-medium hidden sm:inline">Loan Assistant</span>
            </div>
          </button>
        )}
      </div>

      {/* Interactive Support Drawer */}
      {isOpen && (
        <div 
          className={`fixed bottom-4 right-3 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-[390px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden transition-all duration-300 ${
            isMinimized ? 'h-[64px]' : 'h-[550px] max-h-[85vh]'
          }`}
          id="jinny-assistant-window"
        >
          {/* Header with Human Avatar & Verified Status */}
          <div className="bg-gradient-to-r from-[#E81E76] via-[#cb1262] to-[#1e40af] px-4 py-3 text-white flex items-center justify-between shadow-xs select-none">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/70 shadow-xs bg-slate-200">
                  <img 
                    src={ADVISOR_AVATAR_URL}
                    alt="Jinny Advisor"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#E81E76]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm tracking-tight font-['Outfit',sans-serif]">Hello Jinny</span>
                  <span className="bg-emerald-500/30 text-emerald-200 text-[9px] font-bold px-1.5 py-0.2 rounded border border-emerald-400/40">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-white/80">Dedicated Financial & Loan Guide</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 hover:bg-white/15 rounded-lg text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Reset Conversation"
                aria-label="Reset Conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-white/15 rounded-lg text-white/80 hover:text-white transition-colors cursor-pointer"
                title={isMinimized ? 'Expand' : 'Minimize'}
                aria-label={isMinimized ? 'Expand' : 'Minimize'}
              >
                <ChevronDown className={`w-4 h-4 transform transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/15 rounded-lg text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Close"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          {!isMinimized && (
            <>
              <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#f8fafc] text-xs">
                
                {/* Security and Accuracy Notice */}
                <div className="p-2 bg-emerald-50 border border-emerald-200/60 rounded-xl flex items-start gap-2 text-[11px] text-emerald-900 leading-tight">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>All loan rates & information directly sourced from official RBI-regulated partner banks.</span>
                </div>

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 shadow-xs text-xs ${
                        msg.sender === 'user'
                          ? 'bg-[#1e40af] text-white rounded-br-xs'
                          : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                      }`}
                    >
                      {renderFormattedText(msg.text)}

                      {/* Action buttons embedded in message */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                          {msg.actions.map((act, aIdx) => (
                            <button
                              key={aIdx}
                              onClick={() => handleActionClick(act)}
                              className="bg-slate-50 hover:bg-pink-50 text-[#E81E76] hover:text-[#c2185b] border border-pink-200/80 font-bold px-2.5 py-1 rounded-lg text-[10px] transition-all flex items-center gap-1 active:scale-95 cursor-pointer shadow-2xs"
                            >
                              <span>{act.label}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-200">
                      <img src={ADVISOR_AVATAR_URL} alt="Advisor" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[#E81E76] rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-[#E81E76] rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-[#E81E76] rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestion Chips */}
              <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
                {quickSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(suggestion)}
                    className="whitespace-nowrap bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-medium px-2.5 py-1 rounded-full transition-colors flex-shrink-0 cursor-pointer"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              {/* Input Bar */}
              <div className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask about personal loans, credit cards, DSA..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:border-[#E81E76] focus:bg-white transition-all placeholder:text-slate-400"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim()}
                  className="w-9 h-9 rounded-xl bg-[#E81E76] hover:bg-[#c2185b] disabled:bg-slate-200 text-white flex items-center justify-center transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed flex-shrink-0 shadow-xs active:scale-95"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
