# The Status Code Reader

**Level:** 242
**ID:** `py-pl-242`
**Difficulty:** medium
**XP:** 265
**Tags:** `page.request`, `api-testing`, `response.ok`, `status-code`


## Objective

Call `page.request.get("http://localhost:5000/api/v1/health")`. Use `response.ok` to assert the request succeeded (status 200-299). Print `LEVEL_PASSED`.

## Story

A 200 means success, a 404 means the path is lost. Learn to read the server's response code.

## Hints
1. `response.ok` is True when status is 200-299
2. Equivalent to `200 <= response.status < 300`

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    response = page.request.get('http://localhost:5000/api/v1/health')
    assert response.ok
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
    # assert response.ok is True, print LEVEL_PASSED
    browser.close()
```
