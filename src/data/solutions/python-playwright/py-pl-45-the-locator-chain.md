# The Locator Chain

**Level:** 45
**ID:** `py-pl-45`
**Difficulty:** medium
**XP:** 200
**Tags:** `locator`, `chaining`, `nested`


## Objective

Use a chained locator: find '.library', then find '.item-card' inside it, then get the first one's text. If not empty, print 'LEVEL_PASSED'.

## Story

The Chain Master links locators together to pinpoint nested elements with surgical precision.

## Hints
1. Use page.locator('.library').locator('.item-card').first.text_content()
2. Level-01 wraps all cards in a .library div

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    text = page.locator('.library').locator('.item-card').first.text_content()
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
    text = page.locator('.library').locator('.item-card').first.text_content()
    if text:
        print('LEVEL_PASSED')
    browser.close()
```
