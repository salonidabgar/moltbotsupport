import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { createClient } from '@/lib/supabase/server'

function getRazorpay() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, bot_description, ai_model, platform, special_requirements, payment_method } = body

    if (!name || !email || !phone || !bot_description || !ai_model || !platform || !payment_method) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createClient()

    // Save order to Supabase as pending
    const { data: order, error: dbError } = await supabase
      .from('orders')
      .insert({
        name,
        email,
        phone,
        bot_description,
        ai_model,
        platform,
        special_requirements: special_requirements || null,
        payment_method,
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

    // Create Razorpay order
    const razorpayOrder = await getRazorpay().orders.create({
      amount: 9900, // in paise (₹99)
      currency: 'INR',
      receipt: order.id,
      notes: {
        order_id: order.id,
        email: email,
      },
    })

    return NextResponse.json({
      order_id: order.id,
      razorpay_order_id: razorpayOrder.id,
      amount: 9900,
      currency: 'INR',
      key_id: process.env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
