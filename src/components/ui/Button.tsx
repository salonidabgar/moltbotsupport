'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl disabled:opacity-70 disabled:cursor-not-allowed'

    const variants = {
      primary: 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white hover:scale-[1.02] hover:shadow-lg',
      secondary: 'bg-transparent border border-[var(--glass-border)] text-[var(--color-text)] hover:bg-[var(--glass-bg)] hover:border-[var(--color-primary)]',
      ghost: 'bg-transparent text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-surface)]',
      danger: 'bg-red-500 bg-opacity-20 text-red-400 border border-red-500 border-opacity-50 hover:bg-opacity-30',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5',
      lg: 'px-6 py-3.5 text-lg',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
