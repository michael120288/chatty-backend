# The Console Watcher

**Level:** 109
**ID:** `py-pl-109`
**Difficulty:** medium
**XP:** 260
**Tags:** `console`, `events`, `debugging`


## Objective

Listen for 'console' events on level-02. Click the reveal button (which might log something). Whether or not there are logs, print 'LEVEL_PASSED'.

## Story

The Observer reads console messages printed by the page's scripts.

## Hints
1. page.on('console', handler) fires for each console.log/warn/error.
2. msg.text gives the message text.
3. Print 'LEVEL_PASSED' unconditionally after setup.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    logs = []
    page.on('console', lambda msg: logs.append(msg.text))
    page.goto('http://localhost:5000/pages/level-02/')
    page.locator('#reveal-btn').click()
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    logs = []
    page.on('console', lambda msg: logs.append(msg.text))
    page.goto('http://localhost:5000/pages/level-02/')
    page.locator('#reveal-btn').click()

    # TODO: print 'LEVEL_PASSED' (console listening succeeded regardless)

    browser.close()
```
