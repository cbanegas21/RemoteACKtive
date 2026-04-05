"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { FormSuccess, FormError } from "@/components/FormMessages";

interface GeneralContactFormProps {
  formType?: string;
}

export default function GeneralContactForm({ formType = "general" }: GeneralContactFormProps = {}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    description: "",
    referral: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, formType }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", company: "", description: "", referral: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border bg-[#04090f] border-white/10 text-white placeholder-white/30 transition-all duration-200 focus:outline-none focus:border-[#a8e8f5] focus:ring-1 focus:ring-[#a8e8f5]/30 focus:bg-[#04090f]";

  const labelClass =
    "block text-[11px] font-black mb-1.5 text-[#a8e8f5] uppercase tracking-[0.2em]";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Row: Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="gen-name" className={labelClass}>
            Your Name <span className="text-white/60 normal-case tracking-normal font-normal">*</span>
          </label>
          <input
            type="text"
            id="gen-name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label htmlFor="gen-email" className={labelClass}>
            Email <span className="text-white/60 normal-case tracking-normal font-normal">*</span>
          </label>
          <input
            type="email"
            id="gen-email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="jane@company.com"
          />
        </div>
      </div>

      {/* Company */}
      <div>
        <label htmlFor="gen-company" className={labelClass}>
          Company <span className="text-white/60 normal-case tracking-normal font-normal">(optional)</span>
        </label>
        <input
          type="text"
          id="gen-company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={inputClass}
          placeholder="Acme Inc."
        />
      </div>

      {/* How can we help */}
      <div>
        <label htmlFor="gen-description" className={labelClass}>
          How can we help you? <span className="text-white/60 normal-case tracking-normal font-normal">*</span>
        </label>
        <textarea
          id="gen-description"
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
          rows={5}
          className={`${inputClass} resize-none`}
          placeholder="Tell us what you're looking for, any questions you have, or how we can support your business..."
        />
      </div>

      {/* Referral */}
      <div>
        <label htmlFor="gen-referral" className={labelClass}>
          How did you hear about us?
        </label>
        <select
          id="gen-referral"
          name="referral"
          value={formData.referral}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select an option</option>
          <option value="search">Search Engine</option>
          <option value="social">Social Media</option>
          <option value="referral">Referral</option>
          <option value="ad">Advertisement</option>
          <option value="other">Other</option>
        </select>
      </div>

      {submitStatus === "success" && (
        <FormSuccess message="Thank you! We'll be in touch within 24 hours." />
      )}
      {submitStatus === "error" && <FormError />}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-[#04090f] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-[#04090f] shadow-[0_0_32px_rgba(168,232,245,0.18),0_8px_24px_rgba(184,252,232,0.2)] hover:shadow-[0_0_44px_rgba(168,232,245,0.28),0_12px_32px_rgba(184,252,232,0.35)] hover:-translate-y-0.5"
        style={{ background: "linear-gradient(135deg, #ffffff 0%, #a8e8f5 50%, #b8fce8 100%)" }}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
