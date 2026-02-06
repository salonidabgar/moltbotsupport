'use client'

import { useState } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { getURL } from '@/lib/utils'

interface GoogleSignInButtonProps {
  redirectTo?: string
}

export default function GoogleSignInButton({ redirectTo }: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    setIsLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${getURL()}api/auth/callback${redirectTo ? `?next=${redirectTo}` : ''}`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      console.error('Error signing in with Google:', error)
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
      ) : (
        <Image
          src="/icons/google.svg"
          alt="Google"
          width={20}
          height={20}
        />
      )}
      <span>{isLoading ? 'Signing in...' : 'Continue with Google'}</span>
    </button>
  )
}
