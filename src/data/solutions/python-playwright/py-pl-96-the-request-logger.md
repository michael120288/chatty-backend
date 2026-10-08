# The Request Logger

**Level:** 96
**ID:** `py-pl-96`
**Difficulty:** medium
**XP:** 260
**Tags:** `request`, `network`, `events`


## Objective

On level-01 listen for page requests using page.on('request', ...). Count how many fire. If count > 0, print 'LEVEL_PASSED'.

## Story

The Network Warden intercepts requests to monitor outbound traffic.

## Hints
1. page.on('request', handler) fires for each outgoing request.
2. The list is already populated after goto().
3. Check len(requests) > 0.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    requests = []
    page.on('request', lambda req: requests.append(req.url))
    page.goto('http://localhost:5000/pages/level-01/')
    if len(requests) > 0:
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    requests = []
    page.on('request', lambda req: requests.append(req.url))
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: Check len(requests) > 0 and print 'LEVEL_PASSED'

    browser.close()
```
