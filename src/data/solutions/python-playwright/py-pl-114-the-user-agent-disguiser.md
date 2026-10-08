# The User Agent Disguiser

**Level:** 114
**ID:** `py-pl-114`
**Difficulty:** medium
**XP:** 270
**Tags:** `user_agent`, `context`, `configuration`


## Objective

Create a context with user_agent='Mozilla/5.0 TestBot'. Verify navigator.userAgent via evaluate. If it contains 'TestBot', print 'LEVEL_PASSED'.

## Story

The Shape Shifter changes the browser's identity string to impersonate another browser.

## Hints
1. navigator.userAgent returns the browser's user-agent string.
2. Check 'TestBot' in ua.
3. Print 'LEVEL_PASSED' if it matches.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(user_agent='Mozilla/5.0 TestBot')
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    ua = page.evaluate('navigator.userAgent')
    if 'TestBot' in ua:
        print('LEVEL_PASSED')
    context.close()
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(user_agent='Mozilla/5.0 TestBot')
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: ua = page.evaluate('navigator.userAgent')
    # print 'LEVEL_PASSED' if 'TestBot' in ua

    context.close()
    browser.close()
```
