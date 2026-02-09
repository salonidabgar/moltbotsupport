'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import Script from 'next/script'

type FormData = {
  name: string
  email: string
  phone: string
  bot_description: string
  ai_model: 'claude' | 'gpt' | 'gemini'
  platform: 'telegram' | 'discord' | 'whatsapp'
  special_requirements: string
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void }
  }
}

export default function OrderPage() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    bot_description: '',
    ai_model: 'claude',
    platform: 'telegram',
    special_requirements: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleRazorpayPayment = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // 1. Create order on backend
      const res = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, payment_method: 'razorpay' }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create order')

      // 2. Open Razorpay checkout
      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: 'MoltBotSupport',
        description: 'Custom AI Bot — $99/mo',
        order_id: data.razorpay_order_id,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: '#6366f1' },
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          // 3. Verify payment
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              order_id: data.order_id,
              payment_method: 'razorpay',
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })

          if (verifyRes.ok) {
            setSuccess(true)
          } else {
            setError('Payment verification failed. Please contact support.')
          }
          setLoading(false)
        },
        modal: {
          ondismiss: () => {
            setLoading(false)
          },
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center px-6">
        <div className="glass-card p-12 max-w-lg w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <span className="text-4xl">&#10003;</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
          <p className="text-[var(--color-text-muted)] mb-2">
            Thank you, <strong className="text-white">{form.name}</strong>!
          </p>
          <p className="text-[var(--color-text-muted)] mb-6">
            We&apos;ve received your order. Our team will start building your {form.platform} bot powered by{' '}
            {form.ai_model === 'claude' ? 'Claude' : form.ai_model === 'gpt' ? 'GPT-4' : 'Gemini'}.
          </p>
          <p className="text-[var(--color-text-muted)] mb-8 text-sm">
            A confirmation email has been sent to <strong className="text-white">{form.email}</strong>.
          </p>
          <Link href="/" className="btn-primary inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="min-h-screen bg-[var(--color-background)]">
        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold gradient-text">
              MoltBotSupport
            </Link>
            <Link href="/" className="text-[var(--color-text-muted)] hover:text-white transition text-sm">
              &larr; Back to Home
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="pt-28 pb-8 px-6 relative overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[var(--color-primary)] rounded-full blur-[128px] opacity-20 animate-pulse-glow" />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get Your Custom AI Bot — <span className="gradient-text">$99/mo</span>
            </h1>
            <div className="flex flex-wrap justify-center gap-4 text-[var(--color-text-muted)] text-sm">
              <span className="flex items-center gap-1">
                <span className="text-green-400">&#10003;</span> 1 Custom Bot
              </span>
              <span className="flex items-center gap-1">
                <span className="text-green-400">&#10003;</span> 10,000 messages/month
              </span>
              <span className="flex items-center gap-1">
                <span className="text-green-400">&#10003;</span> Any Platform
              </span>
              <span className="flex items-center gap-1">
                <span className="text-green-400">&#10003;</span> Setup in 24 hours
              </span>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="px-6 pb-20">
          <form onSubmit={handleRazorpayPayment} className="max-w-2xl mx-auto glass-card p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-6">Tell us about your bot</h2>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Name & Email */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-sm text-[var(--color-text-muted)] mb-2">Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="input"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-[var(--color-text-muted)] mb-2">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="input"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm text-[var(--color-text-muted)] mb-2">Phone *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange}
                className="input"
                placeholder="+91 98765 43210"
              />
            </div>

            {/* Bot Description */}
            <div className="mb-4">
              <label htmlFor="bot_description" className="block text-sm text-[var(--color-text-muted)] mb-2">Bot Description *</label>
              <textarea
                id="bot_description"
                name="bot_description"
                required
                rows={4}
                value={form.bot_description}
                onChange={handleChange}
                className="input resize-none"
                placeholder="Describe what your bot should do. E.g., 'Customer support bot for my e-commerce store that answers FAQ, tracks orders, and handles returns.'"
              />
            </div>

            {/* AI Model & Platform */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="ai_model" className="block text-sm text-[var(--color-text-muted)] mb-2">AI Model *</label>
                <select
                  id="ai_model"
                  name="ai_model"
                  required
                  value={form.ai_model}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="claude">Claude (Anthropic)</option>
                  <option value="gpt">GPT-4 (OpenAI)</option>
                  <option value="gemini">Gemini (Google)</option>
                </select>
              </div>
              <div>
                <label htmlFor="platform" className="block text-sm text-[var(--color-text-muted)] mb-2">Platform *</label>
                <select
                  id="platform"
                  name="platform"
                  required
                  value={form.platform}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="telegram">Telegram</option>
                  <option value="discord">Discord</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>
            </div>

            {/* Special Requirements */}
            <div className="mb-8">
              <label htmlFor="special_requirements" className="block text-sm text-[var(--color-text-muted)] mb-2">
                Special Requirements (optional)
              </label>
              <textarea
                id="special_requirements"
                name="special_requirements"
                rows={3}
                value={form.special_requirements}
                onChange={handleChange}
                className="input resize-none"
                placeholder="Any specific integrations, tone of voice, languages, etc."
              />
            </div>

            {/* Payment Buttons */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Pay $99 with Razorpay'
                )}
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={async () => {
                  // PayPal placeholder — opens the same flow with paypal method
                  setError('PayPal integration coming soon. Please use Razorpay.')
                }}
                className="btn-secondary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Pay $99 with PayPal
              </button>
            </div>

            <p className="text-center text-xs text-[var(--color-text-muted)] mt-4">
              Secure payment. Cancel anytime. Bot delivered within 24 hours.
            </p>
          </form>
        </section>
      </div>
    </>
  )
}
