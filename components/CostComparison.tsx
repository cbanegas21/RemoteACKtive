'use client';

const roles = [
  {
    role: 'Software Developer',
    usCost: '$95,000 – $130,000',
    raCost: '$28,000 – $45,000',
    savings: 'Up to 70%',
  },
  {
    role: 'Digital Marketer',
    usCost: '$65,000 – $85,000',
    raCost: '$18,000 – $28,000',
    savings: 'Up to 70%',
  },
  {
    role: 'Customer Service Rep',
    usCost: '$38,000 – $52,000',
    raCost: '$10,000 – $16,000',
    savings: 'Up to 72%',
  },
  {
    role: 'Executive Assistant',
    usCost: '$55,000 – $70,000',
    raCost: '$15,000 – $22,000',
    savings: 'Up to 73%',
  },
  {
    role: 'Bookkeeper / Accountant',
    usCost: '$48,000 – $65,000',
    raCost: '$13,000 – $22,000',
    savings: 'Up to 73%',
  },
  {
    role: 'UI/UX Designer',
    usCost: '$78,000 – $110,000',
    raCost: '$22,000 – $36,000',
    savings: 'Up to 72%',
  },
];

export default function CostComparison() {
  return (
    <section id="cost-comparison" className="py-20 bg-[#F7FAFB]">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#4FFFB0]/15 border border-[#378B57]/25 rounded-full px-4 py-1.5 mb-5">
            <span className="text-sm font-bold text-[#1A5538] tracking-wide uppercase">
              Real Cost Comparison
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            See Exactly How Much You Save
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Same skill level. Same output. Same dedication. Just a fraction of the cost —
            because geography should never dictate what great work costs.
          </p>
        </div>

        {/* Comparison Table — desktop */}
        <div className="hidden md:block rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-4 bg-[#0A1628] text-white text-sm font-semibold">
            <div className="px-6 py-4 text-white/70 uppercase tracking-wider">Role</div>
            <div className="px-6 py-4 text-white/70 uppercase tracking-wider">🇺🇸 U.S. Hire / Year</div>
            <div className="px-6 py-4 text-white/70 uppercase tracking-wider">✅ Remote ACKtive / Year</div>
            <div className="px-6 py-4 text-[#4FFFB0] uppercase tracking-wider font-bold">💰 Your Savings</div>
          </div>

          {/* Rows */}
          {roles.map((row, idx) => (
            <div
              key={row.role}
              className={`grid grid-cols-4 border-t border-gray-100 transition-colors hover:bg-[#57C5CF]/5 ${
                idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
              }`}
            >
              <div className="px-6 py-4 font-semibold text-gray-900 text-sm">{row.role}</div>
              <div className="px-6 py-4 text-gray-500 text-sm line-through decoration-red-300">
                {row.usCost}
              </div>
              <div className="px-6 py-4 text-[#1A5538] font-semibold text-sm">{row.raCost}</div>
              <div className="px-6 py-4">
                <span className="inline-block bg-[#4FFFB0]/20 text-[#1A5538] text-xs font-bold px-3 py-1 rounded-full border border-[#4FFFB0]/40">
                  {row.savings}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Cards — mobile */}
        <div className="md:hidden space-y-4">
          {roles.map((row) => (
            <div key={row.role} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">{row.role}</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-500 uppercase tracking-wide">🇺🇸 U.S. Cost</span>
                <span className="text-gray-500 text-sm line-through decoration-red-300">{row.usCost}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-gray-500 uppercase tracking-wide">✅ With Us</span>
                <span className="text-[#1A5538] font-semibold text-sm">{row.raCost}</span>
              </div>
              <div className="text-right">
                <span className="inline-block bg-[#4FFFB0]/20 text-[#1A5538] text-xs font-bold px-3 py-1 rounded-full border border-[#4FFFB0]/40">
                  Save {row.savings}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer + CTA */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 mb-8">
            * Figures represent approximate annual all-in costs (salary + overhead + benefits). Actual savings vary by role, region, and engagement type.
          </p>
          <a
            href="/book-a-call"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#0A1628] text-[#4FFFB0] text-base font-bold border-2 border-[#4FFFB0] shadow-lg hover:bg-[#4FFFB0] hover:text-black hover:scale-105 transition-all"
          >
            Get Your Custom Savings Estimate
          </a>
        </div>

      </div>
    </section>
  );
}
