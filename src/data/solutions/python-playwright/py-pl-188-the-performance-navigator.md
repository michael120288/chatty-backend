# The Performance Navigator

**Level:** 188
**ID:** `py-pl-188`
**Difficulty:** medium
**XP:** 320
**Tags:** `performance`, `timing`, `evaluate`


## Objective

After navigating to level-01 use page.evaluate() to read performance.timing.loadEventEnd - performance.timing.navigationStart. If > 0, print 'LEVEL_PASSED'.

## Story

The Speed Reader uses the Performance API to measure navigation timing.

## Hints
1. performance.timing is available in the browser context.
2. loadEventEnd - navigationStart gives total load time in ms.
3. Any positive value means the page loaded.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/', wait_until='load')
    load_time = page.evaluate('performance.timing.loadEventEnd - performance.timing.navigationStart')
    if load_time > 0:
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/', wait_until='load')

    # TODO: load_time = page.evaluate('performance.timing.loadEventEnd - performance.timing.navigationStart')
    # print 'LEVEL_PASSED' if > 0

    browser.close()
```
