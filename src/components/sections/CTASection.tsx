'use client';

import Link from 'next/link';

interface CTASectionProps {
  visibleElements: Set<string>;
}

export default function CTASection({ visibleElements }: CTASectionProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto text-center" data-animate id="cta-section">
        <div className={`transition-all duration-1000 ${visibleElements.has('cta-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/10 via-neon-purple/10 to-lime-green/10 rounded-3xl blur-3xl"></div>
            
            <div className="relative bg-gray-900/50 p-12 rounded-3xl border border-gray-800 backdrop-blur-sm">
              <div className="inline-block mb-4">
                <span className="bg-gradient-to-r from-electric-blue to-neon-purple text-transparent bg-clip-text text-sm font-semibold tracking-wider uppercase">
                  🚀 Get Started Today
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Create
                <span className="gradient-text block">Amazing Prompts?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of professionals who trust Promptly for their AI prompt needs.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">50K+</div>
                  <div className="text-gray-400 text-sm">Prompts Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">10K+</div>
                  <div className="text-gray-400 text-sm">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
                  <div className="text-gray-400 text-sm">Uptime</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/dashboard"
                  className="group bg-electric-blue hover:bg-electric-blue/80 text-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:glow hover:scale-105 relative overflow-hidden"
                >
                  <span className="relative z-10">Start Free Today</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
                <Link
                  href="/pricing"
                  className="group border border-gray-600 hover:border-electric-blue text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-electric-blue/10 hover:scale-105"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}