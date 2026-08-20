const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  await page.goto('data:text/html,' + 
    '<script>Object.defineProperty(window, "fetch", { get: () => "WRAPPED" });</script>' +
    '<script type="module">' + 
    'import "data:text/javascript,\\"use strict\\"; window.fetch = function(){};";' + 
    'var originalFetch = window.fetch; Object.defineProperty(window, "fetch", { value: originalFetch, writable: true, configurable: true, enumerable: true }); console.log("SUCCESS");' +
    '</script>');
  await browser.close();
})();
