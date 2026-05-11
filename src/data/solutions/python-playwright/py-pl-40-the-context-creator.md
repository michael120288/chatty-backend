# The Context Creator

**Level:** 40
**ID:** `py-pl-40`
**Difficulty:** medium
**XP:** 100
**Tags:** `context`, `new_context`, `isolation`


## Objective

Create a new browser context, open a new page in it, navigate to the target, then print 'LEVEL_PASSED'.

## Story

The Architect creates isolated browser contexts — like parallel universes. Create a new context and open a page.

## Hints
1. browser.new_context() creates an isolated browser context (like a fresh incognito window).
2. context.new_page() opens a new tab in that context.
3. Close the context after use with context.close().

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    print('LEVEL_PASSED')
    context.close()
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()

    # TODO: context = browser.new_context()
    # page = context.new_page()
    # page.goto(...)
    # print 'LEVEL_PASSED'
    # context.close()

    browser.close()
```
