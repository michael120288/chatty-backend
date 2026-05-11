# The Test Isolation Champion

**Level:** 197
**ID:** `py-pl-197`
**Difficulty:** medium
**XP:** 400
**Tags:** `isolation`, `context`, `repeated_test`


## Objective

Run the login flow twice, each time in a fresh context. Both should succeed. Print 'LEVEL_PASSED'.

## Story

The Purist runs each test in a fresh context to guarantee no state leaks between runs.

## Hints
1. Call run_login(browser) twice.
2. Each call creates and closes its own context.
3. If both return True, print 'LEVEL_PASSED'.

## Solution

```python
from playwright.sync_api import sync_playwright

def run_login(browser):
    ctx = browser.new_context()
    page = ctx.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    page.locator('#username').fill('wizard')
    page.locator('#password').fill('playwright123')
    page.locator('#submit-btn').click()
    result = page.locator('#success-message').is_visible()
    ctx.close()
    return result

with sync_playwright() as p:
    browser = p.chromium.launch()
    r1 = run_login(browser)
    r2 = run_login(browser)
    if r1 and r2:
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

def run_login(browser):
    ctx = browser.new_context()
    page = ctx.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    page.locator('#username').fill('wizard')
    page.locator('#password').fill('playwright123')
    page.locator('#submit-btn').click()
    result = page.locator('#success-message').is_visible()
    ctx.close()
    return result

with sync_playwright() as p:
    browser = p.chromium.launch()
    # TODO: Run run_login twice, check both True
    # print 'LEVEL_PASSED'
    browser.close()
```
