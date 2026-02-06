export type { Database, Json } from './database'

export type Profile = {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  plan: 'free' | 'pro' | 'enterprise'
  created_at: string
  updated_at: string
}

export type Bot = {
  id: string
  user_id: string
  name: string
  ai_model: 'claude' | 'gpt' | 'gemini'
  channel: 'telegram' | 'discord' | 'whatsapp'
  channel_config: Record<string, unknown> | null
  system_prompt: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export type Message = {
  id: string
  bot_id: string
  user_message: string | null
  bot_response: string | null
  tokens_used: number | null
  created_at: string
}

export type AIModel = 'claude' | 'gpt' | 'gemini'
export type Channel = 'telegram' | 'discord' | 'whatsapp'
export type Plan = 'free' | 'pro' | 'enterprise'
