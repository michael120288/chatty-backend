# The Inner HTML Reader

**Level:** 63
**ID:** `py-pl-63`
**Difficulty:** medium
**XP:** 220
**Tags:** `inner_html`, `locator`, `dom`


## Objective

On level-01 use page.locator('h1').inner_html() to get the HTML inside h1. If non-empty, print 'LEVEL_PASSED'.

## Story

The Scribe copies the raw HTML of an element to study its structure.

## Hints
1. inner_html() returns the HTML content inside the element (not including the tag itself).
2. For a plain h1, it's just the text string.
3. Check if the result is truthy.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    html = page.locator('h1').inner_html()
    if html:
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

    # TODO: Get inner_html() of h1 and print 'LEVEL_PASSED' if non-empty

    browser.close()
```
