# The Response Body Reader

**Level:** 137
**ID:** `py-pl-137`
**Difficulty:** medium
**XP:** 300
**Tags:** `expect_response`, `response`, `body`


## Objective

Use page.expect_response('**/level-01/**') to capture the HTML response. Read its body text and check it contains '<!DOCTYPE'. Print 'LEVEL_PASSED'.

## Story

The Analyst reads the full body of a captured response.

## Hints
1. expect_response() is a context manager like expect_request.
2. resp.text() returns the body as a string.
3. HTML pages start with '<!DOCTYPE html>'.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    with page.expect_response('**/pages/level-01/**') as resp_info:
        page.goto('http://localhost:5000/pages/level-01/')
    body = resp_info.value.text()
    if '<!DOCTYPE' in body:
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # TODO: Use with page.expect_response('**/pages/level-01/**') as resp_info:
    #           page.goto('http://localhost:5000/pages/level-01/')
    # resp = resp_info.value
    # body = resp.text()
    # Check '<!DOCTYPE' in body

    browser.close()
```
