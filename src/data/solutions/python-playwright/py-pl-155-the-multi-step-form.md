# The Multi-Step Form

**Level:** 155
**ID:** `py-pl-155`
**Difficulty:** medium
**XP:** 280
**Tags:** `forms`, `multi-step`, `workflow`


## Objective

On level-03 fill username='wizard' and password='playwright123', then submit. Verify #success-message is visible. Print 'LEVEL_PASSED'.

## Story

The Wizard's Gauntlet requires filling all fields and submitting in sequence.

## Hints
1. Fill both fields before clicking submit.
2. Use locator.fill() for each input.
3. Check is_visible() on #success-message.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    page.locator('#username').fill('wizard')
    page.locator('#password').fill('playwright123')
    page.locator('#submit-btn').click()
    if page.locator('#success-message').is_visible():
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

    # TODO: Complete the full login flow
    # print 'LEVEL_PASSED' on success

    browser.close()
```
