'use client'

import Link from 'next/link'
import type { Bot } from '@/types'

interface BotCardProps {
  bot: Bot
}

const modelColors: Record<string, string> = {
  claude: '#CC785C',
  gpt: '#10A37F',
  gemini: '#4285F4',
}

const channelIcons: Record<string, string> = {
  telegram: '📱',
  discord: '🎮',
  whatsapp: '💬',
}

export default function BotCard({ bot }: BotCardProps) {
  return (
    <Link href={`/dashboard/bots/${bot.id}`}>
      <div className="glass-card p-6 hover:scale-[1.02] transition-transform cursor-pointer">
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl"
            style={{
              background: `linear-gradient(135deg, ${modelColors[bot.ai_model] || '#6366f1'} 0%, #8b5cf6 100%)`,
            }}
          >
            {channelIcons[bot.channel] || '🤖'}
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              bot.is_active
                ? 'bg-green-500 bg-opacity-20 text-green-400'
                : 'bg-gray-500 bg-opacity-20 text-gray-400'
            }`}
          >
            {bot.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>

        <h3 className="font-semibold mb-2 truncate">{bot.name}</h3>

        <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <span className="capitalize">{bot.ai_model}</span>
          <span>•</span>
          <span className="capitalize">{bot.channel}</span>
        </div>

        {bot.system_prompt && (
          <p className="mt-3 text-xs text-[var(--color-text-muted)] line-clamp-2">
            {bot.system_prompt}
          </p>
        )}
      </div>
    </Link>
  )
}
