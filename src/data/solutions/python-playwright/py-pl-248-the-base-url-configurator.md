# The Base URL Configurator

**Level:** 248
**ID:** `py-pl-248`
**Difficulty:** medium
**XP:** 300
**Tags:** `APIRequestContext`, `base_url`, `api-testing`, `configuration`


## Objective

Create `p.request.new_context(base_url="http://localhost:5000")`. GET `"/api/v1/health"` (relative path). Assert `response.ok`. Print `LEVEL_PASSED`.

## Story

Typing the full URL every time is tedious. Configure a base URL and use relative paths.

## Hints
1. `base_url` is prepended to relative paths automatically
2. `"/api/v1/health"` with base `"http://localhost:5000"` becomes the full URL

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    request = p.request.new_context(base_url='http://localhost:5000')
    response = request.get('/api/v1/health')
    assert response.ok
    request.dispose()
    print('LEVEL_PASSED')
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    request = p.request.new_context(base_url='http://localhost:5000')
    response = request.get('/api/v1/health')
    # assert response.ok, print LEVEL_PASSED
    request.dispose()
```
