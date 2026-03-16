# Form Alchemist — form fields are empty on load

**Level:** 14
**ID:** `level-14`
**Difficulty:** medium
**XP:** 175
**Tags:** `fill`, `forms`, `getByLabel`, `submit`


## Objective

Fill in the login form with username 'wizard' and password 'playwright123', then submit it. Log 'LEVEL_PASSED' if you see the success message.

## Story

The Gate of Authentication bars your path. Only those who can fill forms with perfect precision may pass. The ancient login ritual requires a username, a password, and the courage to submit. Transform raw input into magical authentication.

## Hints
1. Use page.getByLabel('Username') and page.getByLabel('Password') to find form fields by their label text.
2. Call .fill('yourValue') on each locator to type text into the fields.
3. After filling, click the submit button, then check page.locator('#success-message').isVisible() to confirm login success.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-03/');
  const currentUrl = page.url();
  if (currentUrl.startsWith('http')) console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-03/');

  // TODO: Use page.url() to get the current URL
  // If it starts with 'http', log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```
