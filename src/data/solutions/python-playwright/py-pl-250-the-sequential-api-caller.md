# The Sequential API Caller

**Level:** 250
**ID:** `py-pl-250`
**Difficulty:** medium
**XP:** 290
**Tags:** `APIRequestContext`, `api-testing`, `sequential`, `session`


## Objective

Make two GET requests to the health endpoint using the same context. Assert both responses are OK. Print `LEVEL_PASSED`.

## Story

First you authenticate, then you fetch data. Chain API calls in sequence.

## Hints
1. The same context reuses any cookies/session between requests
2. Assert `r1.ok and r2.ok`

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    request = p.request.new_context(base_url='http://localhost:5000')
    r1 = request.get('/api/v1/health')
    r2 = request.get('/api/v1/health')
    assert r1.ok and r2.ok
    request.dispose()
    print('LEVEL_PASSED')
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    request = p.request.new_context(base_url='http://localhost:5000')
    r1 = request.get('/api/v1/health')
    r2 = request.get('/api/v1/health')
    # assert both are ok, print LEVEL_PASSED
    request.dispose()
```
