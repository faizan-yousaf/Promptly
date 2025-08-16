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
        <div className="text-center mb-16" data-animate id="how-it-works-header">
          <div className={`transition-all duration-1000 ${visibleElements.has('how-it-works-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-electric-blue to-neon-purple text-transparent bg-clip-text text-sm font-semibold tracking-wider uppercase">
                ⚡ Simple Process
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Three simple steps to generate perfect prompts
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-10 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-electric-blue to-neon-purple opacity-30"></div>
          <div className="hidden md:block absolute top-10 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-neon-purple to-lime-green opacity-30"></div>
          
          {steps.map((step, index) => (
            <div 
              key={index}
              data-animate 
              id={`step-${index}`}
              className={`text-center group transform transition-all duration-1000 hover:scale-105 ${
                visibleElements.has(`step-${index}`) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: visibleElements.has(`step-${index}`) ? step.delay : '0s'
              }}
            >
              <div className={`relative w-20 h-20 bg-${step.color}/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-${step.color} group-hover:border-${step.color} group-hover:glow transition-all duration-300`}>
                <span className={`text-${step.color} text-3xl font-bold group-hover:scale-110 transition-transform duration-300`}>{step.number}</span>
                <div className={`absolute inset-0 bg-${step.color}/10 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100`}></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">{step.title}</h3>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}