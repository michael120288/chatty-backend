# The Attribute Reader

**Level:** 8
**ID:** `py-pl-08`
**Difficulty:** medium
**XP:** 100
**Tags:** `get_attribute`, `attribute`, `locator`


## Objective

Find the element with data-testid='potion-card' and get its 'data-testid' attribute. If it is not None, print 'LEVEL_PASSED'.

## Story

The Rune Master needs to inspect the sacred link's destination. Read the href attribute to reveal its path.

## Hints
1. Use page.locator('[data-testid="potion-card"]').get_attribute('data-testid')
2. The attribute value should be 'potion-card'

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    attr = page.locator('[data-testid="potion-card"]').get_attribute('data-testid')
    if attr is not None:
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
    # TODO: Get data-testid attribute from the potion-card element
    browser.close()
```
