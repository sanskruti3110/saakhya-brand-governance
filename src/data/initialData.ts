import { BrandGuideline, ContentSubmission, ButterflyNode, EvolutionPattern, User } from '../types';

export const INITIAL_USER: User = {
  id: 'usr-1',
  name: 'Sanskruti Shinde',
  email: 'sanskruti@saakhya.horizon',
  role: 'admin',
  organisation: 'Horizon Enterprise',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
};

export const INITIAL_GUIDELINES: BrandGuideline[] = [
  {
    id: 'bg-1',
    category: 'claims',
    title: 'No Unsupported Absolute Superlatives & Guarantees',
    ruleStatement: 'Never use absolute claims such as "100% Guaranteed", "The World\'s Best", or "Unbeatable Performance" without accredited third-party validation.',
    rationale: 'Complies with ASCI Code for Self-Regulation Chapter I and CCPA Misleading Advertisement Guidelines. Protects brand trust and regulatory compliance.',
    severity: 'Critical',
    restrictedClaims: ['100% guaranteed', 'world\'s best', 'unbeatable', 'cheapest on earth', 'zero risk guaranteed'],
    version: 'v2.1',
    status: 'active',
    lastUpdated: '2026-10-28',
    updatedBy: 'Kshitij Laddad'
  },
  {
    id: 'bg-2',
    category: 'terminology',
    title: 'Approved Product & AI Terminology',
    ruleStatement: 'Use "Autonomous Agent Layer" and "Governed Workflow" instead of deprecated terms like "Automated Robot" or "Magic Bot".',
    rationale: 'Establishes enterprise rigor and eliminates childish or misleading AI hype.',
    severity: 'High',
    forbiddenTerms: ['magic bot', 'automated robot', 'cheap AI', 'foolproof', 'black box'],
    approvedTerms: ['Autonomous Agent Layer', 'Governed Workflow', 'Intelligent Brand Governance', 'Human-in-the-Loop'],
    version: 'v2.0',
    status: 'active',
    lastUpdated: '2026-10-15',
    updatedBy: 'Sanskruti Shinde'
  },
  {
    id: 'bg-3',
    category: 'facts',
    title: 'Verified Enterprise Product Specifications',
    ruleStatement: 'Product metrics must reference approved benchmark specs: 99.95% uptime SLA, SOC-2 Type II Certified, ISO 27001 compliant.',
    rationale: 'Prevents sales and marketing teams from quoting outdated 99.9% uptime or misrepresenting security credentials.',
    severity: 'High',
    verifiedFacts: [
      '99.95% enterprise uptime SLA',
      'SOC-2 Type II certified',
      'End-to-end encrypted storage',
      'ASCI Code Chapter 1 compliant'
    ],
    version: 'v1.4',
    status: 'active',
    lastUpdated: '2026-09-30',
    updatedBy: 'Nishika Katariya'
  },
  {
    id: 'bg-4',
    category: 'voice',
    title: 'Empowering, Objective, and Trustworthy Voice',
    ruleStatement: 'Maintain an empathetic, collaborative, and dignified tone. Avoid aggressive high-pressure sales jargon or condescending language.',
    rationale: 'SAAKHYA is a trusted partner to human creators, not an adversarial enforcer.',
    severity: 'Medium',
    version: 'v1.2',
    status: 'active',
    lastUpdated: '2026-09-12',
    updatedBy: 'Samruddhi Garje'
  },
  {
    id: 'bg-5',
    category: 'visual',
    title: 'Visual Identity & Color Palette Adherence',
    ruleStatement: 'Primary palette must adhere strictly to Oatmeal (#E8DCC6), Pine Green (#1F3B2E), and Soft Lilac (#CBB3E8). Logo clear-space must be 20% of emblem width.',
    rationale: 'Maintains cohesive, premium brand aesthetic across print, digital, and social channels.',
    severity: 'High',
    version: 'v2.0',
    status: 'active',
    lastUpdated: '2026-10-01',
    updatedBy: 'Samruddhi Garje'
  },
  {
    id: 'bg-6',
    category: 'regional',
    title: 'Multilingual Regional Accuracy (Hindi & Marathi)',
    ruleStatement: 'In Hindi and Marathi collateral, brand tagline must be faithfully rendered: "एआय शोधते. एआय स्पष्ट करते. मानवी निर्णय." / "एआई पहचानता है। एआई समझाता है। इंसान फैसला करता है।"',
    rationale: 'Ensures high cultural fidelity and prevents clumsy direct machine translations.',
    severity: 'Medium',
    language: 'All',
    version: 'v1.3',
    status: 'active',
    lastUpdated: '2026-10-18',
    updatedBy: 'Kshitij Laddad'
  },
  {
    id: 'bg-7',
    category: 'accessibility',
    title: 'WCAG 2.2 Contrast & Plain Language Standards',
    ruleStatement: 'Body copy text must achieve at least 4.5:1 contrast against backgrounds. Avoid convoluted sentences with reading grade levels exceeding Grade 9.',
    rationale: 'Mandatory compliance with W3C WAI accessibility guidelines.',
    severity: 'Medium',
    version: 'v1.1',
    status: 'active',
    lastUpdated: '2026-09-20',
    updatedBy: 'Sanskruti Shinde'
  }
];

export const INITIAL_SUBMISSIONS: ContentSubmission[] = [
  {
    id: 'sub-101',
    title: 'Product Ad Banner — Q4 Launch',
    type: 'creative',
    channel: 'Ad Campaign',
    campaign: 'Campaign X Enterprise',
    language: 'English',
    creatorName: 'Arjun Mehta',
    creatorEmail: 'arjun@horizon.agency',
    organisation: 'Horizon Marketing Agency',
    submittedAt: '2026-11-05 10:30',
    status: 'Needs Changes',
    complianceScore: 68,
    thumbnail: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=250',
    rawContent: 'Deploy our revolutionary magic bot platform today. Best-in-class performance, 100% guaranteed! We deliver the cheapest on earth cloud solution with zero downtime ever recorded.',
    currentContent: 'Deploy our revolutionary magic bot platform today. Best-in-class performance, 100% guaranteed! We deliver the cheapest on earth cloud solution with zero downtime ever recorded.',
    reviewerNotes: 'Flagged by AI for unverified guarantee and prohibited magic bot terminology. Please revise before resubmitting.',
    revisionHistory: [
      {
        revisionNumber: 1,
        timestamp: '2026-11-05 10:30',
        modifiedBy: 'Arjun Mehta',
        role: 'Creator',
        action: 'Initial Submission',
        contentSnapshot: 'Deploy our revolutionary magic bot platform today. Best-in-class performance, 100% guaranteed! We deliver the cheapest on earth cloud solution with zero downtime ever recorded.'
      }
    ],
    analysisReport: {
      id: 'rep-101',
      submissionId: 'sub-101',
      overallComplianceScore: 68,
      summary: 'Critical promotional claim violation detected: unsupported absolute guarantee and unapproved colloquial AI terminology.',
      analyzedAt: '2026-11-05 10:31',
      metrics: {
        readabilityScore: 78,
        readabilityLevel: 'Standard / Accessible',
        contrastRatio: '7.4:1 (Passes AAA)',
        detectedLanguage: 'English'
      },
      issues: [
        {
          id: 'iss-1',
          category: 'Claims',
          title: 'Unsupported Promotional Guarantee',
          severity: 'Critical',
          excerpt: 'Best-in-class performance, 100% guaranteed!',
          explanation: 'No approved organizational evidence supports "100% guaranteed". Under ASCI and CCPA rules, absolute guarantees without verified test audits risk regulatory notices.',
          supportingGuideline: 'Brand DNA: No Unsupported Absolute Superlatives & Guarantees [bg-1]',
          sourceId: 'bg-1',
          suggestedAction: 'Remove the absolute guarantee and cite verified enterprise SLA metrics.',
          suggestedReplacement: 'Engineered for high-reliability enterprise performance backed by a 99.95% uptime SLA.',
          status: 'unresolved'
        },
        {
          id: 'iss-2',
          category: 'Terminology',
          title: 'Deprecated Colloquial Terminology: "magic bot"',
          severity: 'High',
          excerpt: 'revolutionary magic bot platform',
          explanation: '"magic bot" is explicitly banned in Brand DNA. Use enterprise-grade governed terminology.',
          supportingGuideline: 'Brand DNA: Approved Product & AI Terminology [bg-2]',
          sourceId: 'bg-2',
          suggestedAction: 'Replace "magic bot" with "Autonomous Agent Layer".',
          suggestedReplacement: 'governed Autonomous Agent Layer',
          status: 'unresolved'
        },
        {
          id: 'iss-3',
          category: 'Claims',
          title: 'Unverified Cost Superlative',
          severity: 'Medium',
          excerpt: 'cheapest on earth cloud solution',
          explanation: '"cheapest on earth" lacks verifiable comparative market pricing data.',
          supportingGuideline: 'Brand DNA: No Unsupported Absolute Superlatives & Guarantees [bg-1]',
          sourceId: 'bg-1',
          suggestedAction: 'Highlight cost-efficiency and transparent pricing instead of superlative claims.',
          suggestedReplacement: 'cost-efficient cloud solution with predictable pricing',
          status: 'unresolved'
        }
      ]
    }
  },
  {
    id: 'sub-102',
    title: 'Summer Sale Poster — Circular Economy',
    type: 'creative',
    channel: 'Social Media',
    campaign: 'Summer Sustainability 2026',
    language: 'English',
    creatorName: 'Riya Verma',
    creatorEmail: 'riya@horizon.org',
    organisation: 'Design Team',
    submittedAt: '2026-11-05 11:15',
    status: 'Pending Approval',
    complianceScore: 92,
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=250',
    rawContent: 'Embrace sustainable innovation with our Summer Series. 100% recycled packaging, verified carbon offsets, and ethical sourcing for every product.',
    currentContent: 'Embrace sustainable innovation with our Summer Series. 100% recycled packaging, verified carbon offsets, and ethical sourcing for every product.',
    revisionHistory: [
      {
        revisionNumber: 1,
        timestamp: '2026-11-05 11:15',
        modifiedBy: 'Riya Verma',
        role: 'Creator',
        action: 'Initial Submission',
        contentSnapshot: 'Embrace sustainable innovation with our Summer Series. 100% recycled packaging, verified carbon offsets, and ethical sourcing for every product.'
      }
    ],
    analysisReport: {
      id: 'rep-102',
      submissionId: 'sub-102',
      overallComplianceScore: 92,
      summary: 'Minor tone optimization: claims are verified by environmental audit report v2.',
      analyzedAt: '2026-11-05 11:16',
      metrics: {
        readabilityScore: 82,
        readabilityLevel: 'Easy / Accessible',
        contrastRatio: '6.8:1 (Passes AA)',
        detectedLanguage: 'English'
      },
      issues: [
        {
          id: 'iss-4',
          category: 'Tone',
          title: 'Environmental Disclaimer Attribution',
          severity: 'Low',
          excerpt: '100% recycled packaging',
          explanation: 'Best practice recommendation: append certified FSC recycling badge reference.',
          supportingGuideline: 'Brand DNA: Verified Enterprise Product Specifications [bg-3]',
          sourceId: 'bg-3',
          suggestedAction: 'Add footnote reference to FSC-C123456 certification.',
          suggestedReplacement: '100% recycled packaging (FSC-certified)',
          status: 'unresolved'
        }
      ]
    }
  },
  {
    id: 'sub-103',
    title: 'Website Copy Update — Governance Overview',
    type: 'document',
    channel: 'Website',
    campaign: 'Core Web 2026',
    language: 'English',
    creatorName: 'Devika Nair',
    creatorEmail: 'devika@horizon.org',
    organisation: 'Content Team',
    submittedAt: '2026-11-04 16:45',
    status: 'Approved',
    complianceScore: 98,
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=250',
    rawContent: 'SAAKHYA empowers your enterprise to maintain consistent brand identity. Our governed Autonomous Agent Layer detects deviations, explains context with verified Brand DNA citations, and keeps humans firmly in control.',
    currentContent: 'SAAKHYA empowers your enterprise to maintain consistent brand identity. Our governed Autonomous Agent Layer detects deviations, explains context with verified Brand DNA citations, and keeps humans firmly in control.',
    reviewerNotes: 'Exemplary alignment with brand values and terminology guidelines. Approved for website deployment.',
    revisionHistory: [
      {
        revisionNumber: 1,
        timestamp: '2026-11-04 16:45',
        modifiedBy: 'Devika Nair',
        role: 'Creator',
        action: 'Submission',
        contentSnapshot: 'SAAKHYA empowers your enterprise...'
      },
      {
        revisionNumber: 2,
        timestamp: '2026-11-04 17:30',
        modifiedBy: 'Kshitij Laddad',
        role: 'Reviewer',
        action: 'Approved',
        contentSnapshot: 'SAAKHYA empowers your enterprise...',
        notes: 'Approved without modifications.'
      }
    ]
  },
  {
    id: 'sub-104',
    title: 'Maharashtra Regional Launch Brochure (मराठी)',
    type: 'pdf',
    channel: 'Brochure',
    campaign: 'Western Region Outreach',
    language: 'Marathi',
    creatorName: 'Tanmay Kulkarni',
    creatorEmail: 'tanmay@horizon.org',
    organisation: 'Regional Team',
    submittedAt: '2026-11-05 09:20',
    status: 'Pending Approval',
    complianceScore: 89,
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=250',
    rawContent: 'आमची स्वायत्त प्रणाली प्रत्येक ब्रँड नियमाचे काटेकोरपणे पालन करते. एआय शोधते. एआय स्पष्ट करते. मानवी निर्णय. १००% अचूकतेची खात्री.',
    currentContent: 'आमची स्वायत्त प्रणाली प्रत्येक ब्रँड नियमाचे काटेकोरपणे पालन करते. एआय शोधते. एआय स्पष्ट करते. मानवी निर्णय. १००% अचूकतेची खात्री.',
    revisionHistory: [
      {
        revisionNumber: 1,
        timestamp: '2026-11-05 09:20',
        modifiedBy: 'Tanmay Kulkarni',
        role: 'Creator',
        action: 'Initial Submission',
        contentSnapshot: 'आमची स्वायत्त प्रणाली...'
      }
    ],
    analysisReport: {
      id: 'rep-104',
      submissionId: 'sub-104',
      overallComplianceScore: 89,
      summary: 'मराठी टॅगलाईन योग्य आहे. "१००% अचूकतेची खात्री" या दाव्यामध्ये दुरुस्ती आवश्यक आहे.',
      analyzedAt: '2026-11-05 09:22',
      metrics: {
        readabilityScore: 85,
        readabilityLevel: 'उच्च सुलभता (High Accessibility)',
        contrastRatio: '7.1:1 (Passes AAA)',
        detectedLanguage: 'Marathi'
      },
      issues: [
        {
          id: 'iss-5',
          category: 'Claims',
          title: 'असमर्थित परिपूर्ण दावा (Unsupported Guarantee Claim)',
          severity: 'High',
          excerpt: '१००% अचूकतेची खात्री',
          explanation: '"१००% अचूकतेची खात्री" हा दावा विना पुरावा वापरता येत नाही.',
          supportingGuideline: 'Brand DNA: No Unsupported Absolute Superlatives & Guarantees [bg-1]',
          sourceId: 'bg-1',
          suggestedAction: 'दावा सौम्य करून प्रमाणित कार्यक्षमतेचा उल्लेख करा.',
          suggestedReplacement: 'विश्वसनीय आणि प्रमाणित कार्यक्षमतेची हमी',
          status: 'unresolved'
        }
      ]
    }
  }
];

export const INITIAL_BUTTERFLY_NODES: ButterflyNode[] = [
  {
    id: 'node-rule-1',
    title: 'Rule: Ban Unsupported Absolute Guarantees',
    type: 'rule',
    impactLevel: 'direct',
    details: 'Core policy banning terms like "100% Guaranteed" and "Zero Risk".',
    connections: ['node-camp-1', 'node-camp-2', 'node-chan-social', 'node-chan-ads']
  },
  {
    id: 'node-camp-1',
    title: 'Campaign X Enterprise Launch',
    type: 'campaign',
    impactLevel: 'direct',
    details: 'Contains 14 active collateral items quoting performance guarantees.',
    connections: ['node-asset-ad', 'node-chan-ads']
  },
  {
    id: 'node-camp-2',
    title: 'Summer Sustainability 2026',
    type: 'campaign',
    impactLevel: 'review',
    details: 'Contains 8 eco-statements that require FSC/ISO credential tagging.',
    connections: ['node-asset-poster', 'node-chan-social']
  },
  {
    id: 'node-chan-social',
    title: 'Social Media Channels (LinkedIn / X / IG)',
    type: 'channel',
    channel: 'Social Media',
    impactLevel: 'direct',
    details: '28 scheduled posts scheduled across regional handles.',
    connections: ['node-asset-poster']
  },
  {
    id: 'node-chan-ads',
    title: 'Paid Search & Meta Ads',
    type: 'channel',
    channel: 'Ad Campaign',
    impactLevel: 'direct',
    details: 'High regulatory exposure under ASCI / CCPA guidelines.',
    connections: ['node-asset-ad']
  },
  {
    id: 'node-asset-ad',
    title: 'Ad Banner: "100% Guaranteed Performance"',
    type: 'asset',
    impactLevel: 'direct',
    details: 'Violates new threshold. Requires immediate copy replacement.',
    connections: []
  },
  {
    id: 'node-asset-poster',
    title: 'Summer Eco Poster: "100% Recycled"',
    type: 'asset',
    impactLevel: 'review',
    details: 'Needs certification footnote appended before distribution.',
    connections: []
  }
];

export const INITIAL_EVOLUTION_PATTERNS: EvolutionPattern[] = [
  {
    id: 'evo-1',
    guidelineId: 'bg-1',
    guidelineTitle: 'No Unsupported Absolute Superlatives & Guarantees',
    recurringViolationCount: 24,
    patternSummary: 'Creators frequently write "guaranteed results" when describing product trial periods or POC guarantees.',
    userFrictionReason: 'Guideline does not clearly distinguish between legally binding financial money-back guarantees vs. unverified product performance claims.',
    recommendedImprovement: 'Clarify guideline to explicitly permit "30-Day Money-Back Guarantee for Enterprise POCs" with standard legal disclaimer.',
    status: 'pending_review'
  },
  {
    id: 'evo-2',
    guidelineId: 'bg-2',
    guidelineTitle: 'Approved Product & AI Terminology',
    recurringViolationCount: 18,
    patternSummary: 'Agency copywriters continue using "Chatbot" and "Bot" in customer support marketing copy.',
    userFrictionReason: 'External marketing agencies find "Autonomous Agent Layer" too technical for consumer-facing support landing pages.',
    recommendedImprovement: 'Add an approved tier: allow "Intelligent Assistant" for consumer support copy while preserving "Autonomous Agent Layer" for enterprise platform documentation.',
    status: 'pending_review'
  },
  {
    id: 'evo-3',
    guidelineId: 'bg-5',
    guidelineTitle: 'Visual Identity & Color Palette Adherence',
    recurringViolationCount: 12,
    patternSummary: 'Social creative designers repeatedly apply dark purple gradients instead of Soft Lilac (#CBB3E8).',
    userFrictionReason: 'Designers lack pre-built Figma/Canva swatches and struggle with lilac contrast on light backgrounds.',
    recommendedImprovement: 'Publish an approved Figma Color Token library with paired dark contrast tokens (#1F3B2E text on #CBB3E8 badge).',
    status: 'pending_review'
  }
];
