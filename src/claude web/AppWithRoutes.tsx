/**
 * AppWithRoutes.tsx
 * ──────────────────────────────────────────────────────────────────
 * Drop-in replacement for your current App entry point.
 *
 * Instructions:
 *  1. npm install react-router-dom   (if not already installed)
 *  2. Replace the contents of your main.tsx / index.tsx with the
 *     standard ReactDOM.createRoot call, wrapping <AppWithRoutes />.
 *  3. Your existing App() component (Navbar, Hero, Services, …)
 *     stays exactly as it is — just import it below.
 *
 * File layout assumed:
 *   src/
 *     App.tsx          ← your existing homepage (unchanged)
 *     subpages.tsx     ← the file generated alongside this one
 *     AppWithRoutes.tsx← THIS FILE
 *     App.css          ← your existing global styles (unchanged)
 *
 * ──────────────────────────────────────────────────────────────────
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";                          // ← existing homepage
import {
  PageServiceDetail,
  PageProjectDetail,
  PageContact,
  PageContactSuccess,
} from "./subpages";

export default function AppWithRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Homepage (all existing sections) ── */}
        <Route path="/" element={<App />} />

        {/* ── Service detail pages ── */}
        {/*
          Slugs available:
            /services/research-evaluation
            /services/health-surveys
            /services/monitoring-evaluation
            /services/training-capacity-building
            /services/healthcare-consulting
            /services/implementation-support
        */}
        <Route path="/services/:serviceId" element={<PageServiceDetail />} />

        {/* ── Project detail pages ── */}
        {/*
          Slugs available:
            /projects/who-health-surveys
            /projects/unicef-monitoring-projects
            /projects/polio-campaign-coverage-surveys
            /projects/public-health-assessments
        */}
        <Route path="/projects/:projectId" element={<PageProjectDetail />} />

        {/* ── Contact flow ── */}
        <Route path="/contact"         element={<PageContact />} />
        <Route path="/contact/success" element={<PageContactSuccess />} />

        {/* ── 404 fallback ── */}
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}


/*
 * ── How to update your existing homepage cards to link to subpages ──
 *
 * In your Services section (medveritaslast4.jsx), change:
 *
 *   <a href="#contact" className="service-card__link" style={{ color }}>
 *     Learn more <Icon.ChevronRight />
 *   </a>
 *
 * to:
 *
 *   import { Link } from "react-router-dom";
 *   ...
 *   <Link to={`/services/${slugify(title)}`} className="service-card__link" style={{ color }}>
 *     Learn more <Icon.ChevronRight />
 *   </Link>
 *
 * Where slugify maps titles to IDs:
 *
 *   const SLUG_MAP: Record<string, string> = {
 *     "Research & Evaluation":       "research-evaluation",
 *     "Health Surveys":              "health-surveys",
 *     "Monitoring & Evaluation":     "monitoring-evaluation",
 *     "Training & Capacity Building":"training-capacity-building",
 *     "Healthcare Consulting":       "healthcare-consulting",
 *     "Implementation Support":      "implementation-support",
 *   };
 *
 * Do the same for pub-card "Read more" links → /projects/:projectId
 *
 *   const PROJECT_SLUG_MAP: Record<string, string> = {
 *     "WHO Health Surveys":                "who-health-surveys",
 *     "UNICEF Monitoring Projects":        "unicef-monitoring-projects",
 *     "Polio Campaign Coverage Surveys":   "polio-campaign-coverage-surveys",
 *     "Public Health Assessments":         "public-health-assessments",
 *   };
 *
 * And update "#contact" hrefs in Navbar / CTA / Footer to use:
 *   <Link to="/contact">Contact Us</Link>
 *
 * ──────────────────────────────────────────────────────────────────
 */
