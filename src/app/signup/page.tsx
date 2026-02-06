import Link from 'next/link'
import AuthBackground from '@/components/auth/AuthBackground'
import GoogleSignInButton from '@/components/auth/GoogleSignInButton'
import EmailSignInForm from '@/components/auth/EmailSignInForm'

interface SignUpPageProps {
  searchParams: Promise<{ redirectTo?: string; plan?: string }>
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { redirectTo, plan } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <AuthBackground />

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold gradient-text">MoltBotSupport</h1>
          </Link>
          <p className="text-[var(--color-text-muted)] mt-2">
            Create your account
          </p>
          {plan && (
            <p className="text-sm text-[var(--color-primary)] mt-1">
              {plan === 'pro' ? 'Pro Plan Selected' : 'Free Plan'}
            </p>
          )}
        </div>

        {/* Auth Card */}
        <div className="glass-card p-8">
          {/* Google Sign Up */}
          <GoogleSignInButton redirectTo={redirectTo} />

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--glass-border)]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[var(--color-surface)] text-[var(--color-text-muted)]">
                or sign up with email
              </span>
            </div>
          </div>

          {/* Email Form */}
          <EmailSignInForm mode="signup" redirectTo={redirectTo} />

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
            Already have an account?{' '}
            <Link
              href={`/signin${redirectTo ? `?redirectTo=${redirectTo}` : ''}`}
              className="text-[var(--color-primary)] hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Features List */}
        <div className="mt-8 glass-card p-6">
          <h3 className="font-semibold mb-4 text-center">What you&apos;ll get:</h3>
          <ul className="space-y-3 text-sm text-[var(--color-text-muted)]">
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              AI-powered support bots with Claude, GPT, or Gemini
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Deploy to Telegram, Discord, and WhatsApp
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Real-time analytics and conversation insights
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Free tier with 100 messages/month
            </li>
          </ul>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-[var(--color-text-muted)]">
          By signing up, you agree to our{' '}
          <Link href="/terms" className="hover:text-white underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="hover:text-white underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
