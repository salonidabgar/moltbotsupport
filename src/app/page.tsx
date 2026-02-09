import Link from 'next/link'

function BrainIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7Z" />
      <path d="M10 21h4" />
      <path d="M9 10h.01" />
      <path d="M15 10h.01" />
      <path d="M12 10v3" />
    </svg>
  )
}

function DevicesIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 7h3v3H7z" />
      <path d="M14 7h3" />
      <path d="M14 10h3" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M7 16l4-8 4 4 5-9" />
    </svg>
  )
}

function PaletteIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.93 0 3.5-1.57 3.5-3.5 0-.88-.33-1.68-.87-2.29a.49.49 0 0 1 .37-.83H17c2.76 0 5-2.24 5-5C22 5.92 17.52 2 12 2Z" />
      <circle cx="7.5" cy="11.5" r="1.5" />
      <circle cx="12" cy="7.5" r="1.5" />
      <circle cx="16.5" cy="11.5" r="1.5" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7L12 2Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 7" />
    </svg>
  )
}

const features = [
  {
    icon: <BrainIcon />,
    title: 'Multiple AI Models',
    description: 'Choose from Claude, GPT-4, or Gemini to power your bots with cutting-edge AI capabilities.',
    gradient: 'from-indigo-500/20 to-violet-500/20',
    borderGlow: 'group-hover:shadow-indigo-500/10',
  },
  {
    icon: <DevicesIcon />,
    title: 'Multi-Platform',
    description: 'Deploy to Telegram, Discord, and WhatsApp with a single click. Reach customers everywhere.',
    gradient: 'from-cyan-500/20 to-indigo-500/20',
    borderGlow: 'group-hover:shadow-cyan-500/10',
  },
  {
    icon: <ChartIcon />,
    title: 'Real-time Analytics',
    description: 'Track conversations, measure satisfaction, and optimize your bots with detailed insights.',
    gradient: 'from-violet-500/20 to-cyan-500/20',
    borderGlow: 'group-hover:shadow-violet-500/10',
  },
  {
    icon: <PaletteIcon />,
    title: 'Custom Personas',
    description: 'Define unique personalities and knowledge bases for each bot to match your brand voice.',
    gradient: 'from-indigo-500/20 to-cyan-500/20',
    borderGlow: 'group-hover:shadow-indigo-500/10',
  },
  {
    icon: <ShieldIcon />,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with end-to-end encryption. Your data stays private and secure.',
    gradient: 'from-violet-500/20 to-indigo-500/20',
    borderGlow: 'group-hover:shadow-violet-500/10',
  },
  {
    icon: <BoltIcon />,
    title: 'Instant Setup',
    description: 'Go from zero to deployed in under 5 minutes. No coding required for basic setups.',
    gradient: 'from-cyan-500/20 to-violet-500/20',
    borderGlow: 'group-hover:shadow-cyan-500/10',
  },
]

const pricingFeatures = [
  '1 Custom AI Bot',
  '10,000 messages/month',
  'Any platform (Telegram, Discord, WhatsApp)',
  'Choose your AI (Claude, GPT-4, Gemini)',
  'Setup within 24 hours',
  'Priority support',
]

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text tracking-tight">
            MoltBotSupport
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-[var(--color-text-muted)] hover:text-white transition-colors duration-300">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-[var(--color-text-muted)] hover:text-white transition-colors duration-300">
              Pricing
            </Link>
            <Link href="/blog" className="text-sm text-[var(--color-text-muted)] hover:text-white transition-colors duration-300">
              Blog
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/signin" className="btn-secondary text-sm">
              Sign In
            </Link>
            <Link href="/order" className="btn-primary text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[var(--color-primary)] rounded-full blur-[160px] opacity-[0.12]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--color-secondary)] rounded-full blur-[140px] opacity-[0.08]" />

        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-up">
          <p className="section-label mb-6">AI-Powered Customer Support</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
            Support Bots That
            <br />
            <span className="gradient-text">Actually Work</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-muted)] mb-12 max-w-2xl mx-auto leading-relaxed">
            Deploy intelligent support agents powered by the world&apos;s best AI models.
            Telegram, Discord, WhatsApp &mdash; one bot, every channel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order" className="btn-primary text-base px-8 py-4 inline-flex items-center justify-center gap-2">
              Get Your Bot Now
              <ArrowRightIcon />
            </Link>
            <Link href="#features" className="btn-secondary text-base px-8 py-4">
              See How It Works
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-[var(--color-text-muted)]">
            <span className="flex items-center gap-2 opacity-60">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              No credit card required
            </span>
            <span className="flex items-center gap-2 opacity-60">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Setup in 24 hours
            </span>
            <span className="flex items-center gap-2 opacity-60">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Cancel anytime
            </span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label mb-4">Capabilities</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Everything You Need
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
              Build, deploy, and manage AI-powered bots with a comprehensive platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group glass-card p-8 transition-all duration-500 hover:-translate-y-1"
              >
                <div className={`feature-icon bg-gradient-to-br ${feature.gradient}`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Models Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-surface)]/50 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="section-label mb-4">AI Models</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Powered by the Best
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
              Choose the AI model that best fits your use case
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass-card p-8 text-center group transition-all duration-500 hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#CC785C]/10 border border-[#CC785C]/20 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#CC785C]/20">
                <span className="text-2xl font-bold text-[#CC785C]">A</span>
              </div>
              <h3 className="text-xl font-bold mb-1 tracking-tight">Claude</h3>
              <p className="text-xs text-[var(--color-text-muted)] mb-4 uppercase tracking-widest">Anthropic</p>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                Best for nuanced conversations and complex reasoning tasks.
              </p>
            </div>

            <div className="glass-card p-8 text-center group transition-all duration-500 hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#10A37F]/10 border border-[#10A37F]/20 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#10A37F]/20">
                <span className="text-2xl font-bold text-[#10A37F]">G</span>
              </div>
              <h3 className="text-xl font-bold mb-1 tracking-tight">GPT-4</h3>
              <p className="text-xs text-[var(--color-text-muted)] mb-4 uppercase tracking-widest">OpenAI</p>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                Versatile and powerful for a wide range of support scenarios.
              </p>
            </div>

            <div className="glass-card p-8 text-center group transition-all duration-500 hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#4285F4]/10 border border-[#4285F4]/20 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#4285F4]/20">
                <span className="text-2xl font-bold text-[#4285F4]">G</span>
              </div>
              <h3 className="text-xl font-bold mb-1 tracking-tight">Gemini</h3>
              <p className="text-xs text-[var(--color-text-muted)] mb-4 uppercase tracking-widest">Google</p>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                Excellent for multimodal interactions and search integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label mb-4">Pricing</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Simple, Transparent
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
              One plan. Everything included. No surprises.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="glass-card p-10 relative overflow-hidden">
              {/* Subtle top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent" />

              <div className="text-center mb-8">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-3 py-1 rounded-full mb-4">
                  All-Inclusive
                </span>
                <h3 className="text-lg font-semibold mb-1">Custom AI Bot</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-6">Everything you need to get started</p>
                <p className="text-5xl font-bold tracking-tight">
                  $99<span className="text-lg font-normal text-[var(--color-text-muted)]">/mo</span>
                </p>
              </div>

              <div className="space-y-3 mb-10">
                {pricingFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <span className="text-green-400 flex-shrink-0"><CheckIcon /></span>
                    <span className="text-sm text-[var(--color-text-muted)]">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/order" className="btn-primary w-full block text-center text-base py-4">
                Get Your Bot Now
              </Link>
              <p className="text-center text-xs text-[var(--color-text-muted)] mt-4 opacity-60">
                No sign-up required. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto glass-card p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5" />
          <div className="relative z-10">
            <p className="section-label mb-4">Get Started</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Ready to Transform Your Support?
            </h2>
            <p className="text-[var(--color-text-muted)] mb-10 max-w-lg mx-auto">
              Join businesses using MoltBotSupport to deliver exceptional customer experiences.
            </p>
            <Link href="/order" className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2">
              Get Your Bot Now
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold gradient-text mb-4 tracking-tight">MoltBotSupport</h4>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                AI-powered customer support bots for the modern business.
              </p>
            </div>
            <div>
              <h5 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">Product</h5>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li><Link href="#features" className="hover:text-white transition-colors duration-300">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors duration-300">Pricing</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors duration-300">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li><Link href="/about" className="hover:text-white transition-colors duration-300">About</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors duration-300">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors duration-300">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">Legal</h5>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li><Link href="/privacy" className="hover:text-white transition-colors duration-300">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors duration-300">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[var(--glass-border)] text-center text-xs text-[var(--color-text-muted)] opacity-60">
            &copy; {new Date().getFullYear()} MoltBotSupport. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
