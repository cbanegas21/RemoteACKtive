"use client";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Get free, tailored insights",
      description: "Share your goals and challenges on our free strategy call, and our experts will uncover opportunities to save time and scale smarter.",
    },
    {
      number: "2",
      title: "We recruit only the best",
      description: "Our full-fledged recruitment team handles the rigorous screening process, and you'll be matched with your dedicated outsourced talent.",
    },
    {
      number: "3",
      title: "Onboard with ease",
      description: "We'll help you integrate your new talent into your business, and you can leave payment management, perks, upskilling, and quality assurance to us.",
    },
    {
      number: "4",
      title: "Get time back",
      description: "Outsource tasks to your new remote team and shift your leadership focus to high-priority tasks.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-primary text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            From discovery to delegation—we make hiring and managing remote talent effortless
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              {/* Large Numbered Circle */}
              <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-primary-teal">
                  {step.number}
                </span>
              </div>

              {/* Step Title */}
              <h3 className="text-xl font-bold mb-3">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-white/90 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-primary-teal text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            BOOK A DISCOVERY CALL
          </a>
        </div>
      </div>
    </section>
  );
}
