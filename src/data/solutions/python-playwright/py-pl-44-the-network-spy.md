# The Network Spy

**Level:** 44
**ID:** `py-pl-44`
**Difficulty:** medium
**XP:** 200
**Tags:** `route`, `fulfill`, `network-mocking`, `expect`


## Objective

Mock all JSON responses with {'status': 'mocked'}. Navigate. Assert body is visible. Print 'LEVEL_PASSED'.

## Story

The Spy intercepts API calls and mocks the response, then verifies the page still loaded correctly.

## Hints
1. Set up route before goto.
2. Use route.fulfill(json={'status': 'mocked'}).
3. After goto, use expect(page.locator('body')).to_be_visible().

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.route('**/*.json', lambda route: route.fulfill(json={'status': 'mocked'}))
    page.goto('http://localhost:5000/pages/level-01/')
    expect(page.locator('body')).to_be_visible()
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # TODO: Route all *.json to return {'status': 'mocked'}
    # Then goto, assert body visible, print 'LEVEL_PASSED'

    browser.close()
```
