const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  await page.evaluateOnNewDocument(() => {
    const nativeFetch = window.fetch;
    Object.defineProperty(window, 'fetch', {
      get: () => nativeFetch,
      configurable: false
    });
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  const errorLog = await page.$eval('#error-log', el => el.innerText).catch(() => '');
  console.log('ERROR LOG:', errorLog);
  await browser.close();
})();
