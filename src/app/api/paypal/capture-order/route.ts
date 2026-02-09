import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const PAYPAL_API = process.env.PAYPAL_MODE === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com'

async function getAccessToken() {
  const auth = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64')

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  const data = await res.json()
  return data.access_token
}

export async function POST(request: Request) {
  try {
    const { paypal_order_id, order_id } = await request.json()

    if (!paypal_order_id || !order_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const accessToken = await getAccessToken()

    // Capture the payment
    const res = await fetch(`${PAYPAL_API}/v2/checkout/orders/${paypal_order_id}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()

    if (!res.ok || data.status !== 'COMPLETED') {
      console.error('PayPal capture error:', data)

      const supabase = await createClient()
      await supabase
        .from('orders')
        .update({ payment_status: 'failed' })
        .eq('id', order_id)

      return NextResponse.json({ error: 'Payment capture failed' }, { status: 400 })
    }

    // Update order in Supabase
    const captureId = data.purchase_units?.[0]?.payments?.captures?.[0]?.id

    const supabase = await createClient()
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        payment_method: 'paypal',
        payment_id: captureId || paypal_order_id,
        payment_status: 'paid',
      })
      .eq('id', order_id)

    if (updateError) {
      console.error('Supabase update error:', updateError)
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
    }

    return NextResponse.json({ success: true, order_id })
  } catch (error) {
    console.error('PayPal capture error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
