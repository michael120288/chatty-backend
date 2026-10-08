# The Mastery Checker

**Level:** 218
**ID:** `py-pl-218`
**Difficulty:** medium
**XP:** 255
**Tags:** `check`, `checkbox`, `is_checked`, `forms`


## Objective

Navigate to level-64. Call `page.locator("#skill-combat").check()`. Assert `locator("#skill-combat").is_checked()` is True. Print `LEVEL_PASSED`.

## Story

Combat mastery must be activated. Use the check() method to tick the skill box.

## Hints
1. `locator.check()` ticks a checkbox
2. `locator.is_checked()` returns True/False synchronously

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-64/')
    page.locator('#skill-combat').check()
    assert page.locator('#skill-combat').is_checked()
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
    # check #skill-combat, assert is_checked, print LEVEL_PASSED
    browser.close()
```
