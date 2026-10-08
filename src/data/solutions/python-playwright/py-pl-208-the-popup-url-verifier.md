# The Popup URL Verifier

**Level:** 208
**ID:** `py-pl-208`
**Difficulty:** medium
**XP:** 290
**Tags:** `popup`, `url`, `expect_popup`, `multi-tab`


## Objective

Capture the popup from `#open-portal-btn`. After it loads, assert `popup.url` contains `"portal"`. Print `LEVEL_PASSED`.

## Story

Every portal has a destination address. Verify the URL to confirm you reached the correct realm.

## Hints
1. `popup.url` returns the current URL string
2. `assert "portal" in popup.url`

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-18/')
    with page.expect_popup() as popup_info:
        page.click('#open-portal-btn')
    popup = popup_info.value
    popup.wait_for_load_state()
    assert 'portal' in popup.url
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-18/')
    with page.expect_popup() as popup_info:
        page.click('#open-portal-btn')
    popup = popup_info.value
    popup.wait_for_load_state()
    # assert url contains 'portal' and print LEVEL_PASSED
    browser.close()
```
