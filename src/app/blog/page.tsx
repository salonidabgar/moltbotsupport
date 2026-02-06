import Link from 'next/link'

const blogPosts = [
  {
    slug: 'getting-started-with-ai-chatbots',
    title: 'Getting Started with AI Chatbots for Customer Support',
    excerpt: 'Learn how to set up your first AI-powered customer support bot and transform your customer experience.',
    date: '2025-01-15',
    readTime: '5 min read',
    category: 'Tutorial',
  },
  {
    slug: 'choosing-the-right-ai-model',
    title: 'Choosing the Right AI Model: Claude vs GPT vs Gemini',
    excerpt: 'A comprehensive comparison of the leading AI models for customer support applications.',
    date: '2025-01-10',
    readTime: '8 min read',
    category: 'Guide',
  },
  {
    slug: 'telegram-bot-best-practices',
    title: 'Telegram Bot Best Practices for 2025',
    excerpt: 'Essential tips and strategies for building effective Telegram bots that delight your users.',
    date: '2025-01-05',
    readTime: '6 min read',
    category: 'Best Practices',
  },
]

export default function BlogPage() {
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

      {/* Blog Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Blog
          </h1>
          <p className="text-xl text-[var(--color-text-muted)]">
            Insights, tutorials, and best practices for AI-powered customer support
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="glass-card p-8 hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm px-3 py-1 rounded-full bg-[var(--color-primary)] bg-opacity-20 text-[var(--color-primary)]">
                      {post.category}
                    </span>
                    <span className="text-sm text-[var(--color-text-muted)]">{post.date}</span>
                    <span className="text-sm text-[var(--color-text-muted)]">{post.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-semibold mb-3 hover:text-[var(--color-primary)] transition">
                    {post.title}
                  </h2>
                  <p className="text-[var(--color-text-muted)]">
                    {post.excerpt}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto text-center text-sm text-[var(--color-text-muted)]">
          &copy; {new Date().getFullYear()} MoltBotSupport. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
