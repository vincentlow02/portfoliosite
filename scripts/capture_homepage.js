const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  
  // 1. Homepage
  console.log('Navigating to homepage...');
  await page.goto('http://localhost:3000/?lang=en', { waitUntil: 'networkidle0' });
  await page.evaluate(() => new Promise(r => setTimeout(r, 1200)));
  await page.screenshot({ path: 'C:\\Users\\user\\.gemini\\antigravity\\brain\\26bac7ba-7c71-4234-9c55-29d20c0349f3\\homepage_audit.png', fullPage: true });

  // 2. Work Page
  console.log('Navigating to /projects...');
  await page.goto('http://localhost:3000/projects?lang=en', { waitUntil: 'networkidle0' });
  await page.evaluate(() => new Promise(r => setTimeout(r, 1200)));
  await page.screenshot({ path: 'C:\\Users\\user\\.gemini\\antigravity\\brain\\26bac7ba-7c71-4234-9c55-29d20c0349f3\\work_page_audit.png', fullPage: true });

  // 3. IntoDay Page
  console.log('Navigating to /projects/intoday...');
  await page.goto('http://localhost:3000/projects/intoday?lang=en', { waitUntil: 'networkidle0' });
  await page.evaluate(() => new Promise(r => setTimeout(r, 1200)));
  await page.screenshot({ path: 'C:\\Users\\user\\.gemini\\antigravity\\brain\\26bac7ba-7c71-4234-9c55-29d20c0349f3\\intoday_page_audit.png', fullPage: true });

  console.log('All screenshots captured successfully!');
  await browser.close();
})();
