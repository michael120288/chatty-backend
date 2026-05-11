# The Response Header Inspector

**Level:** 244
**ID:** `py-pl-244`
**Difficulty:** medium
**XP:** 275
**Tags:** `page.request`, `api-testing`, `headers`, `content-type`


## Objective

GET the health endpoint. Use `response.headers` to access the headers dict. Assert `"content-type"` is present. Print `LEVEL_PASSED`.

## Story

Headers carry metadata about the response. Read the Content-Type header to confirm JSON was returned.

## Hints
1. `response.headers` returns a dict with lowercase header names
2. `"content-type" in headers` checks for the key

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    response = page.request.get('http://localhost:5000/api/v1/health')
    headers = response.headers
    assert 'content-type' in headers
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
    headers = response.headers
    # assert 'content-type' in headers, print LEVEL_PASSED
    browser.close()
```
