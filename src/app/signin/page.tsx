import Link from 'next/link'
import AuthBackground from '@/components/auth/AuthBackground'
import GoogleSignInButton from '@/components/auth/GoogleSignInButton'
import EmailSignInForm from '@/components/auth/EmailSignInForm'

interface SignInPageProps {
  searchParams: Promise<{ redirectTo?: string; error?: string }>
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { redirectTo, error } = await searchParams

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
            Sign in to your account
          </p>
        </div>

        {/* Auth Card */}
        <div className="glass-card p-8">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 text-red-400 text-sm text-center">
              {error === 'auth_callback_error'
                ? 'Authentication failed. Please try again.'
                : 'An error occurred. Please try again.'}
            </div>
          )}

          {/* Google Sign In */}
          <GoogleSignInButton redirectTo={redirectTo} />

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--glass-border)]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[var(--color-surface)] text-[var(--color-text-muted)]">
                or continue with email
              </span>
            </div>
          </div>

          {/* Email Form */}
          <EmailSignInForm mode="signin" redirectTo={redirectTo} />

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
            Don&apos;t have an account?{' '}
            <Link
              href={`/signup${redirectTo ? `?redirectTo=${redirectTo}` : ''}`}
              className="text-[var(--color-primary)] hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-[var(--color-text-muted)]">
          By signing in, you agree to our{' '}
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
