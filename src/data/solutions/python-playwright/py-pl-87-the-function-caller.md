# The Function Caller

**Level:** 87
**ID:** `py-pl-87`
**Difficulty:** medium
**XP:** 240
**Tags:** `evaluate`, `javascript`, `dom`


## Objective

On level-01 use page.evaluate() to call a JS function that returns document.title. If non-empty, print 'LEVEL_PASSED'.

## Story

The JavaScript Sage evaluates a function on the page to extract computed data.

## Hints
1. page.evaluate() takes a JS expression string or function.
2. '() => document.title' returns the document title.
3. Check if the result is truthy.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    title = page.evaluate('() => document.title')
    if title:
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

    # TODO: title = page.evaluate('() => document.title')
    # print 'LEVEL_PASSED' if non-empty

    browser.close()
```
