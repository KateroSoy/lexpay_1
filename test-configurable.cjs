const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  await page.evaluateOnNewDocument(() => {
    const nativeFetch = window.fetch;
    Object.defineProperty(window, 'fetch', {
      get: () => nativeFetch,
      configurable: true // If aistudio sets this to true or false?
    });
  });

  page.on('console', msg => console.log(msg.text()));
  
  await page.goto('data:text/html,<script>try{Object.defineProperty(window,"fetch",{value:window.fetch,writable:true,configurable:true}); window.fetch = 1; console.log("SUCCESS");}catch(e){console.log("ERROR", e.message);}</script>');
  await browser.close();
})();
