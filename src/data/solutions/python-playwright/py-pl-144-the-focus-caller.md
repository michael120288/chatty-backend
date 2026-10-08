# The Focus Caller

**Level:** 144
**ID:** `py-pl-144`
**Difficulty:** medium
**XP:** 260
**Tags:** `focus`, `locator`, `keyboard`


## Objective

On level-03 use page.locator('#username').focus() to focus the input. Then verify it's focused with to_be_focused(). Print 'LEVEL_PASSED'.

## Story

The Attention Director programmatically gives focus to an element.

## Hints
1. locator.focus() calls the element's focus() method.
2. to_be_focused() verifies it's the active element.
3. Print 'LEVEL_PASSED' after.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    page.locator('#username').focus()
    expect(page.locator('#username')).to_be_focused()
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

    # TODO: page.locator('#username').focus()
    # expect(page.locator('#username')).to_be_focused()
    # print 'LEVEL_PASSED'

    browser.close()
```
