# The Scroll Ranger

**Level:** 39
**ID:** `py-pl-39`
**Difficulty:** medium
**XP:** 100
**Tags:** `scroll`, `scroll_into_view_if_needed`, `viewport`


## Objective

Scroll the last '.item-card' element into view using scroll_into_view_if_needed(). Then print 'LEVEL_PASSED'.

## Story

The Ranger must reach the bottom of the realm. Scroll an element into view to traverse the page.

## Hints
1. Use page.locator('.item-card').last.scroll_into_view_if_needed()
2. Level-01 has 3 .item-card elements

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.locator('.item-card').last.scroll_into_view_if_needed()
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
    page.locator('.item-card').last.scroll_into_view_if_needed()
    print('LEVEL_PASSED')
    browser.close()
```
