'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import SignOutButton from '@/components/auth/SignOutButton'

interface SidebarProps {
  userEmail?: string
  userPlan?: string
}

const navItems = [
  { href: '/dashboard', icon: '📊', label: 'Dashboard' },
  { href: '/dashboard/bots', icon: '🤖', label: 'My Bots' },
  { href: '/dashboard/bots/new', icon: '➕', label: 'Create Bot' },
  { href: '/dashboard/settings', icon: '⚙️', label: 'Settings' },
]

export default function Sidebar({ userEmail, userPlan = 'Free' }: SidebarProps) {
  const pathname = usePathname()

  return (
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
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href))

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition',
                    isActive
                      ? 'bg-[var(--color-primary)] bg-opacity-20 text-white'
                      : 'text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-surface)]'
                  )}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-[var(--glass-border)]">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white font-semibold">
            {userEmail?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{userEmail || 'User'}</p>
            <p className="text-xs text-[var(--color-text-muted)]">{userPlan} Plan</p>
          </div>
        </div>
        <SignOutButton className="w-full mt-2 px-4 py-2 text-sm text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-surface)] rounded-lg transition text-left" />
      </div>
    </aside>
  )
}
