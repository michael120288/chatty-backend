# The POST Envoy

**Level:** 245
**ID:** `py-pl-245`
**Difficulty:** medium
**XP:** 300
**Tags:** `page.request`, `api-testing`, `post`, `json-body`


## Objective

Use `page.request.post("http://localhost:5000/api/v1/auth/signin", data={"username": "test", "password": "test"})`. Assert a response was received (status is an int). Print `LEVEL_PASSED`.

## Story

Some gates open only when you knock correctly. Send a POST request with JSON data.

## Hints
1. `page.request.post(url, data=dict)` sends a POST with JSON body
2. `response.status` will be an int regardless of success/failure

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    response = page.request.post(
        'http://localhost:5000/api/v1/auth/signin',
        data={'username': 'test', 'password': 'test'}
    )
    assert isinstance(response.status, int)
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    response = page.request.post(
        'http://localhost:5000/api/v1/auth/signin',
        data={'username': 'test', 'password': 'test'}
    )
    # assert isinstance(response.status, int), print LEVEL_PASSED
    browser.close()
```
