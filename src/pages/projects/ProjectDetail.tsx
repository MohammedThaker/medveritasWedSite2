// ─────────────────────────────────────────────────────────────────
// pages/projects/ProjectDetail.tsx
// Route: /projects/:projectId
// ─────────────────────────────────────────────────────────────────

import { useParams, Link } from "react-router-dom";
import { useSubpageStyles, useScrollTop } from "../../components/useSubpageSetup";
import { NotFound } from "../../components/NotFound";
import { ArrowRight, ChevronLeft } from "../../components/Icons";
import { PROJECTS } from "../../data";

export function ProjectDetail() {
  useSubpageStyles();
  useScrollTop();

  const { projectId } = useParams<{ projectId: string }>();
  const project = PROJECTS.find((p) => p.id === projectId);

  if (!project) return <NotFound type="Project" />;

  return (
    <div className="sp-wrap">
      {/* ── Hero ── */}
      <div className="sp-hero">
        <div className="sp-hero__inner">
          <nav className="sp-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sp-breadcrumb-sep">›</span>
            <Link to="/#projects">Projects</Link>
            <span className="sp-breadcrumb-sep">›</span>
            <span>{project.title}</span>
          </nav>

          <div className="sp-hero__badge-row">
            <span className={`sp-badge sp-badge--${project.badgeVariant}`}>
              {project.partner}
            </span>
          </div>

          <h1>{project.title}</h1>
          <p>{project.tagline}</p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="sp-body">
        {/* Left column */}
        <div>
          {project.imageUrl && (
            <div className="sp-image-block">
              <img src={project.imageUrl} alt={project.title} />
            </div>
          )}

          <h2 className="sp-section-title">Project Context</h2>
          <p className="sp-prose">{project.context}</p>

          <h2 className="sp-section-title">Objectives</h2>
          <ul className="sp-list">
            {project.objectives.map((obj) => (
              <li key={obj}>
                <span className="sp-list-dot" />
                {obj}
              </li>
            ))}
          </ul>

          <div style={{ marginBottom: 28 }}>
            <h2 className="sp-section-title">Geographic Coverage</h2>
            <p className="sp-prose" style={{ marginBottom: 0 }}>
              {project.coverage}
            </p>
          </div>

          <h2 className="sp-section-title">Methodology</h2>
          <p className="sp-prose">{project.methodology}</p>

          <h2 className="sp-section-title">Key Results &amp; Impact</h2>
          <ul className="sp-list" style={{ marginBottom: 32 }}>
            {project.keyResults.map((r) => (
              <li key={r}>
                <span className="sp-list-dot sp-list-dot--green" />
                {r}
              </li>
            ))}
          </ul>

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
            <button
              className="sp-btn-outline"
              style={{ width: "100%", justifyContent: "center", marginBottom: 12 }}
              onClick={() =>
                alert("Report download will be available soon. Please contact us directly.")
              }
              aria-label="Download project report (coming soon)"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
              Download Report
            </button>
            <Link
              to="/contact"
              className="sp-btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Contact for Details <ArrowRight />
            </Link>
          </div>
        </aside>
      </div>

      {/* ── CTA Strip ── */}
      <div className="sp-cta-strip">
        <h2>Explore More of Our Work</h2>
        <p>
          Browse other projects or discover how our services can support your
          organisation.
        </p>
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
