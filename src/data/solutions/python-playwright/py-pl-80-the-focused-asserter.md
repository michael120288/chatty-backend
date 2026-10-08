# The Focused Asserter

**Level:** 80
**ID:** `py-pl-80`
**Difficulty:** medium
**XP:** 240
**Tags:** `expect`, `to_be_focused`, `forms`


## Objective

On level-03 click the username input. Then use expect(page.locator('#username')).to_be_focused(). Print 'LEVEL_PASSED'.

## Story

The Concentration Master checks which element holds the user's focus.

## Hints
1. page.locator('#username').click() focuses the input.
2. to_be_focused() asserts document.activeElement is this input.
3. Print 'LEVEL_PASSED' after.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    page.locator('#username').click()
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

    # TODO: Click #username to focus it
    # TODO: expect(page.locator('#username')).to_be_focused()
    # print 'LEVEL_PASSED'

    browser.close()
```
