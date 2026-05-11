# The API + Browser Combiner

**Level:** 252
**ID:** `py-pl-252`
**Difficulty:** medium
**XP:** 350
**Tags:** `page.request`, `api-testing`, `hybrid`, `browser+api`


## Objective

Use `page.request.get("http://localhost:5000/api/v1/health")` to check the API, then navigate the browser page to `${BASE}/level-01/`. Assert both: API status 200 AND `page.title()` non-empty. Print `LEVEL_PASSED`.

## Story

The most powerful tests marry the browser and the API. Use both in the same test to setup state and verify the UI.

## Hints
1. `page.request` shares cookies with the browser context
2. Both assertions must pass before printing LEVEL_PASSED

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    api_response = page.request.get('http://localhost:5000/api/v1/health')
    page.goto('http://localhost:5000/pages/level-01/')
    assert api_response.status == 200
    assert page.title() != ''
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    api_response = page.request.get('http://localhost:5000/api/v1/health')
    page.goto('http://localhost:5000/pages/level-01/')
    # assert api_response.status == 200 AND page.title() non-empty, print LEVEL_PASSED
    browser.close()
```
