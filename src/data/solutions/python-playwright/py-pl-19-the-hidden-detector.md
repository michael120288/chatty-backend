# The Hidden Detector

**Level:** 19
**ID:** `py-pl-19`
**Difficulty:** medium
**XP:** 100
**Tags:** `expect`, `not_to_be_hidden`, `visibility`


## Objective

Check that the page body is NOT hidden. Use expect(page.locator('body')).not_to_be_hidden(), then print 'LEVEL_PASSED'.

## Story

The Spy must confirm that certain elements are hidden from view — invisible to the untrained eye.

## Hints
1. expect(locator).not_to_be_hidden() is the negation of to_be_hidden().
2. The body element is always visible on a loaded page.
3. Print 'LEVEL_PASSED' after the assertion passes.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    expect(page.locator('body')).not_to_be_hidden()
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

    # TODO: Assert body is NOT hidden using not_to_be_hidden()
    # Then print 'LEVEL_PASSED'

    browser.close()
```
