# The JS Bridge

**Level:** 34
**ID:** `py-pl-34`
**Difficulty:** medium
**XP:** 100
**Tags:** `evaluate`, `javascript`, `querySelectorAll`


## Objective

Use page.evaluate() to count all '.item-card' elements via JavaScript. If count > 0, print 'LEVEL_PASSED'.

## Story

The Architect builds bridges between Python and JavaScript. Use evaluate to count DOM elements.

## Hints
1. Use page.evaluate() to run JavaScript in the browser context
2. document.querySelectorAll('.item-card').length counts all item cards
3. Level-01 has 3 .item-card elements

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    count = page.evaluate("() => document.querySelectorAll('.item-card').length")
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

    # TODO: Use page.evaluate("() => document.querySelectorAll('.item-card').length") and check > 0

    browser.close()
```
