# The Context Isolation Test

**Level:** 186
**ID:** `py-pl-186`
**Difficulty:** medium
**XP:** 360
**Tags:** `context`, `isolation`, `cookies`


## Objective

Create two contexts. Add a cookie to ctx1. Navigate both to level-01. Verify ctx2 has no cookies. Print 'LEVEL_PASSED'.

## Story

Two contexts are completely isolated — a cookie in one is invisible to the other.

## Hints
1. ctx2 was never given cookies.
2. ctx2.cookies() should return [].
3. len == 0 means isolated.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx1 = browser.new_context()
    ctx2 = browser.new_context()
    ctx1.add_cookies([{'name': 'secret', 'value': '42', 'url': 'http://localhost:5000'}])
    p1 = ctx1.new_page()
    p2 = ctx2.new_page()
    p1.goto('http://localhost:5000/pages/level-01/')
    p2.goto('http://localhost:5000/pages/level-01/')
    if len(ctx2.cookies()) == 0:
        print('LEVEL_PASSED')
    ctx1.close()
    ctx2.close()
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx1 = browser.new_context()
    ctx2 = browser.new_context()

    ctx1.add_cookies([{'name': 'secret', 'value': '42', 'url': 'http://localhost:5000'}])

    p1 = ctx1.new_page()
    p2 = ctx2.new_page()
    p1.goto('http://localhost:5000/pages/level-01/')
    p2.goto('http://localhost:5000/pages/level-01/')

    # TODO: Check ctx2.cookies() is empty, print 'LEVEL_PASSED'

    ctx1.close()
    ctx2.close()
    browser.close()
```
