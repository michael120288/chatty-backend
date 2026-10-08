# The Fixture-Style Setup

**Level:** 192
**ID:** `py-pl-192`
**Difficulty:** medium
**XP:** 380
**Tags:** `context_manager`, `fixture`, `pattern`


## Objective

Write a context manager class BrowserSession that yields a page. Use it to navigate to level-01 and print 'LEVEL_PASSED'.

## Story

The Test Architect uses Python context managers for clean setup and teardown.

## Hints
1. The context manager handles browser lifecycle.
2. Inside the with block, page is ready to use.
3. Just print 'LEVEL_PASSED' after goto.

## Solution

```python
from playwright.sync_api import sync_playwright
from contextlib import contextmanager

@contextmanager
def browser_session():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            yield page
        finally:
            browser.close()

with browser_session() as page:
    page.goto('http://localhost:5000/pages/level-01/')
    print('LEVEL_PASSED')
```

## Starter Code

```python
from playwright.sync_api import sync_playwright
from contextlib import contextmanager

@contextmanager
def browser_session():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            yield page
        finally:
            browser.close()

with browser_session() as page:
    page.goto('http://localhost:5000/pages/level-01/')
    # TODO: print 'LEVEL_PASSED'
    pass
```
