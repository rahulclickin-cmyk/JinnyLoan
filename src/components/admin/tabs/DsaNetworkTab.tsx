import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  Plus, 
  Search, 
  CheckCircle2, 
  DollarSign, 
  Download, 
  Phone, 
  MessageSquare, 
  TrendingUp,
  MapPin,
  Check,
  X
} from 'lucide-react';

interface DsaAgent {
  id: string;
  code: string;
  name: string;
  firm: string;
  phone: string;
  city: string;
  tier: 'Silver' | 'Gold' | 'Platinum';
  commissionRate: string;
  disbursedAmount: number;
  commissionDue: number;
  status: 'active' | 'pending_kyc' | 'suspended';
}

const INITIAL_DSA_AGENTS: DsaAgent[] = [
  {
    id: 'dsa-1',
    code: 'JINNY-DSA-1042',
    name: 'Rajesh Khanna',
    firm: 'Khanna Financial Services',
    phone: '9811234567',
    city: 'New Delhi',
    tier: 'Platinum',
    commissionRate: '2.5%',
    disbursedAmount: 18500000,
    commissionDue: 46250,
    status: 'active'
  },
  {
    id: 'dsa-2',
    code: 'JINNY-DSA-2088',
    name: 'Amitabh Joshi',
    firm: 'Shree Wealth & Loans',
    phone: '9822345678',
    city: 'Mumbai',
    tier: 'Platinum',
    commissionRate: '2.5%',
    disbursedAmount: 24000000,
    commissionDue: 60000,
    status: 'active'
  },
  {
    id: 'dsa-3',
    code: 'JINNY-DSA-3015',
    name: 'Pooja Agarwal',
    firm: 'Prime Capital Advisory',
    phone: '9833456789',
    city: 'Bengaluru',
    tier: 'Gold',
    commissionRate: '2.0%',
    disbursedAmount: 12000000,
    commissionDue: 24000,
    status: 'active'
  },
  {
    id: 'dsa-4',
    code: 'JINNY-DSA-4120',
    name: 'Vikas Singhal',
    firm: 'Singhal Loan Associates',
    phone: '9844567890',
    city: 'Jaipur',
    tier: 'Silver',
    commissionRate: '1.5%',
    disbursedAmount: 4500000,
    commissionDue: 12500,
    status: 'active'
  },
  {
    id: 'dsa-5',
    code: 'JINNY-DSA-5099',
    name: 'Sunita Nair',
    firm: 'Nair FinTech Solutions',
    phone: '9855678901',
    city: 'Kochi',
    tier: 'Gold',
    commissionRate: '2.0%',
    disbursedAmount: 8200000,
    commissionDue: 16400,
    status: 'pending_kyc'
  }
];

export const DsaNetworkTab: React.FC = () => {
  const [agents, setAgents] = useState<DsaAgent[]>(() => {
    try {
      const stored = localStorage.getItem('jinnyloan_dsa_agents');
      return stored ? JSON.parse(stored) : INITIAL_DSA_AGENTS;
    } catch {
      return INITIAL_DSA_AGENTS;
    }
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [isOnboardModalOpen, setIsOnboardModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // New DSA form state
  const [newAgent, setNewAgent] = useState({
    name: '',
    firm: '',
    phone: '',
    city: 'Delhi NCR',
    tier: 'Gold' as const
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateAgent = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `JINNY-DSA-${Math.floor(1000 + Math.random() * 9000)}`;
    const created: DsaAgent = {
      id: `dsa-${Date.now()}`,
      code: randomCode,
      name: newAgent.name,
      firm: newAgent.firm || `${newAgent.name} Financials`,
      phone: newAgent.phone,
      city: newAgent.city,
      tier: newAgent.tier,
      commissionRate: newAgent.tier === 'Platinum' ? '2.5%' : newAgent.tier === 'Gold' ? '2.0%' : '1.5%',
      disbursedAmount: 0,
      commissionDue: 0,
      status: 'active'
    };

    const updated = [created, ...agents];
    setAgents(updated);
    try {
      localStorage.setItem('jinnyloan_dsa_agents', JSON.stringify(updated));
    } catch {}
    setIsOnboardModalOpen(false);
    showToast(`DSA Agent ${created.name} onboarded with code ${created.code}!`);
    setNewAgent({ name: '', firm: '', phone: '', city: 'Delhi NCR', tier: 'Gold' });
  };

  const handlePayCommission = (agentId: string) => {
    const updated = agents.map(a => {
      if (a.id === agentId) {
        return { ...a, commissionDue: 0 };
      }
      return a;
    });
    setAgents(updated);
    try {
      localStorage.setItem('jinnyloan_dsa_agents', JSON.stringify(updated));
    } catch {}
    showToast('Commission payout processed & marked as paid!');
  };

  const filteredAgents = agents.filter(a => {
    const matchesSearch = 
      !searchTerm ||
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.firm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTier = tierFilter === 'all' || a.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const totalDisbursed = agents.reduce((sum, a) => sum + a.disbursedAmount, 0);
  const totalDue = agents.reduce((sum, a) => sum + a.commissionDue, 0);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
              DSA Channel & Referral Network Desk
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#E81E76] text-white">
              {agents.length} Onboarded Partners
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage channel partner codes, tier commission structures (up to 2.5%), disbursal logs & instant invoice settlements.
          </p>
        </div>

        <button
          onClick={() => setIsOnboardModalOpen(true)}
          className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Onboard New DSA Partner</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Active Channel Partners</span>
          <p className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif] mt-1">
            {agents.filter(a => a.status === 'active').length}
          </p>
          <span className="text-[10px] text-emerald-600 font-bold">100% Pan-India Active</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Total Sourced Volume</span>
          <p className="text-2xl font-black text-[#E81E76] font-['Outfit',sans-serif] mt-1">
            ₹{(totalDisbursed / 10000000).toFixed(2)} Cr
          </p>
          <span className="text-[10px] text-slate-400">Across 100+ Bank partners</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Pending Commission Due</span>
          <p className="text-2xl font-black text-amber-600 font-['Outfit',sans-serif] mt-1">
            ₹{totalDue.toLocaleString('en-IN')}
          </p>
          <span className="text-[10px] text-slate-400">Ready for NEFT disbursal</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Max DSA Commission Rate</span>
          <p className="text-2xl font-black text-purple-700 font-['Outfit',sans-serif] mt-1">
            2.50%
          </p>
          <span className="text-[10px] text-purple-600 font-bold">Platinum Tier Standard</span>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap gap-2.5 items-center justify-between">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search DSA partner by code, name, agency, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E81E76]"
          />
        </div>

        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
          className="text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
        >
          <option value="all">All Tiers (Silver, Gold, Platinum)</option>
          <option value="Platinum">Platinum (2.5%)</option>
          <option value="Gold">Gold (2.0%)</option>
          <option value="Silver">Silver (1.5%)</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Partner Code & Name</th>
                <th className="p-3">Firm & City</th>
                <th className="p-3">Tier & Payout %</th>
                <th className="p-3">Disbursed Volume</th>
                <th className="p-3">Commission Due</th>
                <th className="p-3 text-right">Settlement Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAgents.map(agent => (
                <tr key={agent.id} className="hover:bg-slate-50/90 transition-colors">
                  <td className="p-3">
                    <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-bold block w-fit mb-0.5">
                      {agent.code}
                    </span>
                    <p className="font-bold text-slate-900">{agent.name}</p>
                    <p className="text-[10px] text-slate-500">{agent.phone}</p>
                  </td>

                  <td className="p-3">
                    <p className="font-semibold text-slate-800">{agent.firm}</p>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{agent.city}</span>
                    </p>
                  </td>

                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      agent.tier === 'Platinum' ? 'bg-purple-100 text-purple-800' :
                      agent.tier === 'Gold' ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {agent.tier} ({agent.commissionRate})
                    </span>
                  </td>

                  <td className="p-3">
                    <p className="font-bold text-slate-900">
                      ₹{(agent.disbursedAmount / 100000).toFixed(1)} Lakhs
                    </p>
                  </td>

                  <td className="p-3">
                    <p className={`font-black ${agent.commissionDue > 0 ? 'text-[#E81E76]' : 'text-slate-400'}`}>
                      ₹{agent.commissionDue.toLocaleString('en-IN')}
                    </p>
                  </td>

                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`https://wa.me/91${agent.phone}?text=Hello%20${encodeURIComponent(agent.name)},%20update%20from%20JinnyLoan%20DSA%20Desk...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="WhatsApp Partner"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                      {agent.commissionDue > 0 ? (
                        <button
                          onClick={() => handlePayCommission(agent.id)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs cursor-pointer shadow-xs transition-colors"
                        >
                          Settle Payout
                        </button>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">
                          Paid ✓
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ONBOARD MODAL */}
      {isOnboardModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <h3 className="text-lg font-black text-slate-900 mb-1">
              Onboard Direct Selling Agent (DSA)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Generate a unique tracking partner code and assign commission tiers.
            </p>

            <form onSubmit={handleCreateAgent} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Agent Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={newAgent.name}
                  onChange={e => setNewAgent({ ...newAgent, name: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Agency / Firm Name</label>
                <input
                  type="text"
                  placeholder="e.g. Chandra Wealth Associates"
                  value={newAgent.firm}
                  onChange={e => setNewAgent({ ...newAgent, firm: e.target.value })}
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
                    value={newAgent.phone}
                    onChange={e => setNewAgent({ ...newAgent, phone: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City / Region</label>
                  <input
                    type="text"
                    value={newAgent.city}
                    onChange={e => setNewAgent({ ...newAgent, city: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Commission Tier</label>
                <select
                  value={newAgent.tier}
                  onChange={e => setNewAgent({ ...newAgent, tier: e.target.value as any })}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-semibold"
                >
                  <option value="Platinum">Platinum (2.50% Payout)</option>
                  <option value="Gold">Gold (2.00% Payout)</option>
                  <option value="Silver">Silver (1.50% Payout)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOnboardModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E81E76] hover:bg-[#d01566] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Onboard Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
