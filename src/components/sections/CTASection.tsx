'use client';

import Link from 'next/link';

interface CTASectionProps {
  visibleElements: Set<string>;
}

export default function CTASection({ visibleElements }: CTASectionProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <div>
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-500/10 to-green-400/10 rounded-3xl blur-3xl"></div>
            
            <div className="relative bg-gray-900/50 p-12 rounded-3xl border border-gray-800 backdrop-blur-sm">
              <div className="inline-block mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text text-sm font-semibold tracking-wider uppercase">
                  🚀 Get Started Today
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Create
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent block">Amazing Prompts?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Join thousands of professionals who trust Promptly for their AI prompt needs.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">30K+</div>
                  <div className="text-gray-300 font-medium">Prompts Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-3">1.2K+</div>
                  <div className="text-gray-300 font-medium">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent mb-3">100%</div>
                  <div className="text-gray-300 font-medium">Uptime</div>
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