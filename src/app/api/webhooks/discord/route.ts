import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Discord webhook verification
    if (body.type === 1) {
      return NextResponse.json({ type: 1 })
    }

    // TODO: Process Discord interaction
    // 1. Verify the request signature
    // 2. Extract message content
    // 3. Find the associated bot
    // 4. Generate AI response
    // 5. Send response

    console.log('Discord webhook received:', body)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Discord webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Discord webhook endpoint' })
}
