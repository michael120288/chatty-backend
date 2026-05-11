# The Hover Master

**Level:** 32
**ID:** `py-pl-32`
**Difficulty:** medium
**XP:** 100
**Tags:** `hover`, `mouse`, `interaction`


## Objective

Hover over the first button using locator.hover(). Then print 'LEVEL_PASSED'.

## Story

The Illusionist reveals hidden menus only when hovered. Hover over an element to trigger its magic.

## Hints
1. locator.hover() moves the mouse over the element's center.
2. No click is performed — just a hover.
3. Print 'LEVEL_PASSED' after hovering.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    page.locator('button').first.hover()
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')

    # TODO: Use page.locator('button').first.hover() then print 'LEVEL_PASSED'

    browser.close()
```
