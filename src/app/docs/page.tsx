'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  BookOpen, 
  Code, 
  Zap, 
  Settings, 
  Users, 
  Globe, 
  Sparkles,
  ChevronRight,
  ExternalLink,
  Search,
  FileText,
  Terminal,
  Database,
  Shield
} from 'lucide-react';

export default function Docs() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpen,
      content: [
        {
          title: 'Quick Start',
          description: 'Get up and running with Promptly in minutes',
          link: '#quick-start'
        },
        {
          title: 'Installation',
          description: 'Install and configure Promptly for your project',
          link: '#installation'
        },
        {
          title: 'First Prompt',
          description: 'Create your first AI prompt with Promptly',
          link: '#first-prompt'
        }
      ]
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: Code,
      content: [
        {
          title: 'Authentication',
          description: 'Learn how to authenticate with the Promptly API',
          link: '#authentication'
        },
        {
          title: 'Endpoints',
          description: 'Complete API endpoint documentation',
          link: '#endpoints'
        },
        {
          title: 'Rate Limits',
          description: 'Understanding API rate limits and quotas',
          link: '#rate-limits'
        }
      ]
    },
    {
      id: 'features',
      title: 'Features',
      icon: Sparkles,
      content: [
        {
          title: 'Agent Mode',
          description: 'Advanced reasoning and multi-step thinking',
          link: '#agent-mode'
        },
        {
          title: 'Multilingual Support',
          description: 'Generate prompts in multiple languages',
          link: '#multilingual'
        },
        {
          title: 'Custom Tones',
          description: 'Create and customize prompt tones',
          link: '#custom-tones'
        }
      ]
    },
    {
      id: 'integrations',
      title: 'Integrations',
      icon: Zap,
      content: [
        {
          title: 'OpenAI',
          description: 'Integrate with OpenAI models',
          link: '#openai'
        },
        {
          title: 'Google Gemini',
          description: 'Use Google Gemini models',
          link: '#gemini'
        },
        {
          title: 'Custom Models',
          description: 'Connect your own AI models',
          link: '#custom-models'
        }
      ]
    }
  ];

  const quickStartSteps = [
    {
      step: 1,
      title: 'Sign Up',
      description: 'Create your free Promptly account',
      code: 'npm install promptly'
    },
    {
      step: 2,
      title: 'Get API Key',
      description: 'Generate your API key from the dashboard',
      code: 'export PROMPTLY_API_KEY="your-api-key"'
    },
    {
      step: 3,
      title: 'Make Your First Request',
      description: 'Start generating prompts immediately',
      code: `curl -X POST https://api.promptly.ai/v1/generate \\
  -H "Authorization: Bearer $PROMPTLY_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "Write a professional email"}'`
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="docs" />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] rounded-2xl flex items-center justify-center glow-primary">
              <BookOpen className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Documentation
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Everything you need to integrate Promptly into your applications and workflows.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-left ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-[#0ea5e9]/20 to-[#06b6d4]/20 border border-[#0ea5e9]/30 glow-primary'
                          : 'hover:bg-white/10'
                      }`}
                    >
                      <section.icon className={`w-5 h-5 ${
                        activeSection === section.id ? 'text-[#0ea5e9]' : 'text-white/60'
                      }`} />
                      <span className={`font-medium ${
                        activeSection === section.id ? 'text-[#0ea5e9]' : 'text-white'
                      }`}>
                        {section.title}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeSection === 'getting-started' && (
                <div className="space-y-12">
                  <div>
                    <h2 className="text-3xl font-bold mb-6 gradient-text-primary">
                      Getting Started
                    </h2>
                    <p className="text-white/70 text-lg leading-relaxed mb-8">
                      Welcome to Promptly! This guide will help you get up and running quickly.
                    </p>
                  </div>

                  {/* Quick Start Steps */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold mb-6 text-white">Quick Start</h3>
                    {quickStartSteps.map((step) => (
                      <div key={step.step} className="glass p-6 rounded-2xl border border-white/10">
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-black font-bold text-sm">{step.step}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-2 text-white">{step.title}</h4>
                            <p className="text-white/70 mb-4">{step.description}</p>
                            <div className="bg-black/50 rounded-lg p-4 border border-white/10">
                              <code className="text-[#0ea5e9] font-mono text-sm">{step.code}</code>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features Grid */}
                  <div className="grid md:grid-cols-2 gap-6 mt-12">
                    {sections[2].content.map((feature) => (
                      <div key={feature.title} className="glass p-6 rounded-2xl border border-white/10 hover:border-[#0ea5e9]/30 transition-all duration-200">
                        <h4 className="text-lg font-semibold mb-2 text-white">{feature.title}</h4>
                        <p className="text-white/70 text-sm mb-4">{feature.description}</p>
                        <a href={feature.link} className="inline-flex items-center text-[#0ea5e9] hover:glow-text-primary transition-colors">
                          Learn more <ChevronRight className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'api-reference' && (
                <div className="space-y-12">
                  <div>
                    <h2 className="text-3xl font-bold mb-6 gradient-text-primary">
                      API Reference
                    </h2>
                    <p className="text-white/70 text-lg leading-relaxed mb-8">
                      Complete API documentation for integrating Promptly into your applications.
                    </p>
                  </div>

                  <div className="glass p-8 rounded-2xl border border-white/10">
                    <h3 className="text-2xl font-semibold mb-6 text-white">Base URL</h3>
                    <div className="bg-black/50 rounded-lg p-4 border border-white/10 mb-6">
                      <code className="text-[#0ea5e9] font-mono text-lg">https://api.promptly.ai/v1</code>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-4 text-white">Authentication</h3>
                    <p className="text-white/70 mb-4">
                      All API requests require authentication using your API key in the Authorization header.
                    </p>
                    <div className="bg-black/50 rounded-lg p-4 border border-white/10">
                      <code className="text-[#0ea5e9] font-mono text-sm">
                        Authorization: Bearer YOUR_API_KEY
                      </code>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'features' && (
                <div className="space-y-12">
                  <div>
                    <h2 className="text-3xl font-bold mb-6 gradient-text-primary">
                      Features
                    </h2>
                    <p className="text-white/70 text-lg leading-relaxed mb-8">
                      Explore the powerful features that make Promptly the ultimate AI prompt generator.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {sections[2].content.map((feature) => (
                      <div key={feature.title} className="glass p-8 rounded-2xl border border-white/10 hover:border-[#0ea5e9]/30 transition-all duration-200">
                        <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                        <p className="text-white/70 mb-6">{feature.description}</p>
                        <a href={feature.link} className="inline-flex items-center text-[#0ea5e9] hover:glow-text-primary transition-colors">
                          Learn more <ChevronRight className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'integrations' && (
                <div className="space-y-12">
                  <div>
                    <h2 className="text-3xl font-bold mb-6 gradient-text-primary">
                      Integrations
                    </h2>
                    <p className="text-white/70 text-lg leading-relaxed mb-8">
                      Connect Promptly with your favorite AI models and platforms.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {sections[3].content.map((integration) => (
                      <div key={integration.title} className="glass p-8 rounded-2xl border border-white/10 hover:border-[#0ea5e9]/30 transition-all duration-200">
                        <h3 className="text-xl font-semibold mb-4 text-white">{integration.title}</h3>
                        <p className="text-white/70 mb-6">{integration.description}</p>
                        <a href={integration.link} className="inline-flex items-center text-[#0ea5e9] hover:glow-text-primary transition-colors">
                          View integration <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass p-12 rounded-3xl border border-white/10">
            <h2 className="text-3xl font-bold mb-6 gradient-text-primary">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already using Promptly to create better AI prompts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/dashboard"
                className="bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] hover:from-[#0284c7] hover:to-[#0891b2] text-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#0ea5e9]/25 glow-primary"
              >
                Start Building
              </a>
              <a
                href="/pricing"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 border border-white/20"
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
