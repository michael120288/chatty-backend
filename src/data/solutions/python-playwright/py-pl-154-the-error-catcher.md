# The Error Catcher

**Level:** 154
**ID:** `py-pl-154`
**Difficulty:** medium
**XP:** 290
**Tags:** `error_handling`, `timeout`, `exception`


## Objective

Try to click a non-existent element with timeout=500. Catch the TimeoutError and print 'LEVEL_PASSED'.

## Story

The Safety Net catches Playwright exceptions gracefully instead of crashing.

## Hints
1. Use try/except with TimeoutError from playwright.sync_api.
2. Set timeout=500 on .click() so it fails fast.
3. Print 'LEVEL_PASSED' in the except block.

## Solution

```python
from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    try:
        page.locator('#does-not-exist').click(timeout=500)
    except PWTimeout:
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: Try to click '#does-not-exist' with timeout=500
    # Catch PWTimeout and print 'LEVEL_PASSED'

    browser.close()
```
