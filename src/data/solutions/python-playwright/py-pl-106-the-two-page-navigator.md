# The Two Page Navigator

**Level:** 106
**ID:** `py-pl-106`
**Difficulty:** medium
**XP:** 280
**Tags:** `multi-page`, `context`, `navigation`


## Objective

Open two pages in one context, navigate each to different level pages. Verify both titles are non-empty. Print 'LEVEL_PASSED'.

## Story

The Multitasker opens two pages in the same context and verifies both work.

## Hints
1. page.title() returns the page title.
2. Both level-01 and level-02 have non-empty titles.
3. Check if both are truthy.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    page1 = context.new_page()
    page2 = context.new_page()
    page1.goto('http://localhost:5000/pages/level-01/')
    page2.goto('http://localhost:5000/pages/level-02/')
    if page1.title() and page2.title():
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
    page1 = context.new_page()
    page2 = context.new_page()

    page1.goto('http://localhost:5000/pages/level-01/')
    page2.goto('http://localhost:5000/pages/level-02/')

    # TODO: Check both page1.title() and page2.title() are non-empty
    # print 'LEVEL_PASSED'

    context.close()
    browser.close()
```
