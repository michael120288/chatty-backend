# The Contain Checker

**Level:** 67
**ID:** `py-pl-67`
**Difficulty:** medium
**XP:** 230
**Tags:** `expect`, `to_contain_text`, `assertions`


## Objective

On level-01 use expect(page.locator('h1')).to_contain_text('Level') to verify the heading mentions 'Level'. Then print 'LEVEL_PASSED'.

## Story

Sometimes you only know part of the text — use contain_text to find partial matches.

## Hints
1. to_contain_text checks for a substring, not exact match.
2. The h1 text contains 'Level 1' or similar.
3. After the assertion passes, print 'LEVEL_PASSED'.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    expect(page.locator('h1')).to_contain_text('Level')
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

    # TODO: expect(page.locator('h1')).to_contain_text('Level')
    # print 'LEVEL_PASSED'

    browser.close()
```
