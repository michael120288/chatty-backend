# The Network Conditions Setter

**Level:** 168
**ID:** `py-pl-168`
**Difficulty:** medium
**XP:** 280
**Tags:** `http_headers`, `context`, `network`


## Objective

Use context.set_extra_http_headers({'X-Slow': 'true'}) before navigating. Navigate and print 'LEVEL_PASSED'.

## Story

The Throttle Master simulates slow network conditions.

## Hints
1. set_extra_http_headers adds headers to all requests.
2. The server ignores unknown headers gracefully.
3. Just print 'LEVEL_PASSED'.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    context.set_extra_http_headers({'X-Custom-Test': 'playwright'})
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
    context.set_extra_http_headers({'X-Custom-Test': 'playwright'})
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: print 'LEVEL_PASSED'

    context.close()
    browser.close()
```
