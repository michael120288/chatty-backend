# The Screenshot Scribe

**Level:** 38
**ID:** `py-pl-38`
**Difficulty:** medium
**XP:** 100
**Tags:** `screenshot`, `capture`, `visual`


## Objective

Take a screenshot of the page and save it to '/tmp/screenshot.png'. Then print 'LEVEL_PASSED'.

## Story

The Scribe captures visual evidence of every realm visited. Take a screenshot and save it.

## Hints
1. page.screenshot(path='file.png') captures the current viewport.
2. The path must be writable — /tmp/ is safe in the sandbox.
3. Print 'LEVEL_PASSED' after the screenshot is saved.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.screenshot(path='/tmp/screenshot.png')
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: Use page.screenshot(path='/tmp/screenshot.png') then print 'LEVEL_PASSED'

    browser.close()
```
