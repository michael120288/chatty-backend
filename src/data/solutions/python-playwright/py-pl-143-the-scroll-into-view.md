# The Scroll Into View

**Level:** 143
**ID:** `py-pl-143`
**Difficulty:** medium
**XP:** 270
**Tags:** `scroll_into_view`, `scroll`, `locator`


## Objective

On level-01 use page.locator('p').last.scroll_into_view_if_needed() to scroll the last paragraph into view. Then print 'LEVEL_PASSED'.

## Story

The Revealer scrolls an element into the visible viewport.

## Hints
1. scroll_into_view_if_needed() scrolls the element into view if not visible.
2. Works on any locator.
3. Print 'LEVEL_PASSED' after.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.locator('p').last.scroll_into_view_if_needed()
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

    # TODO: page.locator('p').last.scroll_into_view_if_needed()
    # print 'LEVEL_PASSED'

    browser.close()
```
