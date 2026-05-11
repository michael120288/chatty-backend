# The Context Creator

**Level:** 101
**ID:** `py-pl-101`
**Difficulty:** medium
**XP:** 260
**Tags:** `browser_context`, `isolation`, `context`


## Objective

Create a browser context with browser.new_context(). Open a page from it, navigate to level-01. Print 'LEVEL_PASSED'.

## Story

The Architect spawns a fresh browsing context — a clean slate with no shared state.

## Hints
1. browser.new_context() creates an isolated context.
2. context.new_page() opens a page within that context.
3. Always close context when done.

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
    context = browser.new_context()
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: print 'LEVEL_PASSED'

    context.close()
    browser.close()
```
