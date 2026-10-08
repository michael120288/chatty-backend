# The Census Taker

**Level:** 13
**ID:** `py-pl-13`
**Difficulty:** medium
**XP:** 100
**Tags:** `expect`, `to_have_count`, `count`


## Objective

Count 'li' elements on the page. Use expect to assert count is greater than 0, then print 'LEVEL_PASSED'.

## Story

The Kingdom needs an exact count of list items. Assert the count precisely using the expect API.

## Hints
1. Get count = page.locator('li').count() first.
2. Then use expect(page.locator('li')).to_have_count(count).
3. Or simply: if count > 0: print('LEVEL_PASSED')

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    count = page.locator('li').count()
    expect(page.locator('li')).to_have_count(count)
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

    # TODO: Use expect(page.locator('li')).to_have_count() with the correct count
    # Or check count manually and print 'LEVEL_PASSED'

    browser.close()
```
