import puppeteer, { Browser, Page } from 'puppeteer'

const BASE_URL = 'http://localhost:3000'

describe('Order Flow E2E', () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 50 })
    global.browser = browser
  })

  afterAll(async () => {
    if (browser) await browser.close()
  })

  it('should load the order page with styling', async () => {
    page = await browser.newPage()
    await page.goto(`${BASE_URL}/order`, { waitUntil: 'networkidle0' })

    // Check hero text is visible
    const heroText = await page.$eval('h1', el => el.textContent)
    expect(heroText).toContain('Get Your Custom AI Bot')

    // Check form is present
    const formExists = await page.$('form')
    expect(formExists).not.toBeNull()

    // Check CSS is loaded (glass-card should have backdrop-filter)
    const hasStyles = await page.$eval('form', el => {
      const style = window.getComputedStyle(el.closest('.glass-card') || el)
      return style.backdropFilter !== 'none' || style.borderRadius !== '0px'
    })
    expect(hasStyles).toBe(true)
  })

  it('should fill form and submit to get PayPal button', async () => {
    page = await browser.newPage()
    await page.goto(`${BASE_URL}/order`, { waitUntil: 'networkidle0' })

    // Fill name
    await page.type('#name', 'Saloni Dabgar')

    // Fill email
    await page.type('#email', 'dabgarsaloni11@gmail.com')

    // Fill phone
    await page.type('#phone', '+919598895144')

    // Select use case
    await page.select('#use_case', 'ecommerce')

    // Select AI model
    await page.select('#ai_model', 'claude')

    // Select platform
    await page.select('#platform', 'telegram')

    // Click submit
    await page.click('button[type="submit"]')

    // Wait for PayPal step to appear (order saved, page transitions)
    await page.waitForSelector('text/Almost there', { timeout: 10000 })

    // Verify PayPal section is showing
    const heading = await page.$eval('h2', el => el.textContent)
    expect(heading).toContain('Almost there')

    // Verify total is shown
    const totalText = await page.evaluate(() => document.body.textContent)
    expect(totalText).toContain('$99.00')

    // Take a screenshot for visual verification
    await page.screenshot({ path: '/tmp/order-paypal-step.png', fullPage: true })
    console.log('Screenshot saved to /tmp/order-paypal-step.png')
  })
})
