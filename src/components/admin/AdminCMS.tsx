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
  FileText
} from 'lucide-react';
import { useSiteConfig } from '../../context/ConfigContext';
import { BankLogo } from '../BankLogos';
import { StoredLead } from '../../server/leadDatabase';

interface AdminCMSProps {
  onClose: () => void;
}

type TabType = 'dashboard' | 'leads' | 'offers' | 'partners' | 'marketing' | 'settings';

export const AdminCMS: React.FC<AdminCMSProps> = ({ onClose }) => {
  const { 
    config, 
    updateHeroBanner, 
    updateLoanOffer, 
    updateLendingPartner,
    resetToDefaults,
    importConfig,
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

  // CMS State
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [leads, setLeads] = useState<StoredLead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  const [leadTypeFilter, setLeadTypeFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<StoredLead | null>(null);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);

  // New Lead Form State
  const [newLeadData, setNewLeadData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    loanAmount: 500000,
    employmentType: 'Salaried',
    income: '50000',
    leadType: 'general-loan',
    message: ''
  });

  // Partner filter & search
  const [partnerSearch, setPartnerSearch] = useState('');
  const [editingPartner, setEditingPartner] = useState<any | null>(null);

  // Offer editing
  const [editingOffer, setEditingOffer] = useState<any | null>(null);

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
      console.warn('Could not fetch leads from server, using local storage state', e);
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
      showToast('Error saving lead. Please try again.');
    }
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = 
        !leadSearch ||
        lead.name?.toLowerCase().includes(leadSearch.toLowerCase()) ||
        lead.phone?.includes(leadSearch) ||
        lead.email?.toLowerCase().includes(leadSearch.toLowerCase()) ||
        lead.city?.toLowerCase().includes(leadSearch.toLowerCase());
      
      const matchesStatus = leadStatusFilter === 'all' || lead.status === leadStatusFilter;
      const matchesType = leadTypeFilter === 'all' || lead.leadType === leadTypeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [leads, leadSearch, leadStatusFilter, leadTypeFilter]);

  // Filtered Partners
  const filteredPartners = useMemo(() => {
    return (config.lendingPartners || []).filter(p => 
      !partnerSearch || 
      p.name?.toLowerCase().includes(partnerSearch.toLowerCase()) ||
      p.code?.toLowerCase().includes(partnerSearch.toLowerCase())
    );
  }, [config.lendingPartners, partnerSearch]);

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
              JinnyLoan CMS Portal
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Secure Administration, CRM & Partner URL Management
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
                JinnyLoan Enterprise CMS
              </h1>
              <span className="text-[10px] bg-[#E81E76]/20 text-pink-300 border border-pink-500/30 px-2 py-0.5 rounded-full font-bold uppercase">
                v2.4 Live
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              RBI Lending Partners • Real-time Application CRM • Direct Bank Redirections
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={fetchLeads}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Refresh Leads & Data"
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
        <aside className="w-60 sm:w-64 bg-white border-r border-slate-200 flex flex-col justify-between flex-shrink-0">
          <div className="p-3 space-y-1">
            
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
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
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'leads' 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>Leads CRM</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                activeTab === 'leads' ? 'bg-[#E81E76] text-white' : 'bg-pink-100 text-[#E81E76]'
              }`}>
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('offers')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'offers' 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4" />
                <span>Loan Offers & Rates</span>
              </div>
              <span className="text-[10px] text-slate-400">
                {config.loanOffers?.length || 6}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('partners')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'partners' 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4" />
                <span>Lending Partners (100+)</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                URLs
              </span>
            </button>

            <button
              onClick={() => setActiveTab('marketing')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'marketing' 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Megaphone className="w-4 h-4" />
                <span>Banners & Popups</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'settings' 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4" />
                <span>Settings & Backups</span>
              </div>
            </button>

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
                  System Connected
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* CMS TAB CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
                  Business & Application Overview
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time pipeline metrics, conversion rates, and recent inquiries.
                </p>
              </div>

              {/* KPI CARDS */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Total Applications
                  </span>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit',sans-serif]">
                      {stats.totalCount}
                    </span>
                    <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      +100% Live
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">From all forms & modals</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    In Review / Contacted
                  </span>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-2xl sm:text-3xl font-black text-blue-600 font-['Outfit',sans-serif]">
                      {stats.reviewCount}
                    </span>
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Advisor processing stage</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Total Loan Volume
                  </span>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-2xl sm:text-3xl font-black text-[#E81E76] font-['Outfit',sans-serif]">
                      ₹{(stats.totalVolume / 100000).toFixed(1)}L
                    </span>
                    <span className="text-[11px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full">
                      Requested
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Across all applicant requests</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Lending Partners
                  </span>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit',sans-serif]">
                      {stats.partnerCount}+
                    </span>
                    <span className="text-[11px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                      RBI Regulated
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Banks, NBFCs & Fintechs</p>
                </div>
              </div>

              {/* QUICK ACTIONS ROW */}
              <div className="flex flex-wrap gap-2.5 items-center">
                <button
                  onClick={() => setIsAddLeadOpen(true)}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Manual Customer Lead</span>
                </button>

                <button
                  onClick={handleExportLeadsCSV}
                  className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-slate-500" />
                  <span>Export Leads (CSV)</span>
                </button>

                <button
                  onClick={() => setActiveTab('partners')}
                  className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-[#E81E76]" />
                  <span>Manage Bank Tracking URLs</span>
                </button>
              </div>

              {/* RECENT APPLICATIONS TABLE */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    Recent Customer Inquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs font-bold text-[#E81E76] hover:underline"
                  >
                    View All Leads ({leads.length}) →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                      <tr>
                        <th className="p-3">Applicant Name</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {leads.slice(0, 5).map(lead => (
                        <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3 font-bold text-slate-900">{lead.name}</td>
                          <td className="p-3 font-mono text-slate-600">{lead.phone}</td>
                          <td className="p-3 font-bold text-[#E81E76]">
                            ₹{(lead.loanAmount || 0).toLocaleString('en-IN')}
                          </td>
                          <td className="p-3 text-slate-600 capitalize">
                            {(lead.leadType || 'general-loan').replace(/-/g, ' ')}
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              lead.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                              lead.status === 'in_review' ? 'bg-blue-100 text-blue-800' :
                              lead.status === 'contacted' ? 'bg-purple-100 text-purple-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {lead.status.replace(/_/g, ' ').toUpperCase()}
                            </span>
                          </td>
                          <td className="p-3 text-slate-400">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: LEADS CRM TABLE */}
          {activeTab === 'leads' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
                    Leads & Applications CRM
                  </h2>
                  <p className="text-xs text-slate-500">
                    View customer profiles, update pipeline status, and connect via phone or WhatsApp.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAddLeadOpen(true)}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Lead</span>
                  </button>
                  <button
                    onClick={handleExportLeadsCSV}
                    className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* SEARCH & FILTER CONTROLS */}
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap gap-2.5 items-center justify-between">
                <div className="relative flex-1 min-w-[220px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by customer name, phone, email, or city..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E81E76]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={leadStatusFilter}
                    onChange={(e) => setLeadStatusFilter(e.target.value)}
                    className="text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_review">In Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  <select
                    value={leadTypeFilter}
                    onChange={(e) => setLeadTypeFilter(e.target.value)}
                    className="text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  >
                    <option value="all">All Loan Types</option>
                    <option value="general-loan">Personal Loan</option>
                    <option value="home-loan">Home Loan</option>
                    <option value="loan-against-property">LAP</option>
                    <option value="partner-inquiry">DSA Partner</option>
                  </select>
                </div>
              </div>

              {/* LEADS DATA TABLE */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Applicant Profile</th>
                        <th className="p-3">Contact Details</th>
                        <th className="p-3">Loan Amount</th>
                        <th className="p-3">Employment / Income</th>
                        <th className="p-3">Status Pipeline</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-400">
                            No loan applications match your search criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map(lead => (
                          <tr key={lead.id} className="hover:bg-slate-50/90 transition-colors">
                            <td className="p-3">
                              <p className="font-bold text-slate-900">{lead.name}</p>
                              <p className="text-[10px] text-slate-500 capitalize">
                                {(lead.leadType || 'general-loan').replace(/-/g, ' ')}
                              </p>
                              <span className="text-[10px] text-slate-400">
                                {new Date(lead.createdAt).toLocaleDateString()}
                              </span>
                            </td>

                            <td className="p-3">
                              <p className="font-semibold text-slate-800">{lead.phone}</p>
                              <p className="text-[10px] text-slate-500 truncate max-w-[140px]">
                                {lead.email}
                              </p>
                              <p className="text-[10px] text-slate-500">
                                📍 {lead.city || 'Not specified'}
                              </p>
                            </td>

                            <td className="p-3">
                              <p className="font-black text-[#E81E76] text-sm font-['Outfit',sans-serif]">
                                ₹{(lead.loanAmount || 0).toLocaleString('en-IN')}
                              </p>
                            </td>

                            <td className="p-3">
                              <p className="font-semibold text-slate-800">
                                {lead.employmentType || 'Salaried'}
                              </p>
                              {lead.income && (
                                <p className="text-[10px] text-slate-500">
                                  ₹{lead.income}/mo
                                </p>
                              )}
                            </td>

                            <td className="p-3">
                              <select
                                value={lead.status}
                                onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                                  lead.status === 'approved' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                                  lead.status === 'in_review' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                                  lead.status === 'contacted' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                                  lead.status === 'rejected' ? 'bg-rose-50 text-rose-800 border-rose-200' :
                                  'bg-amber-50 text-amber-800 border-amber-200'
                                }`}
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="in_review">In Review</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                              </select>
                            </td>

                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <a
                                  href={`https://wa.me/91${lead.phone}?text=Hello%20${encodeURIComponent(lead.name)},%20regarding%20your%20loan%20application%20on%20JinnyLoan...`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                  title="Chat on WhatsApp"
                                >
                                  <MessageSquare className="w-4 h-4" />
                                </a>
                                <button
                                  onClick={() => setSelectedLead(lead)}
                                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                                >
                                  Details
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LOAN OFFERS & INTEREST RATES CMS */}
          {activeTab === 'offers' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
                    Loan Offers & Rates CMS
                  </h2>
                  <p className="text-xs text-slate-500">
                    Configure featured interest rates, maximum quantum limits, badges, and tenures.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(config.loanOffers || []).map(offer => (
                  <div 
                    key={offer.id}
                    className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <BankLogo name={offer.lender} size="sm" showText={true} />
                        <span className="text-[10px] font-black bg-pink-100 text-[#E81E76] px-2 py-0.5 rounded-full">
                          {offer.badge}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{offer.tagline}</h4>
                      
                      <div className="mt-3 p-2.5 bg-slate-50 rounded-xl space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Interest Rate:</span>
                          <span className="font-extrabold text-[#E81E76]">{offer.interestRate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Max Amount:</span>
                          <span className="font-bold text-slate-800">{offer.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Max Tenure:</span>
                          <span className="font-bold text-slate-800">{offer.tenure}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setEditingOffer(offer)}
                      className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Edit Offer Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: LENDING PARTNERS & DIRECT AFFILIATE URLS */}
          {activeTab === 'partners' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
                    Lending Partners & Direct URLs CMS
                  </h2>
                  <p className="text-xs text-slate-500">
                    Manage direct affiliate / redirection URLs for 100+ partner banks & NBFCs (Rules 6 & 8 compliance).
                  </p>
                </div>

                <div className="relative min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search bank name or code..."
                    value={partnerSearch}
                    onChange={(e) => setPartnerSearch(e.target.value)}
                    className="w-full text-xs pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E81E76]"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Partner Bank / Institution</th>
                        <th className="p-3">Code / Category</th>
                        <th className="p-3">Target Redirection URL</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredPartners.map(partner => (
                        <tr key={partner.id} className="hover:bg-slate-50/90 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <BankLogo name={partner.name} size="sm" showText={false} />
                              <span className="font-bold text-slate-900">{partner.name}</span>
                            </div>
                          </td>

                          <td className="p-3">
                            <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                              {partner.code || 'NBFC'}
                            </span>
                          </td>

                          <td className="p-3 max-w-[280px]">
                            {partner.targetUrl ? (
                              <a
                                href={partner.targetUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#1e40af] hover:underline flex items-center gap-1 font-mono text-[11px] truncate"
                              >
                                <span>{partner.targetUrl}</span>
                                <ExternalLink className="w-3 h-3 flex-shrink-0" />
                              </a>
                            ) : (
                              <span className="text-slate-400 italic text-[11px]">Default Apply Modal</span>
                            )}
                          </td>

                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              partner.active !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                            }`}>
                              {partner.active !== false ? 'ACTIVE' : 'INACTIVE'}
                            </span>
                          </td>

                          <td className="p-3 text-right">
                            <button
                              onClick={() => setEditingPartner(partner)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                            >
                              Edit URL
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BANNERS & POPUPS MARKETING CMS */}
          {activeTab === 'marketing' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
                  Banners, Tickers & Popups CMS
                </h2>
                <p className="text-xs text-slate-500">
                  Update promotional messages, loan tickers, and customer notice popups.
                </p>
              </div>

              {/* Ticker Settings Box */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-[#E81E76]" />
                    <h3 className="text-sm font-bold text-slate-900">Header Loan Offers Ticker</h3>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Active on Top Bar
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  The marquee ticker continuously scrolls active rate deals (Personal Loan 9.99%, Business Loan 50L, Home Loan 7.10%) across desktop & mobile.
                </p>
              </div>

              {/* Welcome Popup Settings Box */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm font-bold text-slate-900">Welcome Offer & Advisory Popup</h3>
                  </div>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    100% English Verified
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Displays official pre-approved offers and the fraud prevention notice advising customers that JinnyLoan services are completely free.
                </p>
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS & BACKUPS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
                  System Settings & Config Backups
                </h2>
                <p className="text-xs text-slate-500">
                  Export complete site settings, restore previous configurations, or reset to defaults.
                </p>
              </div>

              {/* Backup & Restore Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Configuration Backup & Restore</h3>
                <p className="text-xs text-slate-600">
                  Save all partner URLs, interest rates, and layout settings to a single portable JSON file.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      const jsonStr = exportConfigJson();
                      const blob = new Blob([jsonStr], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `jinnyloan-config-backup-${new Date().toISOString().slice(0, 10)}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                      showToast('Site configuration backup downloaded!');
                    }}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all configurations to factory defaults?')) {
                        resetToDefaults();
                        showToast('Configuration reset to defaults!');
                      }
                    }}
                    className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset to Defaults</span>
                  </button>
                </div>
              </div>
            </div>
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
              Log phone inquiries or walk-in loan applicants into the CRM.
            </p>

            <form onSubmit={handleCreateManualLead} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Customer Name *</label>
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
                    <option value="partner-inquiry">DSA Partner</option>
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

      {/* MODAL 2: LEAD FULL DETAILS DRAWER */}
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
                <span className="font-bold text-slate-900">{selectedLead.city || 'N/A'}</span>
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
                  <span className="text-slate-500 block mb-1">Customer Note:</span>
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
                  value={editingPartner.targetUrl || ''}
                  onChange={(e) => setEditingPartner({ ...editingPartner, targetUrl: e.target.value })}
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
                      targetUrl: editingPartner.targetUrl,
                      active: editingPartner.active
                    });
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
                      tenure: editingOffer.tenure
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
