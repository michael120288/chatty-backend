# The Time Zone Shifter

**Level:** 113
**ID:** `py-pl-113`
**Difficulty:** medium
**XP:** 260
**Tags:** `timezone`, `context`, `configuration`


## Objective

Create a context with timezone_id='America/New_York'. Navigate to level-01 and print 'LEVEL_PASSED'.

## Story

The Chronomancer shifts the browser's clock to a different timezone.

## Hints
1. timezone_id sets the browser's timezone.
2. new Date().toLocaleString() would show Eastern Time.
3. Just navigate and print.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(timezone_id='America/New_York')
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    print('LEVEL_PASSED')
    context.close()
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(timezone_id='America/New_York')
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: print 'LEVEL_PASSED'

    context.close()
    browser.close()
```
