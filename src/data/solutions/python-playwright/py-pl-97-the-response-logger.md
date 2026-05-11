# The Response Logger

**Level:** 97
**ID:** `py-pl-97`
**Difficulty:** medium
**XP:** 260
**Tags:** `response`, `network`, `status`


## Objective

Listen for page responses. After goto level-01, find the main HTML response and check its status is 200. Print 'LEVEL_PASSED'.

## Story

The Postal Inspector examines incoming responses, checking their status.

## Hints
1. responses is a list of (url, status) tuples.
2. Check if any status == 200.
3. any((s == 200 for _, s in responses)) works.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    responses = []
    page.on('response', lambda res: responses.append((res.url, res.status)))
    page.goto('http://localhost:5000/pages/level-01/')
    if any(s == 200 for _, s in responses):
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    responses = []
    page.on('response', lambda res: responses.append((res.url, res.status)))
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: Check any response has status 200 and print 'LEVEL_PASSED'

    browser.close()
```
