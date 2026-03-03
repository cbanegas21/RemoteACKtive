"use client";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Get free, tailored insights",
      description: "Tell us about your hiring needs and business objectives during a complimentary consultation. We'll identify where remote talent can drive the biggest impact for your organization.",
    },
    {
      number: "2",
      title: "We recruit only the best",
      description: "Our specialized recruitment team puts candidates through comprehensive vetting, then presents you with pre-qualified professionals who match your exact requirements.",
    },
    {
      number: "3",
      title: "Onboard with ease",
      description: "We streamline integration of your new team members and handle all the administrative details—payroll, benefits, training, and performance tracking—so you don't have to.",
    },
    {
      number: "4",
      title: "Get time back",
      description: "Delegate operational work to your remote professionals and reclaim your schedule for strategic initiatives that drive business growth.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#F7FAFB]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From discovery to delegation—we make hiring and managing remote talent effortless
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              {/* Large Numbered Circle */}
              <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-white">
                  {step.number}
                </span>
              </div>

              {/* Step Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="/book-a-call"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#0A1628] text-[#4FFFB0] text-lg font-bold border-2 border-[#4FFFB0] shadow-lg hover:bg-[#4FFFB0] hover:text-black hover:scale-105 transition-all"
          >
            BOOK A DISCOVERY CALL
          </a>
        </div>
      </div>
    </section>
  );
}
