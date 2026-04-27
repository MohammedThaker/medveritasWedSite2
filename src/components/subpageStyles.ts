// ─────────────────────────────────────────────────────────────────
// components/subpageStyles.ts
// CSS injected once into <head> for all subpages.
// Uses only CSS variables already defined in App.css — no new colours.
// ─────────────────────────────────────────────────────────────────

export const SUBPAGE_CSS = `
/* ── Subpage shared layout ───────────────────────────── */
.sp-wrap {
  padding-top: 72px;
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

/* ── Action buttons ──────────────────────────────────── */
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
.sp-form-hint  { font-size: .78rem; color: var(--muted); }
.sp-form-error { font-size: .78rem; color: #e53e3e; }
.sp-form-status { font-size: .88rem; color: var(--green); font-weight: 600; padding: 10px 0; }

/* ── Info sidebar ────────────────────────────────────── */
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
.sp-info-text strong { font-size: .85rem; color: var(--navy); display: block; margin-bottom: 2px; }
.sp-info-text span   { font-size: .82rem; color: var(--muted); }

/* ── Success page ────────────────────────────────────── */
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

/* ── Not-found state ─────────────────────────────────── */
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
.sp-notfound h2 { font-family: var(--font-display); font-size: 2rem; color: var(--navy); }
.sp-notfound p  { color: var(--muted); }
`;
