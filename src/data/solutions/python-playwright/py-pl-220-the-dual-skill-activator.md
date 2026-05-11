# The Dual Skill Activator

**Level:** 220
**ID:** `py-pl-220`
**Difficulty:** medium
**XP:** 310
**Tags:** `check`, `select_option`, `multi-step`, `forms`


## Objective

Navigate to level-64. Check `#skill-combat` and `#skill-magic`. Select class `"warrior"`. Click `#enroll-btn`. Assert `#enroll-result` is visible. Print `LEVEL_PASSED`.

## Story

A hero needs both combat and magic. Check two boxes and enroll using the guild button.

## Hints
1. Chain check/uncheck calls before clicking enroll
2. `expect(page.locator("#enroll-result")).to_be_visible()`

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-64/')
    page.locator('#skill-combat').check()
    page.locator('#skill-magic').check()
    page.locator('#hero-class').select_option('warrior')
    page.locator('#enroll-btn').click()
    expect(page.locator('#enroll-result')).to_be_visible()
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-64/')
    # check combat, check magic, select warrior, click enroll, assert result visible
    browser.close()
```
