# The Button Striker

**Level:** 3
**ID:** `py-pl-03`
**Difficulty:** medium
**XP:** 100
**Tags:** `click`, `locator`, `interaction`


## Objective

Click the first button on the page, then print 'LEVEL_PASSED'.

## Story

A locked gate blocks your path. A glowing button pulses with energy — one click and the way shall open.

## Hints
1. Use page.locator('button').first to target the first button.
2. Call .click() on the locator to perform the click.
3. Print 'LEVEL_PASSED' after clicking.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    page.locator('button').first.click()
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

    # TODO: Click the first button on the page using page.locator('button').first.click()

    browser.close()
```
