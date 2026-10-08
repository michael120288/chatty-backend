# The URL Waiter

**Level:** 130
**ID:** `py-pl-130`
**Difficulty:** medium
**XP:** 260
**Tags:** `wait_for_url`, `navigation`, `waiting`


## Objective

Navigate to level-01. Use page.wait_for_url('**/level-01/**'). Then print 'LEVEL_PASSED'.

## Story

The Navigator waits until the URL matches a pattern before acting.

## Hints
1. wait_for_url() waits until page.url matches the pattern.
2. Glob patterns work: '**' matches anything.
3. If already on the URL, it resolves immediately.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.wait_for_url('**/level-01/**')
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

    # TODO: page.wait_for_url('**/level-01/**')
    # print 'LEVEL_PASSED'

    browser.close()
```
