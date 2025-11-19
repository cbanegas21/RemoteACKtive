"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Calendar, Clock, Users } from "lucide-react";

export default function BookACallPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          formType: "hire-manage",
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", company: "", phone: "", description: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Calendar,
      title: "Free 30-Minute Strategy Session",
      description: "No commitment, no pressure—just valuable insights tailored to your business needs.",
    },
    {
      icon: Users,
      title: "Custom Talent Recommendations",
      description: "We'll identify the exact roles that will drive the most value for your organization.",
    },
    {
      icon: Clock,
      title: "Fast Response Time",
      description: "Get pre-qualified candidates within 3-10 days of your consultation.",
    },
  ];

  const whatToExpect = [
    "Understand your current business challenges and growth goals",
    "Identify where remote talent can deliver the biggest impact",
    "Discuss our vetting process and how we ensure quality",
    "Review pricing options and ROI expectations",
    "Answer all your questions about remote team building",
    "Receive a custom hiring roadmap tailored to your needs",
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background-dark pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Book Your Free Discovery Call
            </h1>
            <p className="text-xl text-gray-300">
              Let's discuss how Remote ACKtive can help you build a world-class remote team
            </p>
          </div>

          {/* Split Layout */}
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Left: Form */}
            <div className="bg-background-darkCard border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Schedule Your Consultation
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background-dark border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-teal focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background-dark border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-teal focus:border-transparent"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background-dark border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-teal focus:border-transparent"
                    placeholder="Your Company Inc."
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background-dark border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-teal focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                    What are you looking to accomplish? *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background-dark border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-teal focus:border-transparent resize-none"
                    placeholder="Tell us about your hiring needs, team goals, or any specific challenges you're facing..."
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
                    Thank you! We'll be in touch within 1 business day.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                    Something went wrong. Please try again or email us directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-full bg-primary-teal text-black text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-cyan"
                >
                  {isSubmitting ? "Submitting..." : "Book My Free Consultation"}
                </button>

                <p className="text-sm text-gray-400 text-center">
                  Or schedule directly on our{" "}
                  <a
                    href="https://calendly.com/admin-remoteacktive/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-teal hover:text-primary-cyan underline"
                  >
                    Calendly
                  </a>
                </p>
              </form>
            </div>

            {/* Right: Benefits & What to Expect */}
            <div className="space-y-8">
              {/* Benefits */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  What You'll Get
                </h2>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div
                        key={index}
                        className="flex gap-4 p-4 bg-background-darkCard border border-white/10 rounded-lg hover:border-primary-teal/40 transition-all"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-lg bg-primary-teal/10 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary-teal" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-white mb-1">{benefit.title}</h3>
                          <p className="text-sm text-gray-300">{benefit.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* What to Expect */}
              <div className="bg-gradient-primary p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">
                  What to Expect on the Call
                </h2>
                <ul className="space-y-3">
                  {whatToExpect.map((item, index) => (
                    <li key={index} className="flex gap-3 items-start">
                      <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust Badge */}
              <div className="bg-background-darkCard border border-primary-teal/20 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-primary-teal mb-2">100%</div>
                <div className="text-white font-bold mb-2">Client Satisfaction Guarantee</div>
                <p className="text-sm text-gray-300">
                  If your remote team member doesn't meet your expectations, we'll find you a replacement at no extra cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
