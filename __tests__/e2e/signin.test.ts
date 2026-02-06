import puppeteer, { Browser, Page } from 'puppeteer'

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

describe('Sign In Page', () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    global.browser = browser
  })

  afterAll(async () => {
    if (browser) {
      await browser.close()
    }
  })

  beforeEach(async () => {
    page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 720 })
  })

  afterEach(async () => {
    if (page) {
      await page.close()
    }
  })

  describe('Page Rendering', () => {
    it('should render the sign-in page', async () => {
      await page.goto(`${BASE_URL}/signin`, { waitUntil: 'networkidle2' })

      // Check page title/heading
      const heading = await page.$eval('h1', el => el.textContent)
      expect(heading).toContain('MoltBotSupport')

      // Check for sign-in description
      const description = await page.$eval('p', el => el.textContent)
      expect(description).toContain('Sign in to your account')
    })

    it('should display Google sign-in button', async () => {
      await page.goto(`${BASE_URL}/signin`, { waitUntil: 'networkidle2' })

      const googleButton = await page.$('button')
      expect(googleButton).not.toBeNull()

      const buttonText = await page.$eval('button', el => el.textContent)
      expect(buttonText).toContain('Continue with Google')
    })

    it('should display email sign-in form', async () => {
      await page.goto(`${BASE_URL}/signin`, { waitUntil: 'networkidle2' })

      const emailInput = await page.$('input[type="email"]')
      expect(emailInput).not.toBeNull()

      const passwordInput = await page.$('input[type="password"]')
      expect(passwordInput).not.toBeNull()

      const submitButton = await page.$('button[type="submit"]')
      expect(submitButton).not.toBeNull()
    })

    it('should have link to sign-up page', async () => {
      await page.goto(`${BASE_URL}/signin`, { waitUntil: 'networkidle2' })

      const signUpLink = await page.$('a[href*="/signup"]')
      expect(signUpLink).not.toBeNull()
    })
  })

  describe('Form Validation', () => {
    it('should require email field', async () => {
      await page.goto(`${BASE_URL}/signin`, { waitUntil: 'networkidle2' })

      // Try to submit without email
      const submitButton = await page.$('button[type="submit"]')
      await submitButton?.click()

      // Check if form validation prevents submission
      const emailInput = await page.$('input[type="email"]:invalid')
      expect(emailInput).not.toBeNull()
    })

    it('should require password field', async () => {
      await page.goto(`${BASE_URL}/signin`, { waitUntil: 'networkidle2' })

      // Fill email but not password
      await page.type('input[type="email"]', 'test@example.com')

      const submitButton = await page.$('button[type="submit"]')
      await submitButton?.click()

      // Check if form validation prevents submission
      const passwordInput = await page.$('input[type="password"]:invalid')
      expect(passwordInput).not.toBeNull()
    })
  })

  describe('Navigation', () => {
    it('should navigate to sign-up page when clicking sign up link', async () => {
      await page.goto(`${BASE_URL}/signin`, { waitUntil: 'networkidle2' })

      await page.click('a[href*="/signup"]')
      await page.waitForNavigation({ waitUntil: 'networkidle2' })

      expect(page.url()).toContain('/signup')
    })

    it('should navigate to home when clicking logo', async () => {
      await page.goto(`${BASE_URL}/signin`, { waitUntil: 'networkidle2' })

      // Click on the logo/brand link
      const logoLink = await page.$('a[href="/"]')
      if (logoLink) {
        await logoLink.click()
        await page.waitForNavigation({ waitUntil: 'networkidle2' })
        expect(page.url()).toBe(`${BASE_URL}/`)
      }
    })
  })

  describe('Animations and Styling', () => {
    it('should have animated background canvas', async () => {
      await page.goto(`${BASE_URL}/signin`, { waitUntil: 'networkidle2' })

      const canvas = await page.$('canvas')
      expect(canvas).not.toBeNull()
    })

    it('should have glass-card styling on form container', async () => {
      await page.goto(`${BASE_URL}/signin`, { waitUntil: 'networkidle2' })

      const glassCard = await page.$('.glass-card')
      expect(glassCard).not.toBeNull()
    })
  })

  describe('Responsive Design', () => {
    it('should be responsive on mobile viewport', async () => {
      await page.setViewport({ width: 375, height: 667 })
      await page.goto(`${BASE_URL}/signin`, { waitUntil: 'networkidle2' })

      // Form should still be visible and usable
      const emailInput = await page.$('input[type="email"]')
      expect(emailInput).not.toBeNull()

      const submitButton = await page.$('button[type="submit"]')
      expect(submitButton).not.toBeNull()
    })
  })
})

describe('Sign Up Page', () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
  })

  afterAll(async () => {
    if (browser) {
      await browser.close()
    }
  })

  beforeEach(async () => {
    page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 720 })
  })

  afterEach(async () => {
    if (page) {
      await page.close()
    }
  })

  it('should render the sign-up page', async () => {
    await page.goto(`${BASE_URL}/signup`, { waitUntil: 'networkidle2' })

    const heading = await page.$eval('h1', el => el.textContent)
    expect(heading).toContain('MoltBotSupport')

    const description = await page.$eval('p', el => el.textContent)
    expect(description).toContain('Create your account')
  })

  it('should display feature list', async () => {
    await page.goto(`${BASE_URL}/signup`, { waitUntil: 'networkidle2' })

    const featureList = await page.$('ul')
    expect(featureList).not.toBeNull()
  })

  it('should have link to sign-in page', async () => {
    await page.goto(`${BASE_URL}/signup`, { waitUntil: 'networkidle2' })

    const signInLink = await page.$('a[href*="/signin"]')
    expect(signInLink).not.toBeNull()
  })
})
