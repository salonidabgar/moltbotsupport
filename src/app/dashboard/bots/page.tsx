import Link from 'next/link'

export default function BotsPage() {
  // TODO: Fetch bots from Supabase
  const bots: Array<{
    id: string
    name: string
    ai_model: string
    channel: string
    is_active: boolean
  }> = []

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Bots</h1>
          <p className="text-[var(--color-text-muted)]">
            Manage and monitor your AI support bots
          </p>
        </div>
        <Link href="/dashboard/bots/new" className="btn-primary">
          Create New Bot
        </Link>
      </div>

      {bots.length === 0 ? (
        /* Empty State */
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
      ) : (
        /* Bot Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bots.map((bot) => (
            <Link key={bot.id} href={`/dashboard/bots/${bot.id}`}>
              <div className="glass-card p-6 hover:scale-[1.02] transition-transform cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    bot.is_active
                      ? 'bg-green-500 bg-opacity-20 text-green-400'
                      : 'bg-gray-500 bg-opacity-20 text-gray-400'
                  }`}>
                    {bot.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <h3 className="font-semibold mb-2">{bot.name}</h3>
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                  <span>{bot.ai_model}</span>
                  <span>•</span>
                  <span>{bot.channel}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
