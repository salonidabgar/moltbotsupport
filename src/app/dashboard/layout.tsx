import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SignOutButton from '@/components/auth/SignOutButton'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/signin?redirectTo=/dashboard')
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-[var(--glass-border)] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[var(--glass-border)]">
          <Link href="/dashboard" className="text-xl font-bold gradient-text">
            MoltBotSupport
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-surface)] transition"
              >
                <span className="text-lg">📊</span>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/bots"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-surface)] transition"
              >
                <span className="text-lg">🤖</span>
                <span>My Bots</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/bots/new"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-surface)] transition"
              >
                <span className="text-lg">➕</span>
                <span>Create Bot</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-surface)] transition"
              >
                <span className="text-lg">⚙️</span>
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-[var(--glass-border)]">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white font-semibold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.email}</p>
              <p className="text-xs text-[var(--color-text-muted)]">Free Plan</p>
            </div>
          </div>
          <SignOutButton className="w-full mt-2 px-4 py-2 text-sm text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-surface)] rounded-lg transition text-left" />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
