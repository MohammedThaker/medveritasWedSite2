// ─────────────────────────────────────────────────────────────────
// pages/contact/Contact.tsx
// Route: /contact
// ─────────────────────────────────────────────────────────────────

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSubpageStyles, useScrollTop } from "../../components/useSubpageSetup";
import { ArrowRight, MailIcon, PhoneIcon, MapPinIcon } from "../../components/Icons";
import { SERVICES } from "../../data";
import type{ ContactForm, FormErrors } from "../../types";

export function Contact() {
  useSubpageStyles();
  useScrollTop();

  const navigate = useNavigate();

  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) {
      e.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) e.message = "Please write a short message.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate network request — replace with real API call
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    navigate("/contact/success");
  };

  return (
    <div className="sp-wrap">
      {/* ── Hero ── */}
      <div className="sp-hero">
        <div className="sp-hero__inner">
          <nav className="sp-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sp-breadcrumb-sep">›</span>
            <span>Contact Us</span>
          </nav>
          <div className="sp-hero__badge-row">
            <span className="sp-badge sp-badge--blue">Get in Touch</span>
          </div>
          <h1>Contact MedVeritas</h1>
          <p>
            Whether you're looking for a research partner, need monitoring support,
            or want to explore a consulting engagement — our team responds within
            one business day.
          </p>
        </div>
      </div>

      {/* ── Contact Grid ── */}
      <div className="sp-contact-grid">
        {/* Form */}
        <div>
          <h2 className="sp-section-title">Send Us a Message</h2>
          <p className="sp-prose" style={{ marginBottom: 28 }}>
            Fill in the form below and a member of the MedVeritas team will reach
            out to discuss your needs.
          </p>

          <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
            {/* Name */}
            <div className="sp-form-group">
              <label htmlFor="cf-name">Full Name *</label>
              <input
                id="cf-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="e.g. Dr. Aisha Mohammed"
                value={form.name}
                onChange={handleChange}
                aria-describedby={errors.name ? "cf-name-err" : undefined}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <span id="cf-name-err" className="sp-form-error">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="sp-form-group">
              <label htmlFor="cf-email">Email Address *</label>
              <input
                id="cf-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@organisation.org"
                value={form.email}
                onChange={handleChange}
                aria-describedby={errors.email ? "cf-email-err" : undefined}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <span id="cf-email-err" className="sp-form-error">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Phone */}
            <div className="sp-form-group">
              <label htmlFor="cf-phone">
                Phone / WhatsApp
                <span
                  style={{
                    fontWeight: 400,
                    color: "var(--muted)",
                    marginLeft: 6,
                  }}
                >
                  (optional)
                </span>
              </label>
              <input
                id="cf-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+967 ..."
                value={form.phone}
                onChange={handleChange}
              />
              <span className="sp-form-hint">
                We use WhatsApp for quick follow-ups if you prefer.
              </span>
            </div>

            {/* Service interest */}
            <div className="sp-form-group">
              <label htmlFor="cf-service">Area of Interest</label>
              <select
                id="cf-service"
                name="service"
                value={form.service}
                onChange={handleChange}
              >
                <option value="">— Select a service (optional) —</option>
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
                <option value="general">General Inquiry</option>
                <option value="partnership">Partnership / Collaboration</option>
              </select>
            </div>

            {/* Message */}
            <div className="sp-form-group">
              <label htmlFor="cf-message">Your Message *</label>
              <textarea
                id="cf-message"
                name="message"
                placeholder="Briefly describe your project, organisation, and what you need…"
                value={form.message}
                onChange={handleChange}
                aria-describedby={errors.message ? "cf-msg-err" : undefined}
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <span id="cf-msg-err" className="sp-form-error">
                  {errors.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="sp-btn-primary"
              style={{ marginTop: 4, minWidth: 180, justifyContent: "center" }}
              disabled={loading}
              aria-live="polite"
            >
              {loading ? (
                "Sending…"
              ) : (
                <>
                  <span>Send Message</span> <ArrowRight />
                </>
              )}
            </button>

            {loading && (
              <p
                className="sp-form-status"
                aria-live="polite"
                style={{ marginTop: 10 }}
              >
                Sending your message, please wait…
              </p>
            )}
          </form>
        </div>

        {/* Info sidebar */}
        <aside>
          <div className="sp-info-card">
            <h4>Contact Information</h4>

            <div className="sp-info-row">
              <div className="sp-info-icon">
                <MailIcon size={16} />
              </div>
              <div className="sp-info-text">
                <strong>Email</strong>
                <span>info@medveritasye.com</span>
              </div>
            </div>

            <div className="sp-info-row">
              <div className="sp-info-icon">
                <PhoneIcon size={16} />
              </div>
              <div className="sp-info-text">
                <strong>WhatsApp</strong>
                <span>Available on request</span>
              </div>
            </div>

            <div className="sp-info-row">
              <div className="sp-info-icon">
                <MapPinIcon size={16} />
              </div>
              <div className="sp-info-text">
                <strong>Location</strong>
                <span>Sana'a, Yemen (National reach)</span>
              </div>
            </div>

            <div className="sp-sidebar-divider" />

            <h4 style={{ marginBottom: 12 }}>What to Expect</h4>
            <ul className="sp-list" style={{ marginBottom: 0 }}>
              <li>
                <span className="sp-list-dot" />
                Response within 1 business day
              </li>
              <li>
                <span className="sp-list-dot" />
                Initial consultation at no cost
              </li>
              <li>
                <span className="sp-list-dot" />
                Tailored proposal for your needs
              </li>
              <li>
                <span className="sp-list-dot" />
                Strict confidentiality guaranteed
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
