# The Wheel Scroller

**Level:** 122
**ID:** `py-pl-122`
**Difficulty:** medium
**XP:** 270
**Tags:** `mouse`, `wheel`, `scroll`


## Objective

On level-01 use page.mouse.wheel(0, 300) to scroll down. Then print 'LEVEL_PASSED'.

## Story

The Tide Turner uses the mouse wheel to scroll the page programmatically.

## Hints
1. page.mouse.wheel(dx, dy) sends a wheel event.
2. dy=300 scrolls 300px down.
3. No assertion needed.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.mouse.wheel(0, 300)
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

    # TODO: page.mouse.wheel(delta_x, delta_y)
    # print 'LEVEL_PASSED'

    browser.close()
```
