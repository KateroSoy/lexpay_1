const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  await page.evaluateOnNewDocument(() => {
    const nativeFetch = window.fetch;
    // Mimic AI Studio Iframe which does not specify configurable
    Object.defineProperty(window, 'fetch', {
      get: () => nativeFetch
    });
  });

  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  await page.goto('data:text/html,<script>try { var originalFetch = window.fetch; Object.defineProperty(window, "fetch", { value: originalFetch, writable: true, configurable: true, enumerable: true }); } catch (e) { console.warn("Could not make fetch writable:", e); }</script><script>"use strict"; window.fetch = function(){}; console.log("SUCCESS");</script>');
  await browser.close();
})();
