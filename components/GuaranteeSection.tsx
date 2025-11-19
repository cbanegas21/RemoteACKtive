"use client";
import { Award, Shield } from "lucide-react";

export default function GuaranteeSection() {
  return (
    <section className="py-16 bg-background-light">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Badge Circle */}
            <div className="flex-shrink-0 relative">
              <div className="w-48 h-48 rounded-full bg-gradient-primary flex items-center justify-center shadow-2xl relative">
                <div className="text-center">
                  <Shield className="w-16 h-16 text-white mx-auto mb-2" />
                  <div className="text-white font-bold text-lg leading-tight">
                    100%<br />CLIENT<br />SATISFACTION
                  </div>
                </div>
                {/* Gold ribbon banner */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary-gold text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg whitespace-nowrap">
                  LIFETIME GUARANTEE
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                100% Client Satisfaction Guarantee
              </h2>
              <div className="text-gray-700 space-y-3 text-lg leading-relaxed">
                <p>
                  If your outsourced talent isn't the right fit for any reason, we'll pause your
                  service and find you a replacement at <strong>zero additional cost</strong>.
                </p>
                <p>
                  Plus, you'll get <strong className="text-primary-teal">1 week of free service!</strong> This helps you get settled with your
                  new outsourced talent.
                </p>
                <p>
                  We extend this guarantee no matter what stage you're in—whether you've just
                  hired your first remote talent or have been with us for years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
