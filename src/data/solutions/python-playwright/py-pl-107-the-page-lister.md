# The Page Lister

**Level:** 107
**ID:** `py-pl-107`
**Difficulty:** medium
**XP:** 260
**Tags:** `context`, `pages`, `multi-page`


## Objective

Open 3 pages in one context. Use context.pages to get the list. If len == 3, print 'LEVEL_PASSED'.

## Story

The Census Keeper enumerates all open pages in a context.

## Hints
1. context.pages is a list of all open pages.
2. Three new_page() calls create 3 pages.
3. len(context.pages) should be 3.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    for i in range(3):
        context.new_page()
    if len(context.pages) == 3:
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
    for i in range(3):
        context.new_page()

    # TODO: Check len(context.pages) == 3, print 'LEVEL_PASSED'

    context.close()
    browser.close()
```
