# The Script Sorcerer — injects script from file

**Level:** 363
**ID:** `level-363`
**Difficulty:** medium
**XP:** 200
**Tags:** `page.addScriptTag`, `path`, `file`, `injection`


## Objective

Use page.addScriptTag({ path }) to load a local script file.

## Story

The Sorcerer reads a spell from a scroll on disk — loading a script file into the page.

## Hints
1. Write a file with fs.writeFileSync first, then load it with addScriptTag
2. The path is relative to the current working directory
3. Good for injecting large test helpers or libraries

## Solution

```javascript
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  fs.writeFileSync('/tmp/helper.js', 'window.__HELPER = "loaded-from-file";');
  await page.goto('http://localhost:5000/pages/level-01/');
  await page.addScriptTag({ path: '/tmp/helper.js' });
  const val = await page.evaluate(() => window.__HELPER);
  if (val === 'loaded-from-file') console.log('LEVEL_PASSED');
  await browser.close();
})();
```

## Starter Code

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/pages/level-01/');
  // TODO: write a JS file then pass its path to page.addScriptTag({ path })
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```
