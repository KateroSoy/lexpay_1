const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  await page.goto('data:text/html,' + 
    '<script>Object.defineProperty(window, "fetch", { get: () => 1 }); console.log(Object.getOwnPropertyDescriptor(window, "fetch").configurable);</script>');
  await browser.close();
})();
