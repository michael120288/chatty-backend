# The JSON Mocker

**Level:** 99
**ID:** `py-pl-99`
**Difficulty:** medium
**XP:** 270
**Tags:** `route`, `fulfill`, `json`, `mock`


## Objective

Use page.route to intercept any **/*.json request and fulfill it with json={'mocked': True}. Navigate to level-01 and print 'LEVEL_PASSED'.

## Story

The Illusionist replaces real API responses with fabricated JSON data.

## Hints
1. route.fulfill(json={...}) responds with JSON data.
2. Content-Type is set automatically when using json=.
3. Set up the route BEFORE goto.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.route('**/*.json', lambda r: r.fulfill(json={'mocked': True}))
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

    # TODO: route **/*.json to fulfill with json={'mocked': True}
    page.goto('http://localhost:5000/pages/level-01/')
    print('LEVEL_PASSED')

    browser.close()
```
