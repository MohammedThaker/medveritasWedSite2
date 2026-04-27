// ─────────────────────────────────────────────────────────────────
// pages/contact/ContactSuccess.tsx
// Route: /contact/success
// ─────────────────────────────────────────────────────────────────

import { Link } from "react-router-dom";
import { useSubpageStyles, useScrollTop } from "../../components/useSubpageSetup";
import { ArrowRight, CheckCircle } from "../../components/Icons";

export function ContactSuccess() {
  useSubpageStyles();
  useScrollTop();

  return (
    <div className="sp-wrap">
      <div className="sp-success-page">
        <div className="sp-success-card">
          <div className="sp-success-icon" aria-hidden="true">
            <CheckCircle size={34} />
          </div>

          <h1>Thank You!</h1>

          <p>
            Your message has been received. A member of the MedVeritas team will
            review your inquiry and respond within one business day.
          </p>

          <div className="sp-success-actions">
            <Link to="/" className="sp-btn-primary">
              Go to Home <ArrowRight />
            </Link>
            <Link to="/#services" className="sp-btn-outline">
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
