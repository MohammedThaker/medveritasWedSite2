import { useEffect, useRef, type JSX } from "react";
import { Link } from "react-router-dom";
import { SERVICES } from "./data/services";
import { PROJECTS } from "./data/projects";

// ─── Tiny inline SVG icons (no external deps) ─────────────────────
const ChevronRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const ArrowRight = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);

const CheckIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="m20 6-11 11-5-5"/>
  </svg>
);


// Service icon map (simple SVG per category)
const SERVICE_ICONS: Record<string, JSX.Element> = {
  "research-evaluation": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  "health-surveys": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  ),
  "monitoring-evaluation": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
    </svg>
  ),
  "training-capacity-building": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  "healthcare-consulting": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    </svg>
  ),
  "implementation-support": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  ),
};

// Accent colours per service (using only existing CSS vars)
const SERVICE_ACCENTS: Record<string, string> = {
  "research-evaluation":        "var(--blue)",
  "health-surveys":             "var(--green)",
  "monitoring-evaluation":      "var(--blue)",
  "training-capacity-building": "var(--green)",
  "healthcare-consulting":      "var(--blue)",
  "implementation-support":     "var(--green)",
};

const SERVICE_ICON_BG: Record<string, string> = {
  "research-evaluation":        "rgba(41,170,225,.1)",
  "health-surveys":             "rgba(91,187,107,.1)",
  "monitoring-evaluation":      "rgba(41,170,225,.1)",
  "training-capacity-building": "rgba(91,187,107,.1)",
  "healthcare-consulting":      "rgba(41,170,225,.1)",
  "implementation-support":     "rgba(91,187,107,.1)",
};

const SERVICE_ICON_COLOR: Record<string, string> = {
  "research-evaluation":        "var(--blue)",
  "health-surveys":             "var(--green)",
  "monitoring-evaluation":      "var(--blue)",
  "training-capacity-building": "var(--green)",
  "healthcare-consulting":      "var(--blue)",
  "implementation-support":     "var(--green)",
};

// ─── Slug map for linking homepage cards to subpages ─────────────
const PROJECT_SLUG_MAP: Record<string, string> = {
  "WHO Health Surveys":                "who-health-surveys",
  "UNICEF Monitoring Projects":        "unicef-monitoring-projects",
  "Polio Campaign Coverage Surveys":   "polio-campaign-coverage-surveys",
  "Public Health Assessments":         "public-health-assessments",
};
 const LogoMark = () => (
    <span className="logo-icon" aria-hidden="true">
      {/* Pure SVG recreation: green M with blue checkmark tick */}
      <svg viewBox="0 0 44 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left leg of M - green */}
        <path d="M2 34 L10 6 L18 22 L22 14" stroke="#4aad35" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        {/* Right leg of M - green */}
        <path d="M22 14 L26 22 L34 6" stroke="#4aad35" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        {/* Blue checkmark tick overlaid on right side */}
        <path d="M28 20 L33 27 L42 10" stroke="#29AAE1" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    </span>
  );
// ─── Stats ───────────────────────────────────────────────────────
const STATS = [
  { value: "22", suffix: "", label: "Governorates covered" },
  { value: "94", suffix: ".2%", label: "Data quality score" },
  { value: "3,200", suffix: "+", label: "Monitoring visits" },
  { value: "10+", suffix: "", label: "Years field experience" },
];

// ─── Footer links ─────────────────────────────────────────────────
const FOOTER_SERVICES = SERVICES.slice(0, 4);

// ═════════════════════════════════════════════════════════════════
// COMPONENT
// ═════════════════════════════════════════════════════════════════
export default function App() {
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef  = useRef<HTMLButtonElement>(null);

  // ── 1. Navbar scroll effect ────────────────────────────────────
  useEffect(() => {
    const nav = document.querySelector(".navbar") as HTMLElement;
    if (!nav) return;

    const onScroll = () => {
      nav.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── 2. Mobile menu toggle ──────────────────────────────────────
  const toggleMenu = () => {
    const menu = mobileMenuRef.current;
    const btn  = hamburgerRef.current;
    if (!menu || !btn) return;
    const isOpen = menu.classList.toggle("open");
    btn.classList.toggle("open", isOpen);
    btn.setAttribute("aria-expanded", String(isOpen));
  };

  const closeMenu = () => {
    mobileMenuRef.current?.classList.remove("open");
    hamburgerRef.current?.classList.remove("open");
    hamburgerRef.current?.setAttribute("aria-expanded", "false");
  };

  // ── 3. Scroll-reveal observer ──────────────────────────────────
  useEffect(() => {
    const targets = document.querySelectorAll(".reveal");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════════════════ */}
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar__inner">

            <a href="#home" className="nav__logo" onClick={closeMenu} aria-label="MedVeritas home">
            <LogoMark />
            <div className="nav__logo-text">
              <span className="l-med">Med</span>
              <span className="l-v">V</span>
              <span className="l-rest">eritas</span>
            </div>
          </a>

          {/* ── Desktop links ── */}
          <ul className="navbar__links" role="list">
            <li><a href="#services">Services</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#about">About</a></li>
          </ul>

          {/* ── Desktop CTA ── */}
          <Link to="/contact" className="navbar__cta btn">
            Contact Us <ArrowRight size={14} />
          </Link>

          {/* ── Hamburger ── */}
          <button
            ref={hamburgerRef}
            className="navbar__hamburger"
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
            aria-expanded="false"
            aria-controls="mobile-menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div id="mobile-menu" ref={mobileMenuRef} className="navbar__mobile-menu" role="dialog" aria-label="Mobile navigation">
        <a href="#services" onClick={closeMenu}>Services</a>
        <a href="#projects" onClick={closeMenu}>Projects</a>
        <a href="#about"    onClick={closeMenu}>About</a>
        <Link to="/contact" className="btn btn-primary" style={{ marginTop: 8, justifyContent: "center" }} onClick={closeMenu}>
          Contact Us <ArrowRight size={14} />
        </Link>
      </div>


      {/* ═══════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════ */}
      <section className="hero" aria-label="Hero">
        <div className="hero__inner">

          {/* Left column */}
          <div>
            <div className="hero__badge">
              <span className="hero__badge-dot" aria-hidden="true" />
              Yemen's Leading Health Research Partner
            </div>

            <h1>
              Evidence that <em>drives</em> better health outcomes
            </h1>

            <p className="hero__sub">
              MedVeritas provides world-class research, monitoring, evaluation, and
              consulting services — built for complex humanitarian and development
              environments.
            </p>

            <div className="hero__actions">
              <Link to="/contact" className="btn btn-primary">
                Get in Touch <ArrowRight size={14} />
              </Link>
              <a href="#services" className="btn btn-secondary">
                Explore Services
              </a>
            </div>

            {/* Trust strip */}
            <div className="hero__trust">
              <span className="hero__trust-label">Trusted by</span>
              <div className="hero__trust-logos">
                <span className="hero__trust-badge">WHO</span>
                <span className="hero__trust-badge">UNICEF</span>
                <span className="hero__trust-badge">USAID</span>
                <span className="hero__trust-badge">UN Agencies</span>
              </div>
            </div>
          </div>

          {/* Right column — stats card visual */}
          <div className="hero__visual" aria-hidden="true">
            <div className="hero__stats-card">
              {STATS.map((s) => (
                <div className="hero__stat" key={s.label}>
                  <div className="hero__stat-value">
                    {s.value}<span>{s.suffix}</span>
                  </div>
                  <div className="hero__stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Floating accent card */}
            <div className="hero__accent-card">
              <div className="hero__accent-icon">
                <CheckIcon size={18} />
              </div>
              <div className="hero__accent-text">
                <strong>ISO-aligned protocols</strong>
                <span>Verified field methodology</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          STATS BAR
      ════════════════════════════════════════════════════ */}
      <div className="stats-bar" aria-label="Key metrics">
        <div className="stats-bar__inner">
          {STATS.map((s, i) => (
            <div className={`stats-bar__item reveal reveal-delay-${i + 1}`} key={s.label}>
              <div className="stats-bar__value">
                {s.value}<em>{s.suffix}</em>
              </div>
              <div className="stats-bar__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>


      {/* ═══════════════════════════════════════════════════
          SERVICES
      ════════════════════════════════════════════════════ */}
      <section className="services" id="services" aria-label="Services">
        <div className="section__inner">
          <div className="section__header">
            <div className="section__header-left">
              <div className="section__eyebrow reveal">What We Do</div>
              <h2 className="section__title reveal reveal-delay-1">
                Comprehensive health research<br />services
              </h2>
              <p className="section__sub reveal reveal-delay-2">
                Six specialist service areas — each backed by field-tested
                methodology and over a decade of humanitarian experience.
              </p>
            </div>
            <Link to="/contact" className="btn btn-secondary reveal" style={{ flexShrink: 0 }}>
              Work With Us <ArrowRight size={14} />
            </Link>
          </div>

          <div className="services-grid">
            {SERVICES.map((svc, i) => (
              <article
                key={svc.id}
                className={`service-card reveal reveal-delay-${(i % 3) + 1}`}
                style={
                  {
                    "--card-accent": SERVICE_ACCENTS[svc.id] ?? "var(--blue)",
                  } as React.CSSProperties
                }
              >
                  <div
                  className="pub-card__servce"
                  style={{ background: "linear-gradient(90deg, " + (SERVICE_ACCENTS[svc.id] ?? "var(--blue") + ", transparent 70%)" }}
                />
                {/* Icon */}
                <div
                  className="service-card__icon"
                  style={{
                    background: SERVICE_ICON_BG[svc.id] ?? "rgba(41,170,225,.1)",
                    color: SERVICE_ICON_COLOR[svc.id] ?? "var(--blue)",
                  }}
                  aria-hidden="true"
                >
                  {SERVICE_ICONS[svc.id]}
                </div>

                {/* Text */}
                <h3 className="service-card__title">{svc.title}</h3>
                <p className="service-card__body">{svc.tagline}</p>

                {/* Link */}
                <Link
                  to={`/services/${svc.id}`}
                  className="service-card__link"
                  style={{ color: SERVICE_ACCENTS[svc.id] ?? "var(--blue)" }}
                  aria-label={`Learn more about ${svc.title}`}
                >
                  Learn more <ChevronRight size={13} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          CTA  (mid-page)
      ════════════════════════════════════════════════════ */}
      <section className="cta-section" aria-label="Call to action">
        <div className="cta-section__inner">
          <div>
            <div className="cta-section__tag reveal">
              <CheckIcon size={12} /> Ready to collaborate?
            </div>
            <h2 className="reveal reveal-delay-1">
              Trusted evidence for<br />critical decisions
            </h2>
            <p className="reveal reveal-delay-2">
              From national-scale surveys to embedded field support — our teams
              are deployable across all 22 Yemeni governorates within 72 hours.
            </p>
          </div>
          <div className="cta-section__actions reveal reveal-delay-2">
            <Link to="/contact" className="btn btn-primary">
              Request a Consultation <ArrowRight size={14} />
            </Link>
            <a href="#services" className="btn btn-ghost-white">
              View Services
            </a>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          PROJECTS
      ════════════════════════════════════════════════════ */}
      <section className="projects" id="projects" aria-label="Featured projects">
        <div className="section__inner">
          <div className="section__header">
            <div className="section__header-left">
              <div className="section__eyebrow reveal">Our Work</div>
              <h2 className="section__title reveal reveal-delay-1">
                Field-proven impact
              </h2>
              <p className="section__sub reveal reveal-delay-2">
                From WHO national surveys to UNICEF third-party monitoring —
                results that directly inform humanitarian response.
              </p>
            </div>
          </div>

          <div className="pub-grid">
            {PROJECTS.map((proj, i) => (
              <article
                key={proj.id}
                className={`pub-card reveal reveal-delay-${(i % 2) + 1}`}
              >
                {/* Coloured top strip */}
                <div
                  className="pub-card__image-placeholder"
                  style={{ background: proj.badgeColor }}
                />

                <div className="pub-card__body">
                  {/* Partner badge */}
                  <span
                    className="pub-card__badge"
                    style={{ background: proj.badgeColor }}
                  >
                    {proj.partner}
                  </span>

                  <h3 className="pub-card__title">{proj.title}</h3>
                  <p className="pub-card__excerpt">{proj.tagline}</p>

                  <div className="pub-card__meta">
                    <div className="pub-card__meta-tags">
                      <span className="pub-card__tag">{proj.metaTimeframe}</span>
                      <span className="pub-card__tag">{proj.keyResults.length} results</span>
                    </div>
                    <Link
                      to={`/projects/${PROJECT_SLUG_MAP[proj.title] ?? proj.id}`}
                      className="pub-card__link"
                      aria-label={`Read more about ${proj.title}`}
                    >
                      Read more <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════ */}
      <footer className="footer" role="contentinfo">
        <div className="footer__inner">

          {/* Brand column */}
          <div className="footer__brand">
            {/* Logo — DO NOT change */}
            
            <a href="#home" className="nav__logo" onClick={closeMenu} aria-label="MedVeritas home">
            <LogoMark />
            <div className="nav__logo-text">
              <span className="l-med">Med</span>
              <span className="l-v">V</span>
              <span className="l-rest">eritas</span>
            </div>
          </a>
            <p>
              Independent health research, monitoring, and evaluation services
              for governments, UN agencies, and international NGOs operating
              across Yemen.
            </p>
          </div>

          {/* Services column */}
          <div>
            <h4 className="footer__col-title">Services</h4>
            <ul className="footer__links">
              {FOOTER_SERVICES.map((s) => (
                <li key={s.id}>
                  <Link to={`/services/${s.id}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="footer__col-title">Company</h4>
            <ul className="footer__links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="footer__col-title">Contact</h4>
            <ul className="footer__links">
              <li><a href="mailto:info@medveritasye.com">info@medveritasye.com</a></li>
              <li><span style={{ color: "rgba(255,255,255,.55)", fontSize: ".875rem" }}>Sana'a, Yemen</span></li>
              <li><span style={{ color: "rgba(255,255,255,.55)", fontSize: ".875rem" }}>National reach — 22 governorates</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <span className="footer__copyright">
            © {new Date().getFullYear()} MedVeritas. All rights reserved.
          </span>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </footer>
    </>
  );
}
