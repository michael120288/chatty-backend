# The Double Clicker

**Level:** 93
**ID:** `py-pl-93`
**Difficulty:** medium
**XP:** 240
**Tags:** `dblclick`, `mouse`, `interaction`


## Objective

On level-02 use page.locator('#reveal-btn').dblclick() to double-click the button. Then print 'LEVEL_PASSED'.

## Story

Some treasures only open with a double-click — a precise two-tap combination.

## Hints
1. locator.dblclick() sends a double-click event.
2. The button will still reveal the secret (a single click already does it).
3. Print 'LEVEL_PASSED' after.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    page.locator('#reveal-btn').dblclick()
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

    # TODO: locator.dblclick() to double-click
    # print 'LEVEL_PASSED'

    browser.close()
```
