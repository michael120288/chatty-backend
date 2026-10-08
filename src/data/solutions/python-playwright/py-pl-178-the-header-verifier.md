# The Header Verifier

**Level:** 178
**ID:** `py-pl-178`
**Difficulty:** medium
**XP:** 300
**Tags:** `request`, `headers`, `network`


## Objective

Capture the navigation request to level-01 and check its headers dict is non-empty. Print 'LEVEL_PASSED'.

## Story

The Protocol Analyst checks what headers were sent with the navigation request.

## Hints
1. req.headers returns a dict of request headers.
2. Browsers always send at least 'user-agent' and 'accept'.
3. Check len(headers) > 0.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    with page.expect_request('**/pages/level-01/**') as req_info:
        page.goto('http://localhost:5000/pages/level-01/')
    if len(req_info.value.headers) > 0:
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

    # TODO: Check req_info.value.headers is non-empty dict
    # print 'LEVEL_PASSED'

    browser.close()
```
