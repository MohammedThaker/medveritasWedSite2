// ─────────────────────────────────────────────────────────────────
// pages/services/ServiceDetail.tsx
// Route: /services/:serviceId
// ─────────────────────────────────────────────────────────────────

import { useParams, Link } from "react-router-dom";
import { useSubpageStyles, useScrollTop } from "../../components/useSubpageSetup";
import { NotFound } from "../../components/NotFound";
import { ArrowRight } from "../../components/Icons";
import { SERVICES } from "../../data";

export function ServiceDetail() {
  useSubpageStyles();
  useScrollTop();

  const { serviceId } = useParams<{ serviceId: string }>();
  const service = SERVICES.find((s) => s.id === serviceId);

  if (!service) return <NotFound type="Service" />;

  const dotClass =
    service.badgeVariant === "green"
      ? "sp-list-dot sp-list-dot--green"
      : "sp-list-dot";

  return (
    <div className="sp-wrap">
      {/* ── Hero ── */}
      <div className="sp-hero">
        <div className="sp-hero__inner">
          <nav className="sp-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sp-breadcrumb-sep">›</span>
            <Link to="/#services">Services</Link>
            <span className="sp-breadcrumb-sep">›</span>
            <span>{service.title}</span>
          </nav>

          <div className="sp-hero__badge-row">
            <span className={`sp-badge sp-badge--${service.badgeVariant}`}>
              {service.badge}
            </span>
            <span style={{ fontSize: ".8rem", color: "var(--muted)" }}>
              {service.metaCategory}
            </span>
          </div>

          <h1>{service.title}</h1>
          <p>{service.tagline}</p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="sp-body">
        {/* Left column */}
        <div>
          <h2 className="sp-section-title">About This Service</h2>
          <p className="sp-prose">{service.description}</p>

          <div className="sp-why-box">
            <h3>Why Choose This Service?</h3>
            <ul className="sp-list" style={{ marginBottom: 0 }}>
              {service.whyChoose.map((item) => (
                <li key={item}>
                  <span className={dotClass} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <h2 className="sp-section-title">Scope of Work</h2>
          <ul className="sp-list">
            {service.scope.map((item) => (
              <li key={item}>
                <span className="sp-list-dot" />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="sp-section-title">Deliverables</h2>
          <ul className="sp-list">
            {service.deliverables.map((item) => (
              <li key={item}>
                <span className="sp-list-dot sp-list-dot--green" />
                {item}
              </li>
            ))}
          </ul>

          <div className="sp-case-box">
            <h3>{service.caseTitle}</h3>
            <p>{service.caseText}</p>
          </div>

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
            <p
              style={{
                fontSize: ".85rem",
                color: "var(--muted)",
                lineHeight: 1.65,
                marginBottom: 18,
              }}
            >
              Interested in this service? Get in touch and our team will respond
              within one business day.
            </p>
            <Link
              to="/contact"
              className="sp-btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Request a Consultation <ArrowRight />
            </Link>
          </div>
        </aside>
      </div>

      {/* ── CTA Strip ── */}
      <div className="sp-cta-strip">
        <h2>Ready to Work Together?</h2>
        <p>
          Connect with MedVeritas for tailored support, proposals, or partnership
          inquiries.
        </p>
        <div className="sp-cta-actions">
          <Link to="/contact" className="sp-btn-primary">
            Contact Us <ArrowRight />
          </Link>
          <Link to="/#services" className="sp-btn-outline-white">
            Explore Other Services
          </Link>
        </div>
      </div>
    </div>
  );
}
