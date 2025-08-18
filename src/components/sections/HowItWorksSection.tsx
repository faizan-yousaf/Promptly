'use client';

interface HowItWorksSectionProps {
  visibleElements: Set<string>;
}

export default function HowItWorksSection({ visibleElements }: HowItWorksSectionProps) {
  const steps = [
    {
      number: '1',
      title: 'Describe Your Idea',
      description: 'Simply tell us what you want to achieve. Our AI understands context and intent.',
      color: 'electric-blue',
      delay: '0s'
    },
    {
      number: '2',
      title: 'Customize Settings',
      description: 'Choose your AI model, tone, role, and enable Agentic AI for advanced reasoning.',
      color: 'neon-purple',
      delay: '0.2s'
    },
    {
      number: '3',
      title: 'Get Perfect Prompts',
      description: 'Receive optimized, professional prompts ready to use with any AI model.',
      color: 'lime-green',
      delay: '0.4s'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text text-sm font-semibold tracking-wider uppercase">
              ⚡ Simple Process
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Three simple steps to generate perfect prompts
          </p>
        </div>
        
        <div className="relative grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          
          {steps.map((step, index) => {
            const getStepColor = (color: string) => {
              switch (color) {
                case 'electric-blue':
                  return 'cyan-400';
                case 'neon-purple':
                  return 'purple-400';
                case 'lime-green':
                  return 'green-400';
                default:
                  return 'cyan-400';
              }
            };
            const stepColor = getStepColor(step.color);
            
            return (
              <div 
                key={index}
                className="text-center group transform transition-all duration-300 hover:scale-105"
              >
                <div className={`relative w-20 h-20 bg-${stepColor}/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-${stepColor} group-hover:border-${stepColor} transition-all duration-300`}>
                  <span className={`text-${stepColor} text-3xl font-bold group-hover:scale-110 transition-transform duration-300`}>{step.number}</span>
                  <div className={`absolute inset-0 bg-${stepColor}/10 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100`}></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">{step.title}</h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}