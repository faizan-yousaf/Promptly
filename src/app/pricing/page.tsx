'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      price: 0,
      description: 'Perfect for getting started',
      features: [
        '50 prompts per month',
        'Basic AI models (Gemini & Groq)',
        'All tone options',
        'Multilingual support (EN, ES, FR)',
        'Basic Agentic AI mode',
        'Prompt history (7 days)',
        'Community support'
      ],
      cta: 'Get Started Free',
      popular: false,
      available: true
    },
    {
      name: 'Pro',
      price: isAnnual ? 19 : 29,
      originalPrice: isAnnual ? 29 : null,
      description: 'For professionals and teams',
      features: [
        'Unlimited prompts',
        'Advanced AI models',
        'Advanced Agentic AI mode',
        'Custom tone creation',
        'Prompt templates library',
        'Unlimited history & analytics',
        'Priority support',
        'API access',
        'Team collaboration (up to 5 users)'
      ],
      cta: 'Coming Soon',
      popular: true,
      available: false
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'Everything in Pro',
        'Custom AI model training',
        'White-label solution',
        'Advanced analytics & reporting',
        'Unlimited team members',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantee',
        'On-premise deployment option'
      ],
      cta: 'Contact Sales',
      popular: false,
      available: false
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold gradient-text">
              Promptly
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="hover:text-electric-blue transition-colors">
                Dashboard
              </Link>
              <Link
                href="/dashboard"
                className="bg-electric-blue hover:bg-electric-blue/80 text-black px-6 py-2 rounded-full font-medium transition-all duration-200 hover:glow"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Simple, Transparent
            <span className="gradient-text block">Pricing</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-lg ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isAnnual}
                onChange={(e) => setIsAnnual(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-electric-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-electric-blue"></div>
            </label>
            <span className={`text-lg ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-lime-green text-black px-3 py-1 rounded-full text-sm font-semibold">
                Save 34%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-gray-900/50 rounded-2xl border p-8 transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? 'border-electric-blue shadow-lg shadow-electric-blue/20'
                  : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-electric-blue text-black px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="mb-4">
                  {typeof plan.price === 'number' ? (
                    <div>
                      <span className="text-4xl font-bold">${plan.price}</span>
                      {plan.originalPrice && (
                        <span className="text-xl text-gray-400 line-through ml-2">
                          ${plan.originalPrice}
                        </span>
                      )}
                      <span className="text-gray-400">/{isAnnual ? 'year' : 'month'}</span>
                    </div>
                  ) : (
                    <span className="text-4xl font-bold">{plan.price}</span>
                  )}
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <span className="text-electric-blue mt-1 flex-shrink-0">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  plan.available
                    ? plan.popular
                      ? 'bg-electric-blue hover:bg-electric-blue/80 text-black hover:glow'
                      : 'border border-gray-600 hover:border-electric-blue text-white hover:bg-electric-blue/10'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!plan.available}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
              <h3 className="text-xl font-semibold mb-3">What's included in the free plan?</h3>
              <p className="text-gray-300">
                The free plan includes 50 prompt generations per month, access to both Gemini and Groq AI models, 
                all tone options, multilingual support, basic Agentic AI mode, and 7-day prompt history.
              </p>
            </div>
            
            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
              <h3 className="text-xl font-semibold mb-3">When will Pro and Enterprise plans be available?</h3>
              <p className="text-gray-300">
                We're currently in our free launch phase to gather user feedback and improve our service. 
                Pro and Enterprise plans will be available in Q2 2024. Early users will receive special pricing.
              </p>
            </div>
            
            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
              <h3 className="text-xl font-semibold mb-3">What is Agentic AI mode?</h3>
              <p className="text-gray-300">
                Agentic AI mode enables advanced reasoning capabilities with multi-step thinking and autonomous 
                problem-solving. It's perfect for complex prompts that require deeper analysis and structured thinking.
              </p>
            </div>
            
            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
              <h3 className="text-xl font-semibold mb-3">Can I upgrade or downgrade my plan?</h3>
              <p className="text-gray-300">
                Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades 
                take effect at the end of your current billing cycle.
              </p>
            </div>
            
            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
              <h3 className="text-xl font-semibold mb-3">Do you offer refunds?</h3>
              <p className="text-gray-300">
                We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, 
                contact our support team for a full refund.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Creating
            <span className="gradient-text block">Perfect Prompts?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of professionals who trust Promptly for their AI prompt needs.
          </p>
          <Link
            href="/dashboard"
            className="bg-electric-blue hover:bg-electric-blue/80 text-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 hover:glow hover:scale-105 inline-block"
          >
            Start Free Today
          </Link>
        </div>
      </div>
    </div>
  );
}