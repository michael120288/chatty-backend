# The Clipped Screenshot

**Level:** 163
**ID:** `py-pl-163`
**Difficulty:** medium
**XP:** 290
**Tags:** `screenshot`, `clip`, `region`


## Objective

Take a screenshot of level-01 clipped to {x:0, y:0, width:300, height:200}. Print 'LEVEL_PASSED'.

## Story

The Precision Photographer captures only a specific region of the page.

## Hints
1. clip= accepts a dict with x, y, width, height.
2. The screenshot will be exactly 300x200 pixels.
3. Print 'LEVEL_PASSED' after.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.screenshot(path='/tmp/clip.png', clip={'x':0,'y':0,'width':300,'height':200})
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

    # TODO: page.screenshot(path='/tmp/clip.png', clip={'x':0,'y':0,'width':300,'height':200})
    # print 'LEVEL_PASSED'

    browser.close()
```
