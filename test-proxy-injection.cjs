const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  // Simulate the proxy injection where my fix is in head and proxy is at end of head
  await page.goto('data:text/html,' + 
    '<head>' +
    '<script>try { var originalFetch = window.fetch; Object.defineProperty(window, "fetch", { value: originalFetch, writable: true, configurable: true, enumerable: true }); } catch (e) { }</script>' +
    '<script>Object.defineProperty(window, "fetch", { get: () => "WRAPPED" });</script>' +
    '</head>' +
    '<body>' +
    '<script type="module">' + 
    'import "data:text/javascript,\\"use strict\\"; window.fetch = function(){};";' + 
    'console.log("SUCCESS");' +
    '</script></body>');
  await browser.close();
})();
