import Link from 'next/link'
import { notFound } from 'next/navigation'

interface BotPageProps {
  params: Promise<{ id: string }>
}

export default async function BotPage({ params }: BotPageProps) {
  const { id } = await params

  // TODO: Fetch bot from Supabase
  // For now, show a placeholder
  const bot = null

  if (!bot) {
    notFound()
  }

  return (
    <div className="p-8">
      <Link href="/dashboard/bots" className="text-[var(--color-primary)] hover:underline text-sm mb-4 inline-block">
        ← Back to Bots
      </Link>
      <h1 className="text-3xl font-bold mb-2">Bot Details</h1>
      <p className="text-[var(--color-text-muted)]">Bot ID: {id}</p>
    </div>
  )
}
