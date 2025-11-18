"use client";
import { useState } from "react";

export default function GeneralContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    roles: "",
    description: "",
    referral: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        body: JSON.stringify({ ...formData, formType: "general" }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          roles: "",
          description: "",
          referral: "",
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

  const inputClass = "w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-[#378B57] bg-white border-gray-300 text-gray-900 placeholder-gray-400";
  const labelClass = "block text-sm font-medium mb-2 text-gray-700";

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
          placeholder="John Doe"
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
          placeholder="john@company.com"
        />
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={inputClass}
          placeholder="Acme Inc."
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
          placeholder="e.g., Marketing Manager, Software Developer"
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Brief Description *
        </label>
        <textarea
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Tell us about the role, experience level, and any specific requirements..."
        />
      </div>

      <div>
        <label htmlFor="referral" className={labelClass}>
          How did you hear about us?
        </label>
        <select
          id="referral"
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
        <div className="p-4 rounded-lg bg-[#378B57]/10 border border-[#378B57]/30 text-[#378B57]">
          Thank you! We'll be in touch soon.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 rounded-lg bg-[#378B57] text-white font-medium hover:bg-[#57C5CF] focus:outline-none focus:ring-2 focus:ring-[#378B57] focus:ring-offset-2 focus:ring-offset-white transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}