'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
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
  Shield,
  Copy,
  Check,
  AlertCircle,
  Info,
  Lightbulb,
  ArrowRight,
  Github,
  Download,
  Play,
  Palette
} from 'lucide-react';

export default function Docs() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('javascript');

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

  const codeExamples = {
    javascript: `import { Promptly } from 'promptly';

const promptly = new Promptly({
  apiKey: process.env.PROMPTLY_API_KEY
});

const response = await promptly.generate({
  prompt: "Write a professional email to a client",
  role: "business",
  tone: "professional",
  language: "en"
});

console.log(response.prompt);`,
    python: `import promptly

client = promptly.Client(api_key="your-api-key")

response = client.generate(
    prompt="Write a professional email to a client",
    role="business",
    tone="professional",
    language="en"
)

print(response.prompt)`,
    curl: `curl -X POST https://api.promptly.ai/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Write a professional email to a client",
    "role": "business",
    "tone": "professional",
    "language": "en"
  }'`
  };

  const copyToClipboard = async (code: string, language: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(language);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.content.some(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="docs" />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-black border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
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
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <nav className="space-y-2">
                  {filteredSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-left ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-400/30 text-cyan-400'
                          : 'hover:bg-white/10 text-white/70'
                      }`}
                    >
                      <section.icon className={`w-5 h-5 ${
                        activeSection === section.id ? 'text-cyan-400' : 'text-white/50'
                      }`} />
                      <span className={`font-medium ${
                        activeSection === section.id ? 'text-cyan-400' : 'text-white'
                      }`}>
                        {section.title}
                      </span>
                    </button>
                  ))}
                </nav>

                {/* Quick Links */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h3 className="text-sm font-semibold text-white mb-3">Quick Links</h3>
                  <div className="space-y-2">
                    <a href="/dashboard" className="flex items-center text-sm text-white/60 hover:text-cyan-400 transition-colors">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Try Dashboard
                    </a>
                    <a href="/pricing" className="flex items-center text-sm text-white/60 hover:text-cyan-400 transition-colors">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      View Pricing
                    </a>
                    <a href="https://github.com/faizan-yousaf" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-white/60 hover:text-cyan-400 transition-colors">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeSection === 'getting-started' && (
                <div className="space-y-12">
                  <div>
                    <h2 className="text-3xl font-bold mb-6 text-white">
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
                      <div key={step.step} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-black font-bold text-sm">{step.step}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-2 text-white">{step.title}</h4>
                            <p className="text-white/60 mb-4">{step.description}</p>
                            <div className="bg-black/50 rounded-lg p-4 border border-white/10 relative">
                              <button
                                onClick={() => copyToClipboard(step.code, `step-${step.step}`)}
                                className="absolute top-2 right-2 p-2 text-white/40 hover:text-white transition-colors"
                              >
                                {copiedCode === `step-${step.step}` ? (
                                  <Check className="w-4 h-4" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                              <code className="text-cyan-400 font-mono text-sm">{step.code}</code>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Code Examples */}
                  <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-semibold mb-6 text-white">Code Examples</h3>
                    
                    {/* Language Tabs */}
                    <div className="flex space-x-1 mb-6">
                      {Object.keys(codeExamples).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setActiveTab(lang)}
                          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                            activeTab === lang
                              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black'
                              : 'bg-white/10 text-white/70 hover:bg-white/20'
                          }`}
                        >
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </button>
                      ))}
                    </div>

                    {/* Code Block */}
                    <div className="bg-black/50 rounded-lg p-4 border border-white/10 relative">
                      <button
                        onClick={() => copyToClipboard(codeExamples[activeTab as keyof typeof codeExamples], activeTab)}
                        className="absolute top-2 right-2 p-2 text-white/40 hover:text-white transition-colors"
                      >
                        {copiedCode === activeTab ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <pre className="text-cyan-400 font-mono text-sm overflow-x-auto">
                        <code>{codeExamples[activeTab as keyof typeof codeExamples]}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {sections[2].content.map((feature) => (
                      <div key={feature.title} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-200">
                        <h4 className="text-lg font-semibold mb-2 text-white">{feature.title}</h4>
                        <p className="text-white/60 text-sm mb-4">{feature.description}</p>
                        <a href={feature.link} className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
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
                    <h2 className="text-3xl font-bold mb-6 text-white">
                      API Reference
                    </h2>
                    <p className="text-white/70 text-lg leading-relaxed mb-8">
                      Complete API documentation for integrating Promptly into your applications.
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-semibold mb-6 text-white">Base URL</h3>
                    <div className="bg-black/50 rounded-lg p-4 border border-white/10 mb-6">
                      <code className="text-cyan-400 font-mono text-lg">https://api.promptly.ai/v1</code>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-4 text-white">Authentication</h3>
                    <p className="text-white/60 mb-4">
                      All API requests require authentication using your API key in the Authorization header.
                    </p>
                    <div className="bg-black/50 rounded-lg p-4 border border-white/10">
                      <code className="text-cyan-400 font-mono text-sm">
                        Authorization: Bearer YOUR_API_KEY
                      </code>
                    </div>
                  </div>

                  {/* API Endpoints */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-white">Endpoints</h3>
                    
                    {/* Generate Endpoint */}
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium">POST</span>
                        <code className="text-white font-mono">/generate</code>
                      </div>
                      <p className="text-white/60 mb-4">Generate a prompt based on your input and configuration.</p>
                      
                      <h4 className="font-semibold text-white mb-2">Request Body</h4>
                      <div className="bg-black/50 rounded-lg p-4 border border-white/10">
                        <pre className="text-cyan-400 font-mono text-sm">
{`{
  "prompt": "Write a professional email",
  "role": "business",
  "tone": "professional",
  "language": "en",
  "format": "text"
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'features' && (
                <div className="space-y-12">
                  <div>
                    <h2 className="text-3xl font-bold mb-6 text-white">
                      Features
                    </h2>
                    <p className="text-white/70 text-lg leading-relaxed mb-8">
                      Explore the powerful features that make Promptly the ultimate AI prompt generator.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {sections[2].content.map((feature) => (
                      <div key={feature.title} className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-200">
                        <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                        <p className="text-white/60 mb-6">{feature.description}</p>
                        <a href={feature.link} className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
                          Learn more <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* Feature Details */}
                  <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-semibold mb-6 text-white">Advanced Features</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-cyan-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-3 h-3 text-cyan-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">Agent Mode</h4>
                            <p className="text-sm text-white/60">Advanced reasoning with multi-step thinking</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <Globe className="w-3 h-3 text-green-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">Multilingual</h4>
                            <p className="text-sm text-white/60">Support for 6+ languages</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-purple-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <Palette className="w-3 h-3 text-purple-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">Custom Tones</h4>
                            <p className="text-sm text-white/60">Professional, friendly, creative, technical</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-orange-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <Zap className="w-3 h-3 text-orange-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">Lightning Fast</h4>
                            <p className="text-sm text-white/60">Get results in seconds</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'integrations' && (
                <div className="space-y-12">
                  <div>
                    <h2 className="text-3xl font-bold mb-6 text-white">
                      Integrations
                    </h2>
                    <p className="text-white/70 text-lg leading-relaxed mb-8">
                      Connect Promptly with your favorite AI models and platforms.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {sections[3].content.map((integration) => (
                      <div key={integration.title} className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-200">
                        <h3 className="text-xl font-semibold mb-4 text-white">{integration.title}</h3>
                        <p className="text-white/60 mb-6">{integration.description}</p>
                        <a href={integration.link} className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
                          View integration <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* Integration Setup */}
                  <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-semibold mb-6 text-white">Setup Guide</h3>
                    
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-black font-bold text-sm">1</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-2">Choose Your Model</h4>
                          <p className="text-white/60 text-sm">Select from OpenAI, Google Gemini, or your custom model</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-black font-bold text-sm">2</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-2">Configure API Keys</h4>
                          <p className="text-white/60 text-sm">Add your model-specific API keys to the dashboard</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-black font-bold text-sm">3</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-2">Start Generating</h4>
                          <p className="text-white/60 text-sm">Use the unified API to generate prompts with any model</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-cyan-400/10 to-blue-500/10 p-12 rounded-3xl border border-cyan-400/20">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already using Promptly to create better AI prompts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/dashboard"
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/25"
              >
                Start Building
              </a>
              <a
                href="/pricing"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors border border-white/20"
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
