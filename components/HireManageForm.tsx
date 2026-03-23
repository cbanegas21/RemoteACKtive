"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { FormSuccess, FormError } from "@/components/FormMessages";

export default function HireManageForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    roles: "",
    description: "",
    teamSize: "",
    timeline: "",
    budget: "",
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
        body: JSON.stringify({ ...formData, formType: "hire-manage" }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          roles: "",
          description: "",
          teamSize: "",
          timeline: "",
          budget: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border bg-[#0D1A2D] border-white/10 text-white placeholder-white/30 transition-all duration-200 focus:outline-none focus:border-[#57C5CF] focus:ring-1 focus:ring-[#57C5CF]/30 focus:bg-[#0D1A2D]";

  const labelClass =
    "block text-[11px] font-bold mb-1.5 text-[#57C5CF] uppercase tracking-widest";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Row: Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your Name <span className="text-white/40 normal-case tracking-normal font-normal">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-white/40 normal-case tracking-normal font-normal">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="jane@company.com"
          />
        </div>
      </div>

      {/* Row: Company + Roles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="company" className={labelClass}>
            Company <span className="text-white/40 normal-case tracking-normal font-normal">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            className={inputClass}
            placeholder="Acme Inc."
          />
        </div>
        <div>
          <label htmlFor="roles" className={labelClass}>
            Role(s) Needed <span className="text-white/40 normal-case tracking-normal font-normal">*</span>
          </label>
          <input
            type="text"
            id="roles"
            name="roles"
            required
            value={formData.roles}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g. Sales Rep, VA, Dev"
          />
        </div>
      </div>

      {/* Row: Team Size + Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="teamSize" className={labelClass}>
            Team Size <span className="text-white/40 normal-case tracking-normal font-normal">*</span>
          </label>
          <select
            id="teamSize"
            name="teamSize"
            required
            value={formData.teamSize}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="" disabled>Select team size</option>
            <option value="1-2">1-2 people</option>
            <option value="3-5">3-5 people</option>
            <option value="6-10">6-10 people</option>
            <option value="10+">10+ people</option>
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className={labelClass}>
            Start Timeline <span className="text-white/40 normal-case tracking-normal font-normal">*</span>
          </label>
          <select
            id="timeline"
            name="timeline"
            required
            value={formData.timeline}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="" disabled>Select timeline</option>
            <option value="urgent">Urgent (1-2 weeks)</option>
            <option value="soon">Soon (2-4 weeks)</option>
            <option value="flexible">Flexible (1-2 months)</option>
            <option value="planning">Just planning ahead</option>
          </select>
        </div>
      </div>

      {/* Project Description */}
      <div>
        <label htmlFor="description" className={labelClass}>
          Project Description <span className="text-white/40 normal-case tracking-normal font-normal">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Tell us about your business, the roles you need, and any specific requirements or goals..."
        />
      </div>

      {/* Budget */}
      <div>
        <label htmlFor="budget" className={labelClass}>
          Monthly Budget Range{" "}
          <span className="text-white/40 normal-case tracking-normal font-normal">(optional)</span>
        </label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Prefer not to say</option>
          <option value="under-5k">Under $5,000/month</option>
          <option value="5k-10k">$5,000 - $10,000/month</option>
          <option value="10k-20k">$10,000 - $20,000/month</option>
          <option value="over-20k">Over $20,000/month</option>
        </select>
      </div>

      {submitStatus === "success" && (
        <FormSuccess message="Thank you! We'll prepare a custom proposal and reach out within 24 hours." />
      )}
      {submitStatus === "error" && <FormError />}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-4 rounded-full btn-gradient text-[#0F1926] font-bold text-base flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#4FFFB0] focus:ring-offset-2 focus:ring-offset-[#1E2430] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all duration-200 hover:shadow-[0_0_24px_rgba(79,255,176,0.35)]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Book Discovery Call</span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
