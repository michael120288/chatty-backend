# The URL Builder

**Level:** 251
**ID:** `py-pl-251`
**Difficulty:** medium
**XP:** 285
**Tags:** `APIRequestContext`, `api-testing`, `query-params`, `params`


## Objective

GET `http://localhost:5000/api/v1/health` with `params={"check": "true"}`. Assert `response.ok`. Print `LEVEL_PASSED`.

## Story

Dynamic query parameters shape the path of your request. Pass params in the request call.

## Hints
1. `params=` appends query string parameters to the URL
2. Becomes `?check=true` in the final URL

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    request = p.request.new_context()
    response = request.get(
        'http://localhost:5000/api/v1/health',
        params={'check': 'true'}
    )
    assert response.ok
    request.dispose()
    print('LEVEL_PASSED')
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    request = p.request.new_context()
    response = request.get(
        'http://localhost:5000/api/v1/health',
        params={'check': 'true'}
    )
    # assert response.ok, print LEVEL_PASSED
    request.dispose()
```
