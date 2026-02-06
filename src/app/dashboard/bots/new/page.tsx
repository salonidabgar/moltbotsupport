'use client'

import { useState } from 'react'
import Link from 'next/link'

const aiModels = [
  { id: 'claude', name: 'Claude', provider: 'Anthropic', color: '#CC785C', description: 'Best for nuanced conversations' },
  { id: 'gpt', name: 'GPT-4', provider: 'OpenAI', color: '#10A37F', description: 'Versatile and powerful' },
  { id: 'gemini', name: 'Gemini', provider: 'Google', color: '#4285F4', description: 'Great for multimodal support' },
]

const channels = [
  { id: 'telegram', name: 'Telegram', icon: '📱', description: 'Connect to Telegram Bot API' },
  { id: 'discord', name: 'Discord', icon: '🎮', description: 'Add to Discord servers' },
  { id: 'whatsapp', name: 'WhatsApp', icon: '💬', description: 'WhatsApp Business integration' },
]

export default function NewBotPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    ai_model: '',
    channel: '',
    system_prompt: '',
  })

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    // TODO: Create bot in Supabase
    console.log('Creating bot:', formData)
    // Redirect to bot details page
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard/bots" className="text-[var(--color-primary)] hover:underline text-sm mb-2 inline-block">
          ← Back to Bots
        </Link>
        <h1 className="text-3xl font-bold mb-2">Create New Bot</h1>
        <p className="text-[var(--color-text-muted)]">
          Set up your AI-powered support bot in a few simple steps
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
              s <= step
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-surface)] text-[var(--color-text-muted)]'
            }`}>
              {s}
            </div>
            {s < 4 && (
              <div className={`w-16 h-1 mx-2 rounded transition-colors ${
                s < step ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-surface)]'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="glass-card p-8">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Name Your Bot</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">
                  Bot Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Support Assistant"
                  className="input"
                />
              </div>
              <p className="text-sm text-[var(--color-text-muted)]">
                Choose a descriptive name that reflects your bot&apos;s purpose
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Choose AI Model</h2>
            <div className="grid gap-4">
              {aiModels.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setFormData({ ...formData, ai_model: model.id })}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    formData.ai_model === model.id
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)] bg-opacity-10'
                      : 'border-[var(--glass-border)] hover:border-[var(--color-primary)] hover:border-opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl"
                      style={{ backgroundColor: model.color }}
                    >
                      {model.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{model.name}</p>
                      <p className="text-sm text-[var(--color-text-muted)]">{model.provider} • {model.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Select Channel</h2>
            <div className="grid gap-4">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setFormData({ ...formData, channel: channel.id })}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    formData.channel === channel.id
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)] bg-opacity-10'
                      : 'border-[var(--glass-border)] hover:border-[var(--color-primary)] hover:border-opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-surface)] flex items-center justify-center text-2xl">
                      {channel.icon}
                    </div>
                    <div>
                      <p className="font-semibold">{channel.name}</p>
                      <p className="text-sm text-[var(--color-text-muted)]">{channel.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Configure Bot Personality</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="system_prompt" className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">
                  System Prompt
                </label>
                <textarea
                  id="system_prompt"
                  value={formData.system_prompt}
                  onChange={(e) => setFormData({ ...formData, system_prompt: e.target.value })}
                  placeholder="You are a helpful customer support assistant for [Company Name]. Be friendly, professional, and always try to help customers solve their problems..."
                  rows={6}
                  className="input resize-none"
                />
              </div>
              <p className="text-sm text-[var(--color-text-muted)]">
                Define your bot&apos;s personality, knowledge, and behavior guidelines
              </p>
            </div>

            {/* Summary */}
            <div className="mt-8 p-4 bg-[var(--color-surface)] rounded-xl">
              <h3 className="font-semibold mb-3">Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Name:</span>
                  <span>{formData.name || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">AI Model:</span>
                  <span>{aiModels.find(m => m.id === formData.ai_model)?.name || 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Channel:</span>
                  <span>{channels.find(c => c.id === formData.channel)?.name || 'Not selected'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          {step < 4 ? (
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !formData.name) ||
                (step === 2 && !formData.ai_model) ||
                (step === 3 && !formData.channel)
              }
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn-primary"
            >
              Create Bot
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
