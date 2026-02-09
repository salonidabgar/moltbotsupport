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
        <div className="starfield">
          <div className="star-twinkle" style={{ top: '15%', left: '10%', '--duration': '3s', '--delay': '0s' } as React.CSSProperties} />
          <div className="star-twinkle" style={{ top: '25%', left: '80%', '--duration': '4s', '--delay': '1s' } as React.CSSProperties} />
          <div className="star-twinkle" style={{ top: '45%', left: '30%', '--duration': '5s', '--delay': '0.5s' } as React.CSSProperties} />
          <div className="star-twinkle" style={{ top: '60%', left: '65%', '--duration': '3.5s', '--delay': '2s' } as React.CSSProperties} />
          <div className="star-twinkle" style={{ top: '75%', left: '45%', '--duration': '4.5s', '--delay': '1.5s' } as React.CSSProperties} />
          <div className="star-twinkle" style={{ top: '10%', left: '55%', '--duration': '3s', '--delay': '0.8s' } as React.CSSProperties} />
          <div className="star-twinkle" style={{ top: '85%', left: '20%', '--duration': '5s', '--delay': '2.5s' } as React.CSSProperties} />
          <div className="star-twinkle" style={{ top: '35%', left: '90%', '--duration': '4s', '--delay': '0.3s' } as React.CSSProperties} />
          <div className="nebula" style={{ top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'var(--color-primary)' }} />
          <div className="nebula" style={{ bottom: '-10%', left: '-5%', width: '500px', height: '500px', background: 'var(--color-secondary)', animationDelay: '4s' }} />
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
