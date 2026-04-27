// ─────────────────────────────────────────────────────────────────
// data/projects.ts — All MedVeritas project entries
// ─────────────────────────────────────────────────────────────────

import type{ ProjectData } from "../types";

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
