// ─────────────────────────────────────────────────────────────────
// types/index.ts — Shared TypeScript interfaces for MedVeritas
// ─────────────────────────────────────────────────────────────────

export interface ServiceData {
  id: string;           // slug  e.g. "research-evaluation"
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

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}
