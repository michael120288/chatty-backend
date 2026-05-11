# The ARIA Role Asserter

**Level:** 227
**ID:** `py-pl-227`
**Difficulty:** medium
**XP:** 295
**Tags:** `to_have_role`, `aria`, `expect`, `accessibility`


## Objective

Navigate to level-02. Find a button and assert `expect(button).to_have_role("button")`. Print `LEVEL_PASSED`.

## Story

Accessible elements carry ARIA roles. Assert the role to prove the element is properly enchanted.

## Hints
1. `expect(locator).to_have_role("button")` checks the ARIA role
2. Works on native HTML elements and elements with role attributes

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    btn = page.get_by_role('button').first
    expect(btn).to_have_role('button')
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    btn = page.get_by_role('button').first
    # assert it has role 'button' using to_have_role(), then print LEVEL_PASSED
    browser.close()
```
