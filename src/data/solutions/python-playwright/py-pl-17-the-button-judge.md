# The Button Judge

**Level:** 17
**ID:** `py-pl-17`
**Difficulty:** medium
**XP:** 100
**Tags:** `expect`, `to_be_enabled`, `button`


## Objective

Use expect(page.locator('button').first).to_be_enabled(), then print 'LEVEL_PASSED'.

## Story

The Judge evaluates the readiness of buttons. Assert the first button is enabled and ready for action.

## Hints
1. Use page.locator('button').first to target the first button.
2. expect(locator).to_be_enabled() asserts it is not disabled.
3. Print 'LEVEL_PASSED' after.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    expect(page.locator('button').first).to_be_enabled()
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')

    # TODO: Assert the first button is enabled
    # Then print 'LEVEL_PASSED'

    browser.close()
```
