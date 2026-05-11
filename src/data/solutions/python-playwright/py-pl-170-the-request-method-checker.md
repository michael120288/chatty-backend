# The Request Method Checker

**Level:** 170
**ID:** `py-pl-170`
**Difficulty:** medium
**XP:** 290
**Tags:** `request`, `method`, `network`


## Objective

Capture the navigation request to level-01 with expect_request. Check its method is 'GET'. Print 'LEVEL_PASSED'.

## Story

The Protocol Analyst inspects the HTTP method of captured requests.

## Hints
1. req.method returns the HTTP method as uppercase string.
2. GET is the default for navigation.
3. Check == 'GET'.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    with page.expect_request('**/pages/level-01/**') as req_info:
        page.goto('http://localhost:5000/pages/level-01/')
    if req_info.value.method == 'GET':
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    with page.expect_request('**/pages/level-01/**') as req_info:
        page.goto('http://localhost:5000/pages/level-01/')

    # TODO: Check req_info.value.method == 'GET'
    # print 'LEVEL_PASSED'

    browser.close()
```
