"use client";
import Image from "next/image";

export default function CompanyLogosSlider() {
  const companies = [
    "meta", "google", "microsoft", "slack", "github", "shopify",
    "stripe", "paypal", "amazon", "ibm", "oracle", "salesforce",
  ];

  return (
    <div className="w-full py-12 overflow-hidden">
      <p className="text-center text-[22px] font-bold mb-8 text-white/95 leading-relaxed">
        Join successful companies who outsource and save massively on revenue!
      </p>
      
      {/* Infinite Scroll Container */}
      <div className="relative flex overflow-hidden">
        <div className="flex animate-scroll">
          {companies.map((company, index) => (
            <div
              key={`${company}-1-${index}`}
              className="flex-shrink-0 mx-8"
            >
              <div className="relative w-32 h-16 grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100 brightness-0 invert">
                <Image
                  src={`/images/companies/${company}.png`}
                  alt={`${company} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
          {companies.map((company, index) => (
            <div
              key={`${company}-2-${index}`}
              className="flex-shrink-0 mx-8"
            >
              <div className="relative w-32 h-16 grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100 brightness-0 invert">
                <Image
                  src={`/images/companies/${company}.png`}
                  alt={`${company} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          display: flex;
          animation: scroll 40s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}