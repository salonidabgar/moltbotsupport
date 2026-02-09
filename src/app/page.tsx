import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text">
            MoltBotSupport
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-[var(--color-text-muted)] hover:text-white transition">
              Features
            </Link>
            <Link href="#pricing" className="text-[var(--color-text-muted)] hover:text-white transition">
              Pricing
            </Link>
            <Link href="/blog" className="text-[var(--color-text-muted)] hover:text-white transition">
              Blog
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/signin" className="btn-secondary">
              Sign In
            </Link>
            <Link href="/signup" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[var(--color-primary)] rounded-full blur-[128px] opacity-20 animate-pulse-glow" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[var(--color-secondary)] rounded-full blur-[128px] opacity-20 animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            AI Support Bots
            <br />
            <span className="gradient-text">Made Simple</span>
          </h1>
          <p className="text-xl text-[var(--color-text-muted)] mb-10 max-w-2xl mx-auto">
            Create intelligent customer support bots powered by Claude, GPT, and Gemini.
            Deploy to Telegram, Discord, and WhatsApp in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order" className="btn-primary text-lg px-8 py-4">
              Get Your Bot — $99/mo
            </Link>
            <Link href="#features" className="btn-secondary text-lg px-8 py-4">
              Learn More
            </Link>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-40 left-10 w-20 h-20 glass-card flex items-center justify-center animate-float">
          <span className="text-3xl">🤖</span>
        </div>
        <div className="absolute top-60 right-10 w-16 h-16 glass-card flex items-center justify-center animate-float-delayed">
          <span className="text-2xl">💬</span>
        </div>
        <div className="absolute bottom-20 left-1/4 w-14 h-14 glass-card flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
          <span className="text-xl">⚡</span>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Everything You Need
          </h2>
          <p className="text-[var(--color-text-muted)] text-center mb-16 max-w-2xl mx-auto">
            Build, deploy, and manage AI-powered bots with our comprehensive platform
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-8 hover:scale-105 transition-transform">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center mb-6">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Multiple AI Models</h3>
              <p className="text-[var(--color-text-muted)]">
                Choose from Claude, GPT-4, or Gemini to power your bots with cutting-edge AI capabilities.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-8 hover:scale-105 transition-transform">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] flex items-center justify-center mb-6">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Multi-Platform</h3>
              <p className="text-[var(--color-text-muted)]">
                Deploy to Telegram, Discord, and WhatsApp with a single click. Reach customers everywhere.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-8 hover:scale-105 transition-transform">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-accent)] flex items-center justify-center mb-6">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Analytics</h3>
              <p className="text-[var(--color-text-muted)]">
                Track conversations, measure satisfaction, and optimize your bots with detailed insights.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-card p-8 hover:scale-105 transition-transform">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center mb-6">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Custom Personas</h3>
              <p className="text-[var(--color-text-muted)]">
                Define unique personalities and knowledge bases for each bot to match your brand voice.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="glass-card p-8 hover:scale-105 transition-transform">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)] flex items-center justify-center mb-6">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Enterprise Security</h3>
              <p className="text-[var(--color-text-muted)]">
                SOC 2 compliant with end-to-end encryption. Your data stays private and secure.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="glass-card p-8 hover:scale-105 transition-transform">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] flex items-center justify-center mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Setup</h3>
              <p className="text-[var(--color-text-muted)]">
                Go from zero to deployed in under 5 minutes. No coding required for basic setups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Models Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-surface)] to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-4">
            Powered by the Best AI
          </h2>
          <p className="text-[var(--color-text-muted)] text-center mb-16 max-w-2xl mx-auto">
            Choose the AI model that best fits your use case
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#CC785C] flex items-center justify-center">
                <span className="text-4xl font-bold text-white">A</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Claude</h3>
              <p className="text-[var(--color-text-muted)] mb-4">by Anthropic</p>
              <p className="text-sm text-[var(--color-text-muted)]">
                Best for nuanced conversations and complex reasoning tasks.
              </p>
            </div>

            <div className="glass-card p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#10A37F] flex items-center justify-center">
                <span className="text-4xl font-bold text-white">G</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">GPT-4</h3>
              <p className="text-[var(--color-text-muted)] mb-4">by OpenAI</p>
              <p className="text-sm text-[var(--color-text-muted)]">
                Versatile and powerful for a wide range of support scenarios.
              </p>
            </div>

            <div className="glass-card p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#4285F4] flex items-center justify-center">
                <span className="text-4xl font-bold text-white">G</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Gemini</h3>
              <p className="text-[var(--color-text-muted)] mb-4">by Google</p>
              <p className="text-sm text-[var(--color-text-muted)]">
                Excellent for multimodal interactions and search integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-[var(--color-text-muted)] text-center mb-16 max-w-2xl mx-auto">
            One plan. Everything included. No surprises.
          </p>

          <div className="max-w-md mx-auto">
            <div className="glass-card p-10 border-2 border-[var(--color-primary)] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-primary)] text-white text-sm px-4 py-1 rounded-full">
                All-Inclusive
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Custom AI Bot</h3>
              <p className="text-[var(--color-text-muted)] text-center mb-6">Everything you need to get started</p>
              <p className="text-5xl font-bold mb-8 text-center">$99<span className="text-lg font-normal text-[var(--color-text-muted)]">/mo</span></p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-[var(--color-text-muted)]">
                  <span className="text-green-400 text-lg">&#10003;</span> 1 Custom AI Bot
                </li>
                <li className="flex items-center gap-3 text-[var(--color-text-muted)]">
                  <span className="text-green-400 text-lg">&#10003;</span> 10,000 messages/month
                </li>
                <li className="flex items-center gap-3 text-[var(--color-text-muted)]">
                  <span className="text-green-400 text-lg">&#10003;</span> Any platform (Telegram, Discord, WhatsApp)
                </li>
                <li className="flex items-center gap-3 text-[var(--color-text-muted)]">
                  <span className="text-green-400 text-lg">&#10003;</span> Choose your AI (Claude, GPT-4, Gemini)
                </li>
                <li className="flex items-center gap-3 text-[var(--color-text-muted)]">
                  <span className="text-green-400 text-lg">&#10003;</span> Setup within 24 hours
                </li>
                <li className="flex items-center gap-3 text-[var(--color-text-muted)]">
                  <span className="text-green-400 text-lg">&#10003;</span> Priority support
                </li>
              </ul>
              <Link href="/order" className="btn-primary w-full block text-center text-lg py-4">
                Get Your Bot Now
              </Link>
              <p className="text-center text-xs text-[var(--color-text-muted)] mt-4">
                No sign-up required. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto glass-card p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] opacity-10" />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Support?
            </h2>
            <p className="text-[var(--color-text-muted)] mb-8 max-w-xl mx-auto">
              Join thousands of businesses using MoltBotSupport to deliver exceptional customer experiences.
            </p>
            <Link href="/order" className="btn-primary text-lg px-10 py-4 inline-block">
              Get Your Bot — $99/mo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold gradient-text mb-4">MoltBotSupport</h4>
              <p className="text-[var(--color-text-muted)] text-sm">
                AI-powered customer support bots for the modern business.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li><Link href="#features" className="hover:text-white transition">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li><Link href="/privacy" className="hover:text-white transition">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[var(--glass-border)] text-center text-sm text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} MoltBotSupport. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
