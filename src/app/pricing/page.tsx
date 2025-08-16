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
            Simple Pricing —
            <span className="gradient-text block">Free Now, Paid Plans Soon</span>
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

        {/* Free Tier - Big Card */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative bg-gray-900/50 rounded-3xl border-2 border-electric-blue p-12 transition-all duration-300 hover:scale-105 shadow-lg shadow-electric-blue/20 hover:glow">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <span className="bg-electric-blue text-black px-6 py-3 rounded-full text-lg font-bold">
                Currently Free
              </span>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-4xl font-bold mb-4 gradient-text">Free Tier</h3>
              <p className="text-xl text-gray-300 mb-6">Perfect for getting started with AI prompt generation</p>
              <div className="mb-6">
                <span className="text-6xl font-bold text-electric-blue">$0</span>
                <span className="text-xl text-gray-400 ml-2">forever</span>
              </div>
              <div className="inline-block bg-lime-green/20 text-lime-green px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Currently Unlimited
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 text-lg">
              <li className="flex items-start space-x-3">
                <span className="text-electric-blue mt-1 flex-shrink-0 text-xl">✓</span>
                <span className="text-gray-200">Unlimited prompts (during beta)</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-electric-blue mt-1 flex-shrink-0 text-xl">✓</span>
                <span className="text-gray-200">Access to Gemini & Groq AI models</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-electric-blue mt-1 flex-shrink-0 text-xl">✓</span>
                <span className="text-gray-200">All tone options (Professional, Friendly, Creative)</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-electric-blue mt-1 flex-shrink-0 text-xl">✓</span>
                <span className="text-gray-200">Multilingual support (6+ languages)</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-electric-blue mt-1 flex-shrink-0 text-xl">✓</span>
                <span className="text-gray-200">Agentic AI mode with multi-step reasoning</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-electric-blue mt-1 flex-shrink-0 text-xl">✓</span>
                <span className="text-gray-200">Complete prompt history</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-electric-blue mt-1 flex-shrink-0 text-xl">✓</span>
                <span className="text-gray-200">Community support</span>
              </li>
            </ul>
            
            <Link
              href="/dashboard"
              className="w-full bg-electric-blue hover:bg-electric-blue/80 text-black py-4 px-8 rounded-xl font-bold text-xl transition-all duration-200 hover:glow hover:scale-105 inline-block text-center"
            >
              Get Started Free
            </Link>
          </div>
        </div>
        
        {/* Paid Plans Coming Soon */}
        <div className="text-center mb-16">
          <div className="max-w-4xl mx-auto bg-gray-900/30 rounded-3xl border border-gray-700 p-12">
            <div className="mb-6">
              <span className="bg-gradient-to-r from-neon-purple to-lime-green text-transparent bg-clip-text text-lg font-semibold tracking-wider uppercase">
                🚀 Coming Soon
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Paid Plans Coming Soon</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We're working on Pro and Enterprise plans with advanced features, unlimited usage, and priority support.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <h4 className="text-xl font-bold text-neon-purple mb-3">Pro Plan</h4>
                <ul className="text-gray-300 space-y-2 text-left">
                  <li>• Advanced AI models</li>
                  <li>• Custom tone creation</li>
                  <li>• API access</li>
                  <li>• Priority support</li>
                </ul>
              </div>
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <h4 className="text-xl font-bold text-lime-green mb-3">Enterprise Plan</h4>
                <ul className="text-gray-300 space-y-2 text-left">
                  <li>• Custom AI training</li>
                  <li>• White-label solution</li>
                  <li>• Dedicated support</li>
                  <li>• On-premise deployment</li>
                </ul>
              </div>
            </div>
          </div>
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