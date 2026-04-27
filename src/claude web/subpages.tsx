/**
 * MedVeritas — Subpages
 * ─────────────────────────────────────────────────────────────────
 * File structure (all in one file for easy integration):
 *
 *  1. Shared types  (ServiceData, ProjectData)
 *  2. Shared data   (SERVICES, PROJECTS)
 *  3. Shared helpers (SubpageHero, SubpageLayout, back to top on mount)
 *  4. PageServiceDetail   → /services/:serviceId
 *  5. PageProjectDetail   → /projects/:projectId
 *  6. PageContact         → /contact
 *  7. PageContactSuccess  → /contact/success
 *
 * Integration (in your main App.tsx / main.tsx):
 *
 *   import { BrowserRouter, Routes, Route } from "react-router-dom";
 *   import {
 *     PageServiceDetail,
 *     PageProjectDetail,
 *     PageContact,
 *     PageContactSuccess,
 *   } from "./subpages";
 *
 *   <BrowserRouter>
 *     <Routes>
 *       <Route path="/"                    element={<App />} />
 *       <Route path="/services/:serviceId" element={<PageServiceDetail />} />
 *       <Route path="/projects/:projectId" element={<PageProjectDetail />} />
 *       <Route path="/contact"             element={<PageContact />} />
 *       <Route path="/contact/success"     element={<PageContactSuccess />} />
 *     </Routes>
 *   </BrowserRouter>
 *
 * ─────────────────────────────────────────────────────────────────
 * Styling: 100 % CSS-variable driven. No new colours introduced.
 * All button/card classNames match the existing App.css.
 * Additional page-specific rules are injected via a <style> tag
 * inside each page so the global App.css is NEVER modified.
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────
// 0. INLINE STYLES  (page-level only, appended once to <head>)
// ─────────────────────────────────────────────────────────────────
const SUBPAGE_CSS = `
/* ── Subpage shared layout ───────────────────────────── */
.sp-wrap {
  padding-top: 72px; /* navbar height */
  font-family: var(--font-body);
  color: var(--body);
}

/* ── Breadcrumb ──────────────────────────────────────── */
.sp-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: .8rem;
  color: var(--muted);
  margin-bottom: 28px;
}
.sp-breadcrumb a {
  color: var(--blue);
  text-decoration: none;
  font-weight: 500;
}
.sp-breadcrumb a:hover { text-decoration: underline; }
.sp-breadcrumb-sep { color: var(--border); font-size: .7rem; }

/* ── Subpage hero block ──────────────────────────────── */
.sp-hero {
  background: var(--bg-off);
  border-bottom: 1px solid var(--border);
  padding: 64px 2rem 56px;
}
.sp-hero__inner {
  max-width: 1200px;
  margin: 0 auto;
}
.sp-hero__badge-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}
.sp-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border-radius: 999px;
  font-size: .72rem;
  font-weight: 700;
  letter-spacing: .07em;
  text-transform: uppercase;
  color: #fff;
}
.sp-badge--blue   { background: var(--blue);  }
.sp-badge--green  { background: var(--green); }
.sp-badge--amber  { background: #F59E0B;      }
.sp-badge--navy   { background: var(--navy);  }

.sp-hero h1 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 2.9rem);
  font-weight: 700;
  color: var(--navy);
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
}
.sp-hero p {
  color: var(--body);
  font-size: 1.05rem;
  line-height: 1.75;
  max-width: 640px;
}

/* ── Content container ───────────────────────────────── */
.sp-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ── Two-column layout ───────────────────────────────── */
.sp-body {
  padding: 64px 2rem 80px;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 48px;
  align-items: start;
}
@media (max-width: 900px) {
  .sp-body { grid-template-columns: 1fr; }
}

/* ── Section headings ────────────────────────────────── */
.sp-section-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 16px;
}

/* ── Prose ───────────────────────────────────────────── */
.sp-prose {
  color: var(--body);
  font-size: .96rem;
  line-height: 1.8;
  margin-bottom: 32px;
}

/* ── Bullet list ─────────────────────────────────────── */
.sp-list {
  list-style: none;
  padding: 0;
  margin: 0 0 32px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sp-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: .93rem;
  color: var(--body);
  line-height: 1.6;
}
.sp-list-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--blue);
  flex-shrink: 0;
  margin-top: 7px;
}
.sp-list-dot--green { background: var(--green); }

/* ── Why-box ─────────────────────────────────────────── */
.sp-why-box {
  background: rgba(41,170,225,.05);
  border: 1px solid rgba(41,170,225,.18);
  border-radius: var(--r-md);
  padding: 28px 28px;
  margin-bottom: 32px;
}
.sp-why-box h3 {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--navy);
  margin-bottom: 14px;
}

/* ── Case box ────────────────────────────────────────── */
.sp-case-box {
  background: var(--bg-off);
  border: 1px solid var(--border);
  border-left: 4px solid var(--blue);
  border-radius: var(--r-md);
  padding: 24px 26px;
  margin-bottom: 36px;
}
.sp-case-box h3 {
  font-size: .9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .07em;
  color: var(--blue);
  margin-bottom: 10px;
}
.sp-case-box p {
  font-size: .92rem;
  color: var(--body);
  line-height: 1.7;
}

/* ── Sidebar card ────────────────────────────────────── */
.sp-sidebar-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  padding: 28px 24px;
  box-shadow: var(--shadow-sm);
}
.sp-sidebar-card h4 {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 18px;
}
.sp-meta-row {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 22px;
}
.sp-meta-item {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}
.sp-meta-label {
  font-size: .74rem;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--muted);
  min-width: 80px;
}
.sp-meta-val {
  font-size: .88rem;
  color: var(--body);
  line-height: 1.5;
}
.sp-sidebar-divider {
  height: 1px;
  background: var(--border);
  margin: 20px 0;
}

/* ── CTA strip ───────────────────────────────────────── */
.sp-cta-strip {
  background: var(--navy);
  padding: 64px 2rem;
  text-align: center;
}
.sp-cta-strip h2 {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  color: #fff;
  margin-bottom: 12px;
}
.sp-cta-strip p {
  color: rgba(255,255,255,.65);
  font-size: 1rem;
  margin-bottom: 32px;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}
.sp-cta-actions {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
}

/* ── Action buttons (page-level) ─────────────────────── */
.sp-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--blue);
  color: #fff;
  padding: 12px 24px;
  border-radius: var(--r-sm);
  font-size: .93rem;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: background var(--tr), transform var(--tr);
}
.sp-btn-primary:hover { background: var(--blue-dark); transform: translateY(-1px); }

.sp-btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: var(--blue);
  padding: 12px 24px;
  border-radius: var(--r-sm);
  font-size: .93rem;
  font-weight: 600;
  text-decoration: none;
  border: 1.5px solid var(--blue);
  cursor: pointer;
  transition: background var(--tr), transform var(--tr);
}
.sp-btn-outline:hover { background: rgba(41,170,225,.07); transform: translateY(-1px); }

.sp-btn-outline-white {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: #fff;
  padding: 12px 24px;
  border-radius: var(--r-sm);
  font-size: .93rem;
  font-weight: 500;
  text-decoration: none;
  border: 1.5px solid rgba(255,255,255,.3);
  cursor: pointer;
  transition: background var(--tr), transform var(--tr);
}
.sp-btn-outline-white:hover { background: rgba(255,255,255,.08); }

/* ── Image block ─────────────────────────────────────── */
.sp-image-block {
  border-radius: var(--r-md);
  overflow: hidden;
  border: 1px solid var(--border);
  background: linear-gradient(135deg, var(--bg-off), rgba(41,170,225,.08));
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;
}
.sp-image-block img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ── Contact page ────────────────────────────────────── */
.sp-contact-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 56px;
  padding: 64px 2rem 80px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: start;
}
@media (max-width: 820px) {
  .sp-contact-grid { grid-template-columns: 1fr; }
}

.sp-form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
}
.sp-form-group label {
  font-size: .82rem;
  font-weight: 600;
  color: var(--navy);
  letter-spacing: .03em;
}
.sp-form-group input,
.sp-form-group textarea,
.sp-form-group select {
  font-family: var(--font-body);
  font-size: .93rem;
  color: var(--body);
  background: #fff;
  border: 1.5px solid var(--border);
  border-radius: var(--r-sm);
  padding: 11px 14px;
  outline: none;
  transition: border-color var(--tr), box-shadow var(--tr);
  width: 100%;
}
.sp-form-group input:focus,
.sp-form-group textarea:focus,
.sp-form-group select:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(41,170,225,.12);
}
.sp-form-group textarea {
  resize: vertical;
  min-height: 130px;
}
.sp-form-group select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236b7a9a' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
  cursor: pointer;
}
.sp-form-hint {
  font-size: .78rem;
  color: var(--muted);
}
.sp-form-error {
  font-size: .78rem;
  color: #e53e3e;
}
.sp-form-status {
  font-size: .88rem;
  color: var(--green);
  font-weight: 600;
  padding: 10px 0;
}

/* info sidebar */
.sp-info-card {
  background: var(--bg-off);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  padding: 28px 24px;
}
.sp-info-card h4 {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--navy);
  margin-bottom: 18px;
}
.sp-info-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 14px;
}
.sp-info-icon {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: rgba(41,170,225,.1);
  color: var(--blue);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.sp-info-text strong {
  font-size: .85rem;
  color: var(--navy);
  display: block;
  margin-bottom: 2px;
}
.sp-info-text span {
  font-size: .82rem;
  color: var(--muted);
}

/* success page */
.sp-success-page {
  min-height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 2rem;
  background: var(--bg-off);
}
.sp-success-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 56px 48px;
  text-align: center;
  max-width: 520px;
  box-shadow: var(--shadow-md);
}
.sp-success-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(91,187,107,.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}
.sp-success-card h1 {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--navy);
  margin-bottom: 14px;
}
.sp-success-card p {
  color: var(--body);
  font-size: .96rem;
  line-height: 1.7;
  margin-bottom: 32px;
}
.sp-success-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Not-found state */
.sp-notfound {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
  padding: 64px 2rem;
}
.sp-notfound h2 {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--navy);
}
.sp-notfound p { color: var(--muted); }
`;

// ─────────────────────────────────────────────────────────────────
// 1. TYPES
// ─────────────────────────────────────────────────────────────────

export interface ServiceData {
  id: string;            // slug
  title: string;
  badge: string;
  badgeVariant: "blue" | "green";
  tagline: string;
  description: string;
  whyChoose: string[];
  scope: string[];
  deliverables: string[];
  caseTitle: string;
  caseText: string;
  metaCategory: string;
  metaAudience: string;
  metaDuration: string;
}

export interface ProjectData {
  id: string;
  title: string;
  partner: string;
  badgeColor: string;
  badgeVariant: "blue" | "green" | "amber" | "navy";
  tagline: string;
  context: string;
  objectives: string[];
  coverage: string;
  methodology: string;
  keyResults: string[];
  metaMethodology: string;
  metaPartners: string;
  metaTimeframe: string;
  imageUrl?: string;
}

// ─────────────────────────────────────────────────────────────────
// 2. DATA
// ─────────────────────────────────────────────────────────────────

export const SERVICES: ServiceData[] = [
  {
    id: "research-evaluation",
    title: "Research & Evaluation",
    badge: "Core Service",
    badgeVariant: "blue",
    tagline: "Rigorous study design and evidence generation for programs and policy.",
    description:
      "MedVeritas designs and executes end-to-end health research and program evaluations. From formative assessments through baseline, midline, and endline studies, our teams produce peer-quality evidence that decision-makers can act on — quickly and with confidence.",
    whyChoose: [
      "Independent and transparent — no conflict-of-interest with implementing agencies.",
      "Experienced in complex, low-resource, and conflict-affected settings.",
      "Outputs are actionable: policy briefs, dashboards, and executive summaries.",
    ],
    scope: [
      "Needs assessment and situation analysis",
      "Study design and sampling methodology",
      "Quantitative and qualitative data collection",
      "Health systems analysis",
      "Impact evaluation and causal inference",
      "Evidence synthesis and policy translation",
    ],
    deliverables: [
      "Research protocol and ethical approval support",
      "Data collection instruments (digital & paper)",
      "Cleaned, validated datasets",
      "Analytical reports with visualisations",
      "Executive summaries for non-technical audiences",
    ],
    caseTitle: "Illustrative Engagement",
    caseText:
      "A national nutrition program evaluation across 12 governorates — MedVeritas led study design, trained 60 enumerators, and delivered a validated final report within 10 weeks. Findings directly informed the funder's next program cycle.",
    metaCategory: "Research & Evidence",
    metaAudience: "Governments, NGOs, Donors",
    metaDuration: "4 – 16 weeks (scope-dependent)",
  },
  {
    id: "health-surveys",
    title: "Health Surveys",
    badge: "Core Service",
    badgeVariant: "green",
    tagline: "High-quality field surveys built for complex and fragile operating environments.",
    description:
      "We design, implement, and validate health surveys at national and sub-national scale. Our proprietary quality-assurance system catches errors in real time, ensuring data that meets international standards even in the most challenging field conditions.",
    whyChoose: [
      "National field network across all 22 Yemeni governorates.",
      "94.2 % coverage quality score on recent WHO-linked surveys.",
      "End-to-end digital data management with GPS verification.",
    ],
    scope: [
      "Sampling frame development and cluster selection",
      "Questionnaire design and piloting",
      "Digital data collection (ODK / KoBoToolbox)",
      "Field team training and supervision",
      "Data validation and back-check protocols",
      "Statistical analysis and final reporting",
    ],
    deliverables: [
      "Survey design document",
      "Training materials and field manuals",
      "Cleaned dataset with codebook",
      "Descriptive and inferential analysis report",
      "Geographic coverage maps",
    ],
    caseTitle: "Illustrative Engagement",
    caseText:
      "A household health survey commissioned by an international partner across four underserved governorates — 2,400 households surveyed in 21 days, 98 % data completeness, and a final report delivered three days ahead of schedule.",
    metaCategory: "Survey & Field Research",
    metaAudience: "WHO, UNICEF, International NGOs",
    metaDuration: "3 – 12 weeks",
  },
  {
    id: "monitoring-evaluation",
    title: "Monitoring & Evaluation",
    badge: "Core Service",
    badgeVariant: "blue",
    tagline: "Framework development, indicator tracking, and performance measurement across health interventions.",
    description:
      "Our M&E specialists partner with implementing organisations to design monitoring systems from the ground up and provide ongoing performance measurement. We translate program logic into measurable indicators and build field-verification processes that hold up to donor scrutiny.",
    whyChoose: [
      "Frameworks aligned with USAID, EU, and UN reporting requirements.",
      "Real-time dashboards and data pipelines available on request.",
      "Verification teams can be deployed within 72 hours.",
    ],
    scope: [
      "Theory of change and results framework development",
      "Indicator selection and data source mapping",
      "M&E plan and MEL handbook drafting",
      "Routine data quality assessments (RDQA)",
      "Third-party monitoring and verification",
      "Mid-term and final evaluations",
    ],
    deliverables: [
      "Results framework / log-frame",
      "M&E plan with data collection schedule",
      "Indicator tracking sheets",
      "Monthly / quarterly monitoring reports",
      "Verification certificates for donor compliance",
    ],
    caseTitle: "Illustrative Engagement",
    caseText:
      "Third-party monitoring of a nutrition intervention in three districts — monthly site visits, indicator tracking for 14 KPIs, and a mid-term evaluation report that identified two delivery bottlenecks, enabling a successful course correction.",
    metaCategory: "Monitoring & Verification",
    metaAudience: "Implementing Partners, Donors",
    metaDuration: "Ongoing retainer or 6 – 24 months",
  },
  {
    id: "training-capacity-building",
    title: "Training & Capacity Building",
    badge: "Capacity",
    badgeVariant: "green",
    tagline: "Practical, field-tested training for health professionals and research teams.",
    description:
      "We design and deliver tailored training programmes that build lasting local capacity. Whether upskilling enumerators in digital data collection or coaching health system managers in evidence use, our workshops are hands-on, contextually adapted, and immediately applicable.",
    whyChoose: [
      "Trainers with 10+ years of field experience in humanitarian settings.",
      "Digital and paper-based methodologies covered.",
      "Post-training mentorship and refresher support available.",
    ],
    scope: [
      "Training needs assessment",
      "Curriculum design and facilitation",
      "Enumerator and supervisor training",
      "Data quality and ethics for research",
      "M&E systems and reporting skills",
      "Healthcare management capacity building",
    ],
    deliverables: [
      "Training curriculum and slide decks",
      "Participant workbooks and reference cards",
      "Pre/post knowledge assessment tools",
      "Training completion certificates",
      "Follow-up competency report",
    ],
    caseTitle: "Illustrative Engagement",
    caseText:
      "A five-day intensive training for 45 district health officers on M&E fundamentals and data quality — pre/post testing showed a 38 % average knowledge gain, and 90 % of participants rated the programme 'excellent'.",
    metaCategory: "Capacity Development",
    metaAudience: "Health Staff, Field Teams, NGO Managers",
    metaDuration: "2 days – 4 weeks",
  },
  {
    id: "healthcare-consulting",
    title: "Healthcare Consulting",
    badge: "Advisory",
    badgeVariant: "blue",
    tagline: "Strategic advisory for program design, partner coordination, and evidence-based planning.",
    description:
      "Our senior consultants provide strategic guidance to health-sector actors navigating complex operational environments. From program redesign to donor engagement strategy, we offer the analytical depth and contextual expertise to move from challenge to solution efficiently.",
    whyChoose: [
      "Senior advisors with international agency and government experience.",
      "In-depth understanding of Yemen's health system landscape.",
      "Rapid-response capacity for time-sensitive advisory needs.",
    ],
    scope: [
      "Health program design and strategy development",
      "Donor proposal and concept note support",
      "Operational and organisational assessments",
      "Partner coordination and stakeholder mapping",
      "Health policy analysis and recommendations",
      "Emergency health response planning",
    ],
    deliverables: [
      "Strategic assessment reports",
      "Program design documents",
      "Stakeholder engagement plans",
      "Policy briefs and technical memos",
      "Workshop facilitation and advisory sessions",
    ],
    caseTitle: "Illustrative Engagement",
    caseText:
      "Strategic advisory support to a national health authority redesigning its primary-care programme — stakeholder mapping, gap analysis, and a 12-month implementation roadmap developed in six weeks, enabling successful donor funding renewal.",
    metaCategory: "Strategic Advisory",
    metaAudience: "Ministries, UN Agencies, INGOs",
    metaDuration: "2 weeks – 12 months",
  },
  {
    id: "implementation-support",
    title: "Implementation Support",
    badge: "Operations",
    badgeVariant: "green",
    tagline: "On-the-ground technical assistance for field supervision, data quality, and adaptive execution.",
    description:
      "We embed technical experts directly into program teams to provide real-time support. Our implementation specialists identify operational bottlenecks, maintain data quality in the field, and ensure adaptive management decisions are grounded in timely evidence.",
    whyChoose: [
      "Field presence across all 22 governorates.",
      "Rapid deployment — teams on-site within 48 – 72 hours.",
      "Flexible engagement models: embedded, visiting, or remote.",
    ],
    scope: [
      "Field supervision and quality assurance",
      "Routine data collection and reporting support",
      "Bottleneck identification and problem-solving",
      "Coordination with implementing and government partners",
      "Adaptive management facilitation",
      "Closeout documentation and lessons-learned",
    ],
    deliverables: [
      "Field supervision reports (weekly / monthly)",
      "Data quality assurance logs",
      "Issue and risk registers",
      "Adaptive management recommendations",
      "Final implementation summary report",
    ],
    caseTitle: "Illustrative Engagement",
    caseText:
      "Embedded field support for a UNICEF-funded child health campaign across eight governorates — daily supervision reports, real-time gap identification, and corrective actions that lifted vaccination coverage rates by 11 percentage points over four weeks.",
    metaCategory: "Field Operations",
    metaAudience: "Implementing Partners, UN Agencies",
    metaDuration: "2 weeks – 12 months",
  },
];

export const PROJECTS: ProjectData[] = [
  {
    id: "who-health-surveys",
    title: "WHO Health Surveys",
    partner: "WHO",
    badgeColor: "#29AAE1",
    badgeVariant: "blue",
    tagline: "Field implementation, validation systems, and decision-ready reporting for health program planning.",
    context:
      "In partnership with the World Health Organization, MedVeritas designed and executed a series of health surveys to generate nationally representative data on key health indicators across Yemen's complex operating environment.",
    objectives: [
      "Assess coverage of primary health care services at district level",
      "Evaluate quality of data collection and enumerator performance",
      "Produce evidence to inform WHO country-office programming decisions",
      "Establish a replicable survey protocol for future rounds",
    ],
    coverage: "22 governorates — national reach, 2,800+ households",
    methodology:
      "Stratified cluster sampling with probability-proportional-to-size (PPS) selection. Digital data collection via KoBoToolbox with embedded validation logic, GPS geotagging, and daily back-check protocols. Independent data quality audits conducted on 10 % of forms.",
    keyResults: [
      "94.2 % data quality score across all survey rounds",
      "98 % household response rate in target clusters",
      "Findings incorporated directly into WHO's 2024 country health profile",
      "Replicable protocol adopted by three other survey implementers in-country",
    ],
    metaMethodology: "Stratified Cluster Sampling · PPS · KoBoToolbox",
    metaPartners: "World Health Organization (WHO)",
    metaTimeframe: "Ongoing since 2021",
  },
  {
    id: "unicef-monitoring-projects",
    title: "UNICEF Monitoring Projects",
    partner: "UNICEF",
    badgeColor: "#5BBB6B",
    badgeVariant: "green",
    tagline: "Monitoring frameworks and verification workflows for child and community health initiatives.",
    context:
      "MedVeritas serves as third-party monitor for UNICEF-funded child and community health programmes, providing independent verification of activity implementation and output indicators across multiple districts.",
    objectives: [
      "Provide independent, evidence-based verification of programme outputs",
      "Track 18 core indicators across health, nutrition, and WASH clusters",
      "Identify implementation gaps and generate corrective action recommendations",
      "Support adaptive management through real-time data feedback loops",
    ],
    coverage: "14 governorates — monthly site visits and remote data collection",
    methodology:
      "Mixed-methods monitoring: structured facility and community observations, key informant interviews with health workers and community leaders, beneficiary verification surveys, and administrative data review. All data verified against UNICEF's master programme database.",
    keyResults: [
      "Over 3,200 monitoring visits conducted across 24 months",
      "15 of 18 core indicators verified as on-track or exceeding targets",
      "Early identification of supply-chain bottleneck averted a 6-week delivery delay",
      "Monitoring findings cited in UNICEF's annual country programme report",
    ],
    metaMethodology: "Mixed Methods · TPM · Site Verification",
    metaPartners: "UNICEF Yemen Country Office",
    metaTimeframe: "2022 – Ongoing",
  },
  {
    id: "polio-campaign-coverage-surveys",
    title: "Polio Campaign Coverage Surveys",
    partner: "IMMUNIZATION",
    badgeColor: "#F59E0B",
    badgeVariant: "amber",
    tagline: "Coverage assessment and field monitoring to evaluate campaign reach and improve intervention quality.",
    context:
      "Polio eradication campaigns in Yemen require independent coverage verification to ensure vaccines reach every child. MedVeritas conducted post-campaign coverage surveys (PCCS) and lot quality assurance sampling (LQAS) assessments across multiple immunisation rounds.",
    objectives: [
      "Estimate vaccination coverage at district and governorate level",
      "Identify geographic clusters with sub-optimal coverage",
      "Assess reasons for non-vaccination and refusal patterns",
      "Provide rapid feedback to campaign managers for mop-up planning",
    ],
    coverage: "18 governorates — district-level disaggregation available",
    methodology:
      "Lot Quality Assurance Sampling (LQAS) for rapid decision-making combined with EPI 30-cluster methodology for coverage estimation. Field teams deployed within 72 hours of campaign close. Structured child-finger-marking observation and caregiver interviews used to verify vaccination status.",
    keyResults: [
      "Coverage estimates delivered within 5 days of campaign close",
      "Identified 23 high-risk clusters requiring targeted mop-up activity",
      "Mop-up campaigns in flagged areas improved district coverage by 8–14 %",
      "Methodology adopted as standard for subsequent campaigns",
    ],
    metaMethodology: "LQAS · EPI 30-Cluster · Rapid Assessment",
    metaPartners: "UNICEF / WHO Immunisation Partners",
    metaTimeframe: "Multiple rounds, 2020 – Present",
  },
  {
    id: "public-health-assessments",
    title: "Public Health Assessments",
    partner: "PUBLIC HEALTH",
    badgeColor: "#0D1B3E",
    badgeVariant: "navy",
    tagline: "Needs assessments, service analysis, and evidence synthesis to guide strategic health planning.",
    context:
      "Rapid and comprehensive public health assessments are critical for resource allocation in crisis settings. MedVeritas conducts Health Resources Availability Mapping (HeRAMS), rapid needs assessments, and health system analyses for national and international actors.",
    objectives: [
      "Map health service availability, functionality, and accessibility",
      "Identify critical gaps in service delivery and workforce capacity",
      "Analyse disease burden and priority health needs by district",
      "Synthesise findings into actionable recommendations for strategic planning",
    ],
    coverage: "National and targeted sub-national assessments across Yemen",
    methodology:
      "Multi-source triangulation: health facility surveys, key informant interviews with district health officers and community leaders, secondary data review (DHIS2, HeRAMS, 4W matrices), and qualitative focus group discussions. Findings validated through participatory stakeholder workshops.",
    keyResults: [
      "Comprehensive health system gap analysis delivered in 8 weeks",
      "Findings used to prioritise resource allocation for 3 international donors",
      "Assessment methodology replicated in two neighbouring countries",
      "Directly informed the 2024 Humanitarian Response Plan health chapter",
    ],
    metaMethodology: "HeRAMS · Triangulation · Qualitative & Quantitative",
    metaPartners: "Multiple INGOs and UN Agencies",
    metaTimeframe: "2019 – Ongoing",
  },
];

// ─────────────────────────────────────────────────────────────────
// 3. HELPERS
// ─────────────────────────────────────────────────────────────────

/** Inject shared CSS once into <head> */
function useSubpageStyles() {
  useEffect(() => {
    if (document.getElementById("sp-styles")) return;
    const el = document.createElement("style");
    el.id = "sp-styles";
    el.textContent = SUBPAGE_CSS;
    document.head.appendChild(el);
  }, []);
}

/** Scroll to top on every page mount */
function useScrollTop() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, []);
}

// Mini SVG icons (self-contained, match existing Icon style)
const ArrowRight = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);
const ChevronLeft = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="m15 18-6-6 6-6"/>
  </svg>
);
const CheckCircle = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#5BBB6B" strokeWidth="2" strokeLinecap="round">
    <path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/>
  </svg>
);
const MailIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/>
  </svg>
);
const PhoneIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>
  </svg>
);
const MapPinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

// Shared "Not Found" component
function NotFound({ type }: { type: string }) {
  return (
    <div className="sp-wrap">
      <div className="sp-notfound">
        <h2>{type} not found</h2>
        <p>The page you're looking for doesn't exist or may have moved.</p>
        <Link to="/" className="sp-btn-primary" style={{ marginTop: 8 }}>
          <ChevronLeft /> Back to Home
        </Link>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 4. PAGE: SERVICE DETAIL
// Route: /services/:serviceId
// ─────────────────────────────────────────────────────────────────

export function PageServiceDetail() {
  useSubpageStyles();
  useScrollTop();

  const { serviceId } = useParams<{ serviceId: string }>();
  const service = SERVICES.find(s => s.id === serviceId);

  if (!service) return <NotFound type="Service" />;

  const dotClass = service.badgeVariant === "green" ? "sp-list-dot sp-list-dot--green" : "sp-list-dot";

  return (
    <div className="sp-wrap">
      {/* ── Hero ── */}
      <div className="sp-hero">
        <div className="sp-hero__inner">
          {/* Breadcrumb */}
          <nav className="sp-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sp-breadcrumb-sep">›</span>
            <Link to="/#services">Services</Link>
            <span className="sp-breadcrumb-sep">›</span>
            <span>{service.title}</span>
          </nav>

          <div className="sp-hero__badge-row">
            <span className={`sp-badge sp-badge--${service.badgeVariant}`}>{service.badge}</span>
            <span style={{ fontSize: ".8rem", color: "var(--muted)" }}>{service.metaCategory}</span>
          </div>

          <h1>{service.title}</h1>
          <p>{service.tagline}</p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="sp-body">
        {/* Left column */}
        <div>
          {/* Description */}
          <h2 className="sp-section-title">About This Service</h2>
          <p className="sp-prose">{service.description}</p>

          {/* Why choose */}
          <div className="sp-why-box">
            <h3>Why Choose This Service?</h3>
            <ul className="sp-list" style={{ marginBottom: 0 }}>
              {service.whyChoose.map(item => (
                <li key={item}>
                  <span className={dotClass} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Scope of work */}
          <h2 className="sp-section-title">Scope of Work</h2>
          <ul className="sp-list">
            {service.scope.map(item => (
              <li key={item}>
                <span className="sp-list-dot" />
                {item}
              </li>
            ))}
          </ul>

          {/* Deliverables */}
          <h2 className="sp-section-title">Deliverables</h2>
          <ul className="sp-list">
            {service.deliverables.map(item => (
              <li key={item}>
                <span className="sp-list-dot sp-list-dot--green" />
                {item}
              </li>
            ))}
          </ul>

          {/* Case */}
          <div className="sp-case-box">
            <h3>{service.caseTitle}</h3>
            <p>{service.caseText}</p>
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 8 }}>
            <Link to="/contact" className="sp-btn-primary">
              Contact Us <ArrowRight />
            </Link>
            <Link to="/#services" className="sp-btn-outline">
              View All Services
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <aside>
          <div className="sp-sidebar-card">
            <h4>Service Details</h4>
            <div className="sp-meta-row">
              <div className="sp-meta-item">
                <span className="sp-meta-label">Category</span>
                <span className="sp-meta-val">{service.metaCategory}</span>
              </div>
              <div className="sp-meta-item">
                <span className="sp-meta-label">Audience</span>
                <span className="sp-meta-val">{service.metaAudience}</span>
              </div>
              <div className="sp-meta-item">
                <span className="sp-meta-label">Duration</span>
                <span className="sp-meta-val">{service.metaDuration}</span>
              </div>
            </div>
            <div className="sp-sidebar-divider" />
            <p style={{ fontSize: ".85rem", color: "var(--muted)", lineHeight: 1.65, marginBottom: 18 }}>
              Interested in this service? Get in touch and our team will respond within one business day.
            </p>
            <Link to="/contact" className="sp-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Request a Consultation <ArrowRight />
            </Link>
          </div>
        </aside>
      </div>

      {/* ── CTA Strip ── */}
      <div className="sp-cta-strip">
        <h2>Ready to Work Together?</h2>
        <p>Connect with MedVeritas for tailored support, proposals, or partnership inquiries.</p>
        <div className="sp-cta-actions">
          <Link to="/contact" className="sp-btn-primary">Contact Us <ArrowRight /></Link>
          <Link to="/#services" className="sp-btn-outline-white">Explore Other Services</Link>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 5. PAGE: PROJECT DETAIL
// Route: /projects/:projectId
// ─────────────────────────────────────────────────────────────────

export function PageProjectDetail() {
  useSubpageStyles();
  useScrollTop();

  const { projectId } = useParams<{ projectId: string }>();
  const project = PROJECTS.find(p => p.id === projectId);

  if (!project) return <NotFound type="Project" />;

  return (
    <div className="sp-wrap">
      {/* ── Hero ── */}
      <div className="sp-hero">
        <div className="sp-hero__inner">
          {/* Breadcrumb */}
          <nav className="sp-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sp-breadcrumb-sep">›</span>
            <Link to="/#projects">Projects</Link>
            <span className="sp-breadcrumb-sep">›</span>
            <span>{project.title}</span>
          </nav>

          <div className="sp-hero__badge-row">
            <span className={`sp-badge sp-badge--${project.badgeVariant}`}>{project.partner}</span>
          </div>

          <h1>{project.title}</h1>
          <p>{project.tagline}</p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="sp-body">
        {/* Left column */}
        <div>
          {/* Image */}
          {project.imageUrl && (
            <div className="sp-image-block">
              <img src={project.imageUrl} alt={project.title} />
            </div>
          )}

          {/* Context */}
          <h2 className="sp-section-title">Project Context</h2>
          <p className="sp-prose">{project.context}</p>

          {/* Objectives */}
          <h2 className="sp-section-title">Objectives</h2>
          <ul className="sp-list">
            {project.objectives.map(obj => (
              <li key={obj}>
                <span className="sp-list-dot" />
                {obj}
              </li>
            ))}
          </ul>

          {/* Coverage */}
          <div style={{ marginBottom: 28 }}>
            <h2 className="sp-section-title">Geographic Coverage</h2>
            <p className="sp-prose" style={{ marginBottom: 0 }}>{project.coverage}</p>
          </div>

          {/* Methodology */}
          <h2 className="sp-section-title">Methodology</h2>
          <p className="sp-prose">{project.methodology}</p>

          {/* Key results */}
          <h2 className="sp-section-title">Key Results &amp; Impact</h2>
          <ul className="sp-list" style={{ marginBottom: 32 }}>
            {project.keyResults.map(r => (
              <li key={r}>
                <span className="sp-list-dot sp-list-dot--green" />
                {r}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link to="/contact" className="sp-btn-primary">
              Contact for Details <ArrowRight />
            </Link>
            <Link to="/#projects" className="sp-btn-outline">
              <ChevronLeft /> Back to Projects
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <aside>
          <div className="sp-sidebar-card">
            <h4>Project Details</h4>
            <div className="sp-meta-row">
              <div className="sp-meta-item">
                <span className="sp-meta-label">Partner</span>
                <span className="sp-meta-val">{project.metaPartners}</span>
              </div>
              <div className="sp-meta-item">
                <span className="sp-meta-label">Timeframe</span>
                <span className="sp-meta-val">{project.metaTimeframe}</span>
              </div>
              <div className="sp-meta-item">
                <span className="sp-meta-label">Methods</span>
                <span className="sp-meta-val">{project.metaMethodology}</span>
              </div>
              <div className="sp-meta-item">
                <span className="sp-meta-label">Coverage</span>
                <span className="sp-meta-val">{project.coverage}</span>
              </div>
            </div>
            <div className="sp-sidebar-divider" />
            {/* Download button (no real file; aria-disabled for accessibility) */}
            <button
              className="sp-btn-outline"
              style={{ width: "100%", justifyContent: "center", marginBottom: 12 }}
              onClick={() => alert("Report download will be available soon. Please contact us directly.")}
              aria-label="Download project report (coming soon)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="12" y1="18" x2="12" y2="12"/>
                <line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
              Download Report
            </button>
            <Link to="/contact" className="sp-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Contact for Details <ArrowRight />
            </Link>
          </div>
        </aside>
      </div>

      {/* ── CTA Strip ── */}
      <div className="sp-cta-strip">
        <h2>Explore More of Our Work</h2>
        <p>Browse other projects or discover how our services can support your organisation.</p>
        <div className="sp-cta-actions">
          <Link to="/#projects" className="sp-btn-outline-white">
            <ChevronLeft /> Back to Projects
          </Link>
          <Link to="/#services" className="sp-btn-primary">
            Explore Services <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 6. PAGE: CONTACT
// Route: /contact
// ─────────────────────────────────────────────────────────────────

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function PageContact() {
  useSubpageStyles();
  useScrollTop();

  const navigate = useNavigate();
  const [form, setForm] = useState<ContactForm>({
    name: "", email: "", phone: "", service: "", message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) {
      e.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) e.message = "Please write a short message.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate network request (replace with real API call)
    await new Promise(res => setTimeout(res, 1200));
    setLoading(false);
    navigate("/contact/success");
  };

  return (
    <div className="sp-wrap">
      {/* ── Hero ── */}
      <div className="sp-hero">
        <div className="sp-hero__inner">
          <nav className="sp-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sp-breadcrumb-sep">›</span>
            <span>Contact Us</span>
          </nav>
          <div className="sp-hero__badge-row">
            <span className="sp-badge sp-badge--blue">Get in Touch</span>
          </div>
          <h1>Contact MedVeritas</h1>
          <p>
            Whether you're looking for a research partner, need monitoring support, or want to explore a consulting engagement — our team responds within one business day.
          </p>
        </div>
      </div>

      {/* ── Contact Grid ── */}
      <div className="sp-contact-grid">
        {/* Form */}
        <div>
          <h2 className="sp-section-title">Send Us a Message</h2>
          <p className="sp-prose" style={{ marginBottom: 28 }}>
            Fill in the form below and a member of the MedVeritas team will reach out to discuss your needs.
          </p>

          <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
            {/* Name */}
            <div className="sp-form-group">
              <label htmlFor="cf-name">Full Name *</label>
              <input
                id="cf-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="e.g. Dr. Aisha Mohammed"
                value={form.name}
                onChange={handleChange}
                aria-describedby={errors.name ? "cf-name-err" : undefined}
                aria-invalid={!!errors.name}
              />
              {errors.name && <span id="cf-name-err" className="sp-form-error">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="sp-form-group">
              <label htmlFor="cf-email">Email Address *</label>
              <input
                id="cf-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@organisation.org"
                value={form.email}
                onChange={handleChange}
                aria-describedby={errors.email ? "cf-email-err" : undefined}
                aria-invalid={!!errors.email}
              />
              {errors.email && <span id="cf-email-err" className="sp-form-error">{errors.email}</span>}
            </div>

            {/* Phone */}
            <div className="sp-form-group">
              <label htmlFor="cf-phone">
                Phone / WhatsApp
                <span style={{ fontWeight: 400, color: "var(--muted)", marginLeft: 6 }}>(optional)</span>
              </label>
              <input
                id="cf-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+967 ..."
                value={form.phone}
                onChange={handleChange}
              />
              <span className="sp-form-hint">We use WhatsApp for quick follow-ups if you prefer.</span>
            </div>

            {/* Service interest */}
            <div className="sp-form-group">
              <label htmlFor="cf-service">Area of Interest</label>
              <select id="cf-service" name="service" value={form.service} onChange={handleChange}>
                <option value="">— Select a service (optional) —</option>
                {SERVICES.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
                <option value="general">General Inquiry</option>
                <option value="partnership">Partnership / Collaboration</option>
              </select>
            </div>

            {/* Message */}
            <div className="sp-form-group">
              <label htmlFor="cf-message">Your Message *</label>
              <textarea
                id="cf-message"
                name="message"
                placeholder="Briefly describe your project, organisation, and what you need…"
                value={form.message}
                onChange={handleChange}
                aria-describedby={errors.message ? "cf-msg-err" : undefined}
                aria-invalid={!!errors.message}
              />
              {errors.message && <span id="cf-msg-err" className="sp-form-error">{errors.message}</span>}
            </div>

            <button
              type="submit"
              className="sp-btn-primary"
              style={{ marginTop: 4, minWidth: 180, justifyContent: "center" }}
              disabled={loading}
              aria-live="polite"
            >
              {loading ? "Sending…" : <><span>Send Message</span> <ArrowRight /></>}
            </button>

            {loading && (
              <p className="sp-form-status" aria-live="polite" style={{ marginTop: 10 }}>
                Sending your message, please wait…
              </p>
            )}
          </form>
        </div>

        {/* Info sidebar */}
        <aside>
          <div className="sp-info-card">
            <h4>Contact Information</h4>

            <div className="sp-info-row">
              <div className="sp-info-icon"><MailIcon size={16} /></div>
              <div className="sp-info-text">
                <strong>Email</strong>
                <span>info@medveritasye.com</span>
              </div>
            </div>

            <div className="sp-info-row">
              <div className="sp-info-icon"><PhoneIcon size={16} /></div>
              <div className="sp-info-text">
                <strong>WhatsApp</strong>
                <span>Available on request</span>
              </div>
            </div>

            <div className="sp-info-row">
              <div className="sp-info-icon"><MapPinIcon size={16} /></div>
              <div className="sp-info-text">
                <strong>Location</strong>
                <span>Sana'a, Yemen (National reach)</span>
              </div>
            </div>

            <div className="sp-sidebar-divider" />

            <h4 style={{ marginBottom: 12 }}>What to Expect</h4>
            <ul className="sp-list" style={{ marginBottom: 0 }}>
              <li><span className="sp-list-dot" />Response within 1 business day</li>
              <li><span className="sp-list-dot" />Initial consultation at no cost</li>
              <li><span className="sp-list-dot" />Tailored proposal for your needs</li>
              <li><span className="sp-list-dot" />Strict confidentiality guaranteed</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 7. PAGE: CONTACT SUCCESS
// Route: /contact/success
// ─────────────────────────────────────────────────────────────────

export function PageContactSuccess() {
  useSubpageStyles();
  useScrollTop();

  return (
    <div className="sp-wrap">
      <div className="sp-success-page">
        <div className="sp-success-card">
          <div className="sp-success-icon" aria-hidden="true">
            <CheckCircle size={34} />
          </div>

          <h1>Thank You!</h1>

          <p>
            Your message has been received. A member of the MedVeritas team will review your inquiry and respond within one business day.
          </p>

          <div className="sp-success-actions">
            <Link to="/" className="sp-btn-primary">
              Go to Home <ArrowRight />
            </Link>
            <Link to="/#services" className="sp-btn-outline">
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Default export — convenience re-export
// ─────────────────────────────────────────────────────────────────
export default {
  PageServiceDetail,
  PageProjectDetail,
  PageContact,
  PageContactSuccess,
  SERVICES,
  PROJECTS,
};
