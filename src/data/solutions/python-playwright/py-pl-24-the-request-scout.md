# The Request Scout

**Level:** 24
**ID:** `py-pl-24`
**Difficulty:** medium
**XP:** 100
**Tags:** `expect_request`, `network`, `request`


## Objective

Use page.expect_request() to capture the first request from page.goto(). If the URL is not empty, print 'LEVEL_PASSED'.

## Story

The Scout intercepts the first outgoing request and reports its URL. Capture and inspect a page request.

## Hints
1. Use: with page.expect_request(lambda r: True) as req_info:
2. Inside the block, call page.goto(...).
3. After the block, check if req_info.value.url is truthy.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    with page.expect_request(lambda r: True) as req_info:
        page.goto('http://localhost:5000/pages/level-01/')
    if req_info.value.url:
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # TODO: Use 'with page.expect_request(lambda r: True) as req_info:' around page.goto()
    # Then check req_info.value.url and print 'LEVEL_PASSED'

    browser.close()
```
