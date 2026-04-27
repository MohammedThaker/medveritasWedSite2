// ─────────────────────────────────────────────────────────────────
// components/NotFound.tsx — Shared 404-style fallback for detail pages
// ─────────────────────────────────────────────────────────────────

import { Link } from "react-router-dom";
import { ChevronLeft } from "./Icons";

interface NotFoundProps {
  type: string; // e.g. "Service" or "Project"
}

export function NotFound({ type }: NotFoundProps) {
  return (
    <div className="sp-wrap">
      <div className="sp-notfound">
        <h2>{type} not found</h2>
        <p>The page you're looking for doesn't exist or may have moved.</p>
        <Link to="/" className="sp-btn-primary" style={{ marginTop: 8 }}>
          <ChevronLeft /> Back to Home
        </Link>
      </div>
    </div>
  );
}
