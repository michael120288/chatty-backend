# The File Clearer

**Level:** 215
**ID:** `py-pl-215`
**Difficulty:** medium
**XP:** 280
**Tags:** `set_input_files`, `clear-input`, `file-upload`, `input`


## Objective

Upload a virtual file to `#file-input`, then call `set_input_files([])` to clear it. Assert the file is gone (page shows "No file selected"). Print `LEVEL_PASSED`.

## Story

After uploading a scroll, the ritual demands you clear the file input — resetting it to an empty state.

## Hints
1. `set_input_files([])` clears the file input
2. The page shows "No file selected" when the input is empty

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-81/')
    page.locator('#file-input').set_input_files({'name': 'tmp.txt', 'mimeType': 'text/plain', 'buffer': b'x'})
    page.wait_for_timeout(200)
    page.locator('#file-input').set_input_files([])
    page.wait_for_timeout(200)
    content = page.locator('#file-info').inner_text()
    assert 'No file selected' in content
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-81/')
    page.locator('#file-input').set_input_files({'name': 'tmp.txt', 'mimeType': 'text/plain', 'buffer': b'x'})
    page.wait_for_timeout(200)
    page.locator('#file-input').set_input_files([])
    # assert page shows "No file selected" text, print LEVEL_PASSED
    browser.close()
```
