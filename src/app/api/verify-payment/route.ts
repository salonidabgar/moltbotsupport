import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { order_id, payment_method, razorpay_order_id, razorpay_payment_id, razorpay_signature, paypal_order_id } = body

    if (!order_id || !payment_method) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createClient()
    let verified = false

    if (payment_method === 'razorpay') {
      // Verify Razorpay signature
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return NextResponse.json({ error: 'Missing Razorpay payment details' }, { status: 400 })
      }

      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex')

      verified = expectedSignature === razorpay_signature
    } else if (payment_method === 'paypal') {
      // For PayPal, verify the capture via PayPal API
      if (!paypal_order_id) {
        return NextResponse.json({ error: 'Missing PayPal order ID' }, { status: 400 })
      }
      // TODO: Verify with PayPal capture API in production
      // For now, mark as verified if paypal_order_id is present
      verified = true
    }

    if (!verified) {
      // Update order status to failed
      await supabase
        .from('orders')
        .update({ payment_status: 'failed' })
        .eq('id', order_id)

      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 })
    }

    // Update order to paid
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        payment_status: 'paid',
        payment_id: payment_method === 'razorpay' ? razorpay_payment_id : paypal_order_id,
      })
      .eq('id', order_id)

    if (updateError) {
      console.error('Update error:', updateError)
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
    }

    return NextResponse.json({ success: true, order_id })
  } catch (error) {
    console.error('Verify payment error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
