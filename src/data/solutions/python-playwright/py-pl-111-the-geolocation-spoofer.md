# The Geolocation Spoofer

**Level:** 111
**ID:** `py-pl-111`
**Difficulty:** medium
**XP:** 270
**Tags:** `geolocation`, `context`, `permissions`


## Objective

Create a context with geolocation={'latitude': 48.8566, 'longitude': 2.3522} (Paris). Open a page and navigate. Print 'LEVEL_PASSED'.

## Story

The Globe Trotter sets a fake location so the browser thinks it's somewhere else.

## Hints
1. Geolocation is set at context creation time.
2. You also need permissions=['geolocation'] to allow it.
3. Just navigate and print.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(
        geolocation={'latitude': 48.8566, 'longitude': 2.3522},
        permissions=['geolocation']
    )
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    print('LEVEL_PASSED')
    context.close()
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(
        geolocation={'latitude': 48.8566, 'longitude': 2.3522},
        permissions=['geolocation']
    )
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: print 'LEVEL_PASSED'

    context.close()
    browser.close()
```
