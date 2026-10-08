# The Timeout Controller

**Level:** 131
**ID:** `py-pl-131`
**Difficulty:** medium
**XP:** 260
**Tags:** `timeout`, `goto`, `configuration`


## Objective

Set a 10-second timeout on goto using page.goto(url, timeout=10000). Navigate and print 'LEVEL_PASSED'.

## Story

The Timekeeper adjusts the default timeout to be more lenient for slow pages.

## Hints
1. timeout=10000 means 10 seconds.
2. This doesn't make it slower — just sets the maximum wait.
3. The page loads normally.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/', timeout=10000)
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # TODO: page.goto(url, timeout=10000)
    # print 'LEVEL_PASSED'

    browser.close()
```
