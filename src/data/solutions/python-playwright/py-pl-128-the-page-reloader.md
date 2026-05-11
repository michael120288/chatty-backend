# The Page Reloader

**Level:** 128
**ID:** `py-pl-128`
**Difficulty:** medium
**XP:** 270
**Tags:** `reload`, `navigation`, `state`


## Objective

Navigate to level-02. Click the reveal button. Reload the page. Verify the secret message is hidden again. Print 'LEVEL_PASSED'.

## Story

The Refresher reloads the page to reset its state.

## Hints
1. page.reload() reloads the current page.
2. After reload, the secret is hidden again.
3. is_visible() should return False.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    page.locator('#reveal-btn').click()
    page.reload()
    if not page.locator('#secret-message').is_visible():
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    page.locator('#reveal-btn').click()

    # TODO: page.reload()
    # Check #secret-message is not visible
    # print 'LEVEL_PASSED'

    browser.close()
```
