import React, { useState } from 'react';
import { 
  Settings, 
  Download, 
  Upload, 
  RotateCcw, 
  Key, 
  Lock, 
  CheckCircle2, 
  Radio, 
  Send, 
  ShieldAlert,
  Save,
  Server
} from 'lucide-react';
import { useSiteConfig } from '../../../context/ConfigContext';

interface SettingsTabProps {
  onShowToast: (msg: string) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ onShowToast }) => {
  const { exportConfigJson, importConfig, resetToDefaults } = useSiteConfig();
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);
  const [adminPin, setAdminPin] = useState('admin123');
  const [smsGateway, setSmsGateway] = useState('gupshup');
  const [webhookUrl, setWebhookUrl] = useState('https://jinnyloan.in/api/v1/webhooks/lender-sync');

  const handleExportBackup = () => {
    const jsonStr = exportConfigJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jinnyloan-enterprise-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onShowToast('Enterprise site configuration backup downloaded!');
  };

  const handleImportBackup = () => {
    if (!importJsonText.trim()) {
      alert('Please paste valid JSON configuration.');
      return;
    }
    const success = importConfig(importJsonText);
    if (success) {
      onShowToast('Configuration restored successfully!');
      setShowImportBox(false);
      setImportJsonText('');
    } else {
      alert('Invalid JSON structure. Please check the backup file content.');
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all site configuration to defaults? This cannot be undone.')) {
      resetToDefaults();
      onShowToast('Configuration reset to defaults!');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            System Settings, Webhooks & Backups
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#E81E76] text-white">
            Super Admin
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage system credentials, webhook endpoints, backup downloads, and full JSON configuration restoration.
        </p>
      </div>

      {/* BACKUP & RESTORE */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Download className="w-4 h-4 text-[#E81E76]" />
          <span>Full Configuration Backup & Data Portability</span>
        </h3>
        <p className="text-xs text-slate-600">
          Export all 100+ partner redirection links, loan interest rates, cards, and CMS settings as an offline JSON snapshot.
        </p>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={handleExportBackup}
            className="px-4 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download JSON Backup</span>
          </button>

          <button
            onClick={() => setShowImportBox(!showImportBox)}
            className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 flex items-center gap-2 cursor-pointer shadow-2xs transition-all"
          >
            <Upload className="w-4 h-4 text-slate-500" />
            <span>{showImportBox ? 'Close Import Panel' : 'Restore from JSON'}</span>
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 flex items-center gap-2 cursor-pointer transition-all ml-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Factory Defaults</span>
          </button>
        </div>

        {showImportBox && (
          <div className="pt-3 border-t border-slate-100 space-y-3">
            <label className="block text-xs font-bold text-slate-700">Paste Backup JSON Content</label>
            <textarea
              rows={4}
              value={importJsonText}
              onChange={e => setImportJsonText(e.target.value)}
              placeholder="Paste previously downloaded JSON backup here..."
              className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            />
            <button
              onClick={handleImportBackup}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Verify & Apply Configuration
            </button>
          </div>
        )}
      </div>

      {/* WEBHOOKS & INTEGRATION ENDPOINTS */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Server className="w-4 h-4 text-blue-600" />
          <span>Webhook Endpoints & Real-time Bank Callbacks</span>
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Inbound Lender Sanction Webhook URL</label>
            <input
              type="text"
              value={webhookUrl}
              onChange={e => setWebhookUrl(e.target.value)}
              className="w-full text-xs font-mono px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Banks POST sanction IDs and status events directly to this endpoint.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">SMS Notification Provider</label>
              <select
                value={smsGateway}
                onChange={e => setSmsGateway(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-semibold"
              >
                <option value="gupshup">Gupshup Enterprise SMS (India DLT Registered)</option>
                <option value="twilio">Twilio Global Gateway</option>
                <option value="msg91">MSG91 High Priority Route</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">DLT Header Entity ID</label>
              <input
                type="text"
                readOnly
                value="1701159844321908"
                className="w-full text-xs font-mono px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ADMIN PASSCODE SETTINGS */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Key className="w-4 h-4 text-purple-600" />
          <span>Portal Access Security</span>
        </h3>
        <p className="text-xs text-slate-600">
          Passcodes currently recognized for access: <code className="font-mono bg-slate-100 px-1 py-0.5 rounded font-bold text-slate-800">admin</code>, <code className="font-mono bg-slate-100 px-1 py-0.5 rounded font-bold text-slate-800">admin123</code>, <code className="font-mono bg-slate-100 px-1 py-0.5 rounded font-bold text-slate-800">jinny24</code>.
        </p>
      </div>

    </div>
  );
};
