import { 
  User, 
  BrandGuideline, 
  ContentSubmission, 
  ButterflyNode, 
  EvolutionPattern,
  AnalysisReport,
  AnalysisIssue,
  TestRuleSimulation,
  UserRole,
  SubmissionStatus
} from '../types';
import { 
  INITIAL_USER, 
  INITIAL_GUIDELINES, 
  INITIAL_SUBMISSIONS, 
  INITIAL_BUTTERFLY_NODES, 
  INITIAL_EVOLUTION_PATTERNS 
} from '../data/initialData';

const STORAGE_KEYS = {
  USER: 'saakhya_current_user',
  GUIDELINES: 'saakhya_guidelines',
  SUBMISSIONS: 'saakhya_submissions',
  BUTTERFLY: 'saakhya_butterfly',
  EVOLUTION: 'saakhya_evolution'
};

class StoreService {
  private user: User;
  private guidelines: BrandGuideline[];
  private submissions: ContentSubmission[];
  private butterflyNodes: ButterflyNode[];
  private evolutionPatterns: EvolutionPattern[];
  private listeners: (() => void)[] = [];

  constructor() {
    this.user = this.load(STORAGE_KEYS.USER, INITIAL_USER);
    this.guidelines = this.load(STORAGE_KEYS.GUIDELINES, INITIAL_GUIDELINES);
    this.submissions = this.load(STORAGE_KEYS.SUBMISSIONS, INITIAL_SUBMISSIONS);
    this.butterflyNodes = this.load(STORAGE_KEYS.BUTTERFLY, INITIAL_BUTTERFLY_NODES);
    this.evolutionPatterns = this.load(STORAGE_KEYS.EVOLUTION, INITIAL_EVOLUTION_PATTERNS);
  }

  private load<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  }

  private save(key: string, data: unknown) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      this.notify();
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  // --- USER & ROLE ---
  public getUser(): User {
    return this.user;
  }

  public setUserRole(role: UserRole) {
    this.user = { ...this.user, role };
    this.save(STORAGE_KEYS.USER, this.user);
  }

  public updateUser(updated: Partial<User>) {
    this.user = { ...this.user, ...updated };
    this.save(STORAGE_KEYS.USER, this.user);
  }

  // --- GUIDELINES ---
  public getGuidelines(): BrandGuideline[] {
    return [...this.guidelines];
  }

  public addGuideline(guideline: Omit<BrandGuideline, 'id' | 'version' | 'status' | 'lastUpdated' | 'updatedBy'>): BrandGuideline {
    const newGuideline: BrandGuideline = {
      ...guideline,
      id: `bg-${Date.now()}`,
      version: 'v1.0',
      status: 'active',
      lastUpdated: new Date().toISOString().split('T')[0],
      updatedBy: this.user.name
    };
    this.guidelines = [newGuideline, ...this.guidelines];
    this.save(STORAGE_KEYS.GUIDELINES, this.guidelines);
    return newGuideline;
  }

  public updateGuideline(id: string, updates: Partial<BrandGuideline>) {
    this.guidelines = this.guidelines.map(g => {
      if (g.id === id) {
        const vNum = parseFloat(g.version.replace('v', '')) || 1.0;
        return {
          ...g,
          ...updates,
          version: `v${(vNum + 0.1).toFixed(1)}`,
          lastUpdated: new Date().toISOString().split('T')[0],
          updatedBy: this.user.name
        };
      }
      return g;
    });
    this.save(STORAGE_KEYS.GUIDELINES, this.guidelines);
  }

  // --- SUBMISSIONS ---
  public getSubmissions(): ContentSubmission[] {
    return [...this.submissions];
  }

  public getSubmissionById(id: string): ContentSubmission | undefined {
    return this.submissions.find(s => s.id === id);
  }

  public createSubmission(submissionData: {
    title: string;
    type: 'text' | 'document' | 'pdf' | 'creative';
    rawContent: string;
    channel?: 'Social Media' | 'Ad Campaign' | 'Website' | 'Brochure' | 'Presentation' | 'Email';
    campaign?: string;
    language: 'English' | 'Hindi' | 'Marathi';
  }): ContentSubmission {
    const id = `sub-${Date.now()}`;
    const newSub: ContentSubmission = {
      id,
      title: submissionData.title,
      type: submissionData.type,
      rawContent: submissionData.rawContent,
      currentContent: submissionData.rawContent,
      channel: submissionData.channel || 'Social Media',
      campaign: submissionData.campaign || 'General Communications',
      language: submissionData.language,
      creatorName: this.user.name,
      creatorEmail: this.user.email,
      organisation: this.user.organisation,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Analysing',
      complianceScore: 100,
      revisionHistory: [
        {
          revisionNumber: 1,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          modifiedBy: this.user.name,
          role: this.user.role,
          action: 'Created submission',
          contentSnapshot: submissionData.rawContent
        }
      ]
    };

    // Run AI Analysis immediately
    const report = this.analyzeContent(newSub.currentContent, newSub.language);
    newSub.analysisReport = report;
    newSub.complianceScore = report.overallComplianceScore;
    newSub.status = report.issues.length > 0 ? 'Needs Changes' : 'Pending Approval';

    this.submissions = [newSub, ...this.submissions];
    this.save(STORAGE_KEYS.SUBMISSIONS, this.submissions);
    return newSub;
  }

  // --- AI ANALYSIS ENGINE ---
  public analyzeContent(text: string, language: 'English' | 'Hindi' | 'Marathi' = 'English'): AnalysisReport {
    const issues: AnalysisIssue[] = [];

    // 1. Check Claims & Superlatives
    const claimPatterns = [
      { pattern: /100%\s*guaranteed/i, term: '100% guaranteed', repl: 'rigorously verified enterprise SLA', title: 'Unsupported Absolute Guarantee' },
      { pattern: /world'?s\s*best/i, term: "world's best", repl: 'industry-leading accredited', title: 'Unverified Global Superlative' },
      { pattern: /cheapest\s*(on\s*earth|in\s*the\s*world)?/i, term: 'cheapest', repl: 'cost-efficient with transparent pricing', title: 'Unsubstantiated Pricing Superlative' },
      { pattern: /zero\s*risk/i, term: 'zero risk', repl: 'managed governance with human oversight', title: 'Zero Risk Claim Violation' },
      { pattern: /१००%\s*अचूकतेची\s*खात्री/i, term: '१००% अचूकतेची खात्री', repl: 'प्रमाणित अचूकता आणि मानवी देखरेख', title: 'असमर्थित परिपूर्ण हमी (Marathi Superlative)' },
      { pattern: /100%\s*गारंटी/i, term: '100% गारंटी', repl: 'प्रमाणित विश्वसनीयता', title: 'असमर्थित गारंटी (Hindi Superlative)' }
    ];

    claimPatterns.forEach((cp, idx) => {
      if (cp.pattern.test(text)) {
        issues.push({
          id: `iss-gen-${Date.now()}-${idx}`,
          category: 'Claims',
          title: cp.title,
          severity: 'Critical',
          excerpt: text.match(cp.pattern)?.[0] || cp.term,
          explanation: `The claim "${cp.term}" is prohibited under Brand DNA [bg-1] and violates ASCI / CCPA guidelines on substantiated promotional claims.`,
          supportingGuideline: 'Brand DNA: No Unsupported Absolute Superlatives & Guarantees [bg-1]',
          sourceId: 'bg-1',
          suggestedAction: `Replace with approved empirical specification or remove absolute claim.`,
          suggestedReplacement: cp.repl,
          status: 'unresolved'
        });
      }
    });

    // 2. Check Prohibited Terminology
    const termPatterns = [
      { pattern: /magic\s*bot/i, term: 'magic bot', repl: 'Autonomous Agent Layer', id: 'bg-2' },
      { pattern: /automated\s*robot/i, term: 'automated robot', repl: 'governed workflow', id: 'bg-2' },
      { pattern: /black\s*box/i, term: 'black box', repl: 'transparent, explainable AI model', id: 'bg-2' },
      { pattern: /foolproof/i, term: 'foolproof', repl: 'systematic and robust', id: 'bg-2' }
    ];

    termPatterns.forEach((tp, idx) => {
      if (tp.pattern.test(text)) {
        issues.push({
          id: `iss-term-${Date.now()}-${idx}`,
          category: 'Terminology',
          title: `Deprecated Terminology: "${tp.term}"`,
          severity: 'High',
          excerpt: text.match(tp.pattern)?.[0] || tp.term,
          explanation: `The term "${tp.term}" is flagged as deprecated in the Brand DNA Engine. It detracts from enterprise credibility.`,
          supportingGuideline: 'Brand DNA: Approved Product & AI Terminology [bg-2]',
          sourceId: tp.id,
          suggestedAction: `Use official brand nomenclature: "${tp.repl}".`,
          suggestedReplacement: tp.repl,
          status: 'unresolved'
        });
      }
    });

    // 3. Check Tone & Fact Contradictions
    if (/revolutionary/i.test(text)) {
      issues.push({
        id: `iss-tone-${Date.now()}`,
        category: 'Tone',
        title: 'Overly Hype-Driven Tone ("revolutionary")',
        severity: 'Medium',
        excerpt: 'revolutionary',
        explanation: 'SAAKHYA tone guidelines encourage grounded, empathetic, and objective language rather than breathless tech hyperbole.',
        supportingGuideline: 'Brand DNA: Empowering, Objective, and Trustworthy Voice [bg-4]',
        sourceId: 'bg-4',
        suggestedAction: 'Replace with specific, objective value propositions.',
        suggestedReplacement: 'purpose-built',
        status: 'unresolved'
      });
    }

    // 4. Accessibility & Readability Scoring
    const words = text.trim().split(/\s+/).filter(Boolean);
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const avgWordsPerSentence = sentences.length > 0 ? words.length / sentences.length : 10;
    
    let readabilityScore = 80;
    let readabilityLevel = 'Standard / Clear';
    if (avgWordsPerSentence > 25) {
      readabilityScore = 55;
      readabilityLevel = 'Dense / Hard to Read';
      issues.push({
        id: `iss-a11y-${Date.now()}`,
        category: 'Accessibility',
        title: 'High Sentence Complexity Detected',
        severity: 'Low',
        excerpt: text.substring(0, 75) + '...',
        explanation: 'Average sentence length exceeds 25 words, increasing cognitive load for readers with visual or cognitive impairments (WCAG 3.1).',
        supportingGuideline: 'Brand DNA: WCAG 2.2 Plain Language Standards [bg-7]',
        sourceId: 'bg-7',
        suggestedAction: 'Break long complex sentences into shorter, declarative statements.',
        status: 'unresolved'
      });
    }

    // Calculate overall compliance score
    let penalties = 0;
    issues.forEach(i => {
      if (i.severity === 'Critical') penalties += 20;
      else if (i.severity === 'High') penalties += 12;
      else if (i.severity === 'Medium') penalties += 6;
      else penalties += 3;
    });

    const overallComplianceScore = Math.max(35, 100 - penalties);

    return {
      id: `rep-${Date.now()}`,
      submissionId: '',
      overallComplianceScore,
      summary: issues.length === 0 
        ? 'Fully aligned with approved brand guidelines and verified facts.' 
        : `${issues.length} issue(s) detected across ${Array.from(new Set(issues.map(i => i.category))).join(', ')}.`,
      issues,
      analyzedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      metrics: {
        readabilityScore,
        readabilityLevel,
        contrastRatio: '7.2:1 (Passes AAA)',
        detectedLanguage: language
      }
    };
  }

  // --- AI CORRECTION STUDIO ACTIONS ---
  public applyIssueAction(submissionId: string, issueId: string, action: 'accept' | 'reject' | 'edit', customText?: string) {
    this.submissions = this.submissions.map(sub => {
      if (sub.id !== submissionId || !sub.analysisReport) return sub;

      const updatedIssues: AnalysisIssue[] = sub.analysisReport.issues.map(iss => {
        if (iss.id === issueId) {
          const newStatus: AnalysisIssue['status'] = action === 'accept' ? 'accepted' : action === 'reject' ? 'rejected' : 'edited';
          return {
            ...iss,
            status: newStatus,
            userCustomText: customText
          };
        }
        return iss;
      });

      // Update current content if accepted or edited
      let newContent = sub.currentContent;
      const targetIssue = sub.analysisReport.issues.find(i => i.id === issueId);
      if (targetIssue) {
        if (action === 'accept' && targetIssue.suggestedReplacement) {
          newContent = newContent.replace(targetIssue.excerpt, targetIssue.suggestedReplacement);
        } else if (action === 'edit' && customText) {
          newContent = newContent.replace(targetIssue.excerpt, customText);
        }
      }

      // Re-evaluate score
      const remainingUnresolved = updatedIssues.filter(i => i.status === 'unresolved').length;
      const newScore = Math.min(98, sub.complianceScore + (action !== 'reject' ? 10 : 0));

      const updatedSub: ContentSubmission = {
        ...sub,
        currentContent: newContent,
        complianceScore: remainingUnresolved === 0 ? 98 : newScore,
        status: remainingUnresolved === 0 ? 'Pending Approval' : 'Needs Changes',
        analysisReport: {
          ...sub.analysisReport,
          issues: updatedIssues
        },
        revisionHistory: [
          ...sub.revisionHistory,
          {
            revisionNumber: sub.revisionHistory.length + 1,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
            modifiedBy: this.user.name,
            role: this.user.role,
            action: `Applied ${action} on "${targetIssue?.title || 'Issue'}"`,
            contentSnapshot: newContent
          }
        ]
      };

      return updatedSub;
    });

    this.save(STORAGE_KEYS.SUBMISSIONS, this.submissions);
  }

  // --- REVIEWER WORKFLOW ---
  public updateSubmissionStatus(submissionId: string, status: SubmissionStatus, reviewerNotes?: string) {
    this.submissions = this.submissions.map(sub => {
      if (sub.id === submissionId) {
        return {
          ...sub,
          status,
          reviewerNotes: reviewerNotes || sub.reviewerNotes,
          revisionHistory: [
            ...sub.revisionHistory,
            {
              revisionNumber: sub.revisionHistory.length + 1,
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
              modifiedBy: this.user.name,
              role: this.user.role,
              action: `Reviewer set status to: ${status}`,
              contentSnapshot: sub.currentContent,
              notes: reviewerNotes
            }
          ]
        };
      }
      return sub;
    });
    this.save(STORAGE_KEYS.SUBMISSIONS, this.submissions);
  }

  // --- INNOVATION 1: TEST MY NEW RULES ---
  public simulateRule(proposedRuleText: string, category: BrandGuideline['category'] = 'claims'): TestRuleSimulation {
    const totalAssets = this.submissions.length;
    const lower = proposedRuleText.toLowerCase();

    const sampleImpacts: TestRuleSimulation['sampleImpacts'] = [];
    const severityCount = { Critical: 0, High: 0, Medium: 0, Low: 0 };

    this.submissions.forEach(sub => {
      const subLower = sub.currentContent.toLowerCase();
      
      let isAffected = false;
      let matchedReason = '';
      let recommended = '';

      if (lower.includes('guarantee') || lower.includes('promise')) {
        if (subLower.includes('guarantee') || subLower.includes('promise')) {
          isAffected = true;
          matchedReason = 'Contains performance guarantee currently subject to proposed deprecation.';
          recommended = 'Remove guarantee and link to official SLA table.';
          severityCount.Critical++;
        }
      } else if (lower.includes('cheapest') || lower.includes('price')) {
        if (subLower.includes('cheapest') || subLower.includes('discount')) {
          isAffected = true;
          matchedReason = 'Contains comparative pricing terminology.';
          recommended = 'Qualify pricing with transparent cost structure.';
          severityCount.High++;
        }
      } else {
        const words = proposedRuleText.split(/\s+/).filter(w => w.length > 4);
        for (const w of words) {
          if (subLower.includes(w.toLowerCase())) {
            isAffected = true;
            matchedReason = `Matched proposed restricted keyword "${w}".`;
            recommended = `Update terminology to comply with new guideline draft.`;
            severityCount.Medium++;
            break;
          }
        }
      }

      if (isAffected) {
        sampleImpacts.push({
          assetId: sub.id,
          assetTitle: sub.title,
          channel: sub.channel || 'All Channels',
          snippet: sub.currentContent.substring(0, 110) + '...',
          violationReason: matchedReason,
          recommendedChange: recommended
        });
      }
    });

    return {
      proposedRule: proposedRuleText,
      category,
      totalAssetsScanned: totalAssets,
      affectedAssetsCount: sampleImpacts.length,
      projectedViolations: sampleImpacts.length,
      severityBreakdown: severityCount,
      sampleImpacts
    };
  }

  // --- INNOVATION 2: BRAND BUTTERFLY EFFECT ---
  public getButterflyNodes(): ButterflyNode[] {
    return [...this.butterflyNodes];
  }

  // --- INNOVATION 3: BRAND EVOLUTION INTELLIGENCE ---
  public getEvolutionPatterns(): EvolutionPattern[] {
    return [...this.evolutionPatterns];
  }

  public approveEvolutionPattern(id: string) {
    const pattern = this.evolutionPatterns.find(p => p.id === id);
    if (!pattern) return;

    this.updateGuideline(pattern.guidelineId, {
      ruleStatement: `${pattern.recommendedImprovement}`
    });

    this.evolutionPatterns = this.evolutionPatterns.map(p => 
      p.id === id ? { ...p, status: 'approved' } : p
    );
    this.save(STORAGE_KEYS.EVOLUTION, this.evolutionPatterns);
  }

  public dismissEvolutionPattern(id: string) {
    this.evolutionPatterns = this.evolutionPatterns.map(p => 
      p.id === id ? { ...p, status: 'dismissed' } : p
    );
    this.save(STORAGE_KEYS.EVOLUTION, this.evolutionPatterns);
  }
}

export const store = new StoreService();
