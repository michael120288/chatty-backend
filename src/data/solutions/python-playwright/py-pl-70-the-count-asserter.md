# The Count Asserter

**Level:** 70
**ID:** `py-pl-70`
**Difficulty:** medium
**XP:** 240
**Tags:** `expect`, `to_have_count`, `assertions`


## Objective

On level-01 use expect(page.locator('p')).to_have_count() with the actual paragraph count. Print 'LEVEL_PASSED'.

## Story

The Accountant verifies the exact count of elements — no more, no less.

## Hints
1. First use .count() to get the real number.
2. Then expect(locator).to_have_count(that_number) to assert.
3. This is a self-verifying assertion that proves the count is stable.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    count = page.locator('p').count()
    expect(page.locator('p')).to_have_count(count)
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

    # TODO: Get actual count first, then assert with to_have_count()
    # print 'LEVEL_PASSED'

    browser.close()
```
