# The Multi-Page Spy

**Level:** 161
**ID:** `py-pl-161`
**Difficulty:** medium
**XP:** 320
**Tags:** `multi-page`, `context`, `title`


## Objective

Open level-01 and level-02 in the same context. Get titles of both. If both non-empty, print 'LEVEL_PASSED'.

## Story

The Intelligence Network monitors two pages simultaneously.

## Hints
1. p1.title() and p2.title() each return their titles.
2. Both level-01 and level-02 have non-empty titles.
3. Check if both are truthy.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context()
    p1 = ctx.new_page()
    p2 = ctx.new_page()
    p1.goto('http://localhost:5000/pages/level-01/')
    p2.goto('http://localhost:5000/pages/level-02/')
    if p1.title() and p2.title():
        print('LEVEL_PASSED')
    ctx.close()
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context()
    p1 = ctx.new_page()
    p2 = ctx.new_page()
    p1.goto('http://localhost:5000/pages/level-01/')
    p2.goto('http://localhost:5000/pages/level-02/')

    # TODO: Check both titles non-empty, print 'LEVEL_PASSED'

    ctx.close()
    browser.close()
```
