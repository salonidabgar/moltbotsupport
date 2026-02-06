import { createClient } from '@/lib/supabase/server'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-[var(--color-text-muted)]">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Section */}
      <section className="glass-card p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="input bg-[var(--color-surface)] opacity-70 cursor-not-allowed"
            />
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Email cannot be changed
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input"
            />
          </div>
        </div>
        <button className="btn-primary mt-6">
          Save Changes
        </button>
      </section>

      {/* Plan Section */}
      <section className="glass-card p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
        <div className="flex items-center justify-between p-4 bg-[var(--color-surface)] rounded-xl">
          <div>
            <p className="font-semibold">Free Plan</p>
            <p className="text-sm text-[var(--color-text-muted)]">1 bot, 100 messages/month</p>
          </div>
          <button className="btn-primary">
            Upgrade to Pro
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Usage This Month</h3>
          <div className="w-full bg-[var(--color-surface)] rounded-full h-2">
            <div className="bg-[var(--color-primary)] h-2 rounded-full" style={{ width: '0%' }} />
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">0 / 100 messages used</p>
        </div>
      </section>

      {/* API Keys Section */}
      <section className="glass-card p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">API Keys</h2>
        <p className="text-[var(--color-text-muted)] mb-4">
          Add your own API keys to use premium AI models
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">
              OpenAI API Key
            </label>
            <input
              type="password"
              placeholder="sk-..."
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">
              Anthropic API Key
            </label>
            <input
              type="password"
              placeholder="sk-ant-..."
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">
              Google AI API Key
            </label>
            <input
              type="password"
              placeholder="AIza..."
              className="input"
            />
          </div>
        </div>
        <button className="btn-primary mt-6">
          Save API Keys
        </button>
      </section>

      {/* Danger Zone */}
      <section className="glass-card p-6 border-2 border-red-500 border-opacity-30">
        <h2 className="text-xl font-semibold mb-4 text-red-400">Danger Zone</h2>
        <p className="text-[var(--color-text-muted)] mb-4">
          Permanently delete your account and all associated data
        </p>
        <button className="px-6 py-3 bg-red-500 bg-opacity-20 text-red-400 border border-red-500 border-opacity-50 rounded-xl hover:bg-opacity-30 transition">
          Delete Account
        </button>
      </section>
    </div>
  )
}
