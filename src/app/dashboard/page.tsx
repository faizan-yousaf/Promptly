'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
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
  X,
  Share2,
  MoreVertical,
  Mic,
  MicOff,
  Volume2
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
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  
  const [inputValue, setInputValue] = useState('');
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  // Voice input states
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  
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
  const [showChatMenu, setShowChatMenu] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const roleDropdownRef = useRef<HTMLDivElement>(null);
  const formatDropdownRef = useRef<HTMLDivElement>(null);
  const lengthDropdownRef = useRef<HTMLDivElement>(null);
  const tuningDropdownRef = useRef<HTMLDivElement>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onstart = () => {
        setIsRecording(true);
        setTranscript('');
      };
      
      recognitionInstance.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        setTranscript(finalTranscript + interimTranscript);
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsRecording(false);
        if (isListening) {
          // Restart if still listening
          recognitionInstance.start();
        }
      };
      
      setRecognition(recognitionInstance);
    }
  }, [isListening]);

  // Check authentication
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // Check if click is outside all dropdown containers
      const isOutsideDropdowns = !target.closest('.dropdown-container');
      const isOutsideChatMenu = !target.closest('[data-chat-menu]');
      
      if (isOutsideDropdowns) {
        setShowRoleSelector(false);
        setShowFormatSelector(false);
        setShowLengthSelector(false);
        setShowTuningSelector(false);
      }
      
      if (isOutsideChatMenu) {
        setShowChatMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Voice input functions
  const startListening = () => {
    if (recognition && !isRecording) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
      if (transcript.trim()) {
        setInputValue(transcript.trim());
        setTranscript('');
      }
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Show loading state while checking authentication
  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0ea5e9] mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

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
        const errorText = await response.text();
        console.error('API Response Error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`Failed to generate response: ${response.status} ${response.statusText}`);
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
      const errorContent = error instanceof Error ? error.message : 'Unknown error occurred';
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `Sorry, I encountered an error generating a response: ${errorContent}. Please check your API keys and try again.`,
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

  const shareChat = async (session: ChatSession) => {
    try {
      const content = session.messages
        .map(m => `${m.isUser ? 'User' : 'AI'}: ${m.content}`)
        .join('\n\n');
      
      if (navigator.share) {
        await navigator.share({
          title: `Chat: ${session.title}`,
          text: content,
          url: window.location.href
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(content);
        alert('Chat content copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing chat:', error);
    }
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
      
      <div className="flex h-screen pt-16">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-auto bg-black/80 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 lg:transition-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } lg:w-80`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-white">
                  Promptly
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              <button
                onClick={createNewSession}
                className="w-full mt-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-semibold"
              >
                <Plus className="w-4 h-4" />
                New Chat
              </button>
            </div>

            {/* Chat History */}
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
                    onClick={() => {
                      setCurrentSession(session);
                      setSidebarOpen(false);
                    }}
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
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-white/60 hover:text-red-400" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-black">
          {/* Chat Header */}
          <div className="border-b border-white/10 p-4 bg-black/80 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5 text-white" />
                </button>
                <h2 className="text-lg font-semibold text-white">
                  {currentSession?.title || 'New Chat'}
                </h2>
              </div>
              {currentSession && (
                <div className="flex items-center space-x-2">
                  <div className="relative" data-chat-menu>
                    <button
                      onClick={() => setShowChatMenu(!showChatMenu)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Chat Options"
                    >
                      <MoreVertical className="w-4 h-4 text-white/60" />
                    </button>
                    
                    {/* Chat Menu Dropdown */}
                    {showChatMenu && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg shadow-lg p-2 z-10">
                        <button
                          onClick={() => {
                            exportChat(currentSession);
                            setShowChatMenu(false);
                          }}
                          className="w-full flex items-center space-x-3 p-2 hover:bg-white/10 rounded-lg transition-colors text-left"
                        >
                          <Download className="w-4 h-4 text-white/60" />
                          <span className="text-sm text-white">Export Chat</span>
                        </button>
                        <button
                          onClick={() => {
                            shareChat(currentSession);
                            setShowChatMenu(false);
                          }}
                          className="w-full flex items-center space-x-3 p-2 hover:bg-white/10 rounded-lg transition-colors text-left"
                        >
                          <Share2 className="w-4 h-4 text-white/60" />
                          <span className="text-sm text-white">Share Chat</span>
                        </button>
                        <button
                          onClick={() => {
                            deleteSession(currentSession.id);
                            setShowChatMenu(false);
                          }}
                          className="w-full flex items-center space-x-3 p-2 hover:bg-white/10 rounded-lg transition-colors text-left text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="text-sm">Delete Chat</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-6 ${currentSession?.messages.length === 0 ? 'flex items-center justify-center' : ''}`}>
            {currentSession?.messages.length === 0 ? (
              <div className="text-center max-w-md">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center">
                  <Bot className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Welcome to Promptly</h3>
                <p className="text-white/60 mb-6">
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
                      className="p-3 text-left bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors text-sm text-white/80"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {currentSession?.messages.map((message) => (
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
                          ? 'bg-gray-600 text-white'
                          : 'bg-gray-600 text-white'
                      }`}>
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3 max-w-3xl">
                      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
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
              </>
            )}
          </div>

          {/* Configuration Panel */}
          <div className="border-t border-white/10 p-4 bg-black/80 backdrop-blur-xl">
            <div className="flex items-center space-x-4 mb-4 overflow-x-auto">
              {[
                { type: 'role', label: 'Role', icon: User },
                { type: 'format', label: 'Format', icon: FileText },
                { type: 'length', label: 'Length', icon: MessageSquare },
                { type: 'tuning', label: 'Tuning', icon: Palette },
              ].map((config) => {
                const current = getCurrentOption(config.type);
                return (
                  <div key={config.type} className="relative flex-shrink-0 dropdown-container">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Close all other dropdowns first
                        setShowRoleSelector(false);
                        setShowFormatSelector(false);
                        setShowLengthSelector(false);
                        setShowTuningSelector(false);
                        
                        // Toggle the clicked dropdown
                        switch (config.type) {
                          case 'role':
                            setShowRoleSelector(!showRoleSelector);
                            break;
                          case 'format':
                            setShowFormatSelector(!showFormatSelector);
                            break;
                          case 'length':
                            setShowLengthSelector(!showLengthSelector);
                            break;
                          case 'tuning':
                            setShowTuningSelector(!showTuningSelector);
                            break;
                        }
                      }}
                      className="flex items-center space-x-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors text-sm"
                    >
                      <config.icon className="w-4 h-4 text-white/60" />
                      <span className="text-white">{current?.label}</span>
                      <ChevronDown className="w-4 h-4 text-white/60" />
                    </button>
                    
                    {/* Dropdown */}
                    {((config.type === 'role' && showRoleSelector) ||
                      (config.type === 'format' && showFormatSelector) ||
                      (config.type === 'length' && showLengthSelector) ||
                      (config.type === 'tuning' && showTuningSelector)) && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg shadow-lg p-2 z-20">
                        {config.type === 'role' && roleOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={(e) => {
                              e.stopPropagation();
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
                            onClick={(e) => {
                              e.stopPropagation();
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
                            onClick={(e) => {
                              e.stopPropagation();
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
                            onClick={(e) => {
                              e.stopPropagation();
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

            {/* Voice Input Indicator */}
            {isRecording && (
              <div className="mb-3 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-red-400">Listening...</span>
                <span className="text-sm text-white/60">{transcript}</span>
              </div>
            )}

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
              
              {/* Voice Input Button */}
              <button
                onClick={toggleListening}
                disabled={isGenerating}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                title={isListening ? 'Stop recording' : 'Start voice input'}
              >
                {isListening ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>
              
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