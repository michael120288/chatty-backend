# The Context Isolator

**Level:** 46
**ID:** `py-pl-46`
**Difficulty:** medium
**XP:** 200
**Tags:** `context`, `viewport`, `isolation`


## Objective

Create two contexts: one at 1280x800, one at 375x667. Open a page in each, navigate, then print 'LEVEL_PASSED'.

## Story

Two adventurers must test independently. Use two separate browser contexts with different viewports.

## Hints
1. browser.new_context(viewport=dict) sets viewport at context creation.
2. Open ctx1.new_page() and ctx2.new_page() independently.
3. Close both contexts before closing the browser.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx1 = browser.new_context(viewport={'width': 1280, 'height': 800})
    ctx2 = browser.new_context(viewport={'width': 375, 'height': 667})
    p1 = ctx1.new_page()
    p2 = ctx2.new_page()
    p1.goto('http://localhost:5000/pages/level-01/')
    p2.goto('http://localhost:5000/pages/level-01/')
    ctx1.close()
    ctx2.close()
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()

    # TODO: ctx1 = browser.new_context(viewport={'width': 1280, 'height': 800})
    # TODO: ctx2 = browser.new_context(viewport={'width': 375, 'height': 667})
    # Open a page in each, navigate, close both, print 'LEVEL_PASSED'

    browser.close()
```
