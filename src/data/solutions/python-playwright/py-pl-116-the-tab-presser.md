# The Tab Presser

**Level:** 116
**ID:** `py-pl-116`
**Difficulty:** medium
**XP:** 270
**Tags:** `keyboard`, `tab`, `focus`


## Objective

On level-03 click the username field, then press Tab to move to password. Use page.keyboard.press('Tab'). Verify password is focused. Print 'LEVEL_PASSED'.

## Story

The Navigator moves focus between fields using the Tab key.

## Hints
1. page.locator('#username').click() focuses the username.
2. page.keyboard.press('Tab') moves focus to the next field.
3. expect(page.locator('#password')).to_be_focused() verifies.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    page.locator('#username').click()
    page.keyboard.press('Tab')
    expect(page.locator('#password')).to_be_focused()
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

    # TODO: Click username, press Tab, check #password is focused
    # print 'LEVEL_PASSED'

    browser.close()
```
