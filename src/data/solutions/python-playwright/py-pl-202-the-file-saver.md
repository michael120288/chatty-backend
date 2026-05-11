# The File Saver

**Level:** 202
**ID:** `py-pl-202`
**Difficulty:** medium
**XP:** 280
**Tags:** `download`, `save_as`, `expect_download`, `file-system`


## Objective

Trigger `#download-btn`, capture the download, save it to `/tmp/report.txt` with `download.save_as()`, then print `LEVEL_PASSED`.

## Story

Capturing a scroll mid-flight is only half the battle. The archivist demands it be saved to permanent storage.

## Hints
1. `download.save_as("/tmp/report.txt")` writes it to disk
2. After save_as, you can verify with Python's `os.path.exists()`

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
    download.save_as('/tmp/report.txt')
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
        page.click('#download-btn')
    download = d.value
    # save to /tmp/report.txt and print LEVEL_PASSED
    browser.close()
```
