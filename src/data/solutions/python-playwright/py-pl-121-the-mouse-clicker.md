# The Mouse Clicker

**Level:** 121
**ID:** `py-pl-121`
**Difficulty:** medium
**XP:** 280
**Tags:** `mouse`, `bounding_box`, `click`


## Objective

On level-02 use page.mouse.click(x, y) where x,y is the center of #reveal-btn. Get its bounding box first. Print 'LEVEL_PASSED'.

## Story

The Precise Striker uses the mouse API to click at exact coordinates.

## Hints
1. locator.bounding_box() returns {x, y, width, height}.
2. Center = x + width/2, y + height/2.
3. page.mouse.click(cx, cy) clicks at those coordinates.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    box = page.locator('#reveal-btn').bounding_box()
    cx = box['x'] + box['width'] / 2
    cy = box['y'] + box['height'] / 2
    page.mouse.click(cx, cy)
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')

    # TODO: Get bounding_box of #reveal-btn
    # TODO: Calculate center x, y
    # TODO: page.mouse.click(x, y)
    # print 'LEVEL_PASSED'

    browser.close()
```
