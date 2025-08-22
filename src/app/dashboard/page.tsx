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
  Palette,
  Menu,
  X
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    setSidebarOpen(false);
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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navigation currentPage="dashboard" />
      
      <div className="flex h-screen pt-16">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-auto bg-white border-r border-gray-200 transition-transform duration-300 lg:transition-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } lg:w-80`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-gray-900">
                  Promptly
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={createNewSession}
                className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Plus className="w-4 h-4" />
                New Chat
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {chatSessions.length === 0 ? (
                <div className="text-gray-500 text-sm text-center py-8">
                  No conversations yet
                </div>
              ) : (
                chatSessions.map((session) => (
                  <div
                    key={session.id}
                    className={`group p-3 rounded-lg cursor-pointer transition-colors ${
                      currentSession?.id === session.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      setCurrentSession(session);
                      setSidebarOpen(false);
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {session.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {session.lastMessage.toLocaleDateString()}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(session.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <h2 className="text-lg font-semibold text-gray-900">
                  {currentSession?.title || 'New Chat'}
                </h2>
              </div>
              {currentSession && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => exportChat(currentSession)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Export Chat"
                  >
                    <Download className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => deleteSession(currentSession.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Delete Chat"
                  >
                    <Trash2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {currentSession?.messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <Bot className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Welcome to Promptly</h3>
                  <p className="text-gray-600 mb-6">
                    Start a conversation by typing your message below. I'll help you create perfect prompts for any task.
                  </p>
                  
                  {/* Quick Start Suggestions */}
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      "Write a professional email to a client",
                      "Create a marketing campaign for a new product",
                      "Generate code documentation for a function",
                      "Write a blog post about AI trends"
                    ].map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setInputValue(suggestion)}
                        className="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors text-sm text-gray-700"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
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
                        ? 'bg-blue-600' 
                        : 'bg-gray-600'
                    }`}>
                      {message.isUser ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 max-w-2xl ${
                      message.isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-3xl">
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Configuration Panel */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex items-center space-x-4 mb-4 overflow-x-auto">
              {[
                { type: 'role', label: 'Role', icon: User },
                { type: 'format', label: 'Format', icon: FileText },
                { type: 'length', label: 'Length', icon: MessageSquare },
                { type: 'tuning', label: 'Tuning', icon: Palette },
              ].map((config) => {
                const current = getCurrentOption(config.type);
                return (
                  <div key={config.type} className="relative flex-shrink-0">
                    <button
                      onClick={() => {
                        setShowRoleSelector(config.type === 'role' ? !showRoleSelector : false);
                        setShowFormatSelector(config.type === 'format' ? !showFormatSelector : false);
                        setShowLengthSelector(config.type === 'length' ? !showLengthSelector : false);
                        setShowTuningSelector(config.type === 'tuning' ? !showTuningSelector : false);
                      }}
                      className="flex items-center space-x-2 px-3 py-2 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors text-sm"
                    >
                      <config.icon className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-900">{current?.label}</span>
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    </button>
                    
                    {/* Dropdown */}
                    {((config.type === 'role' && showRoleSelector) ||
                      (config.type === 'format' && showFormatSelector) ||
                      (config.type === 'length' && showLengthSelector) ||
                      (config.type === 'tuning' && showTuningSelector)) && (
                      <div className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
                        {config.type === 'role' && roleOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSelectedRole(option.value as Role);
                              setShowRoleSelector(false);
                            }}
                            className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                          >
                            <option.icon className="w-4 h-4 text-gray-600" />
                            <div>
                              <div className="text-sm text-gray-900">{option.label}</div>
                              <div className="text-xs text-gray-500">{option.desc}</div>
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
                            className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                          >
                            <option.icon className="w-4 h-4 text-gray-600" />
                            <div>
                              <div className="text-sm text-gray-900">{option.label}</div>
                              <div className="text-xs text-gray-500">{option.desc}</div>
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
                            className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                          >
                            <option.icon className="w-4 h-4 text-gray-600" />
                            <div>
                              <div className="text-sm text-gray-900">{option.label}</div>
                              <div className="text-xs text-gray-500">{option.desc}</div>
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
                            className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                          >
                            <option.icon className="w-4 h-4 text-gray-600" />
                            <div>
                              <div className="text-sm text-gray-900">{option.label}</div>
                              <div className="text-xs text-gray-500">{option.desc}</div>
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
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isGenerating}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-3 rounded-xl transition-colors disabled:cursor-not-allowed"
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