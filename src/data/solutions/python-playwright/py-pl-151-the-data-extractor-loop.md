# The Data Extractor Loop

**Level:** 151
**ID:** `py-pl-151`
**Difficulty:** medium
**XP:** 280
**Tags:** `loop`, `all`, `extraction`


## Objective

On level-01 get all div elements with .all(), loop over them, collect non-empty text_content(). If list is non-empty, print 'LEVEL_PASSED'.

## Story

The Harvester iterates over multiple elements and extracts their text in bulk.

## Hints
1. locator.all() returns a list of Locator objects.
2. Call .text_content() on each.
3. Filter out None/empty values.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    divs = page.locator('div').all()
    texts = [d.text_content() for d in divs if d.text_content()]
    if texts:
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

    # TODO: divs = page.locator('div').all()
    # texts = [d.text_content() for d in divs if d.text_content()]
    # print 'LEVEL_PASSED' if texts

    browser.close()
```
