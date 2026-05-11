# The 404 Detector

**Level:** 254
**ID:** `py-pl-254`
**Difficulty:** medium
**XP:** 270
**Tags:** `APIRequestContext`, `api-testing`, `404`, `error-status`


## Objective

GET `http://localhost:5000/api/v1/nonexistent-endpoint-xyz`. Assert `response.status == 404`. Print `LEVEL_PASSED`.

## Story

A path that does not exist returns 404. Assert the correct status when requesting a missing resource.

## Hints
1. A 404 response still returns an `APIResponse` object — no exception is thrown
2. `response.ok` will be False for 404

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    request = p.request.new_context()
    response = request.get('http://localhost:5000/api/v1/nonexistent-endpoint-xyz')
    assert response.status == 404
    request.dispose()
    print('LEVEL_PASSED')
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    request = p.request.new_context()
    response = request.get('http://localhost:5000/api/v1/nonexistent-endpoint-xyz')
    # assert status == 404, print LEVEL_PASSED
    request.dispose()
```
