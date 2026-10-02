import React, { useState } from 'react';
import {
  Wallet,
  Upload,
  Award,
  ShieldCheck,
  CheckCircle2,
  Share2,
  ExternalLink,
  Plus,
  Trash2,
  Filter,
} from 'lucide-react';
import { sampleCertificatesWallet } from '../../data/mockData';
import { CertificateWalletItem } from '../../types';

export const CertificateWalletView: React.FC = () => {
  const [walletItems, setWalletItems] =
    useState<CertificateWalletItem[]>(sampleCertificatesWallet);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // New certificate state for modal
  const [newCert, setNewCert] = useState({
    title: '',
    issuer: '',
    category: 'Course' as CertificateWalletItem['category'],
    credentialId: '',
  });

  const categories = [
    'All',
    'Course',
    'Certification',
    'Hackathon',
    'Workshop',
    'Internship',
  ];

  const filteredItems = walletItems.filter((item) => {
    if (selectedFilter === 'All') return true;
    return item.category === selectedFilter;
  });

  const togglePassportInclusion = (id: string) => {
    setWalletItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, inPassport: !c.inPassport } : c))
    );
  };

  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.title || !newCert.issuer) return;

    const item: CertificateWalletItem = {
      id: `cw_${Date.now()}`,
      title: newCert.title,
      issuer: newCert.issuer,
      issuedDate: 'Oct 2026',
      category: newCert.category,
      credentialId: newCert.credentialId || `EMP-ID-${Math.floor(Math.random() * 90000 + 10000)}`,
      verified: true,
      inPassport: true,
    };

    setWalletItems([item, ...walletItems]);
    setIsUploadModalOpen(false);
    setNewCert({ title: '', issuer: '', category: 'Course', credentialId: '' });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      {/* Header Banner - Royal Navy Card */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0B1536] via-[#10204E] to-[#1E3A8A] text-white border border-blue-400/20 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-pink-300 uppercase tracking-wider mb-1">
            <Wallet className="w-3.5 h-3.5 text-pink-300" />
            <span>Digital Vault</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            Certificate Wallet
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100/90 mt-1 max-w-xl">
            Store, organize, verify, and link your credentials directly into your EmployaX Verified Passport.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="relative z-10 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-xs font-bold text-white flex items-center gap-1.5 shadow-md shadow-pink-500/30 active:scale-95 transition-all self-start sm:self-auto cursor-pointer ring-1 ring-white/30"
        >
          <Upload className="w-4 h-4" />
          <span>Add New Certificate</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-white/80 border border-slate-200/90 backdrop-blur-md shadow-xs w-fit">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedFilter(c)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedFilter === c
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 hover:border-pink-300 transition-all space-y-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-pink-50 text-pink-700 border border-pink-200 uppercase">
                  {item.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <div className="text-xs text-cyan-700 font-semibold">
                  {item.issuer}
                </div>
              </div>

              <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-600 shrink-0">
                <Award className="w-5 h-5" />
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px] text-slate-600 font-mono">
              <span>ID: {item.credentialId}</span>
              <span className="text-slate-800 font-semibold">{item.issuedDate}</span>
            </div>

            {/* Passport Toggle */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs">
                <input
                  type="checkbox"
                  checked={item.inPassport}
                  onChange={() => togglePassportInclusion(item.id)}
                  className="rounded bg-white border-slate-300 text-cyan-600 focus:ring-0 w-4 h-4 cursor-pointer"
                />
                <span
                  className={
                    item.inPassport ? 'text-emerald-700 font-bold' : 'text-slate-500'
                  }
                >
                  {item.inPassport ? '✓ In Verified Passport' : 'Hidden from Passport'}
                </span>
              </label>

              <button
                onClick={() => alert(`Certificate verified: ${item.credentialId}`)}
                className="text-xs text-cyan-700 hover:text-cyan-800 flex items-center gap-1 font-bold cursor-pointer"
              >
                <span>View Proof</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Certificate Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in">
          <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl relative space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-pink-600" />
              <span>Store Credential in Wallet</span>
            </h3>

            <form onSubmit={handleAddCertificate} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Certificate Title
                </label>
                <input
                  type="text"
                  required
                  value={newCert.title}
                  onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                  placeholder="e.g. AWS Certified Developer"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-pink-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  required
                  value={newCert.issuer}
                  onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                  placeholder="e.g. Amazon Web Services"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-pink-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={newCert.category}
                  onChange={(e) =>
                    setNewCert({ ...newCert, category: e.target.value as any })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-pink-500 outline-none cursor-pointer"
                >
                  <option value="Course">Course</option>
                  <option value="Certification">Professional Certification</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Internship">Internship</option>
                  <option value="Academic">Academic Certificate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Credential ID / Link (Optional)
                </label>
                <input
                  type="text"
                  value={newCert.credentialId}
                  onChange={(e) => setNewCert({ ...newCert, credentialId: e.target.value })}
                  placeholder="e.g. AWS-CERT-48912"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-pink-500 outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-xs font-bold text-white shadow-md shadow-pink-500/20 cursor-pointer"
                >
                  Save to Wallet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
