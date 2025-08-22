'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Github, Twitter, Linkedin, Mail, Globe, Code, Zap, Users } from 'lucide-react';

export default function About() {
  const [activeTab, setActiveTab] = useState('story');

  const stats = [
    { label: 'Years Experience', value: '5+', icon: Code },
    { label: 'Projects Built', value: '50+', icon: Zap },
    { label: 'Happy Users', value: '10K+', icon: Users },
    { label: 'Countries Reached', value: '25+', icon: Globe },
  ];

  const skills = [
    { name: 'React/Next.js', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js', level: 88 },
    { name: 'Python', level: 85 },
    { name: 'AI/ML', level: 80 },
    { name: 'DevOps', level: 75 },
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com', icon: Github, color: 'hover:text-gray-400' },
    { name: 'Twitter', href: 'https://twitter.com', icon: Twitter, color: 'hover:text-blue-400' },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin, color: 'hover:text-blue-600' },
    { name: 'Email', href: 'mailto:hello@promptly.ai', icon: Mail, color: 'hover:text-red-400' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="about" />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-black">P</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About
              <span className="text-white block">
                Promptly
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Building the future of AI-powered prompt generation, one conversation at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-white/5 to-white/0">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center mb-12">
            {[
              { id: 'story', label: 'Our Story' },
              { id: 'mission', label: 'Mission' },
              { id: 'team', label: 'Team' },
              { id: 'values', label: 'Values' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 mx-2 mb-2 rounded-full font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'story' && (
              <div className="space-y-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    The Beginning
                  </h3>
                  <p className="text-white/80 leading-relaxed mb-6">
                    Promptly was born from a simple observation: while AI models were becoming increasingly powerful, 
                    users were struggling to communicate effectively with them. The gap between human intent and AI 
                    understanding was widening, not narrowing.
                  </p>
                  <p className="text-white/80 leading-relaxed mb-6">
                    In 2023, our team of AI researchers and developers came together with a shared vision: to create 
                    a platform that would bridge this gap, making AI more accessible and effective for everyone.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    What started as a weekend project quickly evolved into a comprehensive solution that now serves 
                    thousands of users worldwide, from students to enterprise teams.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'mission' && (
              <div className="space-y-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Our Mission
                  </h3>
                  <p className="text-white/80 leading-relaxed mb-6">
                    To democratize AI by making it accessible, understandable, and effective for everyone. We believe 
                    that AI should enhance human creativity, not replace it.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white/5 rounded-2xl p-6">
                      <h4 className="text-lg font-semibold mb-3 text-cyan-400">Accessibility</h4>
                      <p className="text-white/70 text-sm">
                        Making AI tools available to everyone, regardless of technical background.
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-6">
                      <h4 className="text-lg font-semibold mb-3 text-blue-400">Innovation</h4>
                      <p className="text-white/70 text-sm">
                        Continuously pushing the boundaries of what's possible with AI.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Meet the Team
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-4xl font-bold text-black">A</span>
                      </div>
                      <h4 className="text-xl font-semibold mb-2">Alex Chen</h4>
                      <p className="text-cyan-400 mb-3">Founder & CEO</p>
                      <p className="text-white/70 text-sm">
                        Former AI researcher at Google, passionate about making AI accessible to everyone.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-4xl font-bold text-black">S</span>
                      </div>
                      <h4 className="text-xl font-semibold mb-2">Sarah Kim</h4>
                      <p className="text-purple-400 mb-3">CTO</p>
                      <p className="text-white/70 text-sm">
                        Full-stack engineer with 8+ years building scalable applications and AI systems.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="space-y-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Our Values
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { title: 'User-First', desc: 'Every decision we make starts with our users' },
                      { title: 'Transparency', desc: 'Open and honest about our technology and processes' },
                      { title: 'Innovation', desc: 'Constantly exploring new ways to solve problems' },
                      { title: 'Community', desc: 'Building together with our global user base' },
                    ].map((value, index) => (
                      <div key={index} className="bg-white/5 rounded-2xl p-6">
                        <h4 className="text-lg font-semibold mb-3 text-cyan-400">{value.title}</h4>
                        <p className="text-white/70 text-sm">{value.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-white/5 to-white/0">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-white">{skill.name}</span>
                  <span className="text-cyan-400 font-semibold">{skill.level}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Have questions, suggestions, or just want to say hello? We'd love to hear from you.
          </p>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center text-white/60 transition-all duration-200 ${social.color}`}
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}