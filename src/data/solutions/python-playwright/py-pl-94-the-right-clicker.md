# The Right Clicker

**Level:** 94
**ID:** `py-pl-94`
**Difficulty:** medium
**XP:** 230
**Tags:** `click`, `right-click`, `mouse`


## Objective

On level-01 use page.locator('h1').click(button='right') to right-click. Then print 'LEVEL_PASSED'.

## Story

The Context Menu Sage triggers alternate powers by right-clicking.

## Hints
1. click(button='right') sends a right-click event.
2. Options: 'left', 'right', 'middle'.
3. Print 'LEVEL_PASSED' after.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.locator('h1').click(button='right')
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

    # TODO: page.locator('h1').click(button='right')
    # print 'LEVEL_PASSED'

    browser.close()
```
