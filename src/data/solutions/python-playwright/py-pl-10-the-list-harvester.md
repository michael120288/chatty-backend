# The List Harvester

**Level:** 10
**ID:** `py-pl-10`
**Difficulty:** medium
**XP:** 100
**Tags:** `all_text_contents`, `list`, `multiple-elements`


## Objective

Use all_text_contents() on '.item-card' elements. If the resulting list is not empty, print 'LEVEL_PASSED'.

## Story

The Harvest Festival needs a list of all items in the market. Extract all list item texts at once.

## Hints
1. Use page.locator('.item-card').all_text_contents()
2. Level-01 has 3 .item-card elements — the list will not be empty

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    texts = page.locator('.item-card').all_text_contents()
    if texts:
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
    texts = page.locator('.item-card').all_text_contents()
    if texts:
        print('LEVEL_PASSED')
    browser.close()
```
