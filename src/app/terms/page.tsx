import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service - MoltBotSupport',
  description: 'MoltBotSupport Terms of Service',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text">
            MoltBotSupport
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/signin" className="btn-secondary">Sign In</Link>
            <Link href="/order" className="btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      <article className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-12">Last updated: February 2026</p>

          <div className="space-y-8 text-[var(--color-text-muted)] leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using MoltBotSupport (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Description of Service</h2>
              <p>MoltBotSupport provides AI-powered customer support bot creation and management tools. The Service enables users to create, deploy, and manage chatbots across multiple platforms including Telegram, Discord, and WhatsApp.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. User Accounts</h2>
              <p>You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Subscription & Billing</h2>
              <p>The Service is offered at $99/month per bot. Subscriptions renew automatically unless cancelled. You may cancel your subscription at any time, and it will remain active until the end of the current billing period.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Acceptable Use</h2>
              <p>You agree not to use the Service to: send spam or unsolicited messages; distribute harmful or illegal content; attempt to reverse-engineer or compromise the Service; or violate any applicable laws or regulations.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Intellectual Property</h2>
              <p>You retain ownership of your bot configurations and content. MoltBotSupport retains ownership of the platform, technology, and all related intellectual property.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Limitation of Liability</h2>
              <p>MoltBotSupport is provided &quot;as is&quot; without warranties of any kind. We shall not be liable for any indirect, incidental, or consequential damages arising from the use of the Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Termination</h2>
              <p>We reserve the right to suspend or terminate your account if you violate these Terms. Upon termination, your right to use the Service ceases immediately.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">9. Contact</h2>
              <p>For questions about these Terms, please contact us at <a href="mailto:legal@moltbotsupport.com" className="text-[var(--color-primary)] hover:underline">legal@moltbotsupport.com</a>.</p>
            </section>
          </div>
        </div>
      </article>

      <footer className="py-12 px-6 border-t border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto text-center text-sm text-[var(--color-text-muted)]">
          &copy; {new Date().getFullYear()} MoltBotSupport. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
