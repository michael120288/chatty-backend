# The Double Striker

**Level:** 33
**ID:** `py-pl-33`
**Difficulty:** medium
**XP:** 100
**Tags:** `dblclick`, `mouse`, `interaction`


## Objective

Double-click the first button using locator.dblclick(). Then print 'LEVEL_PASSED'.

## Story

The Champion performs a powerful double-strike move. Use dblclick to unleash the combo.

## Hints
1. locator.dblclick() fires a mousedown, mouseup, click, mousedown, mouseup, click, dblclick sequence.
2. Use .first to target the first button.
3. Print 'LEVEL_PASSED' after.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    page.locator('button').first.dblclick()
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

    # TODO: Use page.locator('button').first.dblclick() then print 'LEVEL_PASSED'

    browser.close()
```
