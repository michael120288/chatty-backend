# The Standalone Request Context

**Level:** 247
**ID:** `py-pl-247`
**Difficulty:** medium
**XP:** 320
**Tags:** `APIRequestContext`, `api-testing`, `no-browser`, `standalone`


## Objective

Create a standalone request context with `p.request.new_context()`. GET the health endpoint. Assert `response.status == 200`. Dispose the context. Print `LEVEL_PASSED`.

## Story

Sometimes you need an API client that stands alone — no browser page required.

## Hints
1. `p.request.new_context()` creates an `APIRequestContext` with no browser
2. `request.dispose()` cleans up the context after use

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    request = p.request.new_context()
    response = request.get('http://localhost:5000/api/v1/health')
    assert response.status == 200
    request.dispose()
    print('LEVEL_PASSED')
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    request = p.request.new_context()
    response = request.get('http://localhost:5000/api/v1/health')
    # assert status 200, dispose, print LEVEL_PASSED
```
