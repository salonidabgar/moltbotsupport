import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
        </h1>
        <p className="text-[var(--color-text-muted)]">
          Here&apos;s an overview of your AI support bots
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl">🤖</span>
            <span className="text-xs px-2 py-1 rounded-full bg-green-500 bg-opacity-20 text-green-400">Active</span>
          </div>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-[var(--color-text-muted)]">Total Bots</p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl">💬</span>
            <span className="text-xs px-2 py-1 rounded-full bg-blue-500 bg-opacity-20 text-blue-400">This Month</span>
          </div>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-[var(--color-text-muted)]">Messages</p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl">👥</span>
            <span className="text-xs px-2 py-1 rounded-full bg-purple-500 bg-opacity-20 text-purple-400">Unique</span>
          </div>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-[var(--color-text-muted)]">Users Served</p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl">📊</span>
            <span className="text-xs px-2 py-1 rounded-full bg-yellow-500 bg-opacity-20 text-yellow-400">Avg</span>
          </div>
          <p className="text-3xl font-bold">--</p>
          <p className="text-sm text-[var(--color-text-muted)]">Satisfaction</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/dashboard/bots/new" className="glass-card p-6 hover:scale-[1.02] transition-transform group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">➕</span>
            </div>
            <h3 className="font-semibold mb-2">Create New Bot</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Set up a new AI-powered support bot in minutes
            </p>
          </Link>

          <Link href="/dashboard/bots" className="glass-card p-6 hover:scale-[1.02] transition-transform group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🔧</span>
            </div>
            <h3 className="font-semibold mb-2">Manage Bots</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Configure and monitor your existing bots
            </p>
          </Link>

          <Link href="/dashboard/settings" className="glass-card p-6 hover:scale-[1.02] transition-transform group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-accent)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">⚙️</span>
            </div>
            <h3 className="font-semibold mb-2">Account Settings</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Manage your account and billing
            </p>
          </Link>
        </div>
      </div>

      {/* Empty State */}
      <div className="glass-card p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[var(--color-surface)] flex items-center justify-center">
          <span className="text-4xl">🤖</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">No bots yet</h2>
        <p className="text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
          Create your first AI support bot and start providing instant, intelligent customer support.
        </p>
        <Link href="/dashboard/bots/new" className="btn-primary inline-block">
          Create Your First Bot
        </Link>
      </div>
    </div>
  )
}
