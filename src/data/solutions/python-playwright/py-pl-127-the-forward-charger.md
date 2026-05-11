# The Forward Charger

**Level:** 127
**ID:** `py-pl-127`
**Difficulty:** medium
**XP:** 270
**Tags:** `go_forward`, `navigation`, `history`


## Objective

Navigate to level-01, level-02. Go back. Then use page.go_forward() to return to level-02. Check URL. Print 'LEVEL_PASSED'.

## Story

After going back, the Forward Charger leaps ahead to the next page again.

## Hints
1. page.go_forward() goes to the next page in history.
2. After going back to level-01, go_forward() returns to level-02.
3. Check 'level-02' in page.url.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.goto('http://localhost:5000/pages/level-02/')
    page.go_back()
    page.go_forward()
    if 'level-02' in page.url:
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
    page.go_back()

    # TODO: page.go_forward()
    # Check URL contains 'level-02'
    # print 'LEVEL_PASSED'

    browser.close()
```
