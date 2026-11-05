import React, { useState } from 'react';
import { 
  FileCheck2, 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  Send, 
  Languages, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Search, 
  ArrowRight,
  Sparkles,
  FileCode,
  Tag
} from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { ContentSubmission, SubmissionStatus } from '../types';

interface ContentReviewPageProps {
  onOpenSubmission: (id: string) => void;
  onOpenCorrectionStudio: (id: string) => void;
}

export const ContentReviewPage: React.FC<ContentReviewPageProps> = ({
  onOpenSubmission,
  onOpenCorrectionStudio
}) => {
  const { submissions, createSubmission, user } = useStore();
  const [activeTab, setActiveTab] = useState<'submit' | 'history'>('submit');
  const [inputFormat, setInputFormat] = useState<'text' | 'pdf' | 'creative'>('text');
  
  // Submission Form State
  const [title, setTitle] = useState('');
  const [campaign, setCampaign] = useState('Campaign X Enterprise');
  const [channel, setChannel] = useState<ContentSubmission['channel']>('Ad Campaign');
  const [language, setLanguage] = useState<'English' | 'Hindi' | 'Marathi'>('English');
  const [rawText, setRawText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample quick templates for testing
  const templates = [
    {
      label: 'Sample Ad Banner (Violations)',
      text: 'Deploy our revolutionary magic bot platform today. Best-in-class performance, 100% guaranteed! We deliver the cheapest on earth cloud solution with zero downtime ever recorded.'
    },
    {
      label: 'Sample Marathi Collateral',
      lang: 'Marathi' as const,
      text: 'आमची स्वायत्त प्रणाली प्रत्येक ब्रँड नियमाचे काटेकोरपणे पालन करते. एआय शोधते. एआय स्पष्ट करते. मानवी निर्णय. १००% अचूकतेची खात्री.'
    },
    {
      label: 'Sample Compliant Copy',
      text: 'SAAKHYA empowers your enterprise to maintain consistent brand identity. Our governed Autonomous Agent Layer detects deviations, explains context with verified Brand DNA citations, and keeps humans firmly in control.'
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ''));

    // If text file
    if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setRawText(event.target?.result as string || '');
      };
      reader.readAsText(file);
    } else if (file.type.includes('pdf') || file.name.endsWith('.pdf')) {
      // Simulate PDF extraction with realistic sample
      setRawText(
        `[Extracted from ${file.name} via PyMuPDF Pipeline]\n\n` +
        `Enterprise Solution Overview: Deploy our revolutionary magic bot platform. 100% guaranteed performance across all distributed clusters.`
      );
    } else {
      // Creative image metadata
      setRawText(
        `[Creative Banner Graphic: ${file.name}]\n` +
        `Detected Embedded Copy: "Unbeatable Performance, 100% Guaranteed. Join the AI Revolution."\n` +
        `Palette Scan: Pine Green (#1F3B2E) - 45%, Oatmeal (#E8DCC6) - 40%, Unapproved Neon (#8A2BE2) - 15%.`
      );
    }
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !rawText.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newSub = createSubmission({
        title,
        type: inputFormat === 'text' ? 'text' : inputFormat === 'pdf' ? 'pdf' : 'creative',
        rawContent: rawText,
        campaign,
        channel,
        language
      });
      setIsSubmitting(false);
      onOpenCorrectionStudio(newSub.id);
    }, 800);
  };

  const filteredSubmissions = submissions.filter(s => {
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.creatorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F3B2E]/10">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1F3B2E] text-[#E8DCC6] flex items-center justify-center shadow-sm">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-[#1F3B2E]">Content Review & Ingestion</h1>
          </div>
          <p className="text-xs text-[#1F3B2E]/70 mt-1 max-w-xl">
            Submit text copy, PDF documents, or creative banners for automated Brand DNA inspection. AI flags inconsistencies, explains evidence, and suggests brand-aligned revisions.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1 rounded-full bg-[#F7F3EB] border border-[#1F3B2E]/15">
          <button
            onClick={() => setActiveTab('submit')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'submit' ? 'bg-[#1F3B2E] text-[#E8DCC6] shadow-sm' : 'text-[#1F3B2E]/70 hover:text-[#1F3B2E]'
            }`}
          >
            New Submission
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'history' ? 'bg-[#1F3B2E] text-[#E8DCC6] shadow-sm' : 'text-[#1F3B2E]/70 hover:text-[#1F3B2E]'
            }`}
          >
            Submissions Queue ({submissions.length})
          </button>
        </div>
      </div>

      {activeTab === 'submit' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Submission Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-sm">
              {/* Ingestion Format Toggle */}
              <div className="flex items-center gap-3 mb-6">
                {[
                  { id: 'text', label: 'Raw Copy / Text', icon: FileText },
                  { id: 'pdf', label: 'PDF Document Upload', icon: FileCode },
                  { id: 'creative', label: 'Ad Banner / Creative', icon: ImageIcon }
                ].map(fmt => (
                  <button
                    type="button"
                    key={fmt.id}
                    onClick={() => setInputFormat(fmt.id as any)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                      inputFormat === fmt.id
                        ? 'bg-[#1F3B2E] text-[#E8DCC6] border-[#1F3B2E]'
                        : 'bg-[#E8DCC6]/40 text-[#1F3B2E]/70 border-[#1F3B2E]/10 hover:bg-[#E8DCC6]'
                    }`}
                  >
                    <fmt.icon className="w-3.5 h-3.5" />
                    <span>{fmt.label}</span>
                  </button>
                ))}
              </div>

              <form onSubmit={handleAnalyze} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">Content Title</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Q4 Cloud AI Product Brochure"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">Target Channel</label>
                    <select
                      value={channel}
                      onChange={(e) => setChannel(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none"
                    >
                      <option value="Ad Campaign">Ad Campaign (ASCI & CCPA Check)</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Website">Website Copy</option>
                      <option value="Brochure">Print / PDF Brochure</option>
                      <option value="Presentation">Slide Presentation</option>
                      <option value="Email">Email Newsletter</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">Campaign Association</label>
                    <input
                      type="text"
                      value={campaign}
                      onChange={(e) => setCampaign(e.target.value)}
                      placeholder="e.g. Campaign X Enterprise Launch"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">Target Language</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi (हिंदी)</option>
                      <option value="Marathi">Marathi (मराठी)</option>
                    </select>
                  </div>
                </div>

                {inputFormat !== 'text' && (
                  <div className="p-6 rounded-2xl border-2 border-dashed border-[#1F3B2E]/20 bg-[#E8DCC6]/30 text-center relative hover:bg-[#E8DCC6]/50 transition-colors">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept={inputFormat === 'pdf' ? '.pdf,.txt,.md' : 'image/*,.png,.jpg'}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-8 h-8 text-[#1F3B2E]/60 mx-auto mb-2" />
                    <p className="text-xs font-bold text-[#1F3B2E]">
                      Drop your {inputFormat === 'pdf' ? 'PDF or document' : 'graphic banner'} here, or browse
                    </p>
                    <p className="text-[10px] text-[#1F3B2E]/60 mt-1">
                      Supports automated text extraction and visual attribute analysis
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#1F3B2E] mb-1">
                    Content Body / Extracted Text
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Paste your marketing copy, body text, or ad statement to be analyzed against Brand DNA..."
                    className="w-full p-4 rounded-2xl bg-[#E8DCC6]/30 border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] placeholder-[#1F3B2E]/40 focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/20 font-mono"
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="text-[10px] text-[#1F3B2E]/60 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#9F79CE]" />
                    <span>Rule Engine + AI Verification Engine Ready</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-full bg-[#1F3B2E] hover:bg-[#14271E] text-[#E8DCC6] font-bold text-xs tracking-wider uppercase shadow-lg hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#E8DCC6] border-t-transparent rounded-full animate-spin" />
                        <span>Inspecting Brand DNA...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Run AI Brand Review</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Quick Testing Templates Sidebar */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-sm">
              <h3 className="text-sm font-bold text-[#1F3B2E] mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#9F79CE]" />
                <span>Quick Test Templates</span>
              </h3>
              <p className="text-xs text-[#1F3B2E]/70 mb-4 leading-relaxed">
                Click any benchmark case to populate the form and observe automated detection across claims, terminology, and regional rules:
              </p>

              <div className="space-y-3">
                {templates.map((tpl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setTitle(tpl.label);
                      setRawText(tpl.text);
                      if (tpl.lang) setLanguage(tpl.lang);
                    }}
                    className="w-full text-left p-3 rounded-2xl bg-[#E8DCC6]/40 hover:bg-[#E8DCC6] border border-[#1F3B2E]/10 transition-all text-xs group"
                  >
                    <div className="font-bold text-[#1F3B2E] group-hover:text-[#14271E] flex items-center justify-between">
                      <span>{tpl.label}</span>
                      <ArrowRight className="w-3 h-3 text-[#1F3B2E]/40 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-[11px] text-[#1F3B2E]/70 line-clamp-2 mt-1">
                      "{tpl.text}"
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Core Philosophy Reminder */}
            <div className="p-6 rounded-3xl bg-[#1F3B2E] text-[#E8DCC6] border border-[#CBB3E8]/20 shadow-md">
              <span className="text-[10px] font-bold tracking-widest text-[#CBB3E8] uppercase">Governance Principle</span>
              <h4 className="text-base font-bold text-[#E8DCC6] mt-1 mb-2">
                "AI Detects. AI Explains. Humans Decide."
              </h4>
              <p className="text-xs text-[#E8DCC6]/80 leading-relaxed">
                SAAKHYA will never silently approve or publish content, nor overwrite original submissions. Final authority always remains with designated human reviewers.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Submissions Queue History View */
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {['all', 'Pending Approval', 'Needs Changes', 'Approved'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    statusFilter === status
                      ? 'bg-[#1F3B2E] text-[#E8DCC6] shadow-sm'
                      : 'bg-[#F7F3EB] text-[#1F3B2E]/70 hover:bg-[#E8DCC6]'
                  }`}
                >
                  {status === 'all' ? 'All Submissions' : status}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1F3B2E]/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search submissions..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-[#F7F3EB] border border-[#1F3B2E]/15 text-xs text-[#1F3B2E] focus:outline-none"
              />
            </div>
          </div>

          {/* Submissions List */}
          <div className="space-y-3">
            {filteredSubmissions.map(sub => (
              <div
                key={sub.id}
                className="p-5 rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/10 hover:border-[#1F3B2E]/30 transition-all shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8DCC6] border border-[#1F3B2E]/10 flex items-center justify-center shrink-0">
                    {sub.type === 'pdf' ? (
                      <FileCode className="w-6 h-6 text-[#1F3B2E]" />
                    ) : sub.type === 'creative' ? (
                      <ImageIcon className="w-6 h-6 text-[#9F79CE]" />
                    ) : (
                      <FileText className="w-6 h-6 text-[#1F3B2E]" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-[#1F3B2E]">{sub.title}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1F3B2E]/10 text-[#1F3B2E] font-medium">
                        {sub.language}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#1F3B2E]/60">
                      <span>By {sub.creatorName}</span>
                      <span>•</span>
                      <span>{sub.channel || 'All Channels'}</span>
                      <span>•</span>
                      <span>{sub.submittedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-between sm:justify-end">
                  {/* Score Indicator */}
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-[#1F3B2E]">{sub.complianceScore}%</div>
                    <div className="text-[10px] text-[#1F3B2E]/60">Compliance</div>
                  </div>

                  {/* Status Badge */}
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    sub.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                    sub.status === 'Needs Changes' ? 'bg-amber-100 text-amber-800' :
                    'bg-[#CBB3E8]/30 text-[#1F3B2E]'
                  }`}>
                    {sub.status}
                  </span>

                  <button
                    onClick={() => onOpenCorrectionStudio(sub.id)}
                    className="px-4 py-2 rounded-xl bg-[#1F3B2E] hover:bg-[#14271E] text-[#E8DCC6] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
