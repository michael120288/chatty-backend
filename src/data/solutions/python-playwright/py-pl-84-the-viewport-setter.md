# The Viewport Setter

**Level:** 84
**ID:** `py-pl-84`
**Difficulty:** medium
**XP:** 240
**Tags:** `viewport`, `mobile`, `configuration`


## Objective

Set viewport to 375x812 (mobile size) before navigating. Navigate to level-01 and verify page.viewport_size['width'] == 375. Print 'LEVEL_PASSED'.

## Story

The Architect of Worlds adjusts the viewport to test different screen sizes.

## Hints
1. page.viewport_size returns a dict with 'width' and 'height'.
2. Compare to 375.
3. Print 'LEVEL_PASSED' if they match.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 375, 'height': 812})
    page.goto('http://localhost:5000/pages/level-01/')
    if page.viewport_size['width'] == 375:
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 375, 'height': 812})
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: Check page.viewport_size['width'] == 375
    # print 'LEVEL_PASSED'

    browser.close()
```
