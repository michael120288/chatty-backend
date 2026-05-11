# The Element Counter

**Level:** 6
**ID:** `py-pl-06`
**Difficulty:** medium
**XP:** 100
**Tags:** `count`, `locator`, `elements`


## Objective

Count all '.item-card' elements on the page. If the count is greater than 0, print 'LEVEL_PASSED'.

## Story

The Archivist needs a census of all list items in the Great Hall. Count them and report the truth.

## Hints
1. Use page.locator('.item-card').count()
2. Level-01 has 3 .item-card elements

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    count = page.locator('.item-card').count()
    if count > 0:
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
    count = page.locator('.item-card').count()
    if count > 0:
        print('LEVEL_PASSED')
    browser.close()
```
