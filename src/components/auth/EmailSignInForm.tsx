'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getURL } from '@/lib/utils'

interface EmailSignInFormProps {
  mode: 'signin' | 'signup'
  redirectTo?: string
}

export default function EmailSignInForm({ mode, redirectTo }: EmailSignInFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setMessage(null)

    const supabase = createClient()

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${getURL()}api/auth/callback${redirectTo ? `?next=${redirectTo}` : ''}`,
        },
      })

      if (error) {
        setError(error.message)
      } else {
        setMessage('Check your email for the confirmation link!')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else {
        // Redirect will be handled by middleware
        window.location.href = redirectTo || '/dashboard'
      }
    }

    setIsLoading(false)
  }

  const handleMagicLink = async () => {
    if (!email) {
      setError('Please enter your email address')
      return
    }

    setIsLoading(true)
    setError(null)
    setMessage(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${getURL()}api/auth/callback${redirectTo ? `?next=${redirectTo}` : ''}`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Check your email for the magic link!')
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-4 rounded-lg bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 text-red-400 text-sm">
          {error}
        </div>
      )}

      {message && (
        <div className="p-4 rounded-lg bg-green-500 bg-opacity-10 border border-green-500 border-opacity-30 text-green-400 text-sm">
          {message}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="input"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          minLength={8}
          className="input"
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary py-4 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {mode === 'signup' ? 'Creating account...' : 'Signing in...'}
          </span>
        ) : (
          mode === 'signup' ? 'Create Account' : 'Sign In'
        )}
      </button>

      {mode === 'signin' && (
        <button
          type="button"
          onClick={handleMagicLink}
          disabled={isLoading}
          className="w-full btn-secondary py-3 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Send Magic Link
        </button>
      )}
    </form>
  )
}
