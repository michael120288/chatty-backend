# The Grand API Master

**Level:** 255
**ID:** `py-pl-255`
**Difficulty:** medium
**XP:** 500
**Tags:** `APIRequestContext`, `hybrid`, `api-testing`, `browser+api`, `boss`


## Objective

Create a `new_context` with `base_url` set. Make a GET to `/api/v1/health`. Parse JSON. Assert status 200 and body is dict. Then launch a browser, navigate to level-01, assert page title non-empty. Print `LEVEL_PASSED`.

## Story

The ultimate API warrior combines all skills: context configuration, GET, POST, headers, JSON parsing, and hybrid browser+API flows.

## Hints
1. Combine standalone APIRequestContext with browser in the same `with sync_playwright()` block
2. Both API and browser assertions must pass

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    api = p.request.new_context(base_url='http://localhost:5000')
    response = api.get('/api/v1/health')
    body = response.json()
    assert response.status == 200
    assert isinstance(body, dict)

    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    assert page.title() != ''

    api.dispose()
    browser.close()
    print('LEVEL_PASSED')
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    # API context
    api = p.request.new_context(base_url='http://localhost:5000')
    response = api.get('/api/v1/health')
    body = response.json()
    # assert status and body type

    # Browser
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    # assert title non-empty, print LEVEL_PASSED

    api.dispose()
    browser.close()
```
