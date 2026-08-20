const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(window, 'fetch', {
      get: () => 42
    });
  });

  page.on('console', msg => console.log(msg.text()));
  
  await page.goto('data:text/html,<script>console.log(Object.getOwnPropertyDescriptor(window, "fetch").configurable);</script>');
  await browser.close();
})();
