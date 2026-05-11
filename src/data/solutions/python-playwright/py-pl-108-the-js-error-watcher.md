# The JS Error Watcher

**Level:** 108
**ID:** `py-pl-108`
**Difficulty:** medium
**XP:** 270
**Tags:** `pageerror`, `events`, `debugging`


## Objective

Listen for 'pageerror' events on level-01. After navigating, check if any errors fired. If no errors (a clean page), print 'LEVEL_PASSED'.

## Story

The Error Sentinel monitors the console for JavaScript errors.

## Hints
1. pageerror fires when an uncaught JS exception occurs.
2. Level-01 has no JS errors.
3. If len(errors) == 0, print 'LEVEL_PASSED'.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    errors = []
    page.on('pageerror', lambda err: errors.append(str(err)))
    page.goto('http://localhost:5000/pages/level-01/')
    if len(errors) == 0:
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    errors = []
    page.on('pageerror', lambda err: errors.append(str(err)))
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: If no errors (clean page), print 'LEVEL_PASSED'

    browser.close()
```
