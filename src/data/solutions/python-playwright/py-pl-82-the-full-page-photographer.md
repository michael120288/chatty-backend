# The Full Page Photographer

**Level:** 82
**ID:** `py-pl-82`
**Difficulty:** medium
**XP:** 240
**Tags:** `screenshot`, `full_page`


## Objective

Take a full-page screenshot of level-01 using page.screenshot(path='/tmp/full.png', full_page=True). Print 'LEVEL_PASSED'.

## Story

The Grand Chronicler captures the entire realm, even beyond the visible window.

## Hints
1. Add full_page=True to page.screenshot().
2. This captures the entire scrollable page.
3. Print 'LEVEL_PASSED' after.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.screenshot(path='/tmp/full.png', full_page=True)
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

    # TODO: Take full_page screenshot
    # print 'LEVEL_PASSED'

    browser.close()
```
