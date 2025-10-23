"use client";
import { useState } from "react";

export default function HireManageForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    description: "",
    hasTools: "",
    tools: "",
    timezone: "",
    teamSize: "",
    startDate: "",
    budget: "",
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
        body: JSON.stringify({ ...formData, formType: "hire-manage" }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          role: "",
          description: "",
          hasTools: "",
          tools: "",
          timezone: "",
          teamSize: "",
          startDate: "",
          budget: "",
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

  const inputClass = "w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-ink border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40";
  const labelClass = "block text-sm font-medium mb-2 text-gray-700 dark:text-white/80";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
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
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          Company Name *
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
        <label htmlFor="role" className={labelClass}>
          Role(s) Needed *
        </label>
        <input
          type="text"
          id="role"
          name="role"
          required
          value={formData.role}
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
          rows={3}
          className={`${inputClass} resize-none`}
          placeholder="Tell us about the role..."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="hasTools" className={labelClass}>
            Do you have tools already? *
          </label>
          <select
            id="hasTools"
            name="hasTools"
            required
            value={formData.hasTools}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="partial">Partially</option>
          </select>
        </div>

        <div>
          <label htmlFor="timezone" className={labelClass}>
            Preferred Timezone *
          </label>
          <input
            type="text"
            id="timezone"
            name="timezone"
            required
            value={formData.timezone}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g., EST, PST, GMT"
          />
        </div>
      </div>

      {formData.hasTools === "yes" || formData.hasTools === "partial" ? (
        <div>
          <label htmlFor="tools" className={labelClass}>
            Which tools do you use?
          </label>
          <input
            type="text"
            id="tools"
            name="tools"
            value={formData.tools}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g., Slack, Jira, HubSpot"
          />
        </div>
      ) : null}

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="teamSize" className={labelClass}>
            Team Size Needed
          </label>
          <select
            id="teamSize"
            name="teamSize"
            value={formData.teamSize}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select</option>
            <option value="1">1 person</option>
            <option value="2-5">2-5 people</option>
            <option value="6-10">6-10 people</option>
            <option value="10+">10+ people</option>
          </select>
        </div>

        <div>
          <label htmlFor="startDate" className={labelClass}>
            Desired Start Date
          </label>
          <input
            type="text"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g., ASAP, Next Month, Q2 2025"
          />
        </div>
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
          <option value="">Select a range</option>
          <option value="<5k">Less than $5,000/month</option>
          <option value="5k-10k">$5,000 - $10,000/month</option>
          <option value="10k-20k">$10,000 - $20,000/month</option>
          <option value="20k+">$20,000+/month</option>
        </select>
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
        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-600/20 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400">
          Thank you! We'll be in touch soon to discuss your needs.
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
        className="w-full px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-ink transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Submit Request"}
      </button>
    </form>
  );
}