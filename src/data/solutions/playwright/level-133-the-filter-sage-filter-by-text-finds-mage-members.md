# The Filter Sage — filter by text finds mage members

**Level:** 133
**ID:** `level-133`
**Difficulty:** medium
**XP:** 375
**Tags:** `locator.filter`, `filter`, `chaining`, `DOM traversal`


## Objective

Find all active mage guild members by chaining locator.filter() calls. First filter '.guild-member' for those with '.member-status.Active', then filter again for those containing 'Mage'. Count them and log 'LEVEL_PASSED' if there are exactly 2.

## Story

The Guild Roster is crowded. Seven adventurers of varying status and class have registered. The Sage needs only Active Mages — those rare few who wield the arcane arts and stand ready for battle. Learn to chain locator filters to find the worthy among the many.

## Hints
1. Use page.locator('.guild-member') to get all 7 members, then chain .filter({ has: page.locator('.member-status.Active') }) to keep only active ones.
2. Chain a second .filter({ hasText: 'Mage' }) to keep only those whose text contains 'Mage' (matches both 'Mage · Fire School' and 'Mage · Shadow School').
3. Use await activeMages.count() to get the number. There should be exactly 2 active mages. Log 'LEVEL_PASSED' if count === 2.

## Solution

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-27/');
  const buffer = await page.screenshot();
  if (buffer.length > 0) console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-27/');

  // TODO: Use page.screenshot() to capture the page as a Buffer
  // If the buffer has length > 0, log: console.log('LEVEL_PASSED')

  await browser.close();
})();
```
