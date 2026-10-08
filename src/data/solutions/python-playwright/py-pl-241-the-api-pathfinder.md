# The API Pathfinder

**Level:** 241
**ID:** `py-pl-241`
**Difficulty:** medium
**XP:** 280
**Tags:** `page.request`, `api-testing`, `get`, `http`


## Objective

Use `page.request.get("http://localhost:5000/api/v1/health")` to call the health endpoint. Assert the response status is 200. Print `LEVEL_PASSED`.

## Story

Beyond the browser, the server speaks HTTP. Use Playwright's built-in request context to call the API directly.

## Hints
1. `page.request.get(url)` performs an HTTP GET
2. `response.status` returns the HTTP status code as an int

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    response = page.request.get('http://localhost:5000/api/v1/health')
    assert response.status == 200
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    response = page.request.get('http://localhost:5000/api/v1/health')
    # assert response.status == 200, print LEVEL_PASSED
    browser.close()
```
