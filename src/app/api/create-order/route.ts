import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, use_case, ai_model, platform, notes } = body

    if (!name || !email || !phone || !use_case || !ai_model || !platform) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: order, error: dbError } = await supabase
      .from('orders')
      .insert({
        name,
        email,
        phone,
        use_case,
        ai_model,
        platform,
        notes: notes || null,
        payment_method: 'pending',
        payment_status: 'pending',
        amount: 9900,
        currency: 'INR',
      })
      .select()
      .single()

    if (dbError || !order) {
      console.error('Supabase error:', dbError)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    return NextResponse.json({ success: true, order_id: order.id })
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
