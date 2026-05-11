# The Response Text Reader

**Level:** 249
**ID:** `py-pl-249`
**Difficulty:** medium
**XP:** 270
**Tags:** `APIRequestContext`, `api-testing`, `response.text`, `response-body`


## Objective

GET the health endpoint. Call `response.text()` to get the body as a string. Assert the string is non-empty. Print `LEVEL_PASSED`.

## Story

Not all responses speak JSON. Read the raw text body of a response.

## Hints
1. `response.text()` returns the response body as a UTF-8 string
2. `len(text) > 0` checks it is not empty

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    request = p.request.new_context()
    response = request.get('http://localhost:5000/api/v1/health')
    text = response.text()
    assert len(text) > 0
    request.dispose()
    print('LEVEL_PASSED')
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    request = p.request.new_context()
    response = request.get('http://localhost:5000/api/v1/health')
    text = response.text()
    # assert text is non-empty string, print LEVEL_PASSED
    request.dispose()
```
