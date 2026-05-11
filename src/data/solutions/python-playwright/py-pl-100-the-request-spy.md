# The Request Spy

**Level:** 100
**ID:** `py-pl-100`
**Difficulty:** medium
**XP:** 270
**Tags:** `expect_request`, `network`, `context_manager`


## Objective

Use page.expect_request('**/pages/level-01/**') as a context manager to capture the navigation request. Print its URL. Then print 'LEVEL_PASSED'.

## Story

The Intelligence Agent intercepts a specific request to read its URL and method.

## Hints
1. page.expect_request(pattern) returns a context manager.
2. req_info.value is the captured Request object.
3. Call .url on it to get the URL string.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    with page.expect_request('**/pages/level-01/**') as req_info:
        page.goto('http://localhost:5000/pages/level-01/')
    req = req_info.value
    print(req.url)
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # TODO: Use with page.expect_request('**/pages/level-01/**') as req_info:
    #           page.goto('http://localhost:5000/pages/level-01/')
    # request = req_info.value
    # print request.url
    # print 'LEVEL_PASSED'

    browser.close()
```
