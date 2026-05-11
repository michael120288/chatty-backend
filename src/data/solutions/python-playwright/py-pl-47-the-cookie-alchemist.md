# The Cookie Alchemist

**Level:** 47
**ID:** `py-pl-47`
**Difficulty:** medium
**XP:** 200
**Tags:** `cookies`, `context`, `add_cookies`


## Objective

Add a cookie named 'session' with value 'test' to the context. Navigate. Print 'LEVEL_PASSED'.

## Story

The Alchemist enchants the browser with magical cookies. Add a cookie via the context and verify navigation works.

## Hints
1. Use context.add_cookies(list_of_dicts) to add cookies.
2. Each cookie dict needs at least 'name', 'value', and 'url' or 'domain'.
3. Navigate after adding cookies.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    context.add_cookies([{'name': 'session', 'value': 'test', 'url': 'http://localhost:5000'}])
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

    # TODO: context.add_cookies([{'name': 'session', 'value': 'test', 'url': '...'}])
    # page = context.new_page()
    # page.goto(...)
    # print 'LEVEL_PASSED'

    browser.close()
```
