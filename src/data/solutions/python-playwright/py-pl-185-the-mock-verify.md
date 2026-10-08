# The Mock & Verify

**Level:** 185
**ID:** `py-pl-185`
**Difficulty:** medium
**XP:** 340
**Tags:** `mock`, `route`, `verify`


## Objective

Mock all JSON requests on level-01. Navigate. Verify h1 is still visible (page loaded). Print 'LEVEL_PASSED'.

## Story

The Illusionist mocks a request then verifies the page still rendered correctly.

## Hints
1. Mocking JSON doesn't break the HTML page.
2. The h1 is still present.
3. Use expect().to_be_visible().

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.route('**/*.json', lambda r: r.fulfill(json={'test': True}))
    page.goto('http://localhost:5000/pages/level-01/')
    expect(page.locator('h1')).to_be_visible()
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.route('**/*.json', lambda r: r.fulfill(json={'test': True}))
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: expect h1 visible, print 'LEVEL_PASSED'

    browser.close()
```
