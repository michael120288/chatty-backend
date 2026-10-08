# The Content Waiter

**Level:** 85
**ID:** `py-pl-85`
**Difficulty:** medium
**XP:** 230
**Tags:** `wait_for_selector`, `async`, `waiting`


## Objective

On level-05 use page.wait_for_selector('#treasure-chest.visible') and then print 'LEVEL_PASSED'.

## Story

The Patient Monk waits for a CSS selector to appear before acting.

## Hints
1. wait_for_selector waits until the CSS selector matches a visible element.
2. The .visible class is added after ~2.5s.
3. Default timeout is 30s — plenty of time.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-05/')
    page.wait_for_selector('#treasure-chest.visible')
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-05/')

    # TODO: page.wait_for_selector('#treasure-chest.visible')
    # print 'LEVEL_PASSED'

    browser.close()
```
