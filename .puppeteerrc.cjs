/**
 * puppeteer is only used by the scratch scripts in the project root, never by
 * the app. Skipping the Chromium download keeps the Vercel install fast.
 */
module.exports = { skipDownload: true };
