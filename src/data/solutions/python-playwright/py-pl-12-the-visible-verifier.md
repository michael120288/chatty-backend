# The Visible Verifier

**Level:** 12
**ID:** `py-pl-12`
**Difficulty:** medium
**XP:** 100
**Tags:** `expect`, `to_be_visible`, `visibility`


## Objective

Use expect(page.locator('#featured-item')).to_be_visible() then print 'LEVEL_PASSED'.

## Story

The Guard will not let you pass until you prove the featured relic is truly visible — not just present.

## Hints
1. Use expect(page.locator('#featured-item')).to_be_visible().
2. This assertion waits up to 5s for the element to become visible.
3. Print 'LEVEL_PASSED' after the assertion.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    expect(page.locator('#featured-item')).to_be_visible()
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

    # TODO: Assert #featured-item is visible using expect
    # Then print 'LEVEL_PASSED'

    browser.close()
```
