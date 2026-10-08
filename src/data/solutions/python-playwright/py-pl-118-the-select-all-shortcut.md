# The Select All Shortcut

**Level:** 118
**ID:** `py-pl-118`
**Difficulty:** medium
**XP:** 280
**Tags:** `keyboard`, `shortcut`, `ctrl`


## Objective

Fill username with 'oldtext', then use Ctrl+A to select all and type 'newtext'. Verify value is 'newtext'. Print 'LEVEL_PASSED'.

## Story

The Speed Demon uses Ctrl+A to select all text in a field instantly.

## Hints
1. page.keyboard.press('Control+a') selects all text in the focused input.
2. Then page.keyboard.type('newtext') replaces the selection.
3. Read back with .input_value().

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    page.locator('#username').fill('oldtext')
    page.locator('#username').click()
    page.keyboard.press('Control+a')
    page.keyboard.type('newtext')
    if page.locator('#username').input_value() == 'newtext':
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

    page.locator('#username').fill('oldtext')
    page.locator('#username').click()

    # TODO: page.keyboard.press('Control+a') then type('newtext')
    # TODO: Verify value == 'newtext'

    browser.close()
```
