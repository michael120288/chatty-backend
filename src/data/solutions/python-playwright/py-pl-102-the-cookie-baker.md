# The Cookie Baker

**Level:** 102
**ID:** `py-pl-102`
**Difficulty:** medium
**XP:** 270
**Tags:** `cookies`, `context`, `session`


## Objective

Add a cookie with name='session', value='abc123' for localhost using context.add_cookies(). Navigate to level-01. Then check the cookie is present with context.cookies(). Print 'LEVEL_PASSED'.

## Story

The Baker sets cookies before navigating — establishing a pre-baked session.

## Hints
1. context.cookies() returns a list of cookie dicts.
2. Each dict has 'name' and 'value' keys.
3. Check if any cookie has name=='session' and value=='abc123'.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    context.add_cookies([{'name': 'session', 'value': 'abc123', 'url': 'http://localhost:5000'}])
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    cookies = context.cookies()
    if any(c['name'] == 'session' for c in cookies):
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
    context.add_cookies([{'name': 'session', 'value': 'abc123', 'url': 'http://localhost:5000'}])
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: Check context.cookies() contains 'session'='abc123'
    # print 'LEVEL_PASSED'

    context.close()
    browser.close()
```
