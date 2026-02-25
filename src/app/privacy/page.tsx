import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy - MoltBotSupport',
  description: 'MoltBotSupport Privacy Policy',
}

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-12">Last updated: February 2026</p>

          <div className="space-y-8 text-[var(--color-text-muted)] leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
              <p className="mb-3">We collect information you provide directly to us, including:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Account information (name, email address)</li>
                <li>Bot configuration data and settings</li>
                <li>Payment and billing information</li>
                <li>Communications with our support team</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
              <p className="mb-3">We use collected information to:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Provide, maintain, and improve the Service</li>
                <li>Process transactions and send billing notifications</li>
                <li>Send technical notices and support messages</li>
                <li>Respond to your requests and inquiries</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Data Security</h2>
              <p>We implement industry-standard security measures to protect your data, including encryption in transit and at rest. We use Supabase for secure data storage with row-level security policies.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Third-Party Services</h2>
              <p>We integrate with third-party AI providers (Anthropic, OpenAI, Google) to power your bots. Each provider has their own privacy policy governing how they handle data processed through their APIs.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Data Retention</h2>
              <p>We retain your data for as long as your account is active. Upon account deletion, we will remove your personal data within 30 days, except where retention is required by law.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Access and export your data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Cookies</h2>
              <p>We use essential cookies for authentication and session management. We do not use third-party tracking cookies.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Contact</h2>
              <p>For privacy-related inquiries, contact us at <a href="mailto:privacy@moltbotsupport.com" className="text-[var(--color-primary)] hover:underline">privacy@moltbotsupport.com</a>.</p>
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
