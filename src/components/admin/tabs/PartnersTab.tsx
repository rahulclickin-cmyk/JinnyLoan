import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Search, 
  ExternalLink, 
  Edit3, 
  CheckCircle2, 
  Plus, 
  ShieldCheck, 
  Activity,
  Layers,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { useSiteConfig } from '../../../context/ConfigContext';
import { BankLogo } from '../../BankLogos';
import { LendingPartnerConfig } from '../../../config/siteConfig';

interface PartnersTabProps {
  onEditPartner: (partner: LendingPartnerConfig) => void;
  onOpenAddPartner?: () => void;
}

export const PartnersTab: React.FC<PartnersTabProps> = ({
  onEditPartner,
  onOpenAddPartner
}) => {
  const { config, updateLendingPartner } = useSiteConfig();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const partners = config.lendingPartners || [];

  const filteredPartners = useMemo(() => {
    return partners.filter(p => {
      const matchesSearch = 
        !searchTerm ||
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'all' ||
        (statusFilter === 'active' && p.active !== false) ||
        (statusFilter === 'inactive' && p.active === false);

      return matchesSearch && matchesStatus;
    });
  }, [partners, searchTerm, statusFilter]);

  const activeCount = partners.filter(p => p.active !== false).length;

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
              Lending Partners & Banking URLs CMS
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#E81E76] text-white">
              {activeCount} Active of {partners.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure direct partner redirection links, affiliate tracking codes, and toggle bank visibility across all product grids.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Bank Webhooks Healthy</span>
          </div>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap gap-2.5 items-center justify-between">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search bank or NBFC name (e.g. HDFC, State Bank, Tata, Bajaj)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E81E76]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
          >
            <option value="all">All Partners ({partners.length})</option>
            <option value="active">Active Only ({activeCount})</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Partner Bank / Financial Institution</th>
                <th className="p-3">Institution Code</th>
                <th className="p-3">Direct Webhook / Redirection URL</th>
                <th className="p-3">Live Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPartners.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    No partner institution found matching "{searchTerm}".
                  </td>
                </tr>
              ) : (
                filteredPartners.map(partner => (
                  <tr key={partner.id} className="hover:bg-slate-50/90 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <BankLogo name={partner.name} size="sm" showText={false} />
                        <div>
                          <p className="font-bold text-slate-900">{partner.name}</p>
                          <p className="text-[10px] text-slate-400">{partner.description || 'RBI Regulated Lending Entity'}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-3">
                      <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-bold">
                        {partner.code || 'NBFC'}
                      </span>
                    </td>

                    <td className="p-3 max-w-[260px]">
                      {(partner as any).targetUrl ? (
                        <a
                          href={(partner as any).targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1e40af] hover:underline flex items-center gap-1 font-mono text-[11px] truncate"
                        >
                          <span className="truncate">{(partner as any).targetUrl}</span>
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </a>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">
                          Default JinnyLoan Apply Desk
                        </span>
                      )}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => {
                          updateLendingPartner(partner.id, {
                            active: partner.active === false ? true : false
                          });
                        }}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                          partner.active !== false
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                        title="Click to toggle active state"
                      >
                        {partner.active !== false ? '● ACTIVE' : '○ INACTIVE'}
                      </button>
                    </td>

                    <td className="p-3 text-right">
                      <button
                        onClick={() => onEditPartner(partner)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1 ml-auto"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit URL</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
