# The Header Envoy

**Level:** 27
**ID:** `py-pl-27`
**Difficulty:** medium
**XP:** 100
**Tags:** `set_extra_http_headers`, `headers`, `network`


## Objective

Set extra HTTP headers {'X-Custom-Header': 'playwright'} before navigating. Then print 'LEVEL_PASSED'.

## Story

The Envoy carries secret messages in request headers. Set a custom header before navigating.

## Hints
1. page.set_extra_http_headers(dict) adds headers to all subsequent requests.
2. Call it before page.goto().
3. Print 'LEVEL_PASSED' after navigation.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.set_extra_http_headers({'X-Custom-Header': 'playwright'})
    page.goto('http://localhost:5000/pages/level-01/')
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: Call page.set_extra_http_headers({'X-Custom-Header': 'playwright'}) before goto

    browser.close()
```
