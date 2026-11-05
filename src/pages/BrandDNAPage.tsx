import React, { useState } from 'react';
import { 
  Dna, 
  Plus, 
  Search, 
  Filter, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles, 
  Edit3, 
  FileUp, 
  Clock, 
  Check, 
  Tag,
  BookOpen
} from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { BrandGuideline, GuidelineCategory } from '../types';

export const BrandDNAPage: React.FC = () => {
  const { guidelines, addGuideline, updateGuideline, user } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingGuideline, setEditingGuideline] = useState<BrandGuideline | null>(null);

  // Form State for Add / Edit
  const [formCategory, setFormCategory] = useState<GuidelineCategory>('claims');
  const [formTitle, setFormTitle] = useState('');
  const [formStatement, setFormStatement] = useState('');
  const [formRationale, setFormRationale] = useState('');
  const [formSeverity, setFormSeverity] = useState<BrandGuideline['severity']>('High');
  const [formForbidden, setFormForbidden] = useState('');
  const [formApproved, setFormApproved] = useState('');
  const [formFacts, setFormFacts] = useState('');

  // Categories Filter List
  const categories = [
    { id: 'all', label: 'All Guidelines' },
    { id: 'claims', label: 'Claims & Superlatives' },
    { id: 'terminology', label: 'Approved Terminology' },
    { id: 'facts', label: 'Verified Facts' },
    { id: 'voice', label: 'Voice & Tone' },
    { id: 'visual', label: 'Visual & Colors' },
    { id: 'regional', label: 'Regional (Hindi/Marathi)' },
    { id: 'accessibility', label: 'Accessibility (WCAG)' }
  ];

  const filteredGuidelines = guidelines.filter(g => {
    const matchesCat = selectedCategory === 'all' || g.category === selectedCategory;
    const matchesSearch = 
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.ruleStatement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.rationale.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingGuideline(null);
    setFormCategory('claims');
    setFormTitle('');
    setFormStatement('');
    setFormRationale('');
    setFormSeverity('High');
    setFormForbidden('');
    setFormApproved('');
    setFormFacts('');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (g: BrandGuideline) => {
    setEditingGuideline(g);
    setFormCategory(g.category);
    setFormTitle(g.title);
    setFormStatement(g.ruleStatement);
    setFormRationale(g.rationale);
    setFormSeverity(g.severity);
    setFormForbidden((g.forbiddenTerms || []).join(', '));
    setFormApproved((g.approvedTerms || []).join(', '));
    setFormFacts((g.verifiedFacts || []).join(', '));
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formStatement.trim()) return;

    const forbidden = formForbidden.split(',').map(s => s.trim()).filter(Boolean);
    const approved = formApproved.split(',').map(s => s.trim()).filter(Boolean);
    const facts = formFacts.split(',').map(s => s.trim()).filter(Boolean);

    if (editingGuideline) {
      updateGuideline(editingGuideline.id, {
        category: formCategory,
        title: formTitle,
        ruleStatement: formStatement,
        rationale: formRationale,
        severity: formSeverity,
        forbiddenTerms: forbidden.length > 0 ? forbidden : undefined,
        approvedTerms: approved.length > 0 ? approved : undefined,
        verifiedFacts: facts.length > 0 ? facts : undefined
      });
    } else {
      addGuideline({
        category: formCategory,
        title: formTitle,
        ruleStatement: formStatement,
        rationale: formRationale,
        severity: formSeverity,
        forbiddenTerms: forbidden.length > 0 ? forbidden : undefined,
        approvedTerms: approved.length > 0 ? approved : undefined,
        verifiedFacts: facts.length > 0 ? facts : undefined
      });
    }

    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header with Title and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F3B2E]/10">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1F3B2E] text-[#E8DCC6] flex items-center justify-center shadow-sm">
              <Dna className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-[#1F3B2E]">Brand DNA Engine</h1>
          </div>
          <p className="text-xs text-[#1F3B2E]/70 mt-1 max-w-xl">
            Centralized organizational source of truth. Manage approved claims, tone of voice, forbidden terminology, verified facts, and regional guidelines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Simulating guideline ingestion from Brand_Guidelines_2026.pdf. Extracted 4 approved terminology pairs and 2 claim rules.')}
            className="px-4 py-2.5 rounded-full bg-[#F7F3EB] hover:bg-[#FFFFFF] text-[#1F3B2E] border border-[#1F3B2E]/15 text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
          >
            <FileUp className="w-4 h-4 text-[#9F79CE]" />
            <span>Import PDF Guidelines</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-full bg-[#1F3B2E] hover:bg-[#14271E] text-[#E8DCC6] text-xs font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Brand Rule</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#1F3B2E] text-[#E8DCC6] shadow-sm'
                  : 'bg-[#F7F3EB] text-[#1F3B2E]/70 hover:bg-[#E8DCC6] hover:text-[#1F3B2E]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F3B2E]/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guidelines..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#F7F3EB] border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] placeholder-[#1F3B2E]/40 focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/20"
          />
        </div>
      </div>

      {/* Guidelines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGuidelines.map(g => (
          <div
            key={g.id}
            className="p-6 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/10 hover:border-[#1F3B2E]/30 transition-all shadow-sm flex flex-col justify-between"
          >
            <div>
              {/* Header tags */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    g.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                    g.severity === 'High' ? 'bg-amber-100 text-amber-800' :
                    g.severity === 'Medium' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {g.severity}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#CBB3E8]/30 text-[#1F3B2E] capitalize">
                    {g.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#1F3B2E]/50">{g.version}</span>
                  <button
                    onClick={() => handleOpenEdit(g)}
                    className="p-1 rounded-lg text-[#1F3B2E]/50 hover:text-[#1F3B2E] hover:bg-[#E8DCC6]/60 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Title & Statement */}
              <h3 className="text-base font-bold text-[#1F3B2E] mb-2">{g.title}</h3>
              <p className="text-xs text-[#1F3B2E] leading-relaxed mb-4 bg-[#E8DCC6]/30 p-3 rounded-xl border border-[#1F3B2E]/10">
                "{g.ruleStatement}"
              </p>

              {/* Rationale */}
              <p className="text-xs text-[#1F3B2E]/70 mb-4 italic">
                <span className="font-semibold text-[#1F3B2E]/90 not-italic">Regulatory Rationale: </span>
                {g.rationale}
              </p>

              {/* Specific Term Lists */}
              {g.forbiddenTerms && g.forbiddenTerms.length > 0 && (
                <div className="mb-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-red-700 mb-1">
                    Banned / Deprecated Phrases:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {g.forbiddenTerms.map((t, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                        ✕ {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {g.approvedTerms && g.approvedTerms.length > 0 && (
                <div className="mb-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
                    Mandated Brand Nomenclature:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {g.approvedTerms.map((t, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {g.verifiedFacts && g.verifiedFacts.length > 0 && (
                <div className="mb-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-800 mb-1">
                    Approved Specifications & Facts:
                  </div>
                  <ul className="text-[11px] text-[#1F3B2E]/80 space-y-1 list-disc list-inside">
                    {g.verifiedFacts.map((fact, idx) => (
                      <li key={idx}>{fact}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer Metadata */}
            <div className="pt-3 border-t border-[#1F3B2E]/10 flex items-center justify-between text-[10px] text-[#1F3B2E]/50">
              <span>Updated: {g.lastUpdated}</span>
              <span>By {g.updatedBy}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Guideline Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-[#1F3B2E] mb-1">
              {editingGuideline ? 'Edit Brand Guideline' : 'Add New Brand DNA Rule'}
            </h2>
            <p className="text-xs text-[#1F3B2E]/70 mb-6">
              Guidelines serve as the immutable benchmark for all AI analysis engines and reviewer approvals.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as GuidelineCategory)}
                    className="w-full px-3 py-2 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none"
                  >
                    <option value="claims">Claims & Superlatives</option>
                    <option value="terminology">Approved Terminology</option>
                    <option value="facts">Verified Facts</option>
                    <option value="voice">Voice & Tone</option>
                    <option value="visual">Visual & Colors</option>
                    <option value="regional">Regional (Hindi/Marathi)</option>
                    <option value="accessibility">Accessibility (WCAG)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">Violation Severity</label>
                  <select
                    value={formSeverity}
                    onChange={(e) => setFormSeverity(e.target.value as BrandGuideline['severity'])}
                    className="w-full px-3 py-2 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none"
                  >
                    <option value="Critical">Critical (Regulatory / Legal Risk)</option>
                    <option value="High">High (Major Brand Damage)</option>
                    <option value="Medium">Medium (Tone / Wording Inconsistency)</option>
                    <option value="Low">Low (Stylistic Preference)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">Rule Title</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. No Outdated Pricing Quotes"
                  className="w-full px-3 py-2 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">Rule Statement (Exact Requirement)</label>
                <textarea
                  required
                  rows={3}
                  value={formStatement}
                  onChange={(e) => setFormStatement(e.target.value)}
                  placeholder="Clearly state what is mandatory or strictly prohibited..."
                  className="w-full px-3 py-2 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">Regulatory & Strategic Rationale</label>
                <input
                  type="text"
                  value={formRationale}
                  onChange={(e) => setFormRationale(e.target.value)}
                  placeholder="e.g. Complies with ASCI Code Chapter 1 and CCPA guidelines"
                  className="w-full px-3 py-2 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-red-700 mb-1">Forbidden Terms (Comma-separated)</label>
                  <input
                    type="text"
                    value={formForbidden}
                    onChange={(e) => setFormForbidden(e.target.value)}
                    placeholder="e.g. magic bot, cheapest, 100% guaranteed"
                    className="w-full px-3 py-2 rounded-xl bg-red-50/50 border border-red-200 text-xs text-red-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-800 mb-1">Approved Terms (Comma-separated)</label>
                  <input
                    type="text"
                    value={formApproved}
                    onChange={(e) => setFormApproved(e.target.value)}
                    placeholder="e.g. Autonomous Agent Layer, SLA-backed"
                    className="w-full px-3 py-2 rounded-xl bg-emerald-50/50 border border-emerald-200 text-xs text-emerald-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1F3B2E]/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#1F3B2E]/70 hover:bg-[#E8DCC6]/50 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#1F3B2E] text-[#E8DCC6] font-bold text-xs shadow-md hover:bg-[#14271E]"
                >
                  {editingGuideline ? 'Update Rule' : 'Save Guideline'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
