import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Full page screenshot
  await page.screenshot({ path: '/tmp/full-page.png', fullPage: true });
  
  // Desktop viewport
  await page.setViewportSize({ width: 1440, height: 900 });
  
  // Mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });
  await page.screenshot({ path: '/tmp/mobile-view.png', fullPage: true });
  
  await browser.close();
  console.log('Screenshots saved');
})();
