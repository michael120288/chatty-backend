# The Mouse Mover

**Level:** 120
**ID:** `py-pl-120`
**Difficulty:** medium
**XP:** 270
**Tags:** `mouse`, `move`, `interaction`


## Objective

On level-01 use page.mouse.move(100, 200) to move the cursor. Then print 'LEVEL_PASSED'.

## Story

The Precision Artisan moves the mouse cursor to exact coordinates.

## Hints
1. page.mouse.move(x, y) positions the cursor at those viewport coordinates.
2. No assertion needed.
3. Print 'LEVEL_PASSED' after.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.mouse.move(100, 200)
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

    # TODO: page.mouse.move(100, 200)
    # print 'LEVEL_PASSED'

    browser.close()
```
