# The Text Seeker

**Level:** 18
**ID:** `py-pl-18`
**Difficulty:** medium
**XP:** 100
**Tags:** `expect`, `to_contain_text`, `text`


## Objective

Use expect(page.locator('#featured-item')).to_contain_text('Sword'), then print 'LEVEL_PASSED'.

## Story

The Seeker confirms the relic's description matches the ancient records. Assert the text is contained.

## Hints
1. to_contain_text() checks for a substring, not an exact match.
2. expect(page.locator('#featured-item')).to_contain_text('Sword')
3. This is case-sensitive by default.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    expect(page.locator('#featured-item')).to_contain_text('Sword')
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

    # TODO: Assert '#featured-item' contains the text 'Sword'
    # Then print 'LEVEL_PASSED'

    browser.close()
```
