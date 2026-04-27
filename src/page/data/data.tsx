import type{ ServiceData,ProjectData } from "../type/subpages";

// ─────────────────────────────────────────────────────────────────
// 2. DATA
// ─────────────────────────────────────────────────────────────────

export const SERVICES1: ServiceData[] = [
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

export const PROJECTS1: ProjectData[] = [
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


// ─────────────────────────────────────────────────────────────────
// 4. PAGE: SERVICE DETAIL
// Route: /services/:serviceId
// ─────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────
// 5. PAGE: PROJECT DETAIL
// Route: /projects/:projectId
// ─────────────────────────────────────────────────────────────────



// ─────────────────────────────────────────────────────────────────
// Default export — convenience re-export
// ─────────────────────────────────────────────────────────────────
export default {
  SERVICES1,
  PROJECTS1,
};
