# The Load Waiter

**Level:** 86
**ID:** `py-pl-86`
**Difficulty:** medium
**XP:** 230
**Tags:** `goto`, `wait_until`, `networkidle`


## Objective

Navigate to level-01 with page.goto(url, wait_until='networkidle'). Print 'LEVEL_PASSED'.

## Story

The Highway Watch waits for all network requests to settle before proceeding.

## Hints
1. page.goto(url, wait_until='networkidle') waits for no network activity for 500ms.
2. Other options: 'load', 'domcontentloaded', 'commit'.
3. Print 'LEVEL_PASSED' after.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/', wait_until='networkidle')
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # TODO: goto with wait_until='networkidle'
    # print 'LEVEL_PASSED'

    browser.close()
```
