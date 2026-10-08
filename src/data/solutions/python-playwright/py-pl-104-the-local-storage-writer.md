# The Local Storage Writer

**Level:** 104
**ID:** `py-pl-104`
**Difficulty:** medium
**XP:** 270
**Tags:** `localStorage`, `evaluate`, `storage`


## Objective

After navigating to level-01, use page.evaluate() to set a localStorage item. Then read it back. If the value matches, print 'LEVEL_PASSED'.

## Story

The Memory Keeper stores data in the browser's local storage for persistence.

## Hints
1. Use page.evaluate() with localStorage JS API.
2. setItem stores, getItem retrieves.
3. Check val == 'dragon'.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.evaluate("localStorage.setItem('hero', 'dragon')")
    val = page.evaluate("localStorage.getItem('hero')")
    if val == 'dragon':
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

    # TODO: page.evaluate("localStorage.setItem('hero', 'dragon')")
    # TODO: val = page.evaluate("localStorage.getItem('hero')")
    # print 'LEVEL_PASSED' if val == 'dragon'

    browser.close()
```
