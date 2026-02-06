import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MoltBotSupport - AI-Powered Customer Support Bots',
  description: 'Create intelligent customer support bots powered by Claude, GPT, and Gemini. Deploy to Telegram, Discord, and WhatsApp in minutes.',
  keywords: ['AI chatbot', 'customer support', 'Telegram bot', 'Discord bot', 'WhatsApp bot', 'Claude', 'GPT'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
