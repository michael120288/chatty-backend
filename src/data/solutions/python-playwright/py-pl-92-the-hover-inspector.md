# The Hover Inspector

**Level:** 92
**ID:** `py-pl-92`
**Difficulty:** medium
**XP:** 230
**Tags:** `hover`, `mouse`, `interaction`


## Objective

On level-01 use page.locator('h1').hover() to hover over the heading. Then print 'LEVEL_PASSED'.

## Story

The Trickster reveals hidden content by hovering over elements.

## Hints
1. locator.hover() simulates moving the mouse over an element.
2. No assertion needed for this level.
3. Print 'LEVEL_PASSED' after hover.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.locator('h1').hover()
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

    # TODO: hover over h1
    # print 'LEVEL_PASSED'

    browser.close()
```
