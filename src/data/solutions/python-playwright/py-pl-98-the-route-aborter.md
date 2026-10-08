# The Route Aborter

**Level:** 98
**ID:** `py-pl-98`
**Difficulty:** medium
**XP:** 260
**Tags:** `route`, `abort`, `network`


## Objective

Use page.route to abort all PNG requests on level-01. Navigate and print 'LEVEL_PASSED' (the abort should not throw).

## Story

The Gatekeeper blocks certain requests from leaving the realm.

## Hints
1. route.abort() cancels the network request.
2. Aborting PNG requests is safe — they just won't load.
3. Print 'LEVEL_PASSED' after goto succeeds.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.route('**/*.png', lambda route: route.abort())
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
    page.route('**/*.png', lambda route: route.abort())
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: print 'LEVEL_PASSED'

    browser.close()
```
