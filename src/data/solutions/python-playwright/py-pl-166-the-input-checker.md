# The Input Checker

**Level:** 166
**ID:** `py-pl-166`
**Difficulty:** medium
**XP:** 270
**Tags:** `is_enabled`, `is_editable`, `validation`


## Objective

On level-03 check #username is_enabled() and is_editable(). If both True, fill it and print 'LEVEL_PASSED'.

## Story

The Validator confirms an element is both enabled and editable before typing.

## Hints
1. is_enabled() checks not disabled.
2. is_editable() checks not readonly.
3. Both should be True for a normal text input.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    user = page.locator('#username')
    if user.is_enabled() and user.is_editable():
        user.fill('test')
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

    # TODO: Check is_enabled() and is_editable()
    # If both True, fill and print 'LEVEL_PASSED'

    browser.close()
```
