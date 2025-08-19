import { GoogleGenerativeAI } from '@google/generative-ai'
import Groq from 'groq-sdk'
import { OpenRouterClient } from './openrouter'

// Initialize AI clients
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
})

// Initialize OpenRouter client
const openRouter = new OpenRouterClient({
  apiKey: process.env.OPENROUTER_API_KEY!,
  siteUrl: process.env.SITE_URL,
  siteName: 'Promptly',
  defaultModel: process.env.OPENROUTER_DEFAULT_MODEL || 'openai/gpt-4o',
})

export type AIModel = 'gemini' | 'groq' | 'openrouter'
export type ToneType = 'professional' | 'friendly' | 'creative'
export type RoleType = 'developer' | 'marketer' | 'founder' | 'freelancer' | 'legal'

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
  founder: 'You are assisting a startup founder. Focus on strategic thinking, business growth, and leadership insights.',
  freelancer: 'You are assisting a freelancer. Focus on client communication, project management, and professional services.',
  legal: 'You are assisting with legal matters. Focus on accuracy, compliance, and professional legal language. Note: This is not legal advice.'
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
  ko: '한국어로 답변해주세요.',
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

// Main AI function
export async function generatePromptResponse(request: PromptRequest): Promise<PromptResponse> {
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
}