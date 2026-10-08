# The Route Counter

**Level:** 174
**ID:** `py-pl-174`
**Difficulty:** medium
**XP:** 300
**Tags:** `request`, `counter`, `events`


## Objective

Count how many requests are made when loading level-01. Use page.on('request'). If count > 0, print 'LEVEL_PASSED'.

## Story

The Traffic Inspector counts how many requests match a route pattern.

## Hints
1. The event handler increments count for each request.
2. At minimum, the HTML page request fires.
3. Count > 0 is always true.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    count = 0
    def on_request(req):
        nonlocal count
        count += 1
    page.on('request', on_request)
    page.goto('http://localhost:5000/pages/level-01/')
    if count > 0:
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    count = 0

    def on_request(req):
        nonlocal count
        count += 1

    page.on('request', on_request)
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: Print 'LEVEL_PASSED' if count > 0

    browser.close()
```
