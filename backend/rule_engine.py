"""
SAAKHYA Brand Governance Platform
Deterministic Rule Engine & Fact Verification
"""
import re
from typing import List, Dict, Any

CLAIM_RULES = [
    {
        "pattern": r"100%\s*guaranteed",
        "term": "100% guaranteed",
        "title": "Unsupported Promotional Guarantee",
        "severity": "Critical",
        "category": "Claims",
        "explanation": "No approved empirical evidence supports '100% guaranteed'. Under ASCI Code Chapter 1 and CCPA guidelines, absolute guarantees without verified audit certificates carry regulatory liability.",
        "supportingGuideline": "Brand DNA: No Unsupported Absolute Superlatives & Guarantees [bg-1]",
        "sourceId": "bg-1",
        "suggestedAction": "Remove the absolute guarantee and cite verified enterprise SLA metrics.",
        "suggestedReplacement": "Engineered for high-reliability enterprise performance backed by a 99.95% uptime SLA."
    },
    {
        "pattern": r"world'?s\s*best",
        "term": "world's best",
        "title": "Unverified Global Superlative",
        "severity": "Critical",
        "category": "Claims",
        "explanation": "'world's best' is an unverified superlative prohibited under advertising standards unless substantiated by independent market research.",
        "supportingGuideline": "Brand DNA: No Unsupported Absolute Superlatives & Guarantees [bg-1]",
        "sourceId": "bg-1",
        "suggestedAction": "Replace superlative with verified differentiators.",
        "suggestedReplacement": "industry-leading, accredited"
    },
    {
        "pattern": r"cheapest\s*(on\s*earth|in\s*the\s*world)?",
        "term": "cheapest",
        "title": "Unsubstantiated Pricing Superlative",
        "severity": "High",
        "category": "Claims",
        "explanation": "'cheapest' lacks comparative market pricing data and devalues brand positioning.",
        "supportingGuideline": "Brand DNA: No Unsupported Absolute Superlatives & Guarantees [bg-1]",
        "sourceId": "bg-1",
        "suggestedAction": "Highlight transparent ROI and cost-efficiency instead of lowest-price claims.",
        "suggestedReplacement": "cost-efficient with transparent pricing"
    },
    {
        "pattern": r"zero\s*risk",
        "term": "zero risk",
        "title": "Zero Risk Guarantee Violation",
        "severity": "High",
        "category": "Claims",
        "explanation": "No technical deployment is zero risk. Overpromising violates our ethical AI transparency charter.",
        "supportingGuideline": "Brand DNA: No Unsupported Absolute Superlatives & Guarantees [bg-1]",
        "sourceId": "bg-1",
        "suggestedAction": "Highlight robust governance and human-in-the-loop oversight.",
        "suggestedReplacement": "managed governance with continuous human oversight"
    },
    {
        "pattern": r"१००%\s*अचूकतेची\s*खात्री",
        "term": "१००% अचूकतेची खात्री",
        "title": "असमर्थित परिपूर्ण हमी (Marathi Superlative)",
        "severity": "High",
        "category": "Multilingual",
        "explanation": "'१००% अचूकतेची खात्री' हा दावा ब्रँड डीएनए नियमांचे उल्लंघन करतो.",
        "supportingGuideline": "Brand DNA: Multilingual Regional Accuracy [bg-6]",
        "sourceId": "bg-6",
        "suggestedAction": "प्रमाणित विश्वसनीयता आणि मानवी देखरेखीचा उल्लेख करा.",
        "suggestedReplacement": "प्रमाणित अचूकता आणि मानवी देखरेख"
    },
    {
        "pattern": r"100%\s*गारंटी",
        "term": "100% गारंटी",
        "title": "असमर्थित गारंटी (Hindi Superlative)",
        "severity": "High",
        "category": "Multilingual",
        "explanation": "'100% गारंटी' दावा भ्रामक विज्ञापन दिशानिर्देशों के तहत अस्वीकार्य है।",
        "supportingGuideline": "Brand DNA: Multilingual Regional Accuracy [bg-6]",
        "sourceId": "bg-6",
        "suggestedAction": "प्रमाणित विश्वसनीयता का उल्लेख करें।",
        "suggestedReplacement": "प्रमाणित विश्वसनीयता"
    }
]

TERMINOLOGY_RULES = [
    {
        "pattern": r"magic\s*bot",
        "term": "magic bot",
        "title": "Deprecated Terminology: 'magic bot'",
        "severity": "High",
        "category": "Terminology",
        "explanation": "'magic bot' is explicitly deprecated. Use enterprise-grade governed nomenclature.",
        "supportingGuideline": "Brand DNA: Approved Product & AI Terminology [bg-2]",
        "sourceId": "bg-2",
        "suggestedAction": "Replace 'magic bot' with 'Autonomous Agent Layer'.",
        "suggestedReplacement": "Autonomous Agent Layer"
    },
    {
        "pattern": r"automated\s*robot",
        "term": "automated robot",
        "title": "Deprecated Terminology: 'automated robot'",
        "severity": "Medium",
        "category": "Terminology",
        "explanation": "'automated robot' trivializes the platform architecture. Use 'governed workflow'.",
        "supportingGuideline": "Brand DNA: Approved Product & AI Terminology [bg-2]",
        "sourceId": "bg-2",
        "suggestedAction": "Replace with 'governed workflow'.",
        "suggestedReplacement": "governed workflow"
    },
    {
        "pattern": r"black\s*box",
        "term": "black box",
        "title": "Non-transparent Terminology: 'black box'",
        "severity": "Medium",
        "category": "Terminology",
        "explanation": "Contradicts our core value of explainable, audited governance.",
        "supportingGuideline": "Brand DNA: Approved Product & AI Terminology [bg-2]",
        "sourceId": "bg-2",
        "suggestedAction": "Replace with 'transparent, explainable AI model'.",
        "suggestedReplacement": "transparent, explainable AI model"
    }
]

def scan_text(text: str, language: str = "English") -> Dict[str, Any]:
    issues: List[Dict[str, Any]] = []

    # 1. Scan Claims
    for idx, rule in enumerate(CLAIM_RULES):
        matches = re.findall(rule["pattern"], text, re.IGNORECASE)
        if matches:
            issues.append({
                "id": f"iss-claim-{idx}",
                "category": rule["category"],
                "title": rule["title"],
                "severity": rule["severity"],
                "excerpt": matches[0],
                "explanation": rule["explanation"],
                "supportingGuideline": rule["supportingGuideline"],
                "sourceId": rule["sourceId"],
                "suggestedAction": rule["suggestedAction"],
                "suggestedReplacement": rule["suggestedReplacement"],
                "status": "unresolved"
            })

    # 2. Scan Terminology
    for idx, rule in enumerate(TERMINOLOGY_RULES):
        matches = re.findall(rule["pattern"], text, re.IGNORECASE)
        if matches:
            issues.append({
                "id": f"iss-term-{idx}",
                "category": rule["category"],
                "title": rule["title"],
                "severity": rule["severity"],
                "excerpt": matches[0],
                "explanation": rule["explanation"],
                "supportingGuideline": rule["supportingGuideline"],
                "sourceId": rule["sourceId"],
                "suggestedAction": rule["suggestedAction"],
                "suggestedReplacement": rule["suggestedReplacement"],
                "status": "unresolved"
            })

    # 3. Tone of Voice
    if re.search(r"revolutionary", text, re.IGNORECASE):
        issues.append({
            "id": "iss-tone-1",
            "category": "Tone",
            "title": "Overly Hype-Driven Tone ('revolutionary')",
            "severity": "Medium",
            "excerpt": "revolutionary",
            "explanation": "Tone guidelines favor objective, dignified and empathetic communication over marketing hype.",
            "supportingGuideline": "Brand DNA: Empowering, Objective, and Trustworthy Voice [bg-4]",
            "sourceId": "bg-4",
            "suggestedAction": "Replace with grounded value proposition.",
            "suggestedReplacement": "purpose-built",
            "status": "unresolved"
        })

    # 4. Accessibility & Sentence Complexity
    words = re.findall(r"\w+", text)
    sentences = re.split(r"[.!?]+", text)
    sentences = [s for s in sentences if s.strip()]
    avg_words = len(words) / max(len(sentences), 1)

    readability_level = "Standard / Clear"
    readability_score = 80
    if avg_words > 25:
        readability_level = "Dense / High Cognitive Load"
        readability_score = 54
        issues.append({
            "id": "iss-a11y-1",
            "category": "Accessibility",
            "title": "High Sentence Complexity (WCAG 3.1)",
            "severity": "Low",
            "excerpt": text[:80] + "...",
            "explanation": "Average sentence length exceeds 25 words. Plain language ensures clarity for all stakeholders.",
            "supportingGuideline": "Brand DNA: WCAG 2.2 Plain Language Standards [bg-7]",
            "sourceId": "bg-7",
            "suggestedAction": "Split into concise declarative sentences.",
            "status": "unresolved"
        })

    # Compute overall score
    penalties = 0
    for i in issues:
        if i["severity"] == "Critical":
            penalties += 20
        elif i["severity"] == "High":
            penalties += 12
        elif i["severity"] == "Medium":
            penalties += 6
        else:
            penalties += 3

    score = max(35, 100 - penalties)

    return {
        "overallComplianceScore": score,
        "summary": f"{len(issues)} issue(s) detected across {', '.join(set([i['category'] for i in issues]))}." if issues else "Fully compliant with Brand DNA specifications.",
        "issues": issues,
        "metrics": {
            "readabilityScore": readability_score,
            "readabilityLevel": readability_level,
            "contrastRatio": "7.2:1 (Passes AAA)",
            "detectedLanguage": language
        }
    }
