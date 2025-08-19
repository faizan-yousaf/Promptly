'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

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
    { value: 'developer', label: '👨‍💻 Developer', desc: 'Technical solutions & code' },
    { value: 'marketer', label: '📈 Marketer', desc: 'Marketing strategies & campaigns' },
    { value: 'writer', label: '✍️ Writer', desc: 'Content creation & editing' },
    { value: 'researcher', label: '🔬 Researcher', desc: 'Analysis & investigation' },
    { value: 'entrepreneur', label: '🚀 Entrepreneur', desc: 'Business & startup advice' },
    { value: 'student', label: '🎓 Student', desc: 'Learning & education' },
  ];

  const formatOptions = [
    { value: 'text', label: '📝 Text', desc: 'Plain text response' },
    { value: 'json', label: '⚡ JSON', desc: 'Structured JSON format' },
  ];

  const lengthOptions = [
    { value: 'short', label: '⚡ Short', desc: 'Brief & concise' },
    { value: 'medium', label: '📄 Medium', desc: 'Balanced detail' },
    { value: 'long', label: '📚 Long', desc: 'Comprehensive & detailed' },
  ];

  const tuningOptions = [
    { value: 'creative', label: '🎨 Creative', desc: 'Innovative & original' },
    { value: 'balanced', label: '⚖️ Balanced', desc: 'Practical & reliable' },
    { value: 'precise', label: '🎯 Precise', desc: 'Accurate & focused' },
  ];

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className={`bg-gray-900 border-r border-gray-800 transition-all duration-300 ${
        sidebarOpen ? 'w-80' : 'w-16'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-800">
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
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                {sidebarOpen ? '←' : '→'}
              </button>
            </div>
            {sidebarOpen && (
              <button
                onClick={createNewSession}
                className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>➕</span> New Chat
              </button>
            )}
          </div>

          {/* Chat History */}
          {sidebarOpen && (
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
                        ? 'bg-blue-600/20 border border-blue-600/30'
                        : 'hover:bg-gray-800'
                    }`}
                    onClick={() => setCurrentSession(session)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {session.title}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {session.lastMessage.toLocaleDateString()}
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            exportChat(session);
                          }}
                          className="p-1 hover:bg-gray-700 rounded text-xs"
                          title="Export"
                        >
                          📥
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSession(session.id);
                          }}
                          className="p-1 hover:bg-red-600 rounded text-xs"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
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
        {/* Top Navigation */}
        <nav className="border-b border-gray-800 bg-black/95 backdrop-blur-sm p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-400">
                {currentSession ? currentSession.title : 'Select a chat or start a new one'}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">Powered by OpenAI via OpenRouter</span>
              <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                Profile
              </button>
            </div>
          </div>
        </nav>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentSession && currentSession.messages.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-6">
              {currentSession.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3xl p-4 rounded-2xl ${
                      message.isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-100'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 p-4 rounded-2xl">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h2 className="text-2xl font-bold mb-2">Start a Conversation</h2>
                <p className="text-gray-400">Ask me anything and I'll help you with intelligent responses.</p>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-800 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Configuration Selectors */}
            <div className="flex gap-2 mb-4 flex-wrap relative">
              {/* Role Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowRoleSelector(!showRoleSelector)}
                  className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
                >
                  {roleOptions.find(r => r.value === selectedRole)?.label} ▼
                </button>
                {showRoleSelector && (
                  <div className="absolute bottom-full mb-2 left-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 min-w-64">
                    {roleOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSelectedRole(option.value as Role);
                          setShowRoleSelector(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-gray-400">{option.desc}</div>
                        </div>
                        {selectedRole === option.value && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Tuning Options */}
              <div className="relative">
                <button
                  onClick={() => setShowTuningSelector(!showTuningSelector)}
                  className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
                >
                  {tuningOptions.find(t => t.value === tuningOption)?.label} ▼
                </button>
                {showTuningSelector && (
                  <div className="absolute bottom-full mb-2 left-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 min-w-64">
                    {tuningOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setTuningOption(option.value as TuningOption);
                          setShowTuningSelector(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-gray-400">{option.desc}</div>
                        </div>
                        {tuningOption === option.value && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Output Format */}
              <div className="relative">
                <button
                  onClick={() => setShowFormatSelector(!showFormatSelector)}
                  className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
                >
                  {formatOptions.find(f => f.value === outputFormat)?.label} ▼
                </button>
                {showFormatSelector && (
                  <div className="absolute bottom-full mb-2 left-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 min-w-64">
                    {formatOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setOutputFormat(option.value as OutputFormat);
                          setShowFormatSelector(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-gray-400">{option.desc}</div>
                        </div>
                        {outputFormat === option.value && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Response Length */}
              <div className="relative">
                <button
                  onClick={() => setShowLengthSelector(!showLengthSelector)}
                  className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
                >
                  {lengthOptions.find(l => l.value === responseLength)?.label} ▼
                </button>
                {showLengthSelector && (
                  <div className="absolute bottom-full mb-2 left-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 min-w-64">
                    {lengthOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setResponseLength(option.value as ResponseLength);
                          setShowLengthSelector(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-gray-400">{option.desc}</div>
                        </div>
                        {responseLength === option.value && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Message Input */}
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none min-h-[50px] max-h-32"
                  rows={1}
                  disabled={isGenerating}
                />
                {inputValue && (
                  <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                    {inputValue.length} chars
                  </div>
                )}
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isGenerating}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors flex items-center justify-center min-w-[50px]"
              >
                {isGenerating ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <span className="text-lg">→</span>
                )}
              </button>
            </div>

            <div className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}