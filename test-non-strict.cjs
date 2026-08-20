const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  await page.goto('data:text/html,' + 
    '<script>Object.defineProperty(window, "fetch", { get: () => 1 });</script>' +
    '<script>window.fetch = 2; console.log("Non-strict assignment did not throw");</script>' +
    '<script>"use strict"; window.fetch = 2; console.log("Strict assignment did not throw");</script>');
  await browser.close();
})();
