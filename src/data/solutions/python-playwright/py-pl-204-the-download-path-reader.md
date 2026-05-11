# The Download Path Reader

**Level:** 204
**ID:** `py-pl-204`
**Difficulty:** medium
**XP:** 290
**Tags:** `download`, `save_as`, `os.path`, `file-system`


## Objective

Trigger `#download-btn`, capture the download, save it to `/tmp/pw_test.txt`, then assert the saved path exists using `os.path.exists`. Print `LEVEL_PASSED`.

## Story

After saving a scroll you must verify it truly arrived. Read its temporary path to confirm.

## Hints
1. `os.path.exists(save_path)` returns True if the file was saved
2. Assert it is True before printing LEVEL_PASSED

## Solution

```python
import os
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-83/')
    with page.expect_download() as d:
        page.click('#download-btn')
    download = d.value
    save_path = '/tmp/pw_test.txt'
    download.save_as(save_path)
    assert os.path.exists(save_path)
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
import os
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-83/')
    with page.expect_download() as d:
        page.click('#download-btn')
    download = d.value
    save_path = '/tmp/pw_test.txt'
    download.save_as(save_path)
    # assert file exists, then print LEVEL_PASSED
    browser.close()
```
