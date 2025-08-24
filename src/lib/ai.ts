import { GoogleGenerativeAI } from '@google/generative-ai'
import Groq from 'groq-sdk'
import { OpenRouterClient } from './openrouter'
import { env, validateEnv } from './env'

// Validate environment variables on module load
validateEnv();

// Initialize AI clients (only if API keys are available)
const gemini = env.GEMINI_API_KEY ? new GoogleGenerativeAI(env.GEMINI_API_KEY) : null;
const groq = env.GROQ_API_KEY ? new Groq({ apiKey: env.GROQ_API_KEY }) : null;

// Initialize OpenRouter client (only if API key is available)
const hasOpenRouterKey = !!env.OPENROUTER_API_KEY;
console.log('OpenRouter initialization:', {
  hasKey: hasOpenRouterKey,
  OPENROUTER_API_KEY: !!env.OPENROUTER_API_KEY,
  OPENROUTER_API_KEY_Length: env.OPENROUTER_API_KEY ? env.OPENROUTER_API_KEY.length : 0,
  // Debug: Show actual values (first 10 chars)
  OPENROUTER_API_KEY_Preview: env.OPENROUTER_API_KEY ? `${env.OPENROUTER_API_KEY.substring(0, 10)}...` : 'Not set',
  GEMINI_API_KEY_Preview: env.GEMINI_API_KEY ? `${env.GEMINI_API_KEY.substring(0, 10)}...` : 'Not set',
  GROQ_API_KEY_Preview: env.GROQ_API_KEY ? `${env.GROQ_API_KEY.substring(0, 10)}...` : 'Not set'
});

const openRouter = hasOpenRouterKey ? new OpenRouterClient({
  apiKey: env.OPENROUTER_API_KEY || '',
  siteUrl: env.SITE_URL,
  siteName: 'Promptly',
  defaultModel: env.OPENROUTER_DEFAULT_MODEL,
}) : null;

export type AIModel = 'gemini' | 'groq' | 'openrouter'
export type ToneType = 'professional' | 'friendly' | 'creative'
export type RoleType = 'developer' | 'marketer' | 'writer' | 'researcher' | 'entrepreneur' | 'student'

export interface PromptRequest {
  prompt: string
  model: AIModel
  tone: ToneType
  role: RoleType
  agentMode: boolean
  language: string
  openRouterModel?: string // Optional specific model for OpenRouter
}

export interface PromptResponse {
  response: string
  model: AIModel
  processingTime: number
  agentSteps?: string[]
  usage?: {
    prompt_tokens?: number
    completion_tokens?: number
    total_tokens?: number
  }
  fallbackUsed?: boolean
  fallbackReason?: string
}

// Tone modifiers
const toneModifiers = {
  professional: 'Respond in a professional, formal tone with clear structure and business-appropriate language.',
  friendly: 'Respond in a warm, approachable tone that feels conversational and helpful.',
  creative: 'Respond with creativity, using engaging language and innovative approaches.'
}

// Role context
const roleContexts = {
  developer: 'You are assisting a software developer. Focus on technical accuracy, code examples, and development best practices.',
  marketer: 'You are assisting a marketing professional. Focus on audience engagement, conversion optimization, and brand messaging.',
  writer: 'You are assisting a content writer. Focus on creative writing, content strategy, and engaging storytelling.',
  researcher: 'You are assisting a researcher. Focus on analytical thinking, data interpretation, and thorough investigation.',
  entrepreneur: 'You are assisting an entrepreneur. Focus on strategic thinking, business growth, and leadership insights.',
  student: 'You are assisting a student. Focus on learning, education, and academic development.'
}

// Language instructions
const languageInstructions = {
  en: 'Respond in English.',
  es: 'Responde en español.',
  fr: 'Répondez en français.',
  de: 'Antworten Sie auf Deutsch.',
  it: 'Rispondi in italiano.',
  pt: 'Responda em português.',
  zh: '用中文回答。',
  ja: '日本語で回答してください。',
  ko: '한국어로 답변해주세요。',
  hi: 'हिंदी में जवाब दें।',
  ar: 'الرجاء الرد باللغة العربية.',
  ru: 'Ответьте на русском языке.'
}

// Build enhanced prompt
function buildEnhancedPrompt(request: PromptRequest): string {
  const { prompt, tone, role, language } = request
  
  const toneInstruction = toneModifiers[tone]
  const roleContext = roleContexts[role]
  const langInstruction = languageInstructions[language as keyof typeof languageInstructions] || languageInstructions.en
  
  return `${roleContext}

${toneInstruction}

${langInstruction}

User Request: ${prompt}`
}

// Agent mode prompt refinement
function buildAgentPrompt(request: PromptRequest): string {
  const basePrompt = buildEnhancedPrompt(request)
  
  return `You are an advanced AI agent with multi-step reasoning capabilities. Break down the user's request into logical steps, analyze each component, and provide a comprehensive response.

Steps to follow:
1. Analyze the user's request
2. Identify key components and requirements
3. Research and gather relevant information
4. Synthesize a comprehensive response
5. Review and refine the output

${basePrompt}

Provide your step-by-step reasoning and final response.`
}

// Gemini API call
export async function callGemini(request: PromptRequest): Promise<PromptResponse> {
  if (!gemini) {
    throw new Error('Gemini API key not configured');
  }
  
  const startTime = Date.now()
  
  try {
    const model = gemini.getGenerativeModel({ model: 'gemini-pro' })
    const prompt = request.agentMode ? buildAgentPrompt(request) : buildEnhancedPrompt(request)
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    const processingTime = Date.now() - startTime
    
    return {
      response: text,
      model: 'gemini',
      processingTime,
      agentSteps: request.agentMode ? extractAgentSteps(text) : undefined
    }
  } catch (error) {
    console.error('Gemini API error:', error)
    throw new Error('Failed to generate response with Gemini')
  }
}

// Groq API call
export async function callGroq(request: PromptRequest): Promise<PromptResponse> {
  if (!groq) {
    throw new Error('Groq API key not configured');
  }
  
  const startTime = Date.now()
  
  try {
    const prompt = request.agentMode ? buildAgentPrompt(request) : buildEnhancedPrompt(request)
    
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
      max_tokens: 2048,
    })
    
    const text = completion.choices[0]?.message?.content || ''
    const processingTime = Date.now() - startTime
    
    return {
      response: text,
      model: 'groq',
      processingTime,
      agentSteps: request.agentMode ? extractAgentSteps(text) : undefined
    }
  } catch (error) {
    console.error('Groq API error:', error)
    throw new Error('Failed to generate response with Groq')
  }
}

// OpenRouter API call
export async function callOpenRouter(request: PromptRequest): Promise<PromptResponse> {
  console.log('callOpenRouter called with:', { model: request.model, openRouterModel: request.openRouterModel });
  
  if (!openRouter) {
    console.error('OpenRouter client not initialized. API keys available:', {
      OPENROUTER_API_KEY: !!process.env.OPENROUTER_API_KEY,
      OpenAI_Key: !!process.env.OpenAI_Key
    });
    throw new Error('OpenRouter API key not configured');
  }
  
  const startTime = Date.now()
  
  try {
    const prompt = request.agentMode ? buildAgentPrompt(request) : buildEnhancedPrompt(request)
    const systemPrompt = request.agentMode 
      ? 'You are an advanced AI assistant with multi-step reasoning capabilities.'
      : `You are an advanced "Prompt Refinement Assistant".  
Your task is to take any rough, vague, or incomplete prompt from the user and rewrite it into a **clear, structured, detailed, and effective prompt** that can be used with AI models (such as GPT, Claude, Gemini, Mistral, etc.).  

## Rules:
1. Never answer the prompt yourself — only rewrite/refine it.
2. Always avoid hallucinations, assumptions, or adding information that was not provided by the user.
3. If the user's request is unclear, reformulate it into a more specific and context-rich version while staying true to their intent.
4. The rewritten prompt must:
   - Clearly state the **role** the AI should take (e.g., "Act as a data scientist…", "You are a travel guide…").
   - Specify the **task or goal** (e.g., "Generate ideas for…", "Explain step-by-step…").
   - Provide necessary **constraints or style requirements** (e.g., tone: formal/casual, output format: table, list, code, etc.).
   - Ask the AI to **clarify missing details** if necessary rather than making them up.
5. Do not add irrelevant content or fictional facts.
6. Keep the rewritten prompt **concise but powerful**, optimized for high-quality outputs.

## Output Format:
Always respond in the following structure:
---
**Refined Prompt:**
[Final polished prompt here]

**Notes:**
- [Mention any assumptions you avoided]
- [Mention if user input was vague and how you refined it]`
    
    const result = await openRouter.generateCompletion({
      prompt,
      model: request.openRouterModel,
      systemPrompt,
      temperature: 0.7,
      maxTokens: 2048,
    })
    
    return {
      response: result.response,
      model: 'openrouter',
      processingTime: result.processingTime,
      agentSteps: request.agentMode ? extractAgentSteps(result.response) : undefined,
      usage: result.usage
    }
  } catch (error) {
    console.error('OpenRouter API error:', error)
    throw new Error('Failed to generate response with OpenRouter')
  }
}

// Extract agent steps from response
function extractAgentSteps(response: string): string[] {
  const steps: string[] = []
  const lines = response.split('\n')
  
  for (const line of lines) {
    if (line.match(/^\d+\./)) {
      steps.push(line.trim())
    }
  }
  
  return steps.length > 0 ? steps : ['Analysis completed', 'Response generated']
}

// Get available models based on configured API keys
export function getAvailableModels(): AIModel[] {
  const available: AIModel[] = []
  
  if (gemini) available.push('gemini')
  if (groq) available.push('groq')
  if (openRouter) available.push('openrouter')
  
  return available
}

// Enhanced AI function with fallback
export async function generatePromptResponse(request: PromptRequest): Promise<PromptResponse> {
  const availableModels = getAvailableModels()
  
  if (availableModels.length === 0) {
    throw new Error('No AI models are configured. Please check your API keys.')
  }
  
  // If the requested model is available, try it first
  if (availableModels.includes(request.model)) {
    try {
      switch (request.model) {
        case 'gemini':
          return await callGemini(request)
        case 'groq':
          return await callGroq(request)
        case 'openrouter':
          return await callOpenRouter(request)
        default:
          throw new Error(`Unsupported model: ${request.model}`)
      }
    } catch (error) {
      console.warn(`Primary model ${request.model} failed, trying fallback...`, error)
      
      // Try other available models as fallback
      for (const fallbackModel of availableModels) {
        if (fallbackModel === request.model) continue
        
        try {
          console.log(`Trying fallback model: ${fallbackModel}`)
          
          const fallbackRequest = { ...request, model: fallbackModel }
          let result: PromptResponse
          
          switch (fallbackModel) {
            case 'gemini':
              result = await callGemini(fallbackRequest)
              break
            case 'groq':
              result = await callGroq(fallbackRequest)
              break
            case 'openrouter':
              result = await callOpenRouter(fallbackRequest)
              break
            default:
              continue
          }
          
          // Mark as fallback response
          result.fallbackUsed = true
          result.fallbackReason = `Primary model ${request.model} failed, used ${fallbackModel} as fallback`
          
          console.log(`Fallback successful with ${fallbackModel}`)
          return result
          
        } catch (fallbackError) {
          console.warn(`Fallback model ${fallbackModel} also failed:`, fallbackError)
          continue
        }
      }
      
      // If all models fail, throw the original error
      throw error
    }
  } else {
    // Requested model not available, try any available model
    for (const model of availableModels) {
      try {
        console.log(`Requested model ${request.model} not available, trying ${model}`)
        
        const fallbackRequest = { ...request, model }
        let result: PromptResponse
        
        switch (model) {
          case 'gemini':
            result = await callGemini(fallbackRequest)
            break
          case 'groq':
            result = await callGroq(fallbackRequest)
            break
          case 'openrouter':
            result = await callOpenRouter(fallbackRequest)
            break
          default:
            continue
        }
        
        // Mark as fallback response
        result.fallbackUsed = true
        result.fallbackReason = `Requested model ${request.model} not available, used ${model} instead`
        
        console.log(`Successfully used ${model} as alternative`)
        return result
        
      } catch (error) {
        console.warn(`Model ${model} failed:`, error)
        continue
      }
    }
    
    throw new Error(`All available models failed. Available models: ${availableModels.join(', ')}`)
  }
}

// Get model status for debugging
export function getModelStatus() {
  return {
    gemini: !!gemini,
    groq: !!groq,
    openrouter: !!openRouter,
    availableModels: getAvailableModels(),
    hasOpenRouterKey,
    envVars: {
      GEMINI_API_KEY: !!process.env.GEMINI_API_KEY,
      GROQ_API_KEY: !!process.env.GROQ_API_KEY,
      OPENROUTER_API_KEY: !!process.env.OPENROUTER_API_KEY,
      OpenAI_Key: !!process.env.OpenAI_Key,
    }
  }
}