# The Login & Verify Flow

**Level:** 175
**ID:** `py-pl-175`
**Difficulty:** medium
**XP:** 320
**Tags:** `login`, `flow`, `expect`


## Objective

On level-03: fill credentials, submit, wait for #success-message to be visible (use expect), print 'LEVEL_PASSED'.

## Story

The Authentication Auditor performs a full login flow and verifies the success state.

## Hints
1. Fill username='wizard', password='playwright123'.
2. Click submit.
3. expect(page.locator('#success-message')).to_be_visible() waits automatically.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    page.locator('#username').fill('wizard')
    page.locator('#password').fill('playwright123')
    page.locator('#submit-btn').click()
    expect(page.locator('#success-message')).to_be_visible()
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')

    # TODO: Fill, submit, expect visible, print 'LEVEL_PASSED'

    browser.close()
```
