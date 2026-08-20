const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  // Lock fetch before anything runs!
  await page.evaluateOnNewDocument(() => {
    const nativeFetch = window.fetch;
    Object.defineProperty(window, 'fetch', {
      get: () => nativeFetch
    });
  });

  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.message);
    console.log('STACK:', err.stack);
  });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await browser.close();
})();
