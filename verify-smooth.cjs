const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  let hasErrors = false;

  page.on('pageerror', (err) => {
    console.log('[PAGE ERROR]', err.toString());
    hasErrors = true;
  });
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('[CONSOLE ERROR]', msg.text());
      hasErrors = true;
    }
  });

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 10000 });
    const rootHtml = await page.$eval('#root', el => el.innerHTML);
    if (!rootHtml || rootHtml.trim() === '') {
      console.log('[ERROR] #root element is empty. App might not have rendered.');
      hasErrors = true;
    } else {
      console.log('[SUCCESS] App rendered successfully. #root length:', rootHtml.length);
    }
  } catch (err) {
    console.log('[NAVIGATION ERROR]', err.message);
    hasErrors = true;
  }
  
  await browser.close();
  process.exit(hasErrors ? 1 : 0);
})();
