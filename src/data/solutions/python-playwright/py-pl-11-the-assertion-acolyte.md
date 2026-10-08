# The Assertion Acolyte

**Level:** 11
**ID:** `py-pl-11`
**Difficulty:** medium
**XP:** 100
**Tags:** `expect`, `to_have_text`, `assertions`


## Objective

Use expect(page.locator('h1')).to_have_text() to assert the h1 is not empty, then print 'LEVEL_PASSED'.

## Story

The Temple of Truth demands precise assertions. Use the expect API to verify the heading's text.

## Hints
1. Import expect: from playwright.sync_api import sync_playwright, expect
2. Use expect(locator).not_to_be_empty() to assert text exists.
3. Print 'LEVEL_PASSED' after the assertion passes.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    expect(page.locator('h1')).not_to_be_empty()
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: Use expect(page.locator('h1')).not_to_be_empty() or to_have_text(...)
    # Then print 'LEVEL_PASSED'

    browser.close()
```
