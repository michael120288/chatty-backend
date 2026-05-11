# The HTTP Credential Passer

**Level:** 115
**ID:** `py-pl-115`
**Difficulty:** medium
**XP:** 260
**Tags:** `http_credentials`, `auth`, `context`


## Objective

Create a context with http_credentials={'username': 'user', 'password': 'pass'}. Navigate to level-01 (which doesn't need auth). Print 'LEVEL_PASSED'.

## Story

The Secret Agent passes HTTP authentication credentials to protected routes.

## Hints
1. http_credentials sets Basic Auth credentials for the context.
2. Level-01 doesn't require auth, so it navigates fine.
3. Just print 'LEVEL_PASSED'.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(http_credentials={'username': 'user', 'password': 'pass'})
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
    context = browser.new_context(
        http_credentials={'username': 'user', 'password': 'pass'}
    )
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: print 'LEVEL_PASSED'

    context.close()
    browser.close()
```
