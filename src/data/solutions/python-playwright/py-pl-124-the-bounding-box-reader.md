# The Bounding Box Reader

**Level:** 124
**ID:** `py-pl-124`
**Difficulty:** medium
**XP:** 260
**Tags:** `bounding_box`, `geometry`, `locator`


## Objective

On level-02 get the bounding box of #reveal-btn using locator.bounding_box(). If width > 0 and height > 0, print 'LEVEL_PASSED'.

## Story

The Geometer measures an element's position and size in the viewport.

## Hints
1. bounding_box() returns {x, y, width, height} or None if not visible.
2. Check box is not None first.
3. Then check box['width'] > 0 and box['height'] > 0.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    box = page.locator('#reveal-btn').bounding_box()
    if box and box['width'] > 0 and box['height'] > 0:
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

    # TODO: box = page.locator('#reveal-btn').bounding_box()
    # print 'LEVEL_PASSED' if width > 0 and height > 0

    browser.close()
```
