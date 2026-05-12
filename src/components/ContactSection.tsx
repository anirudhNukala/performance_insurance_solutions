"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import emailjs from "@emailjs/browser";

// ---------------------------------------------------------
// EmailJS Setup Instructions
// 1. Create a free account at https://emailjs.com
// 2. Add an Email Service (Gmail, Outlook, etc.) → copy the Service ID
// 3. Create a Template using these variables:
//    {{from_name}}, {{from_email}}, {{company}}, {{phone}},
//    {{subject}}, {{message}}
// 4. Copy your Public Key from Account > API Keys
// Replace the three constants below with your actual values.
// ---------------------------------------------------------
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

type FormData = {
  from_name: string;
  from_email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
};

const EMPTY: FormData = {
  from_name: "",
  from_email: "",
  company: "",
  phone: "",
  subject: "",
  message: "",
};

const SUBJECTS = [
  "Trucking Insurance Quote",
  "Surety Bond Quote",
  "BMC-84 Freight Broker Bond",
  "Policy Renewal",
  "Claims Assistance",
  "General Inquiry",
  "Other",
];

const MIN_FILL_TIME_MS = 4000; // humans take at least 4 seconds to fill a form

export default function ContactSection() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRenderedAt = useRef<number>(Date.now());

  useEffect(() => {
    formRenderedAt.current = Date.now();
  }, []);

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.from_name.trim()) e.from_name = "Required";
    if (!form.from_email.trim()) e.from_email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.from_email)) e.from_email = "Invalid email address";
    if (!form.company.trim()) e.company = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    else if (!/^[\d\s\-\+\(\)]{7,}$/.test(form.phone)) e.phone = "Invalid phone number";
    if (!form.subject) e.subject = "Required";
    if (!form.message.trim()) e.message = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((p) => ({ ...p, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot: bots fill hidden fields, humans don't
    if (honeypot) return;

    // Time gate: bots submit instantly, humans take time
    if (Date.now() - formRenderedAt.current < MIN_FILL_TIME_MS) return;

    if (!validate()) return;
    setStatus("sending");
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { ...form }, EMAILJS_PUBLIC_KEY);
      setStatus("success");
      setForm(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  const fieldClass = (name: keyof FormData) =>
    `block w-full border rounded px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-600 transition-colors duration-150 ${
      errors[name] ? "border-red-400 bg-red-50" : "border-slate-300 bg-white"
    }`;

  const label = (text: string, required = true) => (
    <label className="block text-slate-700 text-sm font-medium mb-1.5">
      {text}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-navy-900 mb-4">Contact Us</h2>
          <div className="w-12 h-1 bg-gold-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: contact info */}
          <div>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              Send us a message and a licensed agent will follow up within one business day.
            </p>

            <div className="space-y-6">
              <div>
                <p className="text-navy-900 font-semibold text-sm mb-1">Email</p>
                <p className="text-slate-600 text-sm">info@performanceinsurancesolutions.com</p>
              </div>

              <div>
                <p className="text-navy-900 font-semibold text-sm mb-1">Response Time</p>
                <p className="text-slate-600 text-sm">Within one business day</p>
              </div>

              <div>
                <p className="text-navy-900 font-semibold text-sm mb-1">Coverage Area</p>
                <p className="text-slate-600 text-sm">All 48 contiguous United States</p>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-8">
              <p className="text-slate-500 text-xs leading-relaxed">
                Independent licensed insurance agency. Coverage subject to underwriting approval. Terms vary by carrier.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-2">
            {status === "success" ? (
              <div className="border border-slate-200 rounded-lg p-10 text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-navy-900 text-xl font-bold mb-2">Message Received</h3>
                <p className="text-slate-500 text-sm mb-6">
                  We will be in touch within one business day.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="border border-slate-300 hover:border-slate-400 text-slate-600 hover:text-slate-800 text-sm px-5 py-2 rounded transition-colors duration-150"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="border border-slate-200 rounded-lg p-8 space-y-5">
                {/* Honeypot — hidden from real users, bots fill it automatically */}
                <input
                  type="text"
                  name="_honey"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ display: "none" }}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    {label("Full Name")}
                    <input
                      type="text"
                      name="from_name"
                      value={form.from_name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className={fieldClass("from_name")}
                    />
                    {errors.from_name && <p className="mt-1 text-red-500 text-xs">{errors.from_name}</p>}
                  </div>
                  <div>
                    {label("Email Address")}
                    <input
                      type="email"
                      name="from_email"
                      value={form.from_email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className={fieldClass("from_email")}
                    />
                    {errors.from_email && <p className="mt-1 text-red-500 text-xs">{errors.from_email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    {label("Company")}
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Smith Trucking LLC"
                      className={fieldClass("company")}
                    />
                    {errors.company && <p className="mt-1 text-red-500 text-xs">{errors.company}</p>}
                  </div>
                  <div>
                    {label("Phone Number")}
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      className={fieldClass("phone")}
                    />
                    {errors.phone && <p className="mt-1 text-red-500 text-xs">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  {label("Subject")}
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={`${fieldClass("subject")} cursor-pointer`}
                  >
                    <option value="" disabled>Select a subject...</option>
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.subject && <p className="mt-1 text-red-500 text-xs">{errors.subject}</p>}
                </div>

                <div>
                  {label("Message")}
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Number of trucks, cargo type, routes, current coverage, or any questions."
                    className={`${fieldClass("message")} resize-none`}
                  />
                  {errors.message && <p className="mt-1 text-red-500 text-xs">{errors.message}</p>}
                </div>

                {status === "error" && (
                  <div className="border border-red-200 bg-red-50 rounded px-4 py-3">
                    <p className="text-red-600 text-sm">
                      There was a problem sending your message. Please try again or email us directly.
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <p className="text-slate-400 text-xs">Fields marked <span className="text-red-500">*</span> are required.</p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="bg-navy-800 hover:bg-navy-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm px-7 py-2.5 rounded transition-colors duration-150 flex items-center gap-2"
                  >
                    {status === "sending" ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : "Submit"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
