const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  await page.goto('data:text/html,' + 
    '<script>Object.defineProperty(window, "fetch", { get: () => 1 });</script>' +
    '<script>Object.defineProperty(window, "fetch", { set: (v) => { console.log("Setter called"); } });</script>' + 
    '<script>"use strict"; window.fetch = 3; console.log("SUCCESS");</script>');
  await browser.close();
})();
