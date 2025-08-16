'use client';

import { useState } from 'react';
import Link from 'next/link';

type AIModel = 'gemini' | 'groq';
type Tone = 'professional' | 'friendly' | 'creative' | 'technical';
type UserRole = 'marketer' | 'developer' | 'writer' | 'researcher' | 'entrepreneur' | 'student';
type Language = 'en' | 'es' | 'fr';

interface GeneratedPrompt {
  id: string;
  prompt: string;
  model: AIModel;
  tone: Tone;
  role: UserRole;
  language: Language;
  agentMode: boolean;
  timestamp: Date;
  processingTime: number;
}

export default function Dashboard() {
  const [userInput, setUserInput] = useState('');
  const [selectedModel, setSelectedModel] = useState<AIModel>('gemini');
  const [selectedTone, setSelectedTone] = useState<Tone>('professional');
  const [selectedRole, setSelectedRole] = useState<UserRole>('marketer');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [agentMode, setAgentMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<GeneratedPrompt | null>(null);
  const [history, setHistory] = useState<GeneratedPrompt[]>([]);

  const handleGenerate = async () => {
    if (!userInput.trim()) return;

    setIsGenerating(true);
    const startTime = Date.now();

    try {
      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInput,
          model: selectedModel,
          tone: selectedTone,
          role: selectedRole,
          language: selectedLanguage,
          agentMode,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate prompt');
      }

      const data = await response.json();
      const processingTime = Date.now() - startTime;

      const newPrompt: GeneratedPrompt = {
        id: Date.now().toString(),
        prompt: data.prompt,
        model: selectedModel,
        tone: selectedTone,
        role: selectedRole,
        language: selectedLanguage,
        agentMode,
        timestamp: new Date(),
        processingTime,
      };

      setGeneratedPrompt(newPrompt);
      setHistory(prev => [newPrompt, ...prev]);
    } catch (error) {
      console.error('Error generating prompt:', error);
      // Handle error state
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add toast notification here
  };

  const languageNames = {
    en: 'English',
    es: 'Español',
    fr: 'Français'
  };

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
              <Link href="/pricing" className="hover:text-electric-blue transition-colors">
                Pricing
              </Link>
              <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">
                Profile
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold mb-2 gradient-text">
                Generate Perfect Prompts
              </h1>
              <p className="text-gray-400">
                Describe your idea and let AI create the perfect prompt for you.
              </p>
            </div>

            {/* Input Area */}
            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
              <label className="block text-sm font-medium mb-3">
                Describe your idea or goal:
              </label>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Example: I need a prompt to help me write engaging social media posts for a tech startup..."
                className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue resize-none"
              />
            </div>

            {/* Settings Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* AI Model Selection */}
              <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="text-electric-blue mr-2">🤖</span>
                  AI Model
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="model"
                      value="gemini"
                      checked={selectedModel === 'gemini'}
                      onChange={(e) => setSelectedModel(e.target.value as AIModel)}
                      className="text-electric-blue focus:ring-electric-blue"
                    />
                    <div>
                      <div className="font-medium">Gemini Pro</div>
                      <div className="text-sm text-gray-400">Google's advanced AI model</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="model"
                      value="groq"
                      checked={selectedModel === 'groq'}
                      onChange={(e) => setSelectedModel(e.target.value as AIModel)}
                      className="text-electric-blue focus:ring-electric-blue"
                    />
                    <div>
                      <div className="font-medium">Groq</div>
                      <div className="text-sm text-gray-400">Ultra-fast inference</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Tone Selection */}
              <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="text-neon-purple mr-2">🎨</span>
                  Tone
                </h3>
                <select
                  value={selectedTone}
                  onChange={(e) => setSelectedTone(e.target.value as Tone)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple"
                >
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="creative">Creative</option>
                  <option value="technical">Technical</option>
                </select>
              </div>

              {/* Role Selection */}
              <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="text-lime-green mr-2">👤</span>
                  Your Role
                </h3>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-lime-green focus:ring-1 focus:ring-lime-green"
                >
                  <option value="marketer">Marketer</option>
                  <option value="developer">Developer</option>
                  <option value="writer">Writer</option>
                  <option value="researcher">Researcher</option>
                  <option value="entrepreneur">Entrepreneur</option>
                  <option value="student">Student</option>
                </select>
              </div>

              {/* Language Selection */}
              <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="text-electric-blue mr-2">🌍</span>
                  Language
                </h3>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value as Language)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                >
                  <option value="en">{languageNames.en}</option>
                  <option value="es">{languageNames.es}</option>
                  <option value="fr">{languageNames.fr}</option>
                </select>
              </div>
            </div>

            {/* Agentic AI Toggle */}
            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <span className="text-neon-purple mr-2">🧠</span>
                    Agentic AI Mode
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Enable advanced reasoning and multi-step thinking for complex prompts
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agentMode}
                    onChange={(e) => setAgentMode(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-neon-purple/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-purple"></div>
                </label>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!userInput.trim() || isGenerating}
              className="w-full bg-electric-blue hover:bg-electric-blue/80 disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-semibold py-4 px-8 rounded-xl transition-all duration-200 hover:glow hover:scale-[1.02] disabled:hover:scale-100 disabled:hover:glow-none"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                  <span>Generating...</span>
                </div>
              ) : (
                'Generate Perfect Prompt'
              )}
            </button>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Generated Prompt */}
            {generatedPrompt && (
              <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold gradient-text">
                    Generated Prompt
                  </h3>
                  <button
                    onClick={() => copyToClipboard(generatedPrompt.prompt)}
                    className="text-electric-blue hover:text-electric-blue/80 transition-colors"
                  >
                    📋 Copy
                  </button>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <p className="text-gray-100 whitespace-pre-wrap">
                    {generatedPrompt.prompt}
                  </p>
                </div>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>Model: {generatedPrompt.model}</div>
                  <div>Tone: {generatedPrompt.tone}</div>
                  <div>Role: {generatedPrompt.role}</div>
                  <div>Language: {languageNames[generatedPrompt.language]}</div>
                  <div>Agent Mode: {generatedPrompt.agentMode ? 'On' : 'Off'}</div>
                  <div>Processing: {generatedPrompt.processingTime}ms</div>
                </div>
              </div>
            )}

            {/* Quick Tips */}
            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="text-lime-green mr-2">💡</span>
                Quick Tips
              </h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start space-x-2">
                  <span className="text-electric-blue mt-1">•</span>
                  <span>Be specific about your goal and target audience</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-neon-purple mt-1">•</span>
                  <span>Enable Agentic AI for complex, multi-step tasks</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-lime-green mt-1">•</span>
                  <span>Choose the right tone for your brand voice</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-electric-blue mt-1">•</span>
                  <span>Select your role for personalized prompts</span>
                </li>
              </ul>
            </div>

            {/* Recent History */}
            {history.length > 0 && (
              <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="text-neon-purple mr-2">📝</span>
                  Recent Prompts
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {history.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition-colors"
                      onClick={() => setGeneratedPrompt(item)}
                    >
                      <p className="text-sm text-gray-300 line-clamp-2">
                        {item.prompt.substring(0, 100)}...
                      </p>
                      <div className="text-xs text-gray-500 mt-1">
                        {item.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}