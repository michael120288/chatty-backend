# The Response Status Checker

**Level:** 158
**ID:** `py-pl-158`
**Difficulty:** medium
**XP:** 280
**Tags:** `response`, `status`, `network`


## Objective

Navigate to level-01. Collect responses. Check that the main page response has status 200. Print 'LEVEL_PASSED'.

## Story

The Quality Inspector verifies every response comes back healthy.

## Hints
1. resp_info.value is the Response object.
2. .status gives the HTTP status code.
3. Check == 200.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    with page.expect_response('**/pages/level-01/**') as resp_info:
        page.goto('http://localhost:5000/pages/level-01/')
    if resp_info.value.status == 200:
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    with page.expect_response('**/pages/level-01/**') as resp_info:
        page.goto('http://localhost:5000/pages/level-01/')

    # TODO: Check resp_info.value.status == 200
    # print 'LEVEL_PASSED'

    browser.close()
```
