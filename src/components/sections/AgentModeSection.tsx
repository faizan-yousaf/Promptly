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
        <div className="text-center mb-16">
          <div className="opacity-100 translate-y-0 transition-all duration-1000">
            <div className="inline-block mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text text-sm font-semibold tracking-wider uppercase">
                🧠 Advanced AI Reasoning
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Agent Mode
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Toggle between simple responses and advanced multi-step AI reasoning
            </p>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Left Side - Standard Mode */}
          <div className={`flex-1 max-w-md text-center transition-all duration-700 transform-gpu ${
            !isAgentMode ? 'scale-105 opacity-100' : 'scale-95 opacity-70'
          }`}>
            <div className={`relative p-8 rounded-3xl transition-all duration-500 transform-style-preserve-3d backdrop-blur-xl ${
              !isAgentMode 
                ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/60 border border-gray-600/50 shadow-2xl shadow-gray-900/50 hover:shadow-cyan-500/20' 
                : 'bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30'
            } hover:scale-105 hover:-translate-y-2 hover:rotate-y-5`}>
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-3xl transition-opacity duration-500 ${
                !isAgentMode ? 'opacity-20' : 'opacity-0'
              } bg-gradient-to-r from-cyan-400/10 to-blue-500/10 blur-xl`}></div>
              
              <div className="relative z-10">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 ${
                  !isAgentMode 
                    ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 shadow-lg shadow-cyan-500/30' 
                    : 'bg-gray-700/30'
                }`}>
                  <Zap className={`w-10 h-10 transition-all duration-500 ${
                    !isAgentMode ? 'text-cyan-400' : 'text-gray-500'
                  }`} />
                </div>
                <h3 className={`text-3xl font-bold mb-4 transition-all duration-500 ${
                  !isAgentMode ? 'text-white' : 'text-gray-400'
                }`}>Standard Mode</h3>
                <p className={`text-lg mb-6 transition-all duration-500 ${
                  !isAgentMode ? 'text-gray-200' : 'text-gray-500'
                }`}>
                  Quick, single-step responses for straightforward prompt generation
                </p>
                <div className={`space-y-2 text-sm transition-all duration-500 ${
                  !isAgentMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    <span>Fast responses</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    <span>Simple prompts</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    <span>Direct answers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Center - Toggle */}
          <div className="flex flex-col items-center">
            <div className="relative p-4">
              <div 
                className={`relative w-36 h-18 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full cursor-pointer transition-all duration-500 border-2 backdrop-blur-sm ${
                  isAgentMode ? 'border-purple-500/50 shadow-lg shadow-purple-500/25' : 'border-gray-600/50'
                } hover:scale-105 hover:shadow-xl`}
                onClick={() => setIsAgentMode(!isAgentMode)}
              >
                {/* Background glow */}
                <div className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
                  isAgentMode ? 'opacity-30' : 'opacity-0'
                } bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-lg`}></div>
                
                <div className={`absolute top-2 w-14 h-14 bg-gradient-to-r rounded-full transition-all duration-500 transform shadow-lg ${
                  isAgentMode 
                    ? 'translate-x-18 from-purple-500 to-cyan-500 shadow-purple-500/50' 
                    : 'translate-x-2 from-gray-500 to-gray-600 shadow-gray-500/30'
                }`}>
                  <div className="w-full h-full flex items-center justify-center">
                    {isAgentMode ? (
                      <Brain className="w-7 h-7 text-white" />
                    ) : (
                      <Zap className="w-7 h-7 text-white" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <span className={`text-sm font-bold tracking-wider transition-all duration-300 ${
                isAgentMode ? 'text-purple-400' : 'text-gray-400'
              }`}>
                {isAgentMode ? 'AGENT MODE ON' : 'AGENT MODE OFF'}
              </span>
            </div>
          </div>
          
          {/* Right Side - Agent Mode */}
          <div className={`flex-1 max-w-md text-center transition-all duration-700 transform-gpu ${
            isAgentMode ? 'scale-105 opacity-100' : 'scale-95 opacity-70'
          }`}>
            <div className={`relative p-8 rounded-3xl transition-all duration-500 transform-style-preserve-3d backdrop-blur-xl ${
              isAgentMode 
                ? 'bg-gradient-to-br from-purple-900/80 to-purple-800/60 border border-purple-500/50 shadow-2xl shadow-purple-900/50 hover:shadow-purple-500/30' 
                : 'bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30'
            } hover:scale-105 hover:-translate-y-2 hover:rotate-y-5`}>
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-3xl transition-opacity duration-500 ${
                isAgentMode ? 'opacity-20' : 'opacity-0'
              } bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-xl`}></div>
              
              <div className="relative z-10">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 ${
                  isAgentMode 
                    ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 shadow-lg shadow-purple-500/30' 
                    : 'bg-gray-700/30'
                }`}>
                  <Brain className={`w-10 h-10 transition-all duration-500 ${
                    isAgentMode ? 'text-purple-400' : 'text-gray-500'
                  }`} />
                </div>
                <h3 className={`text-3xl font-bold mb-4 transition-all duration-500 ${
                  isAgentMode ? 'text-white' : 'text-gray-400'
                }`}>Agent Mode</h3>
                <p className={`text-lg mb-6 transition-all duration-500 ${
                  isAgentMode ? 'text-gray-200' : 'text-gray-500'
                }`}>
                  Multi-step Agentic AI reasoning with advanced problem-solving
                </p>
              
                {/* Mini Flow Diagram */}
                {isAgentMode && (
                  <div className="space-y-4 text-sm animate-fade-in">
                    <div className="flex items-center justify-center space-x-3 text-purple-300">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <span className="font-medium">Analyze Context</span>
                      <ArrowRight className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex items-center justify-center space-x-3 text-cyan-300">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      <span className="font-medium">Multi-step Reasoning</span>
                      <ArrowRight className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="flex items-center justify-center space-x-3 text-blue-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                      <span className="font-medium">Optimized Output</span>
                    </div>
                  </div>
                )}
                
                {!isAgentMode && (
                  <div className={`space-y-2 text-sm transition-all duration-500 ${
                    !isAgentMode ? 'text-gray-600' : 'text-gray-500'
                  }`}>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      <span>Deep analysis</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      <span>Multi-step thinking</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      <span>Advanced reasoning</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}