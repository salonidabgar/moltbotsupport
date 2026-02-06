'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Bot } from '@/types'

export function useBots() {
  const [bots, setBots] = useState<Bot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchBots = async () => {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('bots')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        setError(error)
      } else {
        setBots(data as Bot[])
      }
      setLoading(false)
    }

    fetchBots()
  }, [])

  const createBot = async (bot: Omit<Bot, 'id' | 'created_at' | 'updated_at'>) => {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('bots')
      .insert(bot)
      .select()
      .single()

    if (error) throw error
    setBots(prev => [data as Bot, ...prev])
    return data
  }

  const updateBot = async (id: string, updates: Partial<Bot>) => {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('bots')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    setBots(prev => prev.map(b => b.id === id ? data as Bot : b))
    return data
  }

  const deleteBot = async (id: string) => {
    const supabase = createClient()

    const { error } = await supabase
      .from('bots')
      .delete()
      .eq('id', id)

    if (error) throw error
    setBots(prev => prev.filter(b => b.id !== id))
  }

  return { bots, loading, error, createBot, updateBot, deleteBot }
}
