# The Dispatch Event

**Level:** 142
**ID:** `py-pl-142`
**Difficulty:** medium
**XP:** 280
**Tags:** `dispatch_event`, `events`, `dom`


## Objective

On level-02 use page.locator('#reveal-btn').dispatch_event('click') to trigger a click event. Check #secret-message is visible. Print 'LEVEL_PASSED'.

## Story

The Event Conjurer fires custom DOM events directly onto elements.

## Hints
1. dispatch_event fires a real DOM event.
2. Unlike click(), it bypasses actionability checks.
3. Useful for triggering events on non-interactable elements.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    page.locator('#reveal-btn').dispatch_event('click')
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

    # TODO: locator.dispatch_event('click')
    # Check visible and print 'LEVEL_PASSED'

    browser.close()
```
