# The Viewport Shaper

**Level:** 37
**ID:** `py-pl-37`
**Difficulty:** medium
**XP:** 100
**Tags:** `viewport`, `responsive`, `set_viewport_size`


## Objective

Set the viewport to 375x667 (iPhone size) using page.set_viewport_size(). Then print 'LEVEL_PASSED'.

## Story

The Architect reshapes the browser window to test responsive designs. Set the viewport to mobile size.

## Hints
1. page.set_viewport_size(dict) changes the browser viewport dimensions.
2. Use {'width': 375, 'height': 667} for iPhone 8 size.
3. Print 'LEVEL_PASSED' after resizing.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.set_viewport_size({'width': 375, 'height': 667})
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: Use page.set_viewport_size({'width': 375, 'height': 667}) then print 'LEVEL_PASSED'

    browser.close()
```
