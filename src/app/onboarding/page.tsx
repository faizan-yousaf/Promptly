'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type UserRole = 'marketer' | 'developer' | 'writer' | 'researcher' | 'entrepreneur' | 'student';
type Purpose = 'content-creation' | 'code-assistance' | 'research' | 'business' | 'education' | 'creative';

interface OnboardingData {
  role: UserRole | null;
  purpose: Purpose | null;
  experience: 'beginner' | 'intermediate' | 'advanced' | null;
  interests: string[];
}

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    role: null,
    purpose: null,
    experience: null,
    interests: []
  });

  const roles = [
    {
      id: 'marketer' as UserRole,
      title: 'Marketer',
      description: 'Create compelling campaigns and content',
      icon: '📈',
      color: 'electric-blue'
    },
    {
      id: 'developer' as UserRole,
      title: 'Developer',
      description: 'Build applications and solve technical problems',
      icon: '💻',
      color: 'neon-purple'
    },
    {
      id: 'writer' as UserRole,
      title: 'Writer',
      description: 'Craft stories, articles, and creative content',
      icon: '✍️',
      color: 'lime-green'
    },
    {
      id: 'researcher' as UserRole,
      title: 'Researcher',
      description: 'Analyze data and conduct studies',
      icon: '🔬',
      color: 'electric-blue'
    },
    {
      id: 'entrepreneur' as UserRole,
      title: 'Entrepreneur',
      description: 'Build businesses and innovate',
      icon: '🚀',
      color: 'neon-purple'
    },
    {
      id: 'student' as UserRole,
      title: 'Student',
      description: 'Learn and complete academic work',
      icon: '🎓',
      color: 'lime-green'
    }
  ];

  const purposes = [
    {
      id: 'content-creation' as Purpose,
      title: 'Content Creation',
      description: 'Blog posts, social media, marketing copy',
      icon: '📝'
    },
    {
      id: 'code-assistance' as Purpose,
      title: 'Code Assistance',
      description: 'Programming help, debugging, documentation',
      icon: '⚡'
    },
    {
      id: 'research' as Purpose,
      title: 'Research & Analysis',
      description: 'Data analysis, academic research, insights',
      icon: '🔍'
    },
    {
      id: 'business' as Purpose,
      title: 'Business Strategy',
      description: 'Planning, strategy, decision making',
      icon: '💼'
    },
    {
      id: 'education' as Purpose,
      title: 'Education & Learning',
      description: 'Study help, explanations, tutoring',
      icon: '📚'
    },
    {
      id: 'creative' as Purpose,
      title: 'Creative Projects',
      description: 'Art, design, creative writing, brainstorming',
      icon: '🎨'
    }
  ];

  const interests = [
    'AI & Machine Learning',
    'Digital Marketing',
    'Web Development',
    'Data Science',
    'Creative Writing',
    'Business Strategy',
    'Social Media',
    'E-commerce',
    'Education',
    'Healthcare',
    'Finance',
    'Technology'
  ];

  const handleRoleSelect = (role: UserRole) => {
    setData(prev => ({ ...prev, role }));
  };

  const handlePurposeSelect = (purpose: Purpose) => {
    setData(prev => ({ ...prev, purpose }));
  };

  const handleExperienceSelect = (experience: 'beginner' | 'intermediate' | 'advanced') => {
    setData(prev => ({ ...prev, experience }));
  };

  const handleInterestToggle = (interest: string) => {
    setData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    // Save onboarding data to localStorage or send to API
    localStorage.setItem('promptly-onboarding', JSON.stringify(data));
    router.push('/dashboard');
  };

  const canProceed = () => {
    switch (step) {
      case 1: return data.role !== null;
      case 2: return data.purpose !== null;
      case 3: return data.experience !== null;
      case 4: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-white">
              Promptly
            </Link>
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
              Skip Onboarding
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">Step {step} of 4</span>
            <span className="text-sm text-gray-400">{Math.round((step / 4) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-electric-blue h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              What's your
              <span className="gradient-text block">primary role?</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              This helps us personalize your prompt generation experience
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                    data.role === role.id
                      ? 'border-electric-blue bg-electric-blue/10 shadow-lg shadow-electric-blue/20'
                      : 'border-gray-700 hover:border-gray-600 bg-gray-900/50'
                  }`}
                >
                  <div className="text-4xl mb-4">{role.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                  <p className="text-gray-400 text-sm">{role.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Purpose Selection */}
        {step === 2 && (
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              What's your main
              <span className="gradient-text block">use case?</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Tell us how you plan to use Promptly most often
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purposes.map((purpose) => (
                <button
                  key={purpose.id}
                  onClick={() => handlePurposeSelect(purpose.id)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                    data.purpose === purpose.id
                      ? 'border-neon-purple bg-neon-purple/10 shadow-lg shadow-neon-purple/20'
                      : 'border-gray-700 hover:border-gray-600 bg-gray-900/50'
                  }`}
                >
                  <div className="text-4xl mb-4">{purpose.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{purpose.title}</h3>
                  <p className="text-gray-400 text-sm">{purpose.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Experience Level */}
        {step === 3 && (
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              What's your
              <span className="gradient-text block">experience level?</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              This helps us adjust the complexity of generated prompts
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <button
                onClick={() => handleExperienceSelect('beginner')}
                className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  data.experience === 'beginner'
                    ? 'border-lime-green bg-lime-green/10 shadow-lg shadow-lime-green/20'
                    : 'border-gray-700 hover:border-gray-600 bg-gray-900/50'
                }`}
              >
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-semibold mb-2">Beginner</h3>
                <p className="text-gray-400 text-sm">
                  New to AI and prompt engineering
                </p>
              </button>
              
              <button
                onClick={() => handleExperienceSelect('intermediate')}
                className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  data.experience === 'intermediate'
                    ? 'border-lime-green bg-lime-green/10 shadow-lg shadow-lime-green/20'
                    : 'border-gray-700 hover:border-gray-600 bg-gray-900/50'
                }`}
              >
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold mb-2">Intermediate</h3>
                <p className="text-gray-400 text-sm">
                  Some experience with AI tools
                </p>
              </button>
              
              <button
                onClick={() => handleExperienceSelect('advanced')}
                className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  data.experience === 'advanced'
                    ? 'border-lime-green bg-lime-green/10 shadow-lg shadow-lime-green/20'
                    : 'border-gray-700 hover:border-gray-600 bg-gray-900/50'
                }`}
              >
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Advanced</h3>
                <p className="text-gray-400 text-sm">
                  Expert in AI and prompt engineering
                </p>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Interests */}
        {step === 4 && (
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              What are your
              <span className="gradient-text block">interests?</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Select topics you're interested in (optional)
            </p>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                    data.interests.includes(interest)
                      ? 'border-electric-blue bg-electric-blue/10 text-electric-blue'
                      : 'border-gray-700 hover:border-gray-600 bg-gray-900/50 text-gray-300'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-16">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="px-6 py-3 border border-gray-600 rounded-xl font-medium transition-colors hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`w-3 h-3 rounded-full transition-colors ${
                  stepNumber === step
                    ? 'bg-electric-blue'
                    : stepNumber < step
                    ? 'bg-lime-green'
                    : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
          
          {step < 4 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="px-6 py-3 bg-electric-blue hover:bg-electric-blue/80 text-black rounded-xl font-medium transition-all duration-200 hover:glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:glow-none"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="px-8 py-3 bg-electric-blue hover:bg-electric-blue/80 text-black rounded-xl font-medium transition-all duration-200 hover:glow hover:scale-105"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
}