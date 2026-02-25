import Link from 'next/link'

export const metadata = {
  title: 'Contact - MoltBotSupport',
  description: 'Get in touch with the MoltBotSupport team.',
}

export default function ContactPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-[var(--color-text-muted)] mb-12">
            Have a question or need help? We&apos;d love to hear from you.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="glass-card p-8">
              <h3 className="text-lg font-semibold text-white mb-2">General Inquiries</h3>
              <p className="text-[var(--color-text-muted)] text-sm mb-4">For general questions about our products and services.</p>
              <a href="mailto:hello@moltbotsupport.com" className="text-[var(--color-primary)] hover:underline">hello@moltbotsupport.com</a>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-lg font-semibold text-white mb-2">Technical Support</h3>
              <p className="text-[var(--color-text-muted)] text-sm mb-4">Need help with your bot or account?</p>
              <a href="mailto:support@moltbotsupport.com" className="text-[var(--color-primary)] hover:underline">support@moltbotsupport.com</a>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-lg font-semibold text-white mb-2">Sales</h3>
              <p className="text-[var(--color-text-muted)] text-sm mb-4">Interested in custom plans or enterprise solutions?</p>
              <a href="mailto:sales@moltbotsupport.com" className="text-[var(--color-primary)] hover:underline">sales@moltbotsupport.com</a>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-lg font-semibold text-white mb-2">Partnerships</h3>
              <p className="text-[var(--color-text-muted)] text-sm mb-4">Want to partner with us or explore integrations?</p>
              <a href="mailto:partners@moltbotsupport.com" className="text-[var(--color-primary)] hover:underline">partners@moltbotsupport.com</a>
            </div>
          </div>

          <div className="glass-card p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-3">Prefer to order directly?</h3>
            <p className="text-[var(--color-text-muted)] mb-6">Get your custom AI bot set up within 24 hours.</p>
            <Link href="/order" className="btn-primary inline-block">Order Your Bot</Link>
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
