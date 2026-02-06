export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          plan: 'free' | 'pro' | 'enterprise'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          plan?: 'free' | 'pro' | 'enterprise'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          plan?: 'free' | 'pro' | 'enterprise'
          created_at?: string
          updated_at?: string
        }
      }
      bots: {
        Row: {
          id: string
          user_id: string
          name: string
          ai_model: 'claude' | 'gpt' | 'gemini'
          channel: 'telegram' | 'discord' | 'whatsapp'
          channel_config: Json | null
          system_prompt: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          ai_model: 'claude' | 'gpt' | 'gemini'
          channel: 'telegram' | 'discord' | 'whatsapp'
          channel_config?: Json | null
          system_prompt?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          ai_model?: 'claude' | 'gpt' | 'gemini'
          channel?: 'telegram' | 'discord' | 'whatsapp'
          channel_config?: Json | null
          system_prompt?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          bot_id: string
          user_message: string | null
          bot_response: string | null
          tokens_used: number | null
          created_at: string
        }
        Insert: {
          id?: string
          bot_id: string
          user_message?: string | null
          bot_response?: string | null
          tokens_used?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          bot_id?: string
          user_message?: string | null
          bot_response?: string | null
          tokens_used?: number | null
          created_at?: string
        }
      }
    }
  }
}
