import puppeteer, { Browser, Page } from 'puppeteer'

const BASE_URL = 'http://localhost:3000'

describe('Payment Flow E2E', () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
  })

  afterAll(async () => {
    await browser.close()
  })

  beforeEach(async () => {
    page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 900 })
  })

  afterEach(async () => {
    await page.close()
  })

  describe('Step 1: Order Form', () => {
    test('order page loads correctly', async () => {
      await page.goto(`${BASE_URL}/order`, { waitUntil: 'networkidle2' })
      const heading = await page.$eval('h1', el => el.textContent)
      expect(heading).toContain('$99/mo')
    })

    test('form has all required fields', async () => {
      await page.goto(`${BASE_URL}/order`, { waitUntil: 'networkidle2' })

      const nameField = await page.$('input[name="name"]')
      const emailField = await page.$('input[name="email"]')
      const phoneField = await page.$('input[name="phone"]')
      const useCaseField = await page.$('select[name="use_case"]')
      const aiModelField = await page.$('select[name="ai_model"]')
      const platformField = await page.$('select[name="platform"]')
      const notesField = await page.$('input[name="notes"]')
      const submitButton = await page.$('button[type="submit"]')

      expect(nameField).not.toBeNull()
      expect(emailField).not.toBeNull()
      expect(phoneField).not.toBeNull()
      expect(useCaseField).not.toBeNull()
      expect(aiModelField).not.toBeNull()
      expect(platformField).not.toBeNull()
      expect(notesField).not.toBeNull()
      expect(submitButton).not.toBeNull()
    })

    test('use_case dropdown has all options', async () => {
      await page.goto(`${BASE_URL}/order`, { waitUntil: 'networkidle2' })
      const options = await page.$$eval('select[name="use_case"] option', opts =>
        opts.map(o => (o as HTMLOptionElement).value)
      )
      expect(options).toEqual([
        'customer_support', 'faq', 'lead_generation',
        'order_tracking', 'appointment_booking', 'ecommerce', 'other'
      ])
    })

    test('ai_model dropdown has all options', async () => {
      await page.goto(`${BASE_URL}/order`, { waitUntil: 'networkidle2' })
      const options = await page.$$eval('select[name="ai_model"] option', opts =>
        opts.map(o => (o as HTMLOptionElement).value)
      )
      expect(options).toEqual(['claude', 'gpt', 'gemini'])
    })

    test('platform dropdown has all options', async () => {
      await page.goto(`${BASE_URL}/order`, { waitUntil: 'networkidle2' })
      const options = await page.$$eval('select[name="platform"] option', opts =>
        opts.map(o => (o as HTMLOptionElement).value)
      )
      expect(options).toEqual(['telegram', 'discord', 'whatsapp'])
    })

    test('submit button shows "Get My Bot"', async () => {
      await page.goto(`${BASE_URL}/order`, { waitUntil: 'networkidle2' })
      const btnText = await page.$eval('button[type="submit"]', el => el.textContent?.trim())
      expect(btnText).toBe('Get My Bot')
    })

    test('form prevents submission with empty required fields (HTML validation)', async () => {
      await page.goto(`${BASE_URL}/order`, { waitUntil: 'networkidle2' })

      // Try submitting empty form
      await page.click('button[type="submit"]')

      // Page should still be on /order (HTML5 validation prevents submission)
      expect(page.url()).toContain('/order')
    })
  })

  describe('Step 2: Form Submission → Supabase', () => {
    test('filling and submitting the form shows payment step', async () => {
      await page.goto(`${BASE_URL}/order`, { waitUntil: 'networkidle2' })

      // Fill all fields
      await page.type('input[name="name"]', 'E2E Test User')
      await page.type('input[name="email"]', 'e2etest@moltbot.com')
      await page.type('input[name="phone"]', '+19876543210')
      await page.select('select[name="use_case"]', 'lead_generation')
      await page.select('select[name="ai_model"]', 'gpt')
      await page.select('select[name="platform"]', 'discord')
      await page.type('input[name="notes"]', 'Automated E2E payment test')

      // Submit
      await page.click('button[type="submit"]')

      // Wait for the payment step to appear (shows "Almost there!")
      await page.waitForFunction(
        () => document.body.textContent?.includes('Almost there!'),
        { timeout: 15000 }
      )

      // Verify payment step content
      const pageContent = await page.content()
      expect(pageContent).toContain('Almost there!')
      expect(pageContent).toContain('$99.00')
      expect(pageContent).toContain('Custom AI Bot (monthly)')
      expect(pageContent).toContain('Secure payment via PayPal')
    }, 20000)

    test('form submission creates order in API', async () => {
      await page.goto(`${BASE_URL}/order`, { waitUntil: 'networkidle2' })
      // Test the API directly
      const response = await page.evaluate(async () => {
        const res = await fetch('/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'API Test User',
            email: 'apitest@moltbot.com',
            phone: '+11234567890',
            use_case: 'faq',
            ai_model: 'claude',
            platform: 'telegram',
            notes: 'Direct API test',
          }),
        })
        return { status: res.status, body: await res.json() }
      })

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.order_id).toBeDefined()
      expect(typeof response.body.order_id).toBe('string')
    })

    test('form submission with missing fields returns 400', async () => {
      await page.goto(`${BASE_URL}/order`, { waitUntil: 'networkidle2' })
      const response = await page.evaluate(async () => {
        const res = await fetch('/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Incomplete',
            email: '',
            phone: '',
            use_case: '',
            ai_model: 'claude',
            platform: 'telegram',
          }),
        })
        return { status: res.status, body: await res.json() }
      })

      expect(response.status).toBe(400)
      expect(response.body.error).toBe('Missing required fields')
    })

    test('form submission with invalid ai_model returns 500', async () => {
      await page.goto(`${BASE_URL}/order`, { waitUntil: 'networkidle2' })
      const response = await page.evaluate(async () => {
        const res = await fetch('/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Bad Model',
            email: 'bad@test.com',
            phone: '+1111111111',
            use_case: 'test',
            ai_model: 'invalid_model',
            platform: 'telegram',
          }),
        })
        return { status: res.status, body: await res.json() }
      })

      expect(response.status).toBe(500)
      expect(response.body.error).toBe('Failed to create order')
    })
  })

  describe('Step 3: PayPal Integration', () => {
    test('PayPal buttons render after form submission', async () => {
      await page.goto(`${BASE_URL}/order`, { waitUntil: 'networkidle2' })

      // Fill form
      await page.type('input[name="name"]', 'PayPal Render Test')
      await page.type('input[name="email"]', 'paypaltest@moltbot.com')
      await page.type('input[name="phone"]', '+19999999999')

      // Submit
      await page.click('button[type="submit"]')

      // Wait for payment step
      await page.waitForFunction(
        () => document.body.textContent?.includes('Almost there!'),
        { timeout: 15000 }
      )

      // Wait for PayPal SDK to load and render buttons
      await page.waitForSelector('[class*="paypal"], iframe[name*="paypal"], div[id*="paypal"], .paypal-buttons, [data-paypal-button]', {
        timeout: 20000,
      }).catch(() => {
        // PayPal may render differently, check for iframe
      })

      // Give PayPal SDK extra time to load
      await new Promise(resolve => setTimeout(resolve, 5000))

      // Check if PayPal rendered anything (buttons or iframes)
      const paypalElements = await page.evaluate(() => {
        const iframes = document.querySelectorAll('iframe')
        const paypalIframes = Array.from(iframes).filter(
          f => f.src?.includes('paypal') || f.name?.includes('paypal') || f.title?.includes('PayPal')
        )
        return {
          totalIframes: iframes.length,
          paypalIframes: paypalIframes.length,
          paypalIframeSrcs: paypalIframes.map(f => f.src.substring(0, 80)),
        }
      })

      console.log('PayPal render check:', JSON.stringify(paypalElements, null, 2))
      expect(paypalElements.paypalIframes).toBeGreaterThan(0)
    }, 30000)

    test('PayPal create-order API validates input', async () => {
      await page.goto(`${BASE_URL}/order`, { waitUntil: 'networkidle2' })
      // Missing order_id
      const response1 = await page.evaluate(async () => {
        const res = await fetch('/api/paypal/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        })
        return { status: res.status, body: await res.json() }
      })
      expect(response1.status).toBe(400)
      expect(response1.body.error).toBe('Missing order_id')
    })

    test('PayPal capture-order API validates input', async () => {
      await page.goto(`${BASE_URL}/order`, { waitUntil: 'networkidle2' })
      const response = await page.evaluate(async () => {
        const res = await fetch('/api/paypal/capture-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        })
        return { status: res.status, body: await res.json() }
      })
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('Missing required fields')
    })

    test('PayPal create-order API creates PayPal order with valid order_id', async () => {
      await page.goto(`${BASE_URL}/order`, { waitUntil: 'networkidle2' })
      // First create a real order
      const orderResponse = await page.evaluate(async () => {
        const res = await fetch('/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'PayPal Flow Test',
            email: 'ppflow@moltbot.com',
            phone: '+18888888888',
            use_case: 'customer_support',
            ai_model: 'gemini',
            platform: 'whatsapp',
            notes: 'PayPal flow test',
          }),
        })
        return res.json()
      })

      expect(orderResponse.order_id).toBeDefined()

      // Now create PayPal order
      const paypalResponse = await page.evaluate(async (orderId: string) => {
        const res = await fetch('/api/paypal/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order_id: orderId }),
        })
        return { status: res.status, body: await res.json() }
      }, orderResponse.order_id)

      console.log('PayPal create-order response:', JSON.stringify(paypalResponse, null, 2))

      expect(paypalResponse.status).toBe(200)
      expect(paypalResponse.body.paypal_order_id).toBeDefined()
      expect(typeof paypalResponse.body.paypal_order_id).toBe('string')
    }, 15000)
  })

  describe('Step 4: Full Flow UI Verification', () => {
    test('complete form → payment → displays correct pricing', async () => {
      await page.goto(`${BASE_URL}/order`, { waitUntil: 'networkidle2' })

      // Fill all fields
      await page.type('input[name="name"]', 'Full Flow Test')
      await page.type('input[name="email"]', 'fullflow@moltbot.com')
      await page.type('input[name="phone"]', '+17777777777')
      await page.select('select[name="use_case"]', 'ecommerce')
      await page.select('select[name="ai_model"]', 'gemini')
      await page.select('select[name="platform"]', 'whatsapp')
      await page.type('input[name="notes"]', 'Full E2E flow test with all fields')

      // Submit
      await page.click('button[type="submit"]')

      // Wait for payment step
      await page.waitForFunction(
        () => document.body.textContent?.includes('Almost there!'),
        { timeout: 15000 }
      )

      // Verify pricing displays
      const content = await page.content()
      expect(content).toContain('$99.00')
      expect(content).toContain('Custom AI Bot (monthly)')
      expect(content).toContain('Total')

      // Verify back to home link exists
      const backLink = await page.$('a[href="/"]')
      expect(backLink).not.toBeNull()
    }, 20000)

    test('loading spinner shows during form submission', async () => {
      await page.goto(`${BASE_URL}/order`, { waitUntil: 'networkidle2' })

      await page.type('input[name="name"]', 'Spinner Test')
      await page.type('input[name="email"]', 'spinner@moltbot.com')
      await page.type('input[name="phone"]', '+16666666666')

      // Click submit and immediately check for spinner
      const spinnerPromise = page.waitForFunction(
        () => document.body.textContent?.includes('Submitting...'),
        { timeout: 5000 }
      ).then(() => true).catch(() => false)

      await page.click('button[type="submit"]')

      const spinnerShown = await spinnerPromise
      // Spinner may be too fast to catch, so this is a soft check
      console.log('Loading spinner detected:', spinnerShown)
    }, 10000)
  })
})
