# The Scroll Uploader

**Level:** 213
**ID:** `py-pl-213`
**Difficulty:** medium
**XP:** 290
**Tags:** `set_input_files`, `file-upload`, `virtual-file`, `input`


## Objective

Use `page.locator("#file-input").set_input_files()` to attach a virtual file named `"scroll.txt"` with content `"magic words"`. Assert the file name appears on the page. Print `LEVEL_PASSED`.

## Story

The archive vault accepts ancient scrolls via file input. Set the file to begin the upload ritual.

## Hints
1. Pass a dict with `name`, `mimeType`, and `buffer` to upload a virtual file
2. After set_input_files, check `#file-name` text on the page

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-81/')
    page.locator('#file-input').set_input_files({
        'name': 'scroll.txt',
        'mimeType': 'text/plain',
        'buffer': b'magic words'
    })
    page.wait_for_selector('#file-name')
    name = page.locator('#file-name').inner_text()
    assert 'scroll.txt' in name
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
    page.locator('#file-input').set_input_files({
        'name': 'scroll.txt',
        'mimeType': 'text/plain',
        'buffer': b'magic words'
    })
    # assert file name visible, print LEVEL_PASSED
    browser.close()
```
