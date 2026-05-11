# The Download Canceller

**Level:** 205
**ID:** `py-pl-205`
**Difficulty:** medium
**XP:** 300
**Tags:** `download`, `cancel`, `expect_download`, `download-lifecycle`


## Objective

Trigger `#cancel-btn` to start a download. Capture it with `expect_download`, call `download.cancel()`, then print `LEVEL_PASSED`.

## Story

Not every scroll should reach its destination. Master the art of cancelling a download before it completes.

## Hints
1. Call `download.cancel()` after capturing the download object
2. Cancellation is immediate — no waiting needed after the call

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-83/')
    with page.expect_download() as d:
        page.click('#cancel-btn')
    download = d.value
    download.cancel()
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-83/')
    with page.expect_download() as d:
        page.click('#cancel-btn')
    download = d.value
    # cancel the download and print LEVEL_PASSED
    browser.close()
```
