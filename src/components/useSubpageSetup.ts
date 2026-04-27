// ─────────────────────────────────────────────────────────────────
// components/useSubpageSetup.ts — Shared hooks for subpages
// ─────────────────────────────────────────────────────────────────

import { useEffect } from "react";
import { SUBPAGE_CSS } from "./subpageStyles";

/** Inject shared subpage CSS once into <head> */
export function useSubpageStyles() {
  useEffect(() => {
    if (document.getElementById("sp-styles")) return;
    const el = document.createElement("style");
    el.id = "sp-styles";
    el.textContent = SUBPAGE_CSS;
    document.head.appendChild(el);
  }, []);
}

/** Scroll to top instantly on page mount */
export function useScrollTop() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);
}
