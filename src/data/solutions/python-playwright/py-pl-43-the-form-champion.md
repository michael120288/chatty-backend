# The Form Champion

**Level:** 43
**ID:** `py-pl-43`
**Difficulty:** medium
**XP:** 200
**Tags:** `fill`, `click`, `form-submit`


## Objective

Fill the first input with 'champion', click the first button, then print 'LEVEL_PASSED'.

## Story

The Champion must complete the entire form ritual: fill the field, click submit, and confirm success.

## Hints
1. Use page.locator('input').first.fill('champion') to fill the input.
2. Then page.locator('button').first.click() to click submit.
3. Print 'LEVEL_PASSED' after both actions.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    page.locator('input').first.fill('champion')
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
    page.goto('http://localhost:5000/pages/level-03/')

    # TODO: Fill input with 'champion', click first button, print 'LEVEL_PASSED'

    browser.close()
```
