import type { Browser } from 'puppeteer'

declare global {
  var browser: Browser | undefined
}

beforeAll(async () => {
  // Browser will be launched in individual test files
})

afterAll(async () => {
  if (global.browser) {
    await global.browser.close()
  }
})
