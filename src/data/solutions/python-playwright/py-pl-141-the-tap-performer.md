# The Tap Performer

**Level:** 141
**ID:** `py-pl-141`
**Difficulty:** medium
**XP:** 270
**Tags:** `tap`, `touch`, `mobile`


## Objective

On level-02 use page.locator('#reveal-btn').tap() to tap the button. Check #secret-message is visible. Print 'LEVEL_PASSED'.

## Story

The Mobile Tester simulates a real finger tap — the mobile equivalent of click.

## Hints
1. locator.tap() sends a touch tap event.
2. It behaves like click() on most pages.
3. Check is_visible() on the secret message.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    page.locator('#reveal-btn').tap()
    if page.locator('#secret-message').is_visible():
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

    # TODO: page.locator('#reveal-btn').tap()
    # Check visible and print 'LEVEL_PASSED'

    browser.close()
```
