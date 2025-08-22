'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Check, Star, Zap, Crown, Users, Shield, Globe, Code } from 'lucide-react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      price: 0,
      description: 'Perfect for getting started',
      icon: Star,
      color: 'from-green-400 to-emerald-500',
      features: [
        'Unlimited prompts (during beta)',
        'Access to Gemini & Groq AI models',
        'All tone options (Professional, Friendly, Creative)',
        'Multilingual support (6+ languages)',
        'Agentic AI mode with multi-step reasoning',
        'Complete prompt history',
        'Community support',
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
      icon: Zap,
      color: 'from-cyan-400 to-blue-500',
      features: [
        'Everything in Free',
        'Advanced AI models (GPT-4, Claude)',
        'Advanced Agentic AI mode',
        'Custom tone creation',
        'Prompt templates library',
        'Unlimited history & analytics',
        'Priority support',
        'API access',
        'Team collaboration (up to 5 users)',
      ],
      cta: 'Coming Soon',
      popular: true,
      available: false
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      icon: Crown,
      color: 'from-purple-400 to-pink-500',
      features: [
        'Everything in Pro',
        'Custom AI model training',
        'White-label solution',
        'Advanced analytics & reporting',
        'Unlimited team members',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantee',
        'On-premise deployment option',
      ],
      cta: 'Contact Sales',
      popular: false,
      available: false
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with end-to-end encryption'
    },
    {
      icon: Globe,
      title: 'Global CDN',
      description: 'Lightning-fast performance worldwide'
    },
    {
      icon: Users,
      title: '24/7 Support',
      description: 'Round-the-clock expert assistance'
    },
    {
      icon: Code,
      title: 'API Access',
      description: 'Integrate with your existing workflows'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="pricing" />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Simple
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent block">
                Pricing
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-8">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-lg ${!isAnnual ? 'text-white' : 'text-white/60'}`}>
                Monthly
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnnual}
                  onChange={(e) => setIsAnnual(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-400/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r from-cyan-400 to-blue-500"></div>
              </label>
              <span className={`text-lg ${isAnnual ? 'text-white' : 'text-white/60'}`}>
                Annual
              </span>
              {isAnnual && (
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                  Save 34%
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'border-cyan-400/50 shadow-lg shadow-cyan-400/20'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-6 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center`}>
                    <plan.icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-white/60 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    {typeof plan.price === 'number' ? (
                      <div className="flex items-baseline justify-center">
                        <span className="text-5xl font-bold text-white">${plan.price}</span>
                        {plan.originalPrice && (
                          <span className="text-xl text-white/40 line-through ml-2">${plan.originalPrice}</span>
                        )}
                        <span className="text-white/60 ml-2">/month</span>
                      </div>
                    ) : (
                      <div className="text-4xl font-bold text-white">{plan.price}</div>
                    )}
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                    plan.available
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black hover:scale-105'
                      : 'bg-white/10 text-white/60 cursor-not-allowed'
                  }`}
                  disabled={!plan.available}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-white/5 to-white/0">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Everything You Need
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Built for scale, designed for performance, trusted by thousands of professionals worldwide.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {[
              {
                question: "What's included in the free plan?",
                answer: "The free plan includes unlimited prompts during our beta phase, access to both Gemini and Groq AI models, all tone options, multilingual support, Agentic AI mode, and complete prompt history."
              },
              {
                question: "When will Pro and Enterprise plans be available?",
                answer: "We're currently in our free launch phase to gather user feedback. Pro and Enterprise plans will be available in Q2 2024. Early users will receive special pricing."
              },
              {
                question: "What is Agentic AI mode?",
                answer: "Agentic AI mode enables advanced reasoning capabilities with multi-step thinking and autonomous problem-solving. It's perfect for complex prompts that require deeper analysis."
              },
              {
                question: "Can I upgrade or downgrade my plan?",
                answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the end of your current billing cycle."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold mb-3 text-white">{faq.question}</h3>
                <p className="text-white/70 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-cyan-400/10 to-blue-500/10 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Ready to Start Creating Perfect Prompts?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who trust Promptly for their AI prompt needs.
            </p>
            <button className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25">
              Start Free Today
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}