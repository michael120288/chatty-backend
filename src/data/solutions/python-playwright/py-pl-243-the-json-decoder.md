# The JSON Decoder

**Level:** 243
**ID:** `py-pl-243`
**Difficulty:** medium
**XP:** 280
**Tags:** `page.request`, `api-testing`, `json`, `response-body`


## Objective

GET the health endpoint. Call `response.json()` to parse the body. Assert the result is a dict and has at least one key. Print `LEVEL_PASSED`.

## Story

The server speaks in JSON tongues. Decode the response body and read its secrets.

## Hints
1. `response.json()` parses the body as JSON and returns a Python dict/list
2. `isinstance(body, dict)` checks the type

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    response = page.request.get('http://localhost:5000/api/v1/health')
    body = response.json()
    assert isinstance(body, dict)
    assert len(body) > 0
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
    body = response.json()
    # assert body is a dict with at least one key, print LEVEL_PASSED
    browser.close()
```
