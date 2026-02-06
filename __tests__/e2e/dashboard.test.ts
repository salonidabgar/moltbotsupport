import puppeteer, { Browser, Page } from 'puppeteer'

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

describe('Dashboard', () => {
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

  describe('Protected Route', () => {
    it('should redirect to sign-in when not authenticated', async () => {
      await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'networkidle2' })

      // Should be redirected to sign-in page
      expect(page.url()).toContain('/signin')
    })

    it('should include redirectTo parameter when redirecting', async () => {
      await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'networkidle2' })

      // Should include the original path in redirect
      expect(page.url()).toContain('redirectTo')
    })
  })

  describe('Dashboard Bots Page', () => {
    it('should redirect to sign-in when accessing bots page', async () => {
      await page.goto(`${BASE_URL}/dashboard/bots`, { waitUntil: 'networkidle2' })

      expect(page.url()).toContain('/signin')
    })

    it('should redirect to sign-in when accessing new bot page', async () => {
      await page.goto(`${BASE_URL}/dashboard/bots/new`, { waitUntil: 'networkidle2' })

      expect(page.url()).toContain('/signin')
    })
  })

  describe('Dashboard Settings Page', () => {
    it('should redirect to sign-in when accessing settings', async () => {
      await page.goto(`${BASE_URL}/dashboard/settings`, { waitUntil: 'networkidle2' })

      expect(page.url()).toContain('/signin')
    })
  })
})

describe('Landing Page', () => {
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

  describe('Page Rendering', () => {
    it('should render the landing page', async () => {
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' })

      const heading = await page.$('h1')
      expect(heading).not.toBeNull()

      const headingText = await page.$eval('h1', el => el.textContent)
      expect(headingText).toContain('AI Support Bots')
    })

    it('should display sign-in button in navigation', async () => {
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' })

      const signInLink = await page.$('a[href="/signin"]')
      expect(signInLink).not.toBeNull()
    })

    it('should display get started button', async () => {
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' })

      const getStartedLink = await page.$('a[href="/signup"]')
      expect(getStartedLink).not.toBeNull()
    })
  })

  describe('Features Section', () => {
    it('should display features section', async () => {
      await page.goto(`${BASE_URL}/#features`, { waitUntil: 'networkidle2' })

      const featuresSection = await page.$('#features')
      expect(featuresSection).not.toBeNull()
    })
  })

  describe('Pricing Section', () => {
    it('should display pricing section', async () => {
      await page.goto(`${BASE_URL}/#pricing`, { waitUntil: 'networkidle2' })

      const pricingSection = await page.$('#pricing')
      expect(pricingSection).not.toBeNull()
    })

    it('should show three pricing tiers', async () => {
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' })

      // Check for Free, Pro, and Enterprise plans
      const pageContent = await page.content()
      expect(pageContent).toContain('Free')
      expect(pageContent).toContain('Pro')
      expect(pageContent).toContain('Enterprise')
    })
  })

  describe('Navigation', () => {
    it('should navigate to sign-in page', async () => {
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' })

      await page.click('a[href="/signin"]')
      await page.waitForNavigation({ waitUntil: 'networkidle2' })

      expect(page.url()).toContain('/signin')
    })

    it('should navigate to sign-up page', async () => {
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' })

      // Click the first signup link
      const signupLinks = await page.$$('a[href="/signup"]')
      if (signupLinks.length > 0) {
        await signupLinks[0].click()
        await page.waitForNavigation({ waitUntil: 'networkidle2' })
        expect(page.url()).toContain('/signup')
      }
    })

    it('should navigate to blog page', async () => {
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' })

      await page.click('a[href="/blog"]')
      await page.waitForNavigation({ waitUntil: 'networkidle2' })

      expect(page.url()).toContain('/blog')
    })
  })
})

describe('Blog Page', () => {
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

  it('should render the blog page', async () => {
    await page.goto(`${BASE_URL}/blog`, { waitUntil: 'networkidle2' })

    const heading = await page.$eval('h1', el => el.textContent)
    expect(heading).toContain('Blog')
  })

  it('should display blog posts', async () => {
    await page.goto(`${BASE_URL}/blog`, { waitUntil: 'networkidle2' })

    const articles = await page.$$('article')
    expect(articles.length).toBeGreaterThan(0)
  })

  it('should have sign-in button in navigation', async () => {
    await page.goto(`${BASE_URL}/blog`, { waitUntil: 'networkidle2' })

    const signInLink = await page.$('a[href="/signin"]')
    expect(signInLink).not.toBeNull()
  })
})
