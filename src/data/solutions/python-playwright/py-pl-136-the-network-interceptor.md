# The Network Interceptor

**Level:** 136
**ID:** `py-pl-136`
**Difficulty:** medium
**XP:** 300
**Tags:** `route`, `continue_`, `headers`, `network`


## Objective

Use page.route to intercept any request to level-01 and add a custom header using route.continue_(headers={...}). Print 'LEVEL_PASSED'.

## Story

The Customs Inspector intercepts network requests and modifies them on the fly.

## Hints
1. route.continue_(headers=...) passes the request through with modified headers.
2. We merge existing headers with the new one.
3. Print 'LEVEL_PASSED' after goto.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    def handle_route(route):
        headers = {**route.request.headers, 'x-test': 'playwright'}
        route.continue_(headers=headers)
    page.route('**/level-01/**', handle_route)
    page.goto('http://localhost:5000/pages/level-01/')
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    def handle_route(route):
        headers = {**route.request.headers, 'x-test': 'playwright'}
        route.continue_(headers=headers)

    page.route('**/level-01/**', handle_route)
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: print 'LEVEL_PASSED'

    browser.close()
```
