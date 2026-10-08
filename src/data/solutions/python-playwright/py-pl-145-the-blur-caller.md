# The Blur Caller

**Level:** 145
**ID:** `py-pl-145`
**Difficulty:** medium
**XP:** 260
**Tags:** `blur`, `focus`, `forms`


## Objective

On level-03 focus the username input, then blur it using locator.blur(). Verify it's no longer focused. Print 'LEVEL_PASSED'.

## Story

The Detachment Mage removes focus from an element, triggering blur-based validation.

## Hints
1. locator.blur() removes focus from the element.
2. After blur, to_be_focused() would fail.
3. Use not_to_be_focused() or just print 'LEVEL_PASSED'.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    page.locator('#username').focus()
    page.locator('#username').blur()
    expect(page.locator('#username')).not_to_be_focused()
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

    page.locator('#username').focus()
    # TODO: page.locator('#username').blur()
    # Verify not focused
    # print 'LEVEL_PASSED'

    browser.close()
```
