import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface UserProfile {
  id: string
  email: string
  role: 'developer' | 'marketer' | 'founder' | 'freelancer' | 'legal'
  purpose: 'product_dev' | 'legal' | 'technical_specs' | 'marketing'
  language: 'en' | 'es' | 'fr'
  created_at: string
  updated_at: string
}

export interface PromptHistory {
  id: string
  user_id: string
  prompt: string
  response: string
  model: 'gemini' | 'groq'
  tone: 'professional' | 'friendly' | 'creative'
  role: string
  agent_mode: boolean
  language: string
  created_at: string
}

// Database functions
export const createUserProfile = async (profile: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert([profile])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getUserProfile = async (email: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('email', email)
    .single()
  
  if (error) throw error
  return data
}

export const savePromptHistory = async (history: Omit<PromptHistory, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('prompt_history')
    .insert([history])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getPromptHistory = async (userId: string, limit = 10) => {
  const { data, error } = await supabase
    .from('prompt_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (error) throw error
  return data
}