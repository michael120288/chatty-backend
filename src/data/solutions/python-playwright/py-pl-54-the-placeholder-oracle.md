# The Placeholder Oracle

**Level:** 54
**ID:** `py-pl-54`
**Difficulty:** medium
**XP:** 220
**Tags:** `get_by_placeholder`, `forms`, `locator`


## Objective

Use page.get_by_placeholder('Enter your wizard name') on level-03 to fill 'wizard'. Fill the password field by placeholder too. Submit and print 'LEVEL_PASSED' on success.

## Story

The Oracle speaks only in placeholders. Find inputs by what they whisper as hints.

## Hints
1. get_by_placeholder matches the placeholder attribute of the input.
2. Password placeholder is 'Enter your secret spell'.
3. Click the Submit button and check is_visible() on #success-message.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    page.get_by_placeholder('Enter your wizard name').fill('wizard')
    page.get_by_placeholder('Enter your secret spell').fill('playwright123')
    page.get_by_role('button').click()
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

    # TODO: get_by_placeholder('Enter your wizard name').fill('wizard')
    # TODO: get_by_placeholder('Enter your secret spell').fill('playwright123')
    # TODO: submit and check success

    browser.close()
```
