import Link from 'next/link'
import { notFound } from 'next/navigation'

const blogPosts: Record<string, {
  title: string
  content: string
  date: string
  readTime: string
  category: string
}> = {
  'getting-started-with-ai-chatbots': {
    title: 'Getting Started with AI Chatbots for Customer Support',
    date: '2025-01-15',
    readTime: '5 min read',
    category: 'Tutorial',
    content: `
AI chatbots have revolutionized customer support, offering 24/7 availability and instant responses. In this guide, we'll walk you through setting up your first AI-powered support bot with MoltBotSupport.

## Why AI Chatbots?

Traditional customer support has limitations. Response times can be slow, and scaling support teams is expensive. AI chatbots solve these problems by:

- Providing instant responses around the clock
- Handling multiple conversations simultaneously
- Learning and improving over time
- Reducing operational costs

## Getting Started

### Step 1: Choose Your AI Model

MoltBotSupport supports three leading AI models:

- **Claude** - Excellent for nuanced, empathetic conversations
- **GPT-4** - Versatile and powerful for general support
- **Gemini** - Great for multimodal interactions

### Step 2: Define Your Bot's Persona

Your bot should reflect your brand voice. Consider:

- Tone (formal, friendly, professional)
- Knowledge domain (what it should know)
- Escalation triggers (when to hand off to humans)

### Step 3: Deploy to Your Channels

Connect your bot to Telegram, Discord, or WhatsApp with just a few clicks. MoltBotSupport handles all the webhook configuration automatically.

## Best Practices

1. Start with a clear scope - don't try to do everything at once
2. Train with real customer queries
3. Monitor conversations and iterate
4. Set up human handoff for complex issues

Ready to get started? Sign up for your free account today!
    `,
  },
  'choosing-the-right-ai-model': {
    title: 'Choosing the Right AI Model: Claude vs GPT vs Gemini',
    date: '2025-01-10',
    readTime: '8 min read',
    category: 'Guide',
    content: `
Choosing the right AI model for your customer support bot is crucial. Each model has its strengths and ideal use cases.

## Claude by Anthropic

**Best for:** Complex reasoning, nuanced conversations, and safety-critical applications.

Claude excels at understanding context and providing helpful, harmless, and honest responses. It's particularly good at:

- Handling sensitive customer issues with empathy
- Following complex instructions precisely
- Maintaining consistent persona across conversations

## GPT-4 by OpenAI

**Best for:** General-purpose support and versatile interactions.

GPT-4 is the most widely used LLM and offers:

- Broad knowledge base
- Strong multilingual capabilities
- Excellent at following detailed prompts

## Gemini by Google

**Best for:** Multimodal support and search-integrated responses.

Gemini shines when you need:

- Image understanding in support tickets
- Integration with search for up-to-date information
- Fast response times

## Making Your Choice

Consider these factors:

1. **Conversation complexity** - Claude for nuanced, GPT for general
2. **Response speed** - Gemini tends to be fastest
3. **Cost** - Compare pricing for your expected volume
4. **Specific features** - Each has unique capabilities

With MoltBotSupport, you can easily switch between models or A/B test to find the best fit for your use case.
    `,
  },
  'telegram-bot-best-practices': {
    title: 'Telegram Bot Best Practices for 2025',
    date: '2025-01-05',
    readTime: '6 min read',
    category: 'Best Practices',
    content: `
Telegram has become one of the most popular platforms for customer support bots. Here are essential best practices for building effective Telegram bots in 2025.

## User Experience

### Response Time

Users expect instant responses. Ensure your bot:

- Acknowledges messages immediately
- Shows typing indicators for longer operations
- Provides estimated wait times if needed

### Rich Messages

Telegram supports rich message formats:

- Use inline keyboards for quick actions
- Format text with markdown for readability
- Include relevant images or documents when helpful

## Bot Commands

Implement essential commands:

- \`/start\` - Welcome message and introduction
- \`/help\` - List available features
- \`/support\` - Connect to human support

## Privacy Considerations

In 2025, privacy is paramount:

- Only collect necessary information
- Be transparent about data usage
- Implement data deletion commands

## Integration Tips

### Webhook Setup

Use webhooks instead of polling for:

- Lower latency
- Reduced server load
- Better reliability

### Error Handling

Gracefully handle:

- Network timeouts
- Invalid inputs
- API rate limits

## Measuring Success

Track these metrics:

1. Response time
2. Resolution rate
3. User satisfaction
4. Escalation frequency

MoltBotSupport provides all these analytics out of the box!
    `,
  },
}

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts[slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text">
            MoltBotSupport
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-[var(--color-text-muted)] hover:text-white transition">
              Features
            </Link>
            <Link href="/#pricing" className="text-[var(--color-text-muted)] hover:text-white transition">
              Pricing
            </Link>
            <Link href="/blog" className="text-white font-medium">
              Blog
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/signin" className="btn-secondary">
              Sign In
            </Link>
            <Link href="/signup" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link href="/blog" className="text-[var(--color-primary)] hover:underline mb-4 inline-block">
              ← Back to Blog
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm px-3 py-1 rounded-full bg-[var(--color-primary)] bg-opacity-20 text-[var(--color-primary)]">
                {post.category}
              </span>
              <span className="text-sm text-[var(--color-text-muted)]">{post.date}</span>
              <span className="text-sm text-[var(--color-text-muted)]">{post.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {post.title}
            </h1>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-semibold mt-6 mb-3">{paragraph.replace('### ', '')}</h3>
              }
              if (paragraph.startsWith('- ')) {
                return <li key={index} className="text-[var(--color-text-muted)] ml-4">{paragraph.replace('- ', '')}</li>
              }
              if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ') || paragraph.startsWith('4. ')) {
                return <li key={index} className="text-[var(--color-text-muted)] ml-4 list-decimal">{paragraph.replace(/^\d+\.\s/, '')}</li>
              }
              if (paragraph.trim() === '') return null
              return <p key={index} className="text-[var(--color-text-muted)] mb-4">{paragraph}</p>
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 glass-card p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to build your AI bot?</h3>
            <p className="text-[var(--color-text-muted)] mb-6">
              Start your free trial and create your first bot in minutes.
            </p>
            <Link href="/signup" className="btn-primary inline-block">
              Get Started Free
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto text-center text-sm text-[var(--color-text-muted)]">
          &copy; {new Date().getFullYear()} MoltBotSupport. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
