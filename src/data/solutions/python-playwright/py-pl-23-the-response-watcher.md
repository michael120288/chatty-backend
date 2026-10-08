# The Response Watcher

**Level:** 23
**ID:** `py-pl-23`
**Difficulty:** medium
**XP:** 100
**Tags:** `expect_response`, `network`, `status`


## Objective

Use page.expect_response() to capture the response from page.goto(). Check the status is 200, then print 'LEVEL_PASSED'.

## Story

The Chronicler records every response from the realm. Use expect_response to capture and inspect a page response.

## Hints
1. Use: with page.expect_response(lambda r: True) as resp_info:
2. Inside the block, call page.goto(...).
3. After the block, check resp_info.value.status == 200.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    with page.expect_response(lambda r: True) as resp_info:
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

    # TODO: Use 'with page.expect_response(lambda r: True) as resp_info:' around page.goto()
    # Then check resp_info.value.status == 200 and print 'LEVEL_PASSED'

    browser.close()
```
