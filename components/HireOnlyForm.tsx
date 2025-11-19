"use client";

import { useState } from "react";

export default function HireOnlyForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    roles: "",
    description: "",
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
        body: JSON.stringify({ ...formData, formType: "hire-only" }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          roles: "",
          description: "",
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
    "w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-[#57C5CF] bg-[#2A3142] border-gray-600 text-white placeholder-gray-400";
  const labelClass = "block text-sm font-medium mb-2 text-gray-300";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className={labelClass}>
          Your Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className={inputClass}
          
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className={inputClass}
          
        />
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          Company *
        </label>
        <input
          type="text"
          id="company"
          name="company"
          required
          value={formData.company}
          onChange={handleChange}
          className={inputClass}
          
        />
      </div>

      <div>
        <label htmlFor="roles" className={labelClass}>
          Role(s) to Fill *
        </label>
        <input
          type="text"
          id="roles"
          name="roles"
          required
          value={formData.roles}
          onChange={handleChange}
          className={inputClass}
          
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Role Description *
        </label>
        <textarea
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`${inputClass} resize-none`}
          
        />
      </div>

      <div>
        <label htmlFor="timeline" className={labelClass}>
          Hiring Timeline *
        </label>
        <select
          id="timeline"
          name="timeline"
          required
          value={formData.timeline}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select timeline</option>
          <option value="urgent">Urgent (1-2 weeks)</option>
          <option value="soon">Soon (2-4 weeks)</option>
          <option value="flexible">Flexible (1-2 months)</option>
          <option value="planning">Just planning ahead</option>
        </select>
      </div>

      <div>
        <label htmlFor="budget" className={labelClass}>
          Budget Range (Optional)
        </label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Prefer not to say</option>
          <option value="under-2k">Under $2,000/month</option>
          <option value="2k-4k">$2,000 - $4,000/month</option>
          <option value="4k-6k">$4,000 - $6,000/month</option>
          <option value="over-6k">Over $6,000/month</option>
        </select>
      </div>

      {submitStatus === "success" && (
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400">
          Thank you! We'll review your request and get back to you within 24 hours.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
          Something went wrong. Please try again or email us directly at admin@remoteacktive.com
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3.5 rounded-full bg-[#57C5CF] text-black font-bold hover:bg-primary-cyan text-[18px] focus:outline-none focus:ring-2 focus:ring-[#57C5CF] focus:ring-offset-2 focus:ring-offset-[#1E2430] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        {isSubmitting ? "Sending..." : "Book Discovery Call"}
      </button>
    </form>
  );
}