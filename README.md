# SAAKHYA — Intelligent Brand Governance Platform
> **AI Detects. AI Explains. Humans Decide.**  
> *Protecting Brand Identity. Empowering Every Creator.*

[![Project Status](https://img.shields.io/badge/Status-Hackathon%20Round%202%20Complete-1F3B2E?style=for-the-badge)](https://github.com/sanskruti3110/saakhya-brand-governance)
[![Team](https://img.shields.io/badge/Team-HORIZON-CBB3E8?style=for-the-badge)](https://github.com/sanskruti3110/saakhya-brand-governance)
[![Event](https://img.shields.io/badge/Event-CODENEXUS-E8DCC6?style=for-the-badge)](https://github.com/sanskruti3110/saakhya-brand-governance)

---

## 1. Project Overview

**SAAKHYA** is an AI-powered brand governance platform that helps modern organizations maintain strict, unified brand consistency across all content produced by distributed employees, marketing agencies, external freelancers, and generative AI tools.

Rather than acting as an opaque, automated censor, SAAKHYA adheres strictly to the core human-in-the-loop philosophy:
**"AI Detects. AI Explains. Humans Decide."**
The platform never silently modifies copy, never auto-approves or publishes content without authorization, and grounds every finding in approved organizational Brand DNA.

---

## 2. Official Brand Identity & Design System

The platform strictly uses the official SAAKHYA brand palette across all digital surfaces:

- **Oatmeal (`#E8DCC6`)**: Warm, premium backdrop for canvas layouts, cards, and input surfaces.
- **Pine Green (`#1F3B2E`)**: Primary brand anchor for sidebar navigation, headings, and primary action buttons.
- **Soft Lilac (`#CBB3E8`)**: Subtle accents, secondary trend indicators, and animation transition energy.
- **Original SAAKHYA Logo**: Authentic, geometric stylized handclasp emblem and custom modern typography preserved with zero distortion.

---

## 3. Team HORIZON — Roles & Contributions

| Member | Official Role | Focus Area & Deliverables |
| :--- | :--- | :--- |
| **Kshitij Laddad** | Research & Product Lead | Regulatory compliance (ASCI Code Chapter 1, CCPA advertising standards), market research, PRD, and feature specification. |
| **Samruddhi Garje** | UI/UX & Frontend Lead | Wireframes, component architecture, design system implementation, and responsive layout. |
| **Sanskruti Shinde** | AI/ML & NLP Integration Lead | Brand DNA analysis algorithms, contextual NLP checking, explanation generation, and correction engine. |
| **Nishika Katariya** | Backend & QA Lead | FastAPI services, PyMuPDF document extraction, deterministic rule engine, and integration testing. |

---

## 4. Eight Core Governance Features

1. **Brand DNA Engine**: Centralized repository of approved guidelines, mission statements, tone boundaries, forbidden phrases, and verified product specifications.
2. **Multi-Format Checker**: Multi-format content ingestion supporting text copy, raw document files, PDF extraction (via PyMuPDF), and digital banner creatives.
3. **Multilingual Intelligence**: Native support for **English**, **Hindi (हिंदी)**, and **Marathi (मराठी)** verifying regional tone, cultural nuances, and vernacular terminology.
4. **Fact & Claim Verification**: Validates promotional superlatives, pricing statements, and product specs against verified organizational facts under ASCI and CCPA advertising standards.
5. **Visual Brand Detective**: Evaluates uploaded graphics for logo usage, clear space, brand color compliance (`#1F3B2E`, `#E8DCC6`, `#CBB3E8`), and layout hierarchy.
6. **AI Correction Studio**: Transparent side-by-side comparison of original and proposed revisions. Creators can accept, edit inline, or reject suggestions. Original copy is never overwritten.
7. **Approval & Revision Hub**: Formal reviewer portal featuring revision history, inline comments, approval sign-offs, and an immutable audit trail.
8. **Accessibility Checker**: Automated WCAG 2.2 color contrast calculator (4.5:1 ratio check), Flesch-Kincaid readability scoring, and plain language standards.

---

## 5. Three Major Innovations (Round 3 Improvements)

### 🔬 Innovation 1: Test My New Rules
Allows Brand Managers to propose a new guideline and simulate its retroactive impact against all archived content in the organization's database before enacting it. Displays affected asset counts, potential critical violations, and diff previews.

### 🦋 Innovation 2: Brand Butterfly Effect
An interactive campaign-wide dependency map showing how changing a single foundational brand rule cascades across connected social media posts, ad campaigns, website copy, and presentations. Categorizes assets by direct, indirect, or review-needed impact.

### ✨ Innovation 3: Brand Evolution Intelligence
An adaptive governance layer that analyzes cumulative review data to identify recurring creator mistakes, uncovers ambiguous or contradictory guidelines, and recommends targeted improvements for human manager approval.

---

## 6. Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, Canvas Confetti.
- **Backend**: FastAPI, Python 3.14, Pydantic v2, PyMuPDF (`fitz`), Uvicorn.
- **Storage**: Client-side resilient LocalStorage sync + SQLite/PostgreSQL-compatible SQLAlchemy schema.
- **Testing**: End-to-end component builds and automated Python rule evaluation.

---

## 7. Quickstart & Local Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### Running the Frontend
```bash
# Install dependencies
npm install

# Start local development server
npm run dev
# The application will launch at http://localhost:5173
```

### Running the FastAPI Backend
```bash
# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install backend requirements
pip install -r backend/requirements.txt

# Start backend server
python backend/app.py
# API documentation available at http://localhost:8000/docs
```

---

## 8. Verification & Demo Walkthrough

1. **Signature Opening Animation**: Launch the app to observe the cinematic handshake animation, light ripple transition, and SAAKHYA logo reveal.
2. **Interactive Role Switcher**: Click the "Role" pill in the header to switch between **Admin**, **Creator**, and **Reviewer** modes.
3. **End-to-End Governance Flow**:
   - Go to **Content Review** -> click **Sample Ad Banner (Violations)** -> click **Run AI Brand Review**.
   - Inspect detected issues in **AI Correction Studio**.
   - Click **Accept Suggestion** to apply the verified SLA replacement.
   - Click **Submit Revision for Approval**.
   - Switch role to **Reviewer** -> open **Approvals Hub** -> click **Approve** to trigger confetti and audit log finalization!
4. **Inspect the 3 Innovations**:
   - Navigate to **Test My New Rules** -> run simulation on performance guarantees.
   - Open **Brand Butterfly Effect** -> inspect connected campaigns and high-risk collateral.
   - Explore **Brand Evolution Intelligence** -> review recurring violation patterns and approve guideline updates.
