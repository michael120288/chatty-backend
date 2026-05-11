# The Enter Submitter

**Level:** 117
**ID:** `py-pl-117`
**Difficulty:** medium
**XP:** 270
**Tags:** `keyboard`, `enter`, `forms`


## Objective

On level-03 fill username and password, then press Enter. Check if #success-message is visible. Print 'LEVEL_PASSED'.

## Story

The Ritual requires submitting the form by pressing Enter — no mouse click allowed.

## Hints
1. keyboard.press('Enter') on a focused form input submits the form.
2. The password field should be focused after filling it.
3. Check page.locator('#success-message').is_visible().

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    page.locator('#username').fill('wizard')
    page.locator('#password').fill('playwright123')
    page.keyboard.press('Enter')
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

    page.locator('#username').fill('wizard')
    page.locator('#password').fill('playwright123')

    # TODO: page.keyboard.press('Enter') to submit
    # TODO: check #success-message visible
    # print 'LEVEL_PASSED'

    browser.close()
```
