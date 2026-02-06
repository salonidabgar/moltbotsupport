'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface SignOutButtonProps {
  className?: string
}

export default function SignOutButton({ className = '' }: SignOutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    setIsLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className={`${className} disabled:opacity-70 disabled:cursor-not-allowed`}
    >
      {isLoading ? 'Signing out...' : 'Sign Out'}
    </button>
  )
}
