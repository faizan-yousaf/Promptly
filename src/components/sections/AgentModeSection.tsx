'use client';

import { useState } from 'react';
import { Brain, Zap, ArrowRight } from 'lucide-react';

interface AgentModeSectionProps {
  visibleElements: Set<string>;
}

export default function AgentModeSection({ visibleElements }: AgentModeSectionProps) {
  const [isAgentMode, setIsAgentMode] = useState(false);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-gray-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-animate id="agent-mode-header">
          <div className={`transition-all duration-1000 ${visibleElements.has('agent-mode-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-neon-purple to-electric-blue text-transparent bg-clip-text text-sm font-semibold tracking-wider uppercase">
                🧠 Advanced AI Reasoning
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Agent Mode
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Toggle between simple responses and advanced multi-step AI reasoning
            </p>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Left Side - OFF Mode */}
          <div 
            data-animate 
            id="agent-mode-off"
            className={`flex-1 max-w-md text-center transition-all duration-1000 ${!isAgentMode ? 'scale-105 opacity-100' : 'scale-95 opacity-60'} ${
              visibleElements.has('agent-mode-off') ? 'translate-y-0' : 'translate-y-10'
            }`}
          >
            <div className={`p-8 rounded-2xl border-2 transition-all duration-300 ${
              !isAgentMode ? 'border-gray-600 bg-gray-800/50' : 'border-gray-700 bg-gray-900/30'
            }`}>
              <div className="w-16 h-16 bg-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-300">Standard Mode</h3>
              <p className="text-gray-400 mb-6">
                Quick, single-step responses for straightforward prompt generation
              </p>
              <div className="text-sm text-gray-500">
                ✓ Fast responses<br/>
                ✓ Simple prompts<br/>
                ✓ Direct answers
              </div>
            </div>
          </div>
          
          {/* Center - Toggle */}
          <div className="flex flex-col items-center">
            <div 
              data-animate 
              id="agent-toggle"
              className={`relative w-32 h-16 bg-gray-800 rounded-full cursor-pointer transition-all duration-500 border-2 ${
                isAgentMode ? 'border-neon-purple' : 'border-gray-600'
              } ${visibleElements.has('agent-toggle') ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              onClick={() => setIsAgentMode(!isAgentMode)}
            >
              <div className={`absolute top-2 w-12 h-12 bg-gradient-to-r rounded-full transition-all duration-500 transform ${
                isAgentMode 
                  ? 'translate-x-16 from-neon-purple to-electric-blue shadow-lg shadow-neon-purple/50' 
                  : 'translate-x-2 from-gray-500 to-gray-400'
              }`}>
                <div className="w-full h-full flex items-center justify-center">
                  {isAgentMode ? (
                    <Brain className="w-6 h-6 text-white" />
                  ) : (
                    <Zap className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className={`text-sm font-semibold transition-colors duration-300 ${
                isAgentMode ? 'text-neon-purple' : 'text-gray-400'
              }`}>
                {isAgentMode ? 'AGENT MODE ON' : 'AGENT MODE OFF'}
              </span>
            </div>
          </div>
          
          {/* Right Side - ON Mode */}
          <div 
            data-animate 
            id="agent-mode-on"
            className={`flex-1 max-w-md text-center transition-all duration-1000 ${
              isAgentMode ? 'scale-105 opacity-100' : 'scale-95 opacity-60'
            } ${visibleElements.has('agent-mode-on') ? 'translate-y-0' : 'translate-y-10'}`}
          >
            <div className={`p-8 rounded-2xl border-2 transition-all duration-300 ${
              isAgentMode ? 'border-neon-purple bg-neon-purple/10 glow-purple' : 'border-gray-700 bg-gray-900/30'
            }`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${
                isAgentMode ? 'bg-neon-purple/20' : 'bg-gray-600/20'
              }`}>
                <Brain className={`w-8 h-8 transition-colors duration-300 ${
                  isAgentMode ? 'text-neon-purple' : 'text-gray-400'
                }`} />
              </div>
              <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                isAgentMode ? 'text-white' : 'text-gray-300'
              }`}>Agent Mode</h3>
              <p className={`mb-6 transition-colors duration-300 ${
                isAgentMode ? 'text-gray-200' : 'text-gray-400'
              }`}>
                Multi-step Agentic AI reasoning with advanced problem-solving
              </p>
              
              {/* Mini Flow Diagram */}
              {isAgentMode && (
                <div className="space-y-3 text-sm animate-fade-in">
                  <div className="flex items-center justify-center space-x-2 text-neon-purple">
                    <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
                    <span>Analyze Context</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-electric-blue">
                    <div className="w-2 h-2 bg-electric-blue rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <span>Multi-step Reasoning</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-lime-green">
                    <div className="w-2 h-2 bg-lime-green rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                    <span>Optimized Output</span>
                  </div>
                </div>
              )}
              
              {!isAgentMode && (
                <div className="text-sm text-gray-500">
                  ✓ Deep analysis<br/>
                  ✓ Multi-step thinking<br/>
                  ✓ Advanced reasoning
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}