# The Image Banisher

**Level:** 22
**ID:** `py-pl-22`
**Difficulty:** medium
**XP:** 100
**Tags:** `route`, `abort`, `network`


## Objective

Use page.route() to abort all requests matching '**/*.png' and '**/*.jpg'. Then navigate and print 'LEVEL_PASSED'.

## Story

The Bandwidth Mage forbids all images from loading. Abort all image requests to save precious mana.

## Hints
1. Use route.abort() instead of route.fulfill().
2. Pattern '**/*.{png,jpg,jpeg}' matches common image formats.
3. Set up route before goto.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.route('**/*.{png,jpg,jpeg}', lambda route: route.abort())
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

    # TODO: Route to abort image requests
    # Use page.route('**/*.{png,jpg,jpeg}', lambda route: route.abort())
    # Then goto and print 'LEVEL_PASSED'

    browser.close()
```
