# The Unroute Cleaner

**Level:** 159
**ID:** `py-pl-159`
**Difficulty:** medium
**XP:** 270
**Tags:** `unroute`, `route`, `network`


## Objective

Set up a route, then use page.unroute('**/*.png') to remove it. Navigate and print 'LEVEL_PASSED'.

## Story

The Clean Slate removes a route handler after it's no longer needed.

## Hints
1. page.unroute(pattern, handler) removes that specific handler.
2. After unrouting, PNG requests proceed normally.
3. Just print 'LEVEL_PASSED'.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    handler = lambda route: route.abort()
    page.route('**/*.png', handler)
    page.unroute('**/*.png', handler)
    page.goto('http://localhost:5000/pages/level-01/')
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    handler = lambda route: route.abort()
    page.route('**/*.png', handler)
    page.unroute('**/*.png', handler)
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: print 'LEVEL_PASSED'

    browser.close()
```
