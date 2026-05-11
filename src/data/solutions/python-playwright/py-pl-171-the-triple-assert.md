# The Triple Assert

**Level:** 171
**ID:** `py-pl-171`
**Difficulty:** medium
**XP:** 330
**Tags:** `expect`, `multiple_assertions`, `boss`


## Objective

On level-02: (1) expect h1 to_be_visible, (2) expect reveal-btn to_be_enabled, (3) expect secret-message not_to_be_visible. All pass = print 'LEVEL_PASSED'.

## Story

The Trinity Checker fires three different assertion types in sequence.

## Hints
1. h1 is always visible.
2. The button is enabled.
3. #secret-message starts hidden — not_to_be_visible().

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    expect(page.locator('h1')).to_be_visible()
    expect(page.locator('#reveal-btn')).to_be_enabled()
    expect(page.locator('#secret-message')).not_to_be_visible()
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

    # TODO: 3 assertions, then print 'LEVEL_PASSED'

    browser.close()
```
