# The Cookie Jar Cleaner

**Level:** 103
**ID:** `py-pl-103`
**Difficulty:** medium
**XP:** 260
**Tags:** `cookies`, `clear_cookies`, `context`


## Objective

Add a cookie, then use context.clear_cookies() to remove all cookies. Verify cookies() returns empty. Print 'LEVEL_PASSED'.

## Story

The Janitor wipes all cookies to ensure a clean state for the next run.

## Hints
1. context.clear_cookies() removes all cookies.
2. context.cookies() after clear should return [].
3. Check len == 0.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    context.add_cookies([{'name': 'test', 'value': '1', 'url': 'http://localhost:5000'}])
    context.clear_cookies()
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    if len(context.cookies()) == 0:
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
    context.add_cookies([{'name': 'test', 'value': '1', 'url': 'http://localhost:5000'}])
    context.clear_cookies()
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: Verify cookies() is empty, print 'LEVEL_PASSED'

    context.close()
    browser.close()
```
