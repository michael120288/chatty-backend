# The Main Frame Inspector

**Level:** 148
**ID:** `py-pl-148`
**Difficulty:** medium
**XP:** 260
**Tags:** `main_frame`, `frames`, `navigation`


## Objective

On level-01 use page.main_frame.url to get the frame's URL. If it contains 'level-01', print 'LEVEL_PASSED'.

## Story

The Root Keeper accesses the main frame directly.

## Hints
1. page.main_frame is the top-level frame.
2. .url is its current URL.
3. Check 'level-01' in page.main_frame.url.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    if 'level-01' in page.main_frame.url:
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

    # TODO: Check page.main_frame.url
    # print 'LEVEL_PASSED' if 'level-01' in it

    browser.close()
```
