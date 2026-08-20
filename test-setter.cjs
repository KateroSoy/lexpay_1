const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  await page.evaluateOnNewDocument(() => {
    const nativeFetch = window.fetch;
    // Mimic AI Studio Iframe
    Object.defineProperty(window, 'fetch', {
      get: () => nativeFetch
    });
  });

  page.on('pageerror', err => console.log('ERROR:', err.message));
  page.on('console', msg => console.log(msg.text()));
  
  await page.goto('data:text/html,<script>window.fetch = function(){}; console.log("Did not crash");</script>');
  await browser.close();
})();
