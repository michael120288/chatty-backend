# The Data Pipeline

**Level:** 196
**ID:** `py-pl-196`
**Difficulty:** medium
**XP:** 360
**Tags:** `pipeline`, `transform`, `data`


## Objective

On level-01: extract all p texts, filter non-empty, transform to uppercase, verify all are uppercase. Print 'LEVEL_PASSED'.

## Story

The Data Engineer extracts, transforms, and validates page data in a pipeline.

## Hints
1. Use locator('p').all() to get all paragraphs.
2. Filter out empty text_content().
3. Transform with .upper() and check all == .upper().

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    paras = page.locator('p').all()
    texts = [el.text_content() for el in paras]
    filtered = [t for t in texts if t and t.strip()]
    if filtered and all(t.upper() == t.upper() for t in filtered):
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

    # TODO: Extract, filter, transform, verify pipeline
    # print 'LEVEL_PASSED'

    browser.close()
```
