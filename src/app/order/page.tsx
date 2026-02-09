'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

type FormData = {
  name: string
  email: string
  phone: string
  use_case: string
  ai_model: 'claude' | 'gpt' | 'gemini'
  platform: 'telegram' | 'discord' | 'whatsapp'
  notes: string
}

function CheckCircleIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

function CreditCardIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-primary)]">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <path d="M1 10h22" />
      <path d="M5 15h4" />
      <path d="M13 15h2" />
    </svg>
  )
}

function ArrowLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 7" />
    </svg>
  )
}

export default function OrderPage() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    use_case: 'customer_support',
    ai_model: 'claude',
    platform: 'telegram',
    notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [paid, setPaid] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit order')

      setOrderId(data.order_id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // Step 3: Payment success
  if (paid) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="glass-card p-12 max-w-lg w-full text-center relative overflow-hidden animate-fade-in-up">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent" />
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
            <CheckCircleIcon />
          </div>
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Payment Successful</h2>
          <p className="text-[var(--color-text-muted)] mb-2">
            Thank you, <strong className="text-white">{form.name}</strong>.
          </p>
          <p className="text-[var(--color-text-muted)] mb-6">
            Our team will start building your {form.platform} bot powered by{' '}
            {form.ai_model === 'claude' ? 'Claude' : form.ai_model === 'gpt' ? 'GPT-4' : 'Gemini'}.
          </p>
          <p className="text-[var(--color-text-muted)] mb-8 text-sm">
            We&apos;ll reach out to <strong className="text-white">{form.email}</strong> within 24 hours.
          </p>
          <Link href="/" className="btn-primary inline-block px-8 py-3">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  // Step 2: PayPal payment (lead already saved)
  if (orderId) {
    return (
      <div className="min-h-screen">
        <nav className="fixed top-0 left-0 right-0 z-50 glass">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold gradient-text tracking-tight">
              MoltBotSupport
            </Link>
            <Link href="/" className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-white transition-colors duration-300 text-sm">
              <ArrowLeftIcon />
              Back to Home
            </Link>
          </div>
        </nav>

        <div className="pt-28 pb-20 px-6 flex items-center justify-center min-h-screen">
          <div className="glass-card p-10 max-w-md w-full text-center relative overflow-hidden animate-fade-in-up">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent" />
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center">
              <CreditCardIcon />
            </div>
            <h2 className="text-2xl font-bold mb-2 tracking-tight">Almost there!</h2>
            <p className="text-[var(--color-text-muted)] mb-8">
              Complete your payment to get started.
            </p>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="mb-6">
              <div className="flex justify-between text-sm mb-4 px-2">
                <span className="text-[var(--color-text-muted)]">Custom AI Bot (monthly)</span>
                <span className="font-semibold">$99.00</span>
              </div>
              <div className="border-t border-[var(--glass-border)] pt-4 flex justify-between px-2">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">$99.00</span>
              </div>
            </div>

            <PayPalScriptProvider
              options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
                currency: 'USD',
              }}
            >
              <PayPalButtons
                style={{
                  layout: 'vertical',
                  color: 'blue',
                  shape: 'rect',
                  label: 'pay',
                }}
                createOrder={async () => {
                  const res = await fetch('/api/paypal/create-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ order_id: orderId }),
                  })
                  const data = await res.json()
                  if (!res.ok) throw new Error(data.error)
                  return data.paypal_order_id
                }}
                onApprove={async (data) => {
                  setError('')
                  const res = await fetch('/api/paypal/capture-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      paypal_order_id: data.orderID,
                      order_id: orderId,
                    }),
                  })
                  if (res.ok) {
                    setPaid(true)
                  } else {
                    setError('Payment failed. Please try again.')
                  }
                }}
                onError={() => {
                  setError('Something went wrong with PayPal. Please try again.')
                }}
              />
            </PayPalScriptProvider>

            <p className="text-center text-xs text-[var(--color-text-muted)] mt-6 opacity-60">
              Secure payment via PayPal. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Step 1: Lead capture form
  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text tracking-tight">
            MoltBotSupport
          </Link>
          <Link href="/" className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-white transition-colors duration-300 text-sm">
            <ArrowLeftIcon />
            Back to Home
          </Link>
        </div>
      </nav>

      <section className="pt-28 pb-8 px-6 relative overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[var(--color-primary)] rounded-full blur-[128px] opacity-[0.12]" />
        <div className="max-w-3xl mx-auto text-center relative z-10 animate-fade-in-up">
          <p className="section-label mb-4">Order Your Bot</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Get Your Custom AI Bot &mdash; <span className="gradient-text">$99/mo</span>
          </h1>
          <div className="flex flex-wrap justify-center gap-6 text-[var(--color-text-muted)] text-sm">
            <span className="flex items-center gap-2">
              <span className="text-green-400"><CheckIcon /></span> 1 Custom Bot
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-400"><CheckIcon /></span> 10,000 messages/month
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-400"><CheckIcon /></span> Any Platform
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-400"><CheckIcon /></span> Setup in 24 hours
            </span>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto glass-card p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent" />

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">Name *</label>
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
              <label htmlFor="email" className="block text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">Email *</label>
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

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">Phone *</label>
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
            <div>
              <label htmlFor="use_case" className="block text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">Bot Purpose *</label>
              <select
                id="use_case"
                name="use_case"
                required
                value={form.use_case}
                onChange={handleChange}
                className="input"
              >
                <option value="customer_support">Customer Support</option>
                <option value="faq">FAQ / Knowledge Base</option>
                <option value="lead_generation">Lead Generation</option>
                <option value="order_tracking">Order Tracking</option>
                <option value="appointment_booking">Appointment Booking</option>
                <option value="ecommerce">E-commerce Assistant</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="ai_model" className="block text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">AI Model *</label>
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
              <label htmlFor="platform" className="block text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">Platform *</label>
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

          <div className="mb-6">
            <label htmlFor="notes" className="block text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
              Additional Notes <span className="opacity-50">(optional)</span>
            </label>
            <input
              id="notes"
              name="notes"
              type="text"
              value={form.notes}
              onChange={handleChange}
              className="input"
              placeholder="E.g., multilingual, specific integrations, tone of voice..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              'Get My Bot'
            )}
          </button>

          <p className="text-center text-xs text-[var(--color-text-muted)] mt-4 opacity-60">
            We&apos;ll get back to you within 24 hours.
          </p>
        </form>
      </section>
    </div>
  )
}
