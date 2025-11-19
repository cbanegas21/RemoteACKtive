"use client";
import { Users, Target, Handshake } from "lucide-react";
import Image from "next/image";

export default function WhatMakesUsDifferent() {
  const differentiators = [
    {
      icon: Users,
      title: "Built by Outsourcing Veterans",
      description: "Remote ACKtive was founded by Andre, Carlos, and Kevin—professionals who experienced the pain of expensive agencies and inconsistent quality firsthand. We built the solution we wished existed.",
      image: "/images/team-placeholder.jpg", // You can replace with actual images
    },
    {
      icon: Target,
      title: "Rigorous 6-Step Vetting Process",
      description: "Our recruitment process is uncompromising. We only screen fluent English-speaking remote talent who are well-educated, adaptable, reliable, familiar with AI tools, and have a proven track record in their niche.",
      image: "/images/vetting-placeholder.jpg",
    },
    {
      icon: Handshake,
      title: "True Partnership, Not Just Placement",
      description: "We're not a vendor—we're your outsourcing partner. From initial consultation to ongoing support, our management team provides expert guidance on marketing, AI, business software, SEO, social media, and more.",
      image: "/images/partnership-placeholder.jpg",
    },
  ];

  return (
    <section className="py-20 bg-background-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Makes Us Different
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're not just another outsourcing agency—we're your strategic partner in building world-class remote teams
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="text-center">
                {/* Icon Circle with teal background */}
                <div className="mx-auto mb-6 w-32 h-32 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg">
                  <Icon className="w-16 h-16 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
