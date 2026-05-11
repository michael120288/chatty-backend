# The Extra Headers Context

**Level:** 253
**ID:** `py-pl-253`
**Difficulty:** medium
**XP:** 300
**Tags:** `APIRequestContext`, `extra_http_headers`, `api-testing`, `configuration`


## Objective

Create `p.request.new_context(extra_http_headers={"X-Client": "pytest"})`. GET the health endpoint. Assert status 200. Print `LEVEL_PASSED`.

## Story

Every request from this context should carry your identity. Set default headers once.

## Hints
1. `extra_http_headers` applies to every request in the context
2. This is the same option available on `browser.new_context()`

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    request = p.request.new_context(
        extra_http_headers={'X-Client': 'pytest'}
    )
    response = request.get('http://localhost:5000/api/v1/health')
    assert response.status == 200
    request.dispose()
    print('LEVEL_PASSED')
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    request = p.request.new_context(
        extra_http_headers={'X-Client': 'pytest'}
    )
    response = request.get('http://localhost:5000/api/v1/health')
    # assert status 200, print LEVEL_PASSED
    request.dispose()
```
