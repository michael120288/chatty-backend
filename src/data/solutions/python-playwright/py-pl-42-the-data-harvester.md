# The Data Harvester

**Level:** 42
**ID:** `py-pl-42`
**Difficulty:** medium
**XP:** 200
**Tags:** `all_text_contents`, `list`, `extraction`


## Objective

Get all '.item-card' text contents. If there are more than 2 items, print 'LEVEL_PASSED'.

## Story

The Data Mage extracts all valuable text from the realm's list and counts the harvest.

## Hints
1. Use page.locator('.item-card').all_text_contents()
2. Level-01 has 3 .item-card elements — len > 2 is True

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    texts = page.locator('.item-card').all_text_contents()
    if len(texts) > 2:
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
    if len(texts) > 2:
        print('LEVEL_PASSED')
    browser.close()
```
