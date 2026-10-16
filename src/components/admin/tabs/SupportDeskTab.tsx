import React, { useState } from 'react';
import { 
  Headphones, 
  Search, 
  MessageSquare, 
  Phone, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  Send,
  User,
  Filter,
  Check,
  X
} from 'lucide-react';

interface SupportTicket {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  subject: string;
  category: 'Rate Query' | 'Sanction Delay' | 'DSA Onboarding' | 'Foreclosure' | 'General';
  priority: 'Urgent' | 'High' | 'Medium';
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
  message: string;
}

const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'TKT-901',
    customerName: 'Rohit Kulkarni',
    phone: '9821098765',
    email: 'rohit.kulkarni@gmail.com',
    subject: 'Urgent: Status of Home Loan file with HDFC Bank',
    category: 'Sanction Delay',
    priority: 'Urgent',
    status: 'open',
    createdAt: '15 mins ago',
    message: 'Submitted documents 2 days ago for ₹50L Home Loan. Need sanction letter for property registry by Monday.'
  },
  {
    id: 'TKT-902',
    customerName: 'Anil Singhania',
    phone: '9832109876',
    email: 'anil.singhania@fintech.co',
    subject: 'Want to register as DSA Partner for Jaipur region',
    category: 'DSA Onboarding',
    priority: 'High',
    status: 'in_progress',
    createdAt: '1 hr ago',
    message: 'We operate a lending firm in Jaipur with 15+ sub-agents. Looking to connect our loan volume with JinnyLoan.'
  },
  {
    id: 'TKT-903',
    customerName: 'Sneha Patel',
    phone: '9843210987',
    email: 'sneha.patel@yahoo.com',
    subject: 'Interest rate clarification for Loan Against Property',
    category: 'Rate Query',
    priority: 'Medium',
    status: 'open',
    createdAt: '3 hrs ago',
    message: 'Can I get 8.75% fixed rate for 15 years on industrial property in Ahmedabad?'
  },
  {
    id: 'TKT-904',
    customerName: 'Manish Verma',
    phone: '9854321098',
    email: 'manish.v@outlook.com',
    subject: 'Foreclosure NOC guidance for closed personal loan',
    category: 'Foreclosure',
    priority: 'Medium',
    status: 'resolved',
    createdAt: '1 day ago',
    message: 'Need help obtaining digital NOC certificate after prepayment.'
  }
];

export const SupportDeskTab: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleUpdateStatus = (ticketId: string, status: SupportTicket['status']) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status } : t));
    showToast(`Ticket ${ticketId} updated to ${status}`);
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket(prev => prev ? { ...prev, status } : null);
    }
  };

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = 
      !searchTerm ||
      t.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.phone.includes(searchTerm) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
              Customer Support & Grievance Desk
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#E81E76] text-white">
              SLA &lt; 15 Mins
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Handle customer callback requests, loan grievance escalations, DSA inquiries & live advisor responses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Avg Response: 8 mins</span>
          </div>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap gap-2.5 items-center justify-between">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search ticket by applicant name, mobile, or issue subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E81E76]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
        >
          <option value="all">All Statuses ({tickets.length})</option>
          <option value="open">Open Inquiries</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* TICKETS LIST */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Ticket ID & Customer</th>
                <th className="p-3">Subject & Query</th>
                <th className="p-3">Category</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTickets.map(ticket => (
                <tr key={ticket.id} className="hover:bg-slate-50/90 transition-colors">
                  <td className="p-3">
                    <span className="font-mono text-[10px] text-slate-500 font-bold block mb-0.5">
                      {ticket.id}
                    </span>
                    <p className="font-bold text-slate-900">{ticket.customerName}</p>
                    <p className="text-[10px] text-slate-500">{ticket.phone}</p>
                  </td>

                  <td className="p-3 max-w-[280px]">
                    <p className="font-bold text-slate-800 line-clamp-1">{ticket.subject}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{ticket.message}</p>
                    <span className="text-[9px] text-slate-400 mt-1 block">Received {ticket.createdAt}</span>
                  </td>

                  <td className="p-3">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">
                      {ticket.category}
                    </span>
                  </td>

                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      ticket.priority === 'Urgent' ? 'bg-rose-100 text-rose-800' :
                      ticket.priority === 'High' ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>

                  <td className="p-3">
                    <select
                      value={ticket.status}
                      onChange={(e) => handleUpdateStatus(ticket.id, e.target.value as any)}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                        ticket.status === 'resolved' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                        ticket.status === 'in_progress' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                        'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      <option value="open">🟡 Open</option>
                      <option value="in_progress">🔵 In Progress</option>
                      <option value="resolved">🟢 Resolved</option>
                    </select>
                  </td>

                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`https://wa.me/91${ticket.phone}?text=Hello%20${encodeURIComponent(ticket.customerName)},%20regarding%20your%20inquiry%20${ticket.id}%20with%20JinnyLoan...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                      <a
                        href={`tel:${ticket.phone}`}
                        className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Direct Call"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs cursor-pointer transition-colors"
                      >
                        Respond
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TICKET DETAILS MODAL */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setSelectedTicket(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-[#E81E76] bg-pink-50 px-2.5 py-0.5 rounded-full">
                {selectedTicket.id}
              </span>
              <span className="text-xs font-bold text-slate-400">
                {selectedTicket.category} • {selectedTicket.createdAt}
              </span>
            </div>

            <h3 className="text-lg font-black text-slate-900 mb-1">
              {selectedTicket.subject}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              From: {selectedTicket.customerName} ({selectedTicket.phone})
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-800 space-y-2 mb-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Customer Query:</span>
              <p className="leading-relaxed font-medium">{selectedTicket.message}</p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Quick Advisor Response (SMS/WhatsApp)</label>
              <textarea
                rows={3}
                placeholder="Type response to send customer..."
                value={replyMessage}
                onChange={e => setReplyMessage(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>

            <div className="mt-4 flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => {
                  handleUpdateStatus(selectedTicket.id, 'resolved');
                  setSelectedTicket(null);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                Mark as Resolved ✓
              </button>
              <a
                href={`https://wa.me/91${selectedTicket.phone}?text=${encodeURIComponent(replyMessage || 'Hello from JinnyLoan Support Desk regarding your inquiry...')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#E81E76] hover:bg-[#d01566] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
