'use client';

import SpotlightCard from '@/components/SpotlightCard'

interface FeaturesSectionProps {
  visibleElements: Set<string>;
}

export default function FeaturesSection({ visibleElements }: FeaturesSectionProps) {
  const features = [
    {
      icon: '🎯',
      title: 'Smart Prompt Generation',
      description: 'AI-powered prompt creation that understands context and generates optimized prompts for any use case.',
      color: 'electric-blue',
      delay: '0s'
    },
    {
      icon: '🤖',
      title: 'Agentic AI Mode',
      description: 'Advanced reasoning capabilities with multi-step thinking and autonomous problem-solving.',
      color: 'neon-purple',
      delay: '0.1s'
    },
    {
      icon: '🌍',
      title: 'Multilingual Support',
      description: 'Generate prompts in English, Spanish, and French with native-level fluency and cultural context.',
      color: 'lime-green',
      delay: '0.2s'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Get professional-quality prompts in seconds with our optimized AI models and infrastructure.',
      color: 'electric-blue',
      delay: '0.3s'
    },
    {
      icon: '🎨',
      title: 'Customizable Tones',
      description: 'Choose from professional, friendly, creative, or technical tones to match your brand voice.',
      color: 'neon-purple',
      delay: '0.4s'
    },
    {
      icon: '💾',
      title: 'History & Analytics',
      description: 'Track your prompt performance and access your complete generation history with detailed analytics.',
      color: 'lime-green',
      delay: '0.5s'
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Features
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Professional prompt generation powered by advanced AI
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const getSpotlightColor = (color: string) => {
              switch (color) {
                case 'electric-blue':
                  return 'rgba(0, 191, 255, 0.2)';
                case 'neon-purple':
                  return 'rgba(155, 93, 229, 0.2)';
                case 'lime-green':
                  return 'rgba(185, 255, 102, 0.2)';
                default:
                  return 'rgba(255, 255, 255, 0.1)';
              }
            };

            return (
              <SpotlightCard
                key={index}
                className="group hover:scale-105 hover:-translate-y-2 cursor-pointer transform transition-all duration-300"
                spotlightColor={getSpotlightColor(feature.color)}
              >
                <div className={`w-12 h-12 bg-${feature.color}/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className={`text-${feature.color} text-2xl`}>{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}