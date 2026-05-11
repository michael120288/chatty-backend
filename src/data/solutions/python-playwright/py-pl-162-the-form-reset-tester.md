# The Form Reset Tester

**Level:** 162
**ID:** `py-pl-162`
**Difficulty:** medium
**XP:** 280
**Tags:** `clear`, `forms`, `locator`


## Objective

On level-03 fill username, then use locator.clear() to wipe it. Verify value is empty. Print 'LEVEL_PASSED'.

## Story

The Clean Slate verifies that clearing a form removes all entered data.

## Hints
1. locator.clear() erases the input value.
2. input_value() should return '' after clear.
3. Check == ''.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    page.locator('#username').fill('sometext')
    page.locator('#username').clear()
    if page.locator('#username').input_value() == '':
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

    page.locator('#username').fill('sometext')
    # TODO: page.locator('#username').clear()
    # Verify empty, print 'LEVEL_PASSED'

    browser.close()
```
