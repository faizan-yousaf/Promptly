'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { 
  Send, 
  Plus, 
  Trash2, 
  Download, 
  Settings, 
  MessageSquare, 
  Sparkles,
  Bot,
  User,
  ChevronDown,
  Zap,
  Code,
  FileText,
  Brain,
  Globe,
  Palette
} from 'lucide-react';

type Role = 'developer' | 'marketer' | 'writer' | 'researcher' | 'entrepreneur' | 'student';
type OutputFormat = 'text' | 'json';
type ResponseLength = 'short' | 'medium' | 'long';
type TuningOption = 'creative' | 'balanced' | 'precise';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  role?: Role;
  format?: OutputFormat;
  length?: ResponseLength;
  tuning?: TuningOption;
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  lastMessage: Date;
}

export default function Dashboard() {
  const [inputValue, setInputValue] = useState('');
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  
  // Configuration states
  const [selectedRole, setSelectedRole] = useState<Role>('developer');
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('text');
  const [responseLength, setResponseLength] = useState<ResponseLength>('medium');
  const [tuningOption, setTuningOption] = useState<TuningOption>('balanced');
  
  // UI states
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [showFormatSelector, setShowFormatSelector] = useState(false);
  const [showLengthSelector, setShowLengthSelector] = useState(false);
  const [showTuningSelector, setShowTuningSelector] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      lastMessage: new Date(),
    };
    setCurrentSession(newSession);
    setChatSessions(prev => [newSession, ...prev]);
  };

  const generateSessionTitle = (firstMessage: string): string => {
    return firstMessage.length > 30 
      ? firstMessage.substring(0, 30) + '...'
      : firstMessage;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isGenerating) return;

    let session = currentSession;
    if (!session) {
      session = {
        id: Date.now().toString(),
        title: generateSessionTitle(inputValue),
        messages: [],
        createdAt: new Date(),
        lastMessage: new Date(),
      };
      setCurrentSession(session);
      setChatSessions(prev => [session!, ...prev]);
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
      role: selectedRole,
      format: outputFormat,
      length: responseLength,
      tuning: tuningOption,
    };

    const updatedSession = {
      ...session,
      messages: [...session.messages, userMessage],
      lastMessage: new Date(),
      title: session.messages.length === 0 ? generateSessionTitle(inputValue) : session.title,
    };

    setCurrentSession(updatedSession);
    setChatSessions(prev => prev.map(s => s.id === session!.id ? updatedSession : s));
    setInputValue('');
    setIsGenerating(true);
    setIsTyping(true);

    try {
      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInput: inputValue,
          model: 'openrouter',
          tone: tuningOption === 'creative' ? 'creative' : tuningOption === 'precise' ? 'professional' : 'friendly',
          role: selectedRole,
          language: 'en',
          agentMode: false,
          openRouterModel: 'openai/gpt-4o',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await response.json();
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: outputFormat === 'json' ? formatAsJSON(data.prompt) : data.prompt,
        isUser: false,
        timestamp: new Date(),
      };

      const finalSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, aiMessage],
        lastMessage: new Date(),
      };

      setCurrentSession(finalSession);
      setChatSessions(prev => prev.map(s => s.id === session!.id ? finalSession : s));
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error generating a response. Please try again.',
        isUser: false,
        timestamp: new Date(),
      };

      const errorSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, errorMessage],
        lastMessage: new Date(),
      };

      setCurrentSession(errorSession);
      setChatSessions(prev => prev.map(s => s.id === session!.id ? errorSession : s));
    } finally {
      setIsGenerating(false);
      setIsTyping(false);
    }
  };

  const formatAsJSON = (content: string) => {
    try {
      return JSON.stringify({ response: content }, null, 2);
    } catch {
      return content;
    }
  };

  const deleteSession = (sessionId: string) => {
    setChatSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSession?.id === sessionId) {
      setCurrentSession(null);
    }
  };

  const exportChat = (session: ChatSession) => {
    const content = session.messages
      .map(m => `${m.isUser ? 'User' : 'AI'} (${m.timestamp.toLocaleTimeString()}): ${m.content}`)
      .join('\n\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${session.title}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const roleOptions = [
    { value: 'developer', label: 'Developer', icon: Code, desc: 'Technical solutions & code' },
    { value: 'marketer', label: 'Marketer', icon: Zap, desc: 'Marketing strategies & campaigns' },
    { value: 'writer', label: 'Writer', icon: FileText, desc: 'Content creation & editing' },
    { value: 'researcher', label: 'Researcher', icon: Brain, desc: 'Analysis & investigation' },
    { value: 'entrepreneur', label: 'Entrepreneur', icon: Sparkles, desc: 'Business & startup advice' },
    { value: 'student', label: 'Student', icon: MessageSquare, desc: 'Learning & education' },
  ];

  const formatOptions = [
    { value: 'text', label: 'Text', icon: FileText, desc: 'Plain text response' },
    { value: 'json', label: 'JSON', icon: Code, desc: 'Structured JSON format' },
  ];

  const lengthOptions = [
    { value: 'short', label: 'Short', icon: Zap, desc: 'Brief & concise' },
    { value: 'medium', label: 'Medium', icon: FileText, desc: 'Balanced detail' },
    { value: 'long', label: 'Long', icon: MessageSquare, desc: 'Comprehensive & detailed' },
  ];

  const tuningOptions = [
    { value: 'creative', label: 'Creative', icon: Sparkles, desc: 'Innovative & original' },
    { value: 'balanced', label: 'Balanced', icon: Palette, desc: 'Practical & reliable' },
    { value: 'precise', label: 'Precise', icon: Brain, desc: 'Accurate & focused' },
  ];

  const getCurrentOption = (type: string) => {
    switch (type) {
      case 'role':
        return roleOptions.find(opt => opt.value === selectedRole);
      case 'format':
        return formatOptions.find(opt => opt.value === outputFormat);
      case 'length':
        return lengthOptions.find(opt => opt.value === responseLength);
      case 'tuning':
        return tuningOptions.find(opt => opt.value === tuningOption);
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="dashboard" />
      
      <div className="flex h-screen pt-20">
        {/* Sidebar */}
        <div className={`bg-white/5 backdrop-blur-sm border-r border-white/10 transition-all duration-300 ${
          sidebarOpen ? 'w-80' : 'w-20'
        }`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                {sidebarOpen && (
                  <Link href="/" className="text-xl font-bold">
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      Promptly
                    </span>
                  </Link>
                )}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {sidebarOpen ? '←' : '→'}
                </button>
              </div>
              {sidebarOpen && (
                <button
                  onClick={createNewSession}
                  className="w-full mt-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  New Chat
                </button>
              )}
            </div>

            {/* Chat History */}
            {sidebarOpen && (
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {chatSessions.length === 0 ? (
                  <div className="text-white/40 text-sm text-center py-8">
                    No conversations yet
                  </div>
                ) : (
                  chatSessions.map((session) => (
                    <div
                      key={session.id}
                      className={`group p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        currentSession?.id === session.id
                          ? 'bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-400/30'
                          : 'hover:bg-white/10'
                      }`}
                      onClick={() => setCurrentSession(session)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-white truncate">
                            {session.title}
                          </div>
                          <div className="text-xs text-white/60 mt-1">
                            {session.lastMessage.toLocaleDateString()}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSession(session.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4 text-white/60 hover:text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          {currentSession && (
            <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">{currentSession.title}</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => exportChat(currentSession)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Export Chat"
                  >
                    <Download className="w-4 h-4 text-white/60" />
                  </button>
                  <button
                    onClick={() => deleteSession(currentSession.id)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Delete Chat"
                  >
                    <Trash2 className="w-4 h-4 text-white/60" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {currentSession?.messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-2xl flex items-center justify-center">
                    <Bot className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Welcome to Promptly</h3>
                  <p className="text-white/60 mb-6 max-w-md">
                    Start a conversation by typing your message below. I'll help you create perfect prompts for any task.
                  </p>
                </div>
              </div>
            ) : (
              currentSession?.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-3xl ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isUser 
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500' 
                        : 'bg-gradient-to-r from-purple-400 to-pink-500'
                    }`}>
                      {message.isUser ? (
                        <User className="w-4 h-4 text-black" />
                      ) : (
                        <Bot className="w-4 h-4 text-black" />
                      )}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.isUser
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black'
                        : 'bg-white/10 backdrop-blur-sm border border-white/10 text-white'
                    }`}>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div className={`text-xs mt-2 ${
                        message.isUser ? 'text-black/60' : 'text-white/40'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-3xl">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-black" />
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Configuration Panel */}
          <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 p-4">
            <div className="flex items-center space-x-4 mb-4">
              {[
                { type: 'role', label: 'Role', icon: User },
                { type: 'format', label: 'Format', icon: FileText },
                { type: 'length', label: 'Length', icon: MessageSquare },
                { type: 'tuning', label: 'Tuning', icon: Palette },
              ].map((config) => {
                const current = getCurrentOption(config.type);
                return (
                  <div key={config.type} className="relative">
                    <button
                      onClick={() => {
                        setShowRoleSelector(config.type === 'role' ? !showRoleSelector : false);
                        setShowFormatSelector(config.type === 'format' ? !showFormatSelector : false);
                        setShowLengthSelector(config.type === 'length' ? !showLengthSelector : false);
                        setShowTuningSelector(config.type === 'tuning' ? !showTuningSelector : false);
                      }}
                      className="flex items-center space-x-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <config.icon className="w-4 h-4 text-white/60" />
                      <span className="text-sm text-white">{current?.label}</span>
                      <ChevronDown className="w-4 h-4 text-white/60" />
                    </button>
                    
                    {/* Dropdown */}
                    {((config.type === 'role' && showRoleSelector) ||
                      (config.type === 'format' && showFormatSelector) ||
                      (config.type === 'length' && showLengthSelector) ||
                      (config.type === 'tuning' && showTuningSelector)) && (
                      <div className="absolute bottom-full left-0 mb-2 w-64 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 z-10">
                        {config.type === 'role' && roleOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSelectedRole(option.value as Role);
                              setShowRoleSelector(false);
                            }}
                            className="w-full flex items-center space-x-3 p-2 hover:bg-white/10 rounded-lg transition-colors text-left"
                          >
                            <option.icon className="w-4 h-4 text-white/60" />
                            <div>
                              <div className="text-sm text-white">{option.label}</div>
                              <div className="text-xs text-white/60">{option.desc}</div>
                            </div>
                          </button>
                        ))}
                        {config.type === 'format' && formatOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setOutputFormat(option.value as OutputFormat);
                              setShowFormatSelector(false);
                            }}
                            className="w-full flex items-center space-x-3 p-2 hover:bg-white/10 rounded-lg transition-colors text-left"
                          >
                            <option.icon className="w-4 h-4 text-white/60" />
                            <div>
                              <div className="text-sm text-white">{option.label}</div>
                              <div className="text-xs text-white/60">{option.desc}</div>
                            </div>
                          </button>
                        ))}
                        {config.type === 'length' && lengthOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setResponseLength(option.value as ResponseLength);
                              setShowLengthSelector(false);
                            }}
                            className="w-full flex items-center space-x-3 p-2 hover:bg-white/10 rounded-lg transition-colors text-left"
                          >
                            <option.icon className="w-4 h-4 text-white/60" />
                            <div>
                              <div className="text-sm text-white">{option.label}</div>
                              <div className="text-xs text-white/60">{option.desc}</div>
                            </div>
                          </button>
                        ))}
                        {config.type === 'tuning' && tuningOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setTuningOption(option.value as TuningOption);
                              setShowTuningSelector(false);
                            }}
                            className="w-full flex items-center space-x-3 p-2 hover:bg-white/10 rounded-lg transition-colors text-left"
                          >
                            <option.icon className="w-4 h-4 text-white/60" />
                            <div>
                              <div className="text-sm text-white">{option.label}</div>
                              <div className="text-xs text-white/60">{option.desc}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Input Area */}
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe what you need help with..."
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isGenerating}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 disabled:from-gray-500 disabled:to-gray-600 text-black p-3 rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}