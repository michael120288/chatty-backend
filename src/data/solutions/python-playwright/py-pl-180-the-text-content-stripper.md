# The Text Content Stripper

**Level:** 180
**ID:** `py-pl-180`
**Difficulty:** medium
**XP:** 260
**Tags:** `text_content`, `strip`, `basics`


## Objective

On level-01 get h1 text_content(), strip it, and check it's non-empty. Print 'LEVEL_PASSED'.

## Story

The Cleaner always strips whitespace from extracted text before comparing.

## Hints
1. text_content() may include leading/trailing whitespace.
2. .strip() removes it.
3. Check if result is truthy.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    text = page.locator('h1').text_content().strip()
    if text:
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

    # TODO: text = page.locator('h1').text_content().strip()
    # print 'LEVEL_PASSED' if text

    browser.close()
```
