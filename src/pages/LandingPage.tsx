import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Languages, 
  Search, 
  Sliders, 
  CheckCircle, 
  Eye, 
  Layers, 
  Zap, 
  TrendingUp, 
  GitBranch, 
  Lock,
  ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin }) => {
  return (
    <div className="min-h-screen bg-[#E8DCC6] text-[#1F3B2E]">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#E8DCC6]/90 backdrop-blur-md border-b border-[#1F3B2E]/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/saakhya-logo.png" 
              alt="SAAKHYA Logo" 
              className="h-10 w-auto object-contain"
            />
            <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#1F3B2E]/10 text-[#1F3B2E] border border-[#1F3B2E]/15">
              Team HORIZON
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#1F3B2E]/85">
            <a href="#features" className="hover:text-[#1F3B2E] transition-colors">Platform Features</a>
            <a href="#how-it-works" className="hover:text-[#1F3B2E] transition-colors">How It Works</a>
            <a href="#innovations" className="hover:text-[#1F3B2E] transition-colors">Innovations</a>
            <a href="#governance" className="hover:text-[#1F3B2E] transition-colors">Governance & Trust</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onLogin}
              className="px-5 py-2.5 text-sm font-semibold text-[#1F3B2E] hover:bg-[#1F3B2E]/10 rounded-full transition-all"
            >
              Sign In
            </button>
            <button
              onClick={onGetStarted}
              className="px-6 py-2.5 text-sm font-semibold text-[#E8DCC6] bg-[#1F3B2E] hover:bg-[#14271E] rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Philosophy Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1F3B2E]/10 border border-[#1F3B2E]/15 mb-6 text-xs font-bold uppercase tracking-wider text-[#1F3B2E]">
            <Sparkles className="w-3.5 h-3.5 text-[#9F79CE]" />
            <span>AI Detects. AI Explains. Humans Decide.</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#1F3B2E] leading-[1.15] mb-6">
            Keep Every Piece of Content <br />
            <span className="text-[#1F3B2E] underline decoration-[#CBB3E8] decoration-4 underline-offset-8">
              True to Your Brand.
            </span>
          </h1>

          {/* Supporting Description */}
          <p className="text-lg sm:text-xl text-[#1F3B2E]/80 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            SAAKHYA intelligently analyses content against your approved brand guidelines, detects inconsistencies, explains issues with verifiable citations, and empowers human reviewers to publish with absolute confidence.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-4 text-base font-bold text-[#E8DCC6] bg-[#1F3B2E] hover:bg-[#14271E] rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 group"
            >
              <span>Get Started with SAAKHYA</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-[#1F3B2E] bg-[#F7F3EB] hover:bg-[#FFFFFF] border border-[#1F3B2E]/15 rounded-full shadow-sm transition-all"
            >
              Explore Features
            </a>
          </div>

          {/* Interactive Live Product Preview Card */}
          <div className="relative mx-auto max-w-4xl rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 shadow-2xl p-6 sm:p-8 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-[#1F3B2E]/10 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs font-semibold text-[#1F3B2E]/60 uppercase tracking-wider">
                  Live AI Inspection Preview
                </span>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#1F3B2E] text-[#E8DCC6]">
                Human Decision Pending
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Submitted Content Snippet */}
              <div className="p-4 rounded-2xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/10">
                <div className="text-xs font-bold uppercase text-[#1F3B2E]/70 mb-2">Submitted Copy</div>
                <p className="text-sm text-[#1F3B2E] leading-relaxed">
                  "Deploy our revolutionary magic bot platform today. Best-in-class performance, <mark className="bg-[#CBB3E8]/80 text-[#1F3B2E] px-1 rounded font-medium">100% guaranteed!</mark> We deliver the cheapest on earth cloud solution."
                </p>
              </div>

              {/* AI Detection & Explanation Card */}
              <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-red-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-100 text-red-800">
                      Critical Claim Violation
                    </span>
                    <span className="text-xs text-[#1F3B2E]/60">ASCI / CCPA Rule</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#1F3B2E] mb-1">Unsupported Promotional Guarantee</h4>
                  <p className="text-xs text-[#1F3B2E]/80 mb-3 leading-relaxed">
                    No approved empirical evidence supports "100% guaranteed". Risk of regulatory notice under ASCI Code Chapter 1.
                  </p>
                  <div className="text-xs bg-[#E8DCC6]/40 p-2.5 rounded-lg border border-[#1F3B2E]/10 mb-3">
                    <span className="font-semibold text-[#1F3B2E]">AI Recommendation: </span>
                    <span className="text-[#1F3B2E]/90 italic">
                      "Engineered for enterprise reliability backed by a 99.95% uptime SLA."
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#1F3B2E]/10">
                  <button 
                    onClick={onGetStarted}
                    className="flex-1 py-1.5 text-xs font-bold text-center bg-[#1F3B2E] text-[#E8DCC6] rounded-lg hover:bg-[#14271E]"
                  >
                    Accept Suggestion
                  </button>
                  <button 
                    onClick={onGetStarted}
                    className="px-3 py-1.5 text-xs font-semibold text-[#1F3B2E] bg-[#E8DCC6] rounded-lg hover:bg-[#D4C6AB]"
                  >
                    Edit Inline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Core Features Grid */}
      <section id="features" className="py-24 px-6 bg-[#F7F3EB]/70 border-t border-[#1F3B2E]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#9F79CE] uppercase">Enterprise Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F3B2E] mt-2 mb-4">
              Comprehensive Brand Governance Architecture
            </h2>
            <p className="text-base text-[#1F3B2E]/80">
              Eight unified engines working in harmony to safeguard your brand across every team, asset, and channel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Brand DNA Engine',
                desc: 'Centralized source of truth for guidelines, mission, tone, forbidden words, verified facts, and visual rules.'
              },
              {
                icon: FileText,
                title: 'Multi-Format Checker',
                desc: 'Upload text, documents, PDFs (PyMuPDF parser), and digital banners with automated text & attribute extraction.'
              },
              {
                icon: Languages,
                title: 'Multilingual Intelligence',
                desc: 'Fidelity checks for English, Hindi (हिंदी), and Marathi (मराठी) respecting regional nuances and cultural idioms.'
              },
              {
                icon: Search,
                title: 'Fact & Claim Verification',
                desc: 'Cross-checks promotional superlatives, specs, and prices against approved facts under ASCI/CCPA regulations.'
              },
              {
                icon: Eye,
                title: 'Visual Brand Detective',
                desc: 'Validates logo clear space, official color palette adherence (#1F3B2E, #E8DCC6, #CBB3E8), and typography hierarchy.'
              },
              {
                icon: Sliders,
                title: 'AI Correction Studio',
                desc: 'Side-by-side original vs. suggested view. Accept, edit, or reject improvements. Original text is never overwritten.'
              },
              {
                icon: CheckCircle,
                title: 'Approval & Revision Hub',
                desc: 'Human reviewer workflows: request changes, add contextual comments, approve or reject, backed by complete audit logs.'
              },
              {
                icon: Layers,
                title: 'Accessibility Checker',
                desc: 'Evaluates WCAG 2.2 color contrast (4.5:1 ratio), Flesch-Kincaid readability scoring, and plain language standards.'
              }
            ].map((f, i) => (
              <div 
                key={i} 
                className="p-6 rounded-2xl bg-[#E8DCC6]/40 border border-[#1F3B2E]/10 hover:border-[#1F3B2E]/30 transition-all hover:-translate-y-1 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1F3B2E] text-[#E8DCC6] flex items-center justify-center mb-4 shadow-sm">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1F3B2E] mb-2">{f.title}</h3>
                <p className="text-xs text-[#1F3B2E]/80 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-[#E8DCC6]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#1F3B2E]/70 uppercase">Workflow Engine</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F3B2E] mt-2 mb-4">
              How SAAKHYA Operates in Practice
            </h2>
            <p className="text-base text-[#1F3B2E]/80">
              A transparent, 5-stage human-in-the-loop pipeline where AI provides intelligence and humans retain full authority.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              { num: '01', title: 'Brand DNA Setup', desc: 'Admin configures rules, facts, approved terminology, and tone boundaries.' },
              { num: '02', title: 'Content Ingestion', desc: 'Creator submits copy, PDF brochures, or ad creative assets.' },
              { num: '03', title: 'AI Detection', desc: 'System parses text and cross-references against Brand DNA rules.' },
              { num: '04', title: 'Explain & Suggest', desc: 'AI highlights issues, cites official sources, and offers replacement copy.' },
              { num: '05', title: 'Human Decision', desc: 'Creator & Reviewer accept, modify, or approve the final version.' }
            ].map((step, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#F7F3EB] border border-[#1F3B2E]/10 relative">
                <span className="text-2xl font-black text-[#9F79CE]/50 mb-2 block">{step.num}</span>
                <h4 className="text-base font-bold text-[#1F3B2E] mb-2">{step.title}</h4>
                <p className="text-xs text-[#1F3B2E]/80 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Major Innovations Section (Round 3 Improvements) */}
      <section id="innovations" className="py-24 px-6 bg-[#1F3B2E] text-[#E8DCC6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CBB3E8]/20 text-[#CBB3E8] border border-[#CBB3E8]/30 mb-4 text-xs font-bold tracking-wider uppercase">
              <Zap className="w-3.5 h-3.5" />
              <span>Round 3 Innovations</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#E8DCC6] mt-2 mb-4">
              Predictive, Adaptive Brand Intelligence
            </h2>
            <p className="text-base text-[#E8DCC6]/80">
              Beyond passive checking: simulate future rules, map asset cascades, and evolve guidelines automatically from real human feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Innovation 1: Test My New Rules */}
            <div className="p-8 rounded-3xl bg-[#14271E] border border-[#CBB3E8]/20 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#CBB3E8] text-[#1F3B2E] flex items-center justify-center mb-6 font-bold">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold tracking-widest text-[#CBB3E8] uppercase">Innovation 01</span>
                <h3 className="text-2xl font-bold text-[#E8DCC6] mt-2 mb-3">Test My New Rules</h3>
                <p className="text-sm text-[#E8DCC6]/80 leading-relaxed mb-6">
                  Simulate proposed brand guidelines against your entire historical content archive before enacting them. Predict compliance friction and view retroactive impact reports.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#1F3B2E] border border-[#CBB3E8]/10 text-xs text-[#E8DCC6]/90">
                <span className="text-[#CBB3E8] font-bold">Benefit: </span>
                Prevent unintended chaos across campaigns prior to guideline launch.
              </div>
            </div>

            {/* Innovation 2: Brand Butterfly Effect */}
            <div className="p-8 rounded-3xl bg-[#14271E] border border-[#CBB3E8]/20 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#CBB3E8] text-[#1F3B2E] flex items-center justify-center mb-6 font-bold">
                  <GitBranch className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold tracking-widest text-[#CBB3E8] uppercase">Innovation 02</span>
                <h3 className="text-2xl font-bold text-[#E8DCC6] mt-2 mb-3">Brand Butterfly Effect</h3>
                <p className="text-sm text-[#E8DCC6]/80 leading-relaxed mb-6">
                  Interactive multi-tier dependency mapping showing how altering a single rule cascades across connected social media, ad campaigns, websites, and slide decks.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#1F3B2E] border border-[#CBB3E8]/10 text-xs text-[#E8DCC6]/90">
                <span className="text-[#CBB3E8] font-bold">Benefit: </span>
                Prioritize revisions across high-impact and regulatory-risk assets.
              </div>
            </div>

            {/* Innovation 3: Brand Evolution Intelligence */}
            <div className="p-8 rounded-3xl bg-[#14271E] border border-[#CBB3E8]/20 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#CBB3E8] text-[#1F3B2E] flex items-center justify-center mb-6 font-bold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold tracking-widest text-[#CBB3E8] uppercase">Innovation 03</span>
                <h3 className="text-2xl font-bold text-[#E8DCC6] mt-2 mb-3">Brand Evolution Intelligence</h3>
                <p className="text-sm text-[#E8DCC6]/80 leading-relaxed mb-6">
                  Identifies chronic violation patterns and confusing brand guidelines. Recommends targeted, human-approved guideline refinements for continuous improvement.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#1F3B2E] border border-[#CBB3E8]/10 text-xs text-[#E8DCC6]/90">
                <span className="text-[#CBB3E8] font-bold">Benefit: </span>
                Eliminates creator friction by evolving guidelines around real usage.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governance & Trust Section */}
      <section id="governance" className="py-20 px-6 bg-[#E8DCC6]">
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#F7F3EB] border border-[#1F3B2E]/15 p-8 sm:p-12 shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-3xl bg-[#1F3B2E] text-[#CBB3E8] flex items-center justify-center shrink-0">
              <Lock className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#1F3B2E] mb-2">
                Ethical, Responsible & Explainable AI Architecture
              </h3>
              <p className="text-sm text-[#1F3B2E]/80 leading-relaxed mb-4">
                SAAKHYA is built around strict data privacy and regulatory compliance. The platform never hallucinates guidelines, never auto-approves or auto-publishes content, and ensures every finding is cited back to approved Brand DNA sources.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#1F3B2E]">
                <span className="px-3 py-1 rounded-full bg-[#1F3B2E]/10">✓ ASCI Self-Regulation Compliant</span>
                <span className="px-3 py-1 rounded-full bg-[#1F3B2E]/10">✓ CCPA Advertising Guidelines</span>
                <span className="px-3 py-1 rounded-full bg-[#1F3B2E]/10">✓ WCAG 2.2 Level AAA Target</span>
                <span className="px-3 py-1 rounded-full bg-[#1F3B2E]/10">✓ Immutable Audit Logs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#14271E] text-[#E8DCC6] py-14 px-6 border-t border-[#CBB3E8]/15">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <img 
              src="/assets/saakhya-logo.png" 
              alt="SAAKHYA Logo" 
              className="h-9 w-auto brightness-110"
            />
            <p className="text-xs text-[#E8DCC6]/70 max-w-sm text-center md:text-left">
              Intelligent Brand Governance Platform — Protecting Brand Identity. Empowering Every Creator.
            </p>
          </div>

          <div className="text-center md:text-right">
            <div className="text-sm font-bold text-[#E8DCC6] mb-1">CODENEXUS — Team HORIZON</div>
            <p className="text-xs text-[#E8DCC6]/60">
              Kshitij Laddad • Samruddhi Garje • Sanskruti Shinde • Nishika Katariya
            </p>
            <p className="text-xs text-[#E8DCC6]/40 mt-2">
              © 2026 SAAKHYA. All rights reserved. Source of Truth: saakhya-brand-governance.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
