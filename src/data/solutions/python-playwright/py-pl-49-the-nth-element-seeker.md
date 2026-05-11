# The nth Element Seeker

**Level:** 49
**ID:** `py-pl-49`
**Difficulty:** medium
**XP:** 200
**Tags:** `nth`, `locator`, `index`


## Objective

Use page.locator('.item-card').nth(2) to get the third card. If its text is not empty, print 'LEVEL_PASSED'.

## Story

The Seeker must locate the third item in the ancient list — not the first, not the last, but the third.

## Hints
1. nth(2) is zero-indexed — it returns the third element
2. Level-01 has exactly 3 .item-card elements (indices 0, 1, 2)

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    text = page.locator('.item-card').nth(2).text_content()
    if text:
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
    text = page.locator('.item-card').nth(2).text_content()
    if text:
        print('LEVEL_PASSED')
    browser.close()
```
