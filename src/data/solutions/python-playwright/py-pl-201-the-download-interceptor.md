# The Download Interceptor

**Level:** 201
**ID:** `py-pl-201`
**Difficulty:** medium
**XP:** 270
**Tags:** `download`, `expect_download`, `suggested_filename`, `context-manager`


## Objective

Click `#download-btn` to trigger a download. Use `with page.expect_download() as d:` to capture it. Assert `d.value.suggested_filename` equals `"report.txt"`, then print `LEVEL_PASSED`.

## Story

The Archive Gate guards precious scrolls behind download links. You must intercept the file as it crosses into the mortal realm.

## Hints
1. Use `with page.expect_download() as d_info:` context manager
2. Access via `d_info.value` after the block
3. `download.suggested_filename` gives the file name

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-83/')
    with page.expect_download() as d:
        page.click('#download-btn')
    download = d.value
    assert download.suggested_filename == 'report.txt'
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-83/')
    with page.expect_download() as d:
        page.click('#download-btn')
    download = d.value
    # assert suggested filename and print LEVEL_PASSED
    browser.close()
```
