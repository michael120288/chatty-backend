# The Title Oracle

**Level:** 5
**ID:** `py-pl-05`
**Difficulty:** medium
**XP:** 100
**Tags:** `title`, `page`, `navigation`


## Objective

Get the page title using page.title(). If it is not empty, print 'LEVEL_PASSED'.

## Story

The Oracle speaks only to those who know the name of the realm they visit. Read the page title and prove your awareness.

## Hints
1. page.title() returns the document title as a string.
2. Check if the title is truthy: if title: print('LEVEL_PASSED').
3. No locator needed — title() is a direct page method.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    title = page.title()
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

    # TODO: Get page.title() and print 'LEVEL_PASSED' if it is not empty

    browser.close()
```
