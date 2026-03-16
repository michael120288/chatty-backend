# The Spell Inscriber — injects a script from file

**Level:** 315
**ID:** `level-315`
**Difficulty:** hard
**XP:** 250
**Tags:** `page.addInitScript`, `script file`, `injection`


## Objective

Use page.addInitScript() with a file path to inject a script.

## Story

Scripts can live in files. The Inscriber loads them from disk using the path option.

## Hints
1. page.addInitScript({ path: './setup.js' }) loads from a file
2. Write the script to /tmp first using fs.writeFileSync
3. Relative paths are resolved from the current working directory

## Solution

```javascript
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  fs.writeFileSync('/tmp/init-script.js', 'window.__FROM_FILE = "file-injected";');
  await page.addInitScript({ path: '/tmp/init-script.js' });
  await page.goto('http://localhost:5000/pages/level-01/');
  const val = await page.evaluate(() => window.__FROM_FILE);
  if (val === 'file-injected') console.log('LEVEL_PASSED');
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
  // TODO: write a script to /tmp, then pass { path } to addInitScript()
  // If successful: console.log('LEVEL_PASSED')
  await browser.close();
})();
```
