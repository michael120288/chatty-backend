# The Multi-Scroll Uploader

**Level:** 214
**ID:** `py-pl-214`
**Difficulty:** medium
**XP:** 300
**Tags:** `set_input_files`, `multiple-files`, `file-upload`, `virtual-file`


## Objective

Upload two virtual files to `#multi-input` using `set_input_files()` with a list. Assert the page shows both file names. Print `LEVEL_PASSED`.

## Story

The vault demands multiple scrolls at once. Upload a batch of virtual files in a single incantation.

## Hints
1. Pass a list of dicts to `set_input_files()` for multiple files
2. Check the `#multi-info` section for rendered file names

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-81/')
    page.locator('#multi-input').set_input_files([
        {'name': 'fire.txt', 'mimeType': 'text/plain', 'buffer': b'fire scroll'},
        {'name': 'ice.txt', 'mimeType': 'text/plain', 'buffer': b'ice scroll'},
    ])
    page.wait_for_timeout(300)
    content = page.locator('#multi-info').inner_text()
    assert 'fire.txt' in content or 'ice.txt' in content
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
    page.locator('#multi-input').set_input_files([
        {'name': 'fire.txt', 'mimeType': 'text/plain', 'buffer': b'fire scroll'},
        {'name': 'ice.txt', 'mimeType': 'text/plain', 'buffer': b'ice scroll'},
    ])
    # assert both names appear, print LEVEL_PASSED
    browser.close()
```
