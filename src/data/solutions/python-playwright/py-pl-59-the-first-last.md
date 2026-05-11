# The First & Last

**Level:** 59
**ID:** `py-pl-59`
**Difficulty:** medium
**XP:** 220
**Tags:** `first`, `last`, `locator`


## Objective

On level-01 get the first and last div using .first and .last. If both have non-empty text_content(), print 'LEVEL_PASSED'.

## Story

The Sentinel guards the beginning and the end. Access both without indices.

## Hints
1. page.locator('div').first gives the first div.
2. page.locator('div').last gives the last.
3. .text_content() may return None for empty divs — use 'or ""' to default.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    first_text = page.locator('div').first.text_content() or ''
    last_text = page.locator('div').last.text_content() or ''
    if first_text or last_text:
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

    # TODO: Use page.locator('div').first and .last
    # Get their text_content() and print 'LEVEL_PASSED' if both non-empty

    browser.close()
```
