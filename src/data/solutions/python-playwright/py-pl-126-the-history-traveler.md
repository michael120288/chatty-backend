# The History Traveler

**Level:** 126
**ID:** `py-pl-126`
**Difficulty:** medium
**XP:** 280
**Tags:** `go_back`, `navigation`, `history`


## Objective

Navigate to level-01, then level-02. Use page.go_back() to return to level-01. Check URL contains 'level-01'. Print 'LEVEL_PASSED'.

## Story

The Time Keeper uses the browser's back and forward buttons to navigate history.

## Hints
1. page.go_back() navigates to the previous page in history.
2. page.url after go_back() should contain 'level-01'.
3. Check 'level-01' in page.url.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.goto('http://localhost:5000/pages/level-02/')
    page.go_back()
    if 'level-01' in page.url:
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
    page.goto('http://localhost:5000/pages/level-02/')

    # TODO: page.go_back()
    # Check URL and print 'LEVEL_PASSED'

    browser.close()
```
