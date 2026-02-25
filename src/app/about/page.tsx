import Link from 'next/link'

export const metadata = {
  title: 'About - MoltBotSupport',
  description: 'Learn about MoltBotSupport and our mission to transform customer support with AI.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text">
            MoltBotSupport
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-[var(--color-text-muted)] hover:text-white transition">Features</Link>
            <Link href="/#pricing" className="text-[var(--color-text-muted)] hover:text-white transition">Pricing</Link>
            <Link href="/blog" className="text-[var(--color-text-muted)] hover:text-white transition">Blog</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/signin" className="btn-secondary">Sign In</Link>
            <Link href="/order" className="btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About MoltBotSupport</h1>
          <p className="text-xl text-[var(--color-text-muted)] mb-12 leading-relaxed">
            We&apos;re on a mission to make world-class customer support accessible to every business through the power of AI.
          </p>

          <div className="space-y-12 text-[var(--color-text-muted)] leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Our Story</h2>
              <p className="mb-4">
                MoltBotSupport was founded with a simple observation: small and medium businesses deserve the same quality of customer support that enterprise companies enjoy, but without the massive teams and budgets.
              </p>
              <p>
                By leveraging the latest advancements in AI from Anthropic, OpenAI, and Google, we&apos;ve created a platform that lets any business deploy intelligent support bots in under 24 hours.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">What We Do</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <h3 className="font-semibold text-white mb-2">Custom AI Bots</h3>
                  <p className="text-sm">We build tailored AI chatbots that match your brand voice and understand your specific business domain.</p>
                </div>
                <div className="glass-card p-6">
                  <h3 className="font-semibold text-white mb-2">Multi-Platform</h3>
                  <p className="text-sm">Deploy across Telegram, Discord, and WhatsApp from a single dashboard.</p>
                </div>
                <div className="glass-card p-6">
                  <h3 className="font-semibold text-white mb-2">24/7 Support</h3>
                  <p className="text-sm">Your bot never sleeps. Provide instant responses to customers around the clock.</p>
                </div>
                <div className="glass-card p-6">
                  <h3 className="font-semibold text-white mb-2">Analytics</h3>
                  <p className="text-sm">Track performance, measure satisfaction, and continuously improve your bot.</p>
                </div>
              </div>
            </section>

            <section className="glass-card p-8 text-center">
              <h2 className="text-2xl font-semibold text-white mb-4">Ready to get started?</h2>
              <p className="mb-6">Join businesses using MoltBotSupport to deliver exceptional customer support.</p>
              <Link href="/order" className="btn-primary inline-block">Get Your Bot Now</Link>
            </section>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto text-center text-sm text-[var(--color-text-muted)]">
          &copy; {new Date().getFullYear()} MoltBotSupport. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
