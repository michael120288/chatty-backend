# The Element Handle

**Level:** 89
**ID:** `py-pl-89`
**Difficulty:** medium
**XP:** 240
**Tags:** `query_selector`, `element_handle`, `dom`


## Objective

On level-01 use page.query_selector('h1') to get an element handle. Call .text_content() on it. If non-empty, print 'LEVEL_PASSED'.

## Story

The Artisan works with element handles — a lower-level way to interact with the DOM.

## Hints
1. query_selector returns an ElementHandle or None.
2. Check if el is not None before calling .text_content().
3. ElementHandle methods are synchronous in sync_api.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    el = page.query_selector('h1')
    if el and el.text_content():
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

    # TODO: el = page.query_selector('h1')
    # TODO: text = el.text_content()
    # print 'LEVEL_PASSED' if non-empty

    browser.close()
```
