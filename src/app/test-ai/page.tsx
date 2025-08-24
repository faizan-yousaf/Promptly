'use client';

import { useState } from 'react';

interface AIStatus {
  success: boolean;
  message: string;
  data: {
    gemini: boolean;
    groq: boolean;
    openrouter: boolean;
    availableModels: string[];
    hasOpenRouterKey: boolean;
    envVars: {
      GEMINI_API_KEY: boolean;
      GROQ_API_KEY: boolean;
      OPENROUTER_API_KEY: boolean;
      OpenAI_Key: boolean;
    };
  };
  recommendations: Array<{
    type: 'error' | 'warning' | 'success';
    message: string;
    actions: string[];
  }>;
}

interface TestResult {
  model: string;
  success: boolean;
  response?: string;
  error?: string;
  fallbackUsed?: boolean;
  fallbackReason?: string;
  processingTime?: number;
}

export default function TestAIPage() {
  const [status, setStatus] = useState<AIStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [testInput, setTestInput] = useState('Write a simple hello world message');

  const checkStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai-status');
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('Error checking status:', error);
      setStatus({
        success: false,
        message: 'Failed to check status',
        data: {
          gemini: false,
          groq: false,
          openrouter: false,
          availableModels: [],
          hasOpenRouterKey: false,
          envVars: {
            GEMINI_API_KEY: false,
            GROQ_API_KEY: false,
            OPENROUTER_API_KEY: false,
            OpenAI_Key: false,
          }
        },
        recommendations: []
      });
    } finally {
      setLoading(false);
    }
  };

  const testModel = async (model: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInput: testInput,
          model,
          tone: 'friendly',
          role: 'developer',
          language: 'en',
          agentMode: false,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setTestResults(prev => [...prev, {
          model,
          success: true,
          response: data.prompt,
          fallbackUsed: data.fallbackUsed,
          fallbackReason: data.fallbackReason,
          processingTime: data.processingTime,
        }]);
      } else {
        setTestResults(prev => [...prev, {
          model,
          success: false,
          error: data.error || 'Unknown error',
        }]);
      }
    } catch (error) {
      setTestResults(prev => [...prev, {
        model,
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const testAllModels = async () => {
    setTestResults([]);
    const models = status?.data.availableModels || [];
    
    for (const model of models) {
      await testModel(model);
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">AI Integration Test</h1>
        
        {/* Status Check */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Model Status</h2>
          <button
            onClick={checkStatus}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded-lg mb-4"
          >
            {loading ? 'Checking...' : 'Check AI Status'}
          </button>
          
          {status && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`p-4 rounded-lg ${status.data.gemini ? 'bg-green-900' : 'bg-red-900'}`}>
                  <h3 className="font-semibold">Gemini</h3>
                  <p>{status.data.gemini ? '✅ Available' : '❌ Not configured'}</p>
                </div>
                <div className={`p-4 rounded-lg ${status.data.groq ? 'bg-green-900' : 'bg-red-900'}`}>
                  <h3 className="font-semibold">Groq</h3>
                  <p>{status.data.groq ? '✅ Available' : '❌ Not configured'}</p>
                </div>
                <div className={`p-4 rounded-lg ${status.data.openrouter ? 'bg-green-900' : 'bg-red-900'}`}>
                  <h3 className="font-semibold">OpenRouter</h3>
                  <p>{status.data.openrouter ? '✅ Available' : '❌ Not configured'}</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-900">
                  <h3 className="font-semibold">Available Models</h3>
                  <p>{status.data.availableModels.length}</p>
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Environment Variables</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>GEMINI_API_KEY: {status.data.envVars.GEMINI_API_KEY ? '✅' : '❌'}</div>
                  <div>GROQ_API_KEY: {status.data.envVars.GROQ_API_KEY ? '✅' : '❌'}</div>
                  <div>OPENROUTER_API_KEY: {status.data.envVars.OPENROUTER_API_KEY ? '✅' : '❌'}</div>
                  <div>OpenAI_Key: {status.data.envVars.OpenAI_Key ? '✅' : '❌'}</div>
                </div>
              </div>
              
              {status.recommendations.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Recommendations</h3>
                  {status.recommendations.map((rec, index) => (
                    <div key={index} className={`p-3 rounded-lg ${
                      rec.type === 'error' ? 'bg-red-900' :
                      rec.type === 'warning' ? 'bg-yellow-900' : 'bg-green-900'
                    }`}>
                      <p className="font-semibold">{rec.message}</p>
                      <ul className="mt-2 text-sm">
                        {rec.actions.map((action, actionIndex) => (
                          <li key={actionIndex}>• {action}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Test Section */}
        {status && status.data.availableModels.length > 0 && (
          <div className="bg-gray-900 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Test AI Models</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Test Input:</label>
              <textarea
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                rows={3}
                placeholder="Enter a test prompt..."
              />
            </div>
            
            <div className="flex gap-4 mb-6">
              <button
                onClick={testAllModels}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded-lg"
              >
                {loading ? 'Testing...' : 'Test All Models'}
              </button>
              
              {status.data.availableModels.map(model => (
                <button
                  key={model}
                  onClick={() => testModel(model)}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded-lg"
                >
                  Test {model}
                </button>
              ))}
            </div>
            
            {testResults.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Test Results</h3>
                {testResults.map((result, index) => (
                  <div key={index} className={`p-4 rounded-lg ${
                    result.success ? 'bg-green-900' : 'bg-red-900'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold capitalize">{result.model}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${
                        result.success ? 'bg-green-700' : 'bg-red-700'
                      }`}>
                        {result.success ? 'SUCCESS' : 'FAILED'}
                      </span>
                    </div>
                    
                    {result.success ? (
                      <div>
                        {result.fallbackUsed && (
                          <div className="bg-yellow-800 p-2 rounded mb-2 text-sm">
                            <strong>Fallback Used:</strong> {result.fallbackReason}
                          </div>
                        )}
                        <p className="text-sm mb-2">
                          <strong>Processing Time:</strong> {result.processingTime}ms
                        </p>
                        <div className="bg-gray-800 p-3 rounded">
                          <p className="text-sm">{result.response}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-red-300">{result.error}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Instructions */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <div className="space-y-2 text-sm">
            <p>1. Click "Check AI Status" to verify your API key configurations</p>
            <p>2. If models are available, you can test them individually or all at once</p>
            <p>3. The system will automatically use fallback models if the primary one fails</p>
            <p>4. Check the recommendations above for any configuration issues</p>
          </div>
        </div>
      </div>
    </div>
  );
}
