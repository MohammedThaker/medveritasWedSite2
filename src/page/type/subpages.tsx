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
