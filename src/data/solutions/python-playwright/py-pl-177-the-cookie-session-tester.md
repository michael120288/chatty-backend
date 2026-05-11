# The Cookie Session Tester

**Level:** 177
**ID:** `py-pl-177`
**Difficulty:** medium
**XP:** 330
**Tags:** `cookies`, `session`, `evaluate`


## Objective

Set a cookie 'auth=token123' for localhost. Navigate to level-01. Read document.cookie via evaluate. If it contains 'auth', print 'LEVEL_PASSED'.

## Story

The Session Smith sets a cookie, navigates, reads it back from JS.

## Hints
1. document.cookie returns all cookies as a string.
2. Check 'auth' in the string.
3. Cookies are accessible from JS on the same origin.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    context.add_cookies([{'name': 'auth', 'value': 'token123', 'url': 'http://localhost:5000'}])
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    cookies_str = page.evaluate('document.cookie')
    if 'auth' in cookies_str:
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
    context.add_cookies([{'name': 'auth', 'value': 'token123', 'url': 'http://localhost:5000'}])
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: cookies_str = page.evaluate('document.cookie')
    # print 'LEVEL_PASSED' if 'auth' in cookies_str

    context.close()
    browser.close()
```
