# The Set Default Timeout

**Level:** 132
**ID:** `py-pl-132`
**Difficulty:** medium
**XP:** 260
**Tags:** `set_default_timeout`, `timeout`, `configuration`


## Objective

Use page.set_default_timeout(15000) to set 15s as the default. Then navigate and print 'LEVEL_PASSED'.

## Story

The Grand Clockmaster changes the default timeout for all operations at once.

## Hints
1. set_default_timeout applies to all locator operations.
2. 15000 = 15 seconds.
3. Just print after navigating.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.set_default_timeout(15000)
    page.goto('http://localhost:5000/pages/level-01/')
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.set_default_timeout(15000)
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: print 'LEVEL_PASSED'

    browser.close()
```
