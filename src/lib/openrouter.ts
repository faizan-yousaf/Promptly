import axios from 'axios';

// OpenRouter configuration
interface OpenRouterConfig {
  apiKey: string;
  siteUrl?: string;
  siteName?: string;
  defaultModel?: string;
}

// Response types
interface OpenRouterResponse {
  id: string;
  choices: {
    message: {
      content: string;
      role: string;
    };
    index: number;
  }[];
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Error handling
class OpenRouterError extends Error {
  status?: number;
  data?: any;
  
  constructor(message: string, status?: number, data?: any) {
    super(message);
    this.name = 'OpenRouterError';
    this.status = status;
    this.data = data;
  }
}

/**
 * OpenRouter API client for accessing various LLM models
 */
export class OpenRouterClient {
  private apiKey: string;
  private baseUrl: string = 'https://openrouter.ai/api/v1';
  private siteUrl?: string;
  private siteName?: string;
  private defaultModel: string;
  
  constructor(config: OpenRouterConfig) {
    this.apiKey = config.apiKey;
    this.siteUrl = config.siteUrl;
    this.siteName = config.siteName;
    this.defaultModel = config.defaultModel || 'openai/gpt-4o';
    
    if (!this.apiKey) {
      throw new Error('OpenRouter API key is required');
    }
  }
  
  /**
   * Generate a completion using the OpenRouter API
   */
  async generateCompletion({
    prompt,
    model = this.defaultModel,
    temperature = 0.7,
    maxTokens = 2048,
    systemPrompt,
  }: {
    prompt: string;
    model?: string;
    temperature?: number;
    maxTokens?: number;
    systemPrompt?: string;
  }) {
    const startTime = Date.now();
    
    console.log('OpenRouter generateCompletion called with:', {
      model,
      temperature,
      maxTokens,
      hasSystemPrompt: !!systemPrompt,
      promptLength: prompt.length
    });
    
    try {
      const headers: Record<string, string> = {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      };
      
      // Add optional site information for attribution
      if (this.siteUrl) {
        headers['HTTP-Referer'] = this.siteUrl;
      }
      
      if (this.siteName) {
        headers['X-Title'] = this.siteName;
      }
      
      const messages = [];
      
      // Add system prompt if provided
      if (systemPrompt) {
        messages.push({
          role: 'system',
          content: systemPrompt,
        });
      }
      
      // Add user prompt
      messages.push({
        role: 'user',
        content: prompt,
      });
      
      const response = await axios.post<OpenRouterResponse>(
        `${this.baseUrl}/chat/completions`,
        {
          model,
          messages,
          temperature,
          max_tokens: maxTokens,
        },
        { headers }
      );
      
      const processingTime = Date.now() - startTime;
      const text = response.data.choices[0]?.message?.content || '';
      
      return {
        response: text,
        model: response.data.model || model,
        processingTime,
        usage: response.data.usage,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('OpenRouter API error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message,
          url: error.config?.url
        });
        throw new OpenRouterError(
          'Failed to generate response with OpenRouter',
          error.response?.status,
          error.response?.data
        );
      }
      
      console.error('OpenRouter API error:', error);
      throw new Error('Failed to generate response with OpenRouter');
    }
  }
  
  /**
   * Get available models from OpenRouter
   */
  async getAvailableModels() {
    try {
      const response = await axios.get(
        `${this.baseUrl}/models`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Failed to fetch OpenRouter models:', error);
      throw new Error('Failed to fetch available models');
    }
  }
}