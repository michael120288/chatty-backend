# The Complete E2E Flow

**Level:** 195
**ID:** `py-pl-195`
**Difficulty:** medium
**XP:** 450
**Tags:** `e2e`, `comprehensive`, `flow`


## Objective

Complete a full E2E: (1) Navigate to level-03. (2) Fill and submit login. (3) Assert success visible. (4) Navigate to level-01. (5) Assert h1 visible. Print 'LEVEL_PASSED'.

## Story

The End-to-End Champion combines navigation, interaction, waiting, and assertion.

## Hints
1. Step 1-3 is the login flow from level-155.
2. Step 4-5 is just goto + expect visible.
3. Print 'LEVEL_PASSED' after all steps.

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
    page.goto('http://localhost:5000/pages/level-01/')
    expect(page.locator('h1')).to_be_visible()
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # Step 1-3: Login flow
    page.goto('http://localhost:5000/pages/level-03/')
    # TODO: fill, submit, assert

    # Step 4-5: Navigate and assert
    page.goto('http://localhost:5000/pages/level-01/')
    # TODO: assert h1 visible

    print('LEVEL_PASSED')
    browser.close()
```
