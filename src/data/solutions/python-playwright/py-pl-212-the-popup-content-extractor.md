# The Popup Content Extractor

**Level:** 212
**ID:** `py-pl-212`
**Difficulty:** medium
**XP:** 310
**Tags:** `popup`, `locator`, `inner_text`, `multi-tab`


## Objective

Capture the popup from `#open-portal-btn`. Wait for load. Extract the text of `popup.locator("h1")` or the first heading. Assert it is non-empty. Print `LEVEL_PASSED`.

## Story

The popup holds a secret message. Extract text from inside it before the portal closes.

## Hints
1. `popup.locator("h1").inner_text()` or `.text_content()`
2. The popup is a full Page — all locator methods apply

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
    heading = popup.locator('h1').first.inner_text()
    assert heading != ''
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

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
    # extract heading text, assert non-empty, print LEVEL_PASSED
    browser.close()
```
