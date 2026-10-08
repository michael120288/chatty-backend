# The Incognito Agent

**Level:** 105
**ID:** `py-pl-105`
**Difficulty:** medium
**XP:** 240
**Tags:** `headless`, `launch`, `configuration`


## Objective

Launch browser with headless=True explicitly. Navigate to level-01 and verify it works. Print 'LEVEL_PASSED'.

## Story

The Shadow Operative uses headless mode explicitly — invisible to the mortal eye.

## Hints
1. headless=True is the default but explicit is fine.
2. Headless means no visible browser window.
3. Just navigate and print.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: print 'LEVEL_PASSED'

    browser.close()
```
