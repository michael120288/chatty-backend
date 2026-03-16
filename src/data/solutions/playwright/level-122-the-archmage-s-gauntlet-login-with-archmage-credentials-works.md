# The Archmage's Gauntlet — login with archmage credentials works

**Level:** 122
**ID:** `level-122`
**Difficulty:** medium
**XP:** 1000
**Tags:** `boss`, `ultimate`, `multi-concept`, `login`, `API mock`, `evaluate`, `screenshot`, `settings`


## Objective

Login with 'archmage'/'shadowrealm', open the settings panel (#settings-btn), intercept /api/arcane-feed with custom spells, click 'Fetch Feed', read #mana-pool text via evaluate, take a screenshot. Log 'LEVEL_PASSED'.

## Story

The final trial. Every skill you have mastered must now be wielded as one. Login the archmage. Open the settings panel. Mock the arcane feed API. Read the mana pool from the DOM via evaluate. Screenshot the dashboard. Only those who have truly learned the way of Playwright can claim this title.

## Hints
1. Login: await page.fill('#username', 'archmage'); await page.fill('#password', 'shadowrealm'); await page.click('#login-btn'); await page.locator('#dashboard-section').waitFor({ state: 'visible' });
2. Open settings: await page.click('#settings-btn'); verify: await expect(page.locator('#settings-panel')).toBeVisible(); then close it.
3. Fetch the feed: await page.click('#fetch-api-btn'); await page.getByText('Arcane Blast').waitFor(); read mana: const mana = await page.evaluate(() => document.getElementById('mana-pool').textContent); take screenshot: await page.screenshot({ fullPage: true }); then log 'LEVEL_PASSED'.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-25/');
  const title = await page.title();
  if (title.length > 0) console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-25/');

  // TODO: Use page.title() to get the page title
  // If the title has length > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```
