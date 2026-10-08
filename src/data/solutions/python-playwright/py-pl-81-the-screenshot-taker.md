# The Screenshot Taker

**Level:** 81
**ID:** `py-pl-81`
**Difficulty:** medium
**XP:** 240
**Tags:** `screenshot`, `page`, `basics`


## Objective

Navigate to level-01 and take a screenshot saved to /tmp/shot.png. If no exception is raised, print 'LEVEL_PASSED'.

## Story

The Chronicler captures the realm's appearance for posterity.

## Hints
1. page.screenshot(path='/tmp/shot.png') saves a PNG file.
2. No assertions needed — if it succeeds without error, print 'LEVEL_PASSED'.
3. You can also use full_page=True for a full-page screenshot.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.screenshot(path='/tmp/shot.png')
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

    # TODO: page.screenshot(path='/tmp/shot.png')
    # print 'LEVEL_PASSED'

    browser.close()
```
