# The Route Blocker

**Level:** 21
**ID:** `py-pl-21`
**Difficulty:** medium
**XP:** 100
**Tags:** `route`, `fulfill`, `network-mocking`


## Objective

Set up a route to intercept '**/*.json' requests and fulfill with {'mocked': True}. Then navigate and print 'LEVEL_PASSED'.

## Story

The Shadow Guild intercepts all API calls. Use route.fulfill() to return a mocked JSON response.

## Hints
1. page.route(pattern, handler) intercepts matching requests.
2. Use route.fulfill(json={...}) to return a JSON response.
3. Set up the route BEFORE page.goto().

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.route('**/*.json', lambda route: route.fulfill(json={'mocked': True}))
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

    # TODO: Use page.route('**/*.json', lambda route: route.fulfill(json={'mocked': True}))
    # Then page.goto(...) and print 'LEVEL_PASSED'

    browser.close()
```
