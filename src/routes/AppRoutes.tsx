// ─────────────────────────────────────────────────────────────────
// routes/AppRoutes.tsx — Central routing configuration
//
// Usage: Replace your current entry point (main.tsx / index.tsx) with:
//
//   import { AppRoutes } from "./routes/AppRoutes";
//   ReactDOM.createRoot(document.getElementById("root")!).render(
//     <React.StrictMode>
//       <AppRoutes />
//     </React.StrictMode>
//   );
//
// Prerequisites:
//   npm install react-router-dom
// ─────────────────────────────────────────────────────────────────

import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App"; // existing homepage — unchanged

import { ServiceDetail }   from "../pages/services/ServiceDetail";
import { ProjectDetail }   from "../pages/projects/ProjectDetail";
import { Contact }         from "../pages/contact/Contact";
import { ContactSuccess }  from "../pages/contact/ContactSuccess";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Homepage (all existing sections) ── */}
        <Route path="/" element={<App />} />

        {/* ── Service detail pages ── */}
        {/*
          Available slugs:
            /services/research-evaluation
            /services/health-surveys
            /services/monitoring-evaluation
            /services/training-capacity-building
            /services/healthcare-consulting
            /services/implementation-support
        */}
        <Route path="/services/:serviceId" element={<ServiceDetail />} />

        {/* ── Project detail pages ── */}
        {/*
          Available slugs:
            /projects/who-health-surveys
            /projects/unicef-monitoring-projects
            /projects/polio-campaign-coverage-surveys
            /projects/public-health-assessments
        */}
        <Route path="/projects/:projectId" element={<ProjectDetail />} />

        {/* ── Contact flow ── */}
        <Route path="/contact"         element={<Contact />} />
        <Route path="/contact/success" element={<ContactSuccess />} />

        {/* ── 404 fallback ── */}
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}
