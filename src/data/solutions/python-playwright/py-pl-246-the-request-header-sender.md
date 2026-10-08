# The Request Header Sender

**Level:** 246
**ID:** `py-pl-246`
**Difficulty:** medium
**XP:** 290
**Tags:** `page.request`, `api-testing`, `custom-headers`, `http-headers`


## Objective

Send a GET to the health endpoint with a custom header `{"X-Test": "playwright"}`. Assert `response.status == 200`. Print `LEVEL_PASSED`.

## Story

Special headers carry credentials and content hints. Learn to attach custom headers to your requests.

## Hints
1. Pass `headers={"key": "value"}` to `.get()` or `.post()`
2. Headers merge with any defaults from the context

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    response = page.request.get(
        'http://localhost:5000/api/v1/health',
        headers={'X-Test': 'playwright'}
    )
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
    response = page.request.get(
        'http://localhost:5000/api/v1/health',
        headers={'X-Test': 'playwright'}
    )
    # assert status 200, print LEVEL_PASSED
    browser.close()
```
