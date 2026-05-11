# The CSV Collector

**Level:** 203
**ID:** `py-pl-203`
**Difficulty:** medium
**XP:** 270
**Tags:** `download`, `suggested_filename`, `csv`, `expect_download`


## Objective

Click `#download-csv` to trigger a CSV download. Assert `suggested_filename` ends with `".csv"`, then print `LEVEL_PASSED`.

## Story

The data alchemist requires the spreadsheet of records. Only the CSV download will satisfy the ritual.

## Hints
1. `download.suggested_filename.endswith(".csv")` checks the extension
2. You can also use `assert "data" in download.suggested_filename`

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-83/')
    with page.expect_download() as d:
        page.click('#download-csv')
    download = d.value
    assert download.suggested_filename.endswith('.csv')
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
        page.click('#download-csv')
    download = d.value
    # assert filename ends with .csv and print LEVEL_PASSED
    browser.close()
```
