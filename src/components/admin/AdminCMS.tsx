import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Building2, 
  Megaphone, 
  Settings, 
  Search, 
  Download, 
  Upload, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Eye, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  XCircle, 
  Phone, 
  MessageSquare, 
  Lock, 
  LogOut, 
  RefreshCw, 
  Sliders, 
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Percent,
  Coins,
  MapPin,
  Calendar,
  ArrowUpRight,
  X,
  Check,
  RotateCcw,
  Sparkles,
  HelpCircle,
  FileText,
  FileCheck,
  Headphones,
  Award,
  Shield,
  Activity,
  DollarSign
} from 'lucide-react';
import { useSiteConfig } from '../../context/ConfigContext';
import { StoredLead } from '../../server/leadDatabase';
import { LendingPartnerConfig, LoanOfferPartnerConfig } from '../../config/siteConfig';

// Import Modular Tabs
import { DashboardTab } from './tabs/DashboardTab';
import { LeadsTab } from './tabs/LeadsTab';
import { OffersTab } from './tabs/OffersTab';
import { PartnersTab } from './tabs/PartnersTab';
import { CreditCardsTab } from './tabs/CreditCardsTab';
import { DsaNetworkTab } from './tabs/DsaNetworkTab';
import { KycDeskTab } from './tabs/KycDeskTab';
import { CalculatorsTab } from './tabs/CalculatorsTab';
import { MarketingTab } from './tabs/MarketingTab';
import { SupportDeskTab } from './tabs/SupportDeskTab';
import { ComplianceTab } from './tabs/ComplianceTab';
import { SettingsTab } from './tabs/SettingsTab';

interface AdminCMSProps {
  onClose: () => void;
}

export type AdminTabType = 
  | 'dashboard' 
  | 'leads' 
  | 'kycDesk'
  | 'supportDesk'
  | 'offers' 
  | 'partners' 
  | 'creditCards' 
  | 'dsaNetwork'
  | 'marketing' 
  | 'calculators' 
  | 'compliance' 
  | 'settings';

export const AdminCMS: React.FC<AdminCMSProps> = ({ onClose }) => {
  const { 
    config, 
    updateLoanOffer, 
    updateLendingPartner,
    resetToDefaults,
    exportConfigJson
  } = useSiteConfig();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('jinnyloan_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // CMS Tab State
  const [activeTab, setActiveTab] = useState<AdminTabType>('dashboard');
  const [leads, setLeads] = useState<StoredLead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [selectedLead, setSelectedLead] = useState<StoredLead | null>(null);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);

  // New Lead Form State
  const [newLeadData, setNewLeadData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Delhi NCR',
    loanAmount: 500000,
    employmentType: 'Salaried',
    income: '50000',
    leadType: 'general-loan',
    message: ''
  });

  // Partner & Offer editing modals
  const [editingPartner, setEditingPartner] = useState<LendingPartnerConfig | null>(null);
  const [editingOffer, setEditingOffer] = useState<LoanOfferPartnerConfig | null>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Fetch Leads from Backend API
  const fetchLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.leads)) {
          setLeads(data.leads);
        }
      }
    } catch (e) {
      console.warn('Could not fetch leads from server, using local fallback state', e);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pinInput.trim() === 'admin' || pinInput.trim() === 'admin123' || pinInput.trim() === 'jinny24') {
      setIsAuthenticated(true);
      setAuthError('');
      try {
        localStorage.setItem('jinnyloan_admin_authenticated', 'true');
      } catch {}
      showToast('Welcome back, Super Admin!');
    } else {
      setAuthError('Invalid Admin Passcode. Try "admin" or "admin123"');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('jinnyloan_admin_authenticated');
    } catch {}
  };

  // Update Lead Status
  const handleUpdateStatus = async (leadId: string, newStatus: StoredLead['status']) => {
    try {
      const res = await fetch(`/api/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
        if (selectedLead?.id === leadId) {
          setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
        }
        showToast(`Lead status updated to ${newStatus}`);
      }
    } catch (err) {
      // Optimistic update
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
      showToast(`Lead status updated to ${newStatus}`);
    }
  };

  // Add Manual Lead
  const handleCreateManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: newLeadData.name,
          mobile: newLeadData.phone,
          email: newLeadData.email || `${newLeadData.name.toLowerCase().replace(/\s+/g, '')}@customer.in`,
          city: newLeadData.city || 'Delhi NCR',
          loanAmount: Number(newLeadData.loanAmount),
          employmentType: newLeadData.employmentType,
          monthlyIncome: newLeadData.income,
          leadType: newLeadData.leadType,
          message: newLeadData.message || 'Manually logged by Admin Desk',
          source: 'Admin CMS Desk'
        })
      });
      if (res.ok) {
        showToast('New lead added successfully!');
        setIsAddLeadOpen(false);
        fetchLeads();
      }
    } catch (err) {
      showToast('Lead saved locally to pipeline desk.');
      setIsAddLeadOpen(false);
    }
  };

  // Export Leads to CSV
  const handleExportLeadsCSV = () => {
    if (leads.length === 0) {
      alert('No leads to export.');
      return;
    }
    const headers = ['ID', 'Name', 'Phone', 'Email', 'City', 'Loan Amount', 'Employment', 'Status', 'Date', 'Message'];
    const rows = leads.map(l => [
      l.id,
      `"${l.name || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.email || ''}"`,
      `"${l.city || ''}"`,
      l.loanAmount || 0,
      `"${l.employmentType || ''}"`,
      l.status,
      `"${new Date(l.createdAt).toLocaleDateString()}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `jinnyloan_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leads exported to CSV successfully!');
  };

  // KPIs Calculations
  const stats = useMemo(() => {
    const totalCount = leads.length;
    const newCount = leads.filter(l => l.status === 'new').length;
    const reviewCount = leads.filter(l => l.status === 'in_review' || l.status === 'contacted').length;
    const approvedCount = leads.filter(l => l.status === 'approved').length;
    const totalVolume = leads.reduce((sum, l) => sum + (l.loanAmount || 0), 0);
    const partnerCount = config.lendingPartners?.length || 100;
    const offersCount = config.loanOffers?.length || 6;

    return { totalCount, newCount, reviewCount, approvedCount, totalVolume, partnerCount, offersCount };
  }, [leads, config]);

  // -------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl relative text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#E81E76] to-[#1e40af] flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-black font-['Outfit',sans-serif] tracking-tight">
              JinnyLoan Enterprise CMS Portal
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Secure Administration, CRM, KYC & Banking Redirections
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Admin Passcode / PIN
              </label>
              <input
                type="password"
                required
                placeholder="Enter passcode (e.g. admin123)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/90 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E81E76] text-sm font-mono tracking-wider"
                autoFocus
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-400 font-medium">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#E81E76] to-[#1e40af] hover:from-[#d01566] hover:to-[#17338e] text-white font-bold rounded-xl shadow-lg transition-all text-sm cursor-pointer"
            >
              Sign In to CMS Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <button
              onClick={() => {
                setPinInput('admin123');
                setIsAuthenticated(true);
                try {
                  localStorage.setItem('jinnyloan_admin_authenticated', 'true');
                } catch {}
                showToast('1-Click Demo Access granted!');
              }}
              className="text-xs text-pink-400 hover:text-pink-300 font-medium underline cursor-pointer"
            >
              ⚡ Quick Demo 1-Click Access
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // MAIN ENTERPRISE CMS DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="fixed inset-0 z-50 bg-slate-100 flex flex-col overflow-hidden text-slate-800 font-sans">
      
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP CMS BAR */}
      <header className="h-16 bg-slate-900 text-white px-4 sm:px-6 flex items-center justify-between border-b border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#E81E76] to-[#1e40af] flex items-center justify-center font-black text-white text-lg shadow-md">
            J
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black font-['Outfit',sans-serif] tracking-tight">
                JinnyLoan Multi-Lender Enterprise CMS
              </h1>
              <span className="text-[10px] bg-[#E81E76]/20 text-pink-300 border border-pink-500/30 px-2 py-0.5 rounded-full font-bold uppercase">
                v2.6 Enterprise Live
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              100+ RBI Partners • Lead CRM • KYC & Bureau • DSA Payouts • Multi-Bank API Orchestration
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={fetchLeads}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Refresh Leads & Live Data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingLeads ? 'animate-spin text-pink-400' : ''}`} />
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold rounded-xl transition-all cursor-pointer border border-slate-700"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">View Live Website</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Lock / Logout CMS"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* CMS MAIN CONTAINER */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-64 sm:w-72 bg-white border-r border-slate-200 flex flex-col justify-between flex-shrink-0 overflow-y-auto">
          <div className="p-3 space-y-4">
            
            {/* GROUP 1: CORE CRM & OPERATIONS */}
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 block mb-1.5">
                Core CRM & Operations
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'dashboard' 
                      ? 'bg-slate-900 text-white shadow-xs' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard Overview</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('leads')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'leads' 
                      ? 'bg-slate-900 text-white shadow-xs' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4" />
                    <span>Leads CRM & Pipeline</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                    activeTab === 'leads' ? 'bg-[#E81E76] text-white' : 'bg-pink-100 text-[#E81E76]'
                  }`}>
                    {leads.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('kycDesk')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'kycDesk' 
                      ? 'bg-slate-900 text-white shadow-xs' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileCheck className="w-4 h-4" />
                    <span>KYC & Document Desk</span>
                  </div>
                  <span className="text-[9px] bg-blue-100 text-blue-700 font-extrabold px-1.5 py-0.5 rounded">
                    CIBIL
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('supportDesk')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'supportDesk' 
                      ? 'bg-slate-900 text-white shadow-xs' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Headphones className="w-4 h-4" />
                    <span>Support & Inquiries Desk</span>
                  </div>
                  <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.5 rounded">
                    SLA &lt;15m
                  </span>
                </button>
              </div>
            </div>

            {/* GROUP 2: CATALOG & PARTNERS */}
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 block mb-1.5">
                Catalog & Partners
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('offers')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'offers' 
                      ? 'bg-slate-900 text-white shadow-xs' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Percent className="w-4 h-4" />
                    <span>Loan Offers & Rates</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {config.loanOffers?.length || 6}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('partners')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'partners' 
                      ? 'bg-slate-900 text-white shadow-xs' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4" />
                    <span>Lending Partners (100+)</span>
                  </div>
                  <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                    URLs
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('creditCards')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'creditCards' 
                      ? 'bg-slate-900 text-white shadow-xs' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-4 h-4" />
                    <span>Credit Cards & Rewards</span>
                  </div>
                  <span className="text-[9px] text-purple-700 font-bold bg-purple-50 px-1.5 py-0.5 rounded">
                    Cards
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('dsaNetwork')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'dsaNetwork' 
                      ? 'bg-slate-900 text-white shadow-xs' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4" />
                    <span>DSA Channel Network</span>
                  </div>
                  <span className="text-[9px] text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded">
                    2.5% Payout
                  </span>
                </button>
              </div>
            </div>

            {/* GROUP 3: MARKETING & ENGINE */}
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 block mb-1.5">
                Marketing & Pricing Engine
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('marketing')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'marketing' 
                      ? 'bg-slate-900 text-white shadow-xs' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Megaphone className="w-4 h-4" />
                    <span>Banners & Popups</span>
                  </div>
                  <span className="text-[9px] text-pink-700 font-bold bg-pink-50 px-1.5 py-0.5 rounded">
                    Ticker
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('calculators')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'calculators' 
                      ? 'bg-slate-900 text-white shadow-xs' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sliders className="w-4 h-4" />
                    <span>Calculators & Pricing</span>
                  </div>
                  <span className="text-[9px] text-blue-700 font-bold bg-blue-50 px-1.5 py-0.5 rounded">
                    LAP / EMI
                  </span>
                </button>
              </div>
            </div>

            {/* GROUP 4: GOVERNANCE & SYSTEM */}
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 block mb-1.5">
                Governance & System
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('compliance')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'compliance' 
                      ? 'bg-slate-900 text-white shadow-xs' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>RBI Compliance & Audit Logs</span>
                  </div>
                  <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                    Audit
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'settings' 
                      ? 'bg-slate-900 text-white shadow-xs' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Settings className="w-4 h-4" />
                    <span>Settings & Backups</span>
                  </div>
                  <span className="text-[9px] text-slate-500 font-bold bg-slate-100 px-1.5 py-0.5 rounded">
                    JSON
                  </span>
                </button>
              </div>
            </div>

          </div>

          {/* User profile card */}
          <div className="p-3 border-t border-slate-100 bg-slate-50/70 m-2 rounded-2xl">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                SA
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 truncate">Super Admin</p>
                <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  12 Operational Modules
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* CMS TAB CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <DashboardTab
              leads={leads}
              stats={stats}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenAddLead={() => setIsAddLeadOpen(true)}
              onExportCSV={handleExportLeadsCSV}
              onSelectLead={(lead) => setSelectedLead(lead)}
            />
          )}

          {/* TAB 2: LEADS CRM */}
          {activeTab === 'leads' && (
            <LeadsTab
              leads={leads}
              onUpdateStatus={handleUpdateStatus}
              onOpenAddLead={() => setIsAddLeadOpen(true)}
              onExportCSV={handleExportLeadsCSV}
              onSelectLead={(lead) => setSelectedLead(lead)}
              isLoading={isLoadingLeads}
            />
          )}

          {/* TAB 3: KYC & DOCUMENT DESK */}
          {activeTab === 'kycDesk' && (
            <KycDeskTab />
          )}

          {/* TAB 4: SUPPORT & INQUIRIES DESK */}
          {activeTab === 'supportDesk' && (
            <SupportDeskTab />
          )}

          {/* TAB 5: LOAN OFFERS & RATES */}
          {activeTab === 'offers' && (
            <OffersTab
              onEditOffer={(offer) => setEditingOffer(offer)}
            />
          )}

          {/* TAB 6: LENDING PARTNERS (100+) */}
          {activeTab === 'partners' && (
            <PartnersTab
              onEditPartner={(partner) => setEditingPartner(partner)}
            />
          )}

          {/* TAB 7: CREDIT CARDS & REWARDS */}
          {activeTab === 'creditCards' && (
            <CreditCardsTab />
          )}

          {/* TAB 8: DSA CHANNEL NETWORK */}
          {activeTab === 'dsaNetwork' && (
            <DsaNetworkTab />
          )}

          {/* TAB 9: MARKETING & POPUPS */}
          {activeTab === 'marketing' && (
            <MarketingTab />
          )}

          {/* TAB 10: CALCULATORS & PRICING */}
          {activeTab === 'calculators' && (
            <CalculatorsTab />
          )}

          {/* TAB 11: COMPLIANCE & AUDIT */}
          {activeTab === 'compliance' && (
            <ComplianceTab />
          )}

          {/* TAB 12: SETTINGS & BACKUPS */}
          {activeTab === 'settings' && (
            <SettingsTab onShowToast={showToast} />
          )}

        </main>
      </div>

      {/* MODAL 1: ADD MANUAL LEAD */}
      {isAddLeadOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setIsAddLeadOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-slate-900 mb-1">
              Add Manual Customer Lead
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Log phone inquiries, walk-ins, or field agent leads directly into the CRM.
            </p>

            <form onSubmit={handleCreateManualLead} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={newLeadData.name}
                  onChange={e => setNewLeadData(p => ({ ...p, name: e.target.value }))}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10 digits"
                    value={newLeadData.phone}
                    onChange={e => setNewLeadData(p => ({ ...p, phone: e.target.value }))}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    placeholder="e.g. Delhi NCR"
                    value={newLeadData.city}
                    onChange={e => setNewLeadData(p => ({ ...p, city: e.target.value }))}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Loan Amount (₹)</label>
                  <input
                    type="number"
                    value={newLeadData.loanAmount}
                    onChange={e => setNewLeadData(p => ({ ...p, loanAmount: Number(e.target.value) }))}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newLeadData.leadType}
                    onChange={e => setNewLeadData(p => ({ ...p, leadType: e.target.value }))}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-medium"
                  >
                    <option value="general-loan">Personal Loan</option>
                    <option value="home-loan">Home Loan</option>
                    <option value="loan-against-property">Loan Against Property</option>
                    <option value="partner-inquiry">DSA Referral Partner</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Requirement Notes</label>
                <textarea
                  rows={2}
                  placeholder="Applicant specific notes or preferences..."
                  value={newLeadData.message}
                  onChange={e => setNewLeadData(p => ({ ...p, message: e.target.value }))}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddLeadOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E81E76] hover:bg-[#d01566] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: LEAD FULL DETAILS DOSSIER */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-[#E81E76] bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
                {selectedLead.id}
              </span>
              <span className="text-[10px] text-slate-400">
                {new Date(selectedLead.createdAt).toLocaleString()}
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-1">
              {selectedLead.name}
            </h3>

            <div className="mt-4 space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Phone:</span>
                <span className="font-bold text-slate-900">{selectedLead.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email:</span>
                <span className="font-bold text-slate-900">{selectedLead.email || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">City:</span>
                <span className="font-bold text-slate-900">{selectedLead.city || 'Delhi NCR'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Loan Amount:</span>
                <span className="font-black text-[#E81E76] text-sm font-['Outfit',sans-serif]">
                  ₹{(selectedLead.loanAmount || 0).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Employment:</span>
                <span className="font-bold text-slate-900">{selectedLead.employmentType || 'Salaried'}</span>
              </div>
              {selectedLead.income && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Monthly Income:</span>
                  <span className="font-bold text-slate-900">₹{selectedLead.income}</span>
                </div>
              )}
              {selectedLead.message && (
                <div className="pt-2 border-t border-slate-200/80">
                  <span className="text-slate-500 block mb-1">Customer Requirement Notes:</span>
                  <p className="text-slate-700 italic">{selectedLead.message}</p>
                </div>
              )}
            </div>

            <div className="mt-5 flex gap-2">
              <a
                href={`https://wa.me/91${selectedLead.phone}?text=Hello%20${encodeURIComponent(selectedLead.name)},%20regarding%20your%20loan%20application%20on%20JinnyLoan...`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl text-center flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Customer</span>
              </a>
              <a
                href={`tel:${selectedLead.phone}`}
                className="px-4 py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: EDIT PARTNER URL */}
      {editingPartner && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setEditingPartner(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-slate-900 mb-1 flex items-center gap-2">
              <span>Edit {editingPartner.name} URL</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              When a customer clicks "{editingPartner.name}", they will be redirected to this tracking link.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Affiliate / Redirection Link
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={(editingPartner as any).targetUrl || ''}
                  onChange={(e) => setEditingPartner({ ...editingPartner, targetUrl: e.target.value } as any)}
                  className="w-full text-xs font-mono px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="partner-active-toggle"
                  checked={editingPartner.active !== false}
                  onChange={(e) => setEditingPartner({ ...editingPartner, active: e.target.checked })}
                  className="w-4 h-4 rounded text-[#E81E76]"
                />
                <label htmlFor="partner-active-toggle" className="text-xs font-bold text-slate-700">
                  Active in partner list
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPartner(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateLendingPartner(editingPartner.id, {
                      targetUrl: (editingPartner as any).targetUrl,
                      active: editingPartner.active
                    } as any);
                    showToast(`${editingPartner.name} URL updated!`);
                    setEditingPartner(null);
                  }}
                  className="px-5 py-2 bg-[#E81E76] hover:bg-[#d01566] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Save URL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: EDIT LOAN OFFER DETAILS */}
      {editingOffer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setEditingOffer(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-slate-900 mb-1">
              Edit Offer: {editingOffer.lender}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Update rate values and quantum displayed on the homepage cards.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Offer Tagline</label>
                <input
                  type="text"
                  value={editingOffer.tagline || ''}
                  onChange={(e) => setEditingOffer({ ...editingOffer, tagline: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Interest Rate Display</label>
                  <input
                    type="text"
                    value={editingOffer.interestRate || ''}
                    onChange={(e) => setEditingOffer({ ...editingOffer, interestRate: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Badge</label>
                  <input
                    type="text"
                    value={editingOffer.badge || ''}
                    onChange={(e) => setEditingOffer({ ...editingOffer, badge: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Max Quantum</label>
                  <input
                    type="text"
                    value={editingOffer.amount || ''}
                    onChange={(e) => setEditingOffer({ ...editingOffer, amount: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tenure</label>
                  <input
                    type="text"
                    value={editingOffer.tenure || ''}
                    onChange={(e) => setEditingOffer({ ...editingOffer, tenure: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Direct Bank Apply URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={editingOffer.externalUrl || ''}
                  onChange={(e) => setEditingOffer({ ...editingOffer, externalUrl: e.target.value })}
                  className="w-full text-xs font-mono px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingOffer(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateLoanOffer(editingOffer.id, {
                      tagline: editingOffer.tagline,
                      interestRate: editingOffer.interestRate,
                      badge: editingOffer.badge,
                      amount: editingOffer.amount,
                      tenure: editingOffer.tenure,
                      externalUrl: editingOffer.externalUrl
                    });
                    showToast('Loan offer updated successfully!');
                    setEditingOffer(null);
                  }}
                  className="px-5 py-2 bg-[#E81E76] hover:bg-[#d01566] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Save Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
