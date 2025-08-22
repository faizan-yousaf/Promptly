'use client';

import React from 'react';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';
import { Zap, Brain, Globe, Clock, Palette, BarChart3 } from 'lucide-react';

const ScrollStackSection: React.FC = () => {
  const handleStackComplete = () => {
    console.log('Scroll stack animation completed!');
  };

  return (
    <section className="min-h-screen bg-black text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Discover Our Features
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Experience the power of AI-driven prompt generation with our innovative features
          </p>
        </div>

        <div className="h-[800px] relative">
          <ScrollStack
            className="h-full"
            itemDistance={120}
            itemScale={0.05}
            itemStackDistance={40}
            stackPosition="30%"
            scaleEndPosition="15%"
            baseScale={0.8}
            rotationAmount={2}
            blurAmount={1}
            onStackComplete={handleStackComplete}
          >
            <ScrollStackItem>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Lightning Fast Generation</h3>
                  <p className="text-white/80 leading-relaxed">
                    Generate professional AI prompts in seconds with our advanced algorithms. 
                    No more waiting around - get instant results that match your requirements perfectly.
                  </p>
                </div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Advanced Reasoning</h3>
                  <p className="text-white/80 leading-relaxed">
                    Our AI understands context and reasoning, creating prompts that are not just 
                    well-written but strategically designed to get the best results from AI models.
                  </p>
                </div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Multilingual Support</h3>
                  <p className="text-white/80 leading-relaxed">
                    Break language barriers with our multilingual prompt generation. 
                    Create effective prompts in multiple languages with native-level quality.
                  </p>
                </div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Time-Saving Templates</h3>
                  <p className="text-white/80 leading-relaxed">
                    Save hours with our pre-built templates and customizable prompt structures. 
                    Start with proven formats and customize them to your specific needs.
                  </p>
                </div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Creative Inspiration</h3>
                  <p className="text-white/80 leading-relaxed">
                    Overcome creative blocks with our AI-powered inspiration engine. 
                    Generate unique and innovative prompts that spark new ideas and approaches.
                  </p>
                </div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Performance Analytics</h3>
                  <p className="text-white/80 leading-relaxed">
                    Track and optimize your prompt performance with detailed analytics. 
                    Understand what works best and continuously improve your results.
                  </p>
                </div>
              </div>
            </ScrollStackItem>
          </ScrollStack>
        </div>

        <div className="text-center mt-16">
          <p className="text-white/60 text-lg">
            Scroll through the cards above to explore our features
          </p>
        </div>
      </div>
    </section>
  );
};

export default ScrollStackSection;
