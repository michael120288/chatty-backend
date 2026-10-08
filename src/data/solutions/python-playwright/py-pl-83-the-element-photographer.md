# The Element Photographer

**Level:** 83
**ID:** `py-pl-83`
**Difficulty:** medium
**XP:** 250
**Tags:** `screenshot`, `locator`, `element`


## Objective

On level-01 take a screenshot of just the h1 element using locator.screenshot(path='/tmp/h1.png'). Print 'LEVEL_PASSED'.

## Story

The Zoomed Artist captures just a single element — not the whole canvas.

## Hints
1. locator.screenshot() takes a screenshot cropped to that element.
2. Pass path= to save it to a file.
3. Print 'LEVEL_PASSED' after.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.locator('h1').screenshot(path='/tmp/h1.png')
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

    # TODO: page.locator('h1').screenshot(path='/tmp/h1.png')
    # print 'LEVEL_PASSED'

    browser.close()
```
