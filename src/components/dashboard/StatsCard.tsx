'use client'

import { cn } from '@/lib/utils'

interface StatsCardProps {
  icon: string
  label: string
  value: string | number
  badge?: string
  badgeColor?: 'green' | 'blue' | 'purple' | 'yellow' | 'red'
  trend?: {
    value: number
    isPositive: boolean
  }
}

const badgeColors = {
  green: 'bg-green-500 bg-opacity-20 text-green-400',
  blue: 'bg-blue-500 bg-opacity-20 text-blue-400',
  purple: 'bg-purple-500 bg-opacity-20 text-purple-400',
  yellow: 'bg-yellow-500 bg-opacity-20 text-yellow-400',
  red: 'bg-red-500 bg-opacity-20 text-red-400',
}

export default function StatsCard({
  icon,
  label,
  value,
  badge,
  badgeColor = 'green',
  trend,
}: StatsCardProps) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        {badge && (
          <span className={cn('text-xs px-2 py-1 rounded-full', badgeColors[badgeColor])}>
            {badge}
          </span>
        )}
      </div>

      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-[var(--color-text-muted)]">{label}</p>

      {trend && (
        <div className="mt-2 flex items-center gap-1">
          <span className={trend.isPositive ? 'text-green-400' : 'text-red-400'}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">vs last month</span>
        </div>
      )}
    </div>
  )
}
