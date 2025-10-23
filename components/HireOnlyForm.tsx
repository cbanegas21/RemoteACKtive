"use client";
import { useState } from "react";

export default function HireOnlyForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
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
        body: JSON.stringify({ ...formData, formType: "hire-only" }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          role: "",
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

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-white/80">
          Your Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-blue-500
            bg-white dark:bg-ink 
            border-gray-300 dark:border-white/10 
            text-gray-900 dark:text-white 
            placeholder-gray-400 dark:placeholder-white/40"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-white/80">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-blue-500
            bg-white dark:bg-ink 
            border-gray-300 dark:border-white/10 
            text-gray-900 dark:text-white 
            placeholder-gray-400 dark:placeholder-white/40"
          placeholder="john@company.com"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-2 text-gray-700 dark:text-white/80">
          Company Name *
        </label>
        <input
          type="text"
          id="company"
          name="company"
          required
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-blue-500
            bg-white dark:bg-ink 
            border-gray-300 dark:border-white/10 
            text-gray-900 dark:text-white 
            placeholder-gray-400 dark:placeholder-white/40"
          placeholder="Acme Inc."
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium mb-2 text-gray-700 dark:text-white/80">
          Role(s) Needed *
        </label>
        <input
          type="text"
          id="role"
          name="role"
          required
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-blue-500
            bg-white dark:bg-ink 
            border-gray-300 dark:border-white/10 
            text-gray-900 dark:text-white 
            placeholder-gray-400 dark:placeholder-white/40"
          placeholder="e.g., Marketing Manager, Software Developer"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2 text-gray-700 dark:text-white/80">
          Brief Description *
        </label>
        <textarea
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none
            bg-white dark:bg-ink 
            border-gray-300 dark:border-white/10 
            text-gray-900 dark:text-white 
            placeholder-gray-400 dark:placeholder-white/40"
          placeholder="Tell us about the role, experience level, and any specific requirements..."
        />
      </div>

      <div>
        <label htmlFor="referral" className="block text-sm font-medium mb-2 text-gray-700 dark:text-white/80">
          How did you hear about us?
        </label>
        <select
          id="referral"
          name="referral"
          value={formData.referral}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-blue-500
            bg-white dark:bg-ink 
            border-gray-300 dark:border-white/10 
            text-gray-900 dark:text-white"
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
        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-600/20 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400">
          Thank you! We'll be in touch soon.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-600/20 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400">
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-ink transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Submit Request"}
      </button>
    </form>
  );
}