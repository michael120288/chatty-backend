# The Stealth Uncheck

**Level:** 219
**ID:** `py-pl-219`
**Difficulty:** medium
**XP:** 255
**Tags:** `uncheck`, `checkbox`, `is_checked`, `forms`


## Objective

Navigate to level-64. `#skill-stealth` starts checked. Call `uncheck()` on it. Assert `is_checked()` is False. Print `LEVEL_PASSED`.

## Story

The stealth skill was pre-selected but you must remove it. The uncheck() spell is the only way.

## Hints
1. `locator.uncheck()` unticks a checkbox only if it is currently checked
2. Verify with `locator.is_checked()` returning False

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-64/')
    page.locator('#skill-stealth').uncheck()
    assert not page.locator('#skill-stealth').is_checked()
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-64/')
    # #skill-stealth is pre-checked. Uncheck it, assert not checked, print LEVEL_PASSED
    browser.close()
```
