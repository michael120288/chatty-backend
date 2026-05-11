# The Route Modifier

**Level:** 28
**ID:** `py-pl-28`
**Difficulty:** medium
**XP:** 100
**Tags:** `route`, `continue_`, `network`


## Objective

Set up a route that calls route.continue_() for all requests. Navigate and print 'LEVEL_PASSED'.

## Story

The Alchemist transforms responses mid-flight. Use route.continue_() to pass through a modified request.

## Hints
1. route.continue_() passes the request through unchanged.
2. Use page.route('**/*', handler) to intercept all requests.
3. This is a pass-through — useful as a template for modifications.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.route('**/*', lambda route: route.continue_())
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

    # TODO: page.route('**/*', lambda route: route.continue_())
    # Then goto and print 'LEVEL_PASSED'

    browser.close()
```
