# The Portal Opener

**Level:** 206
**ID:** `py-pl-206`
**Difficulty:** medium
**XP:** 290
**Tags:** `popup`, `expect_popup`, `multi-tab`, `new-page`


## Objective

Click `#open-portal-btn` on the page. Use `with page.expect_popup() as popup_info:` to capture the new tab. Assert the popup is not None, then print `LEVEL_PASSED`.

## Story

The interdimensional gate springs open as a new tab. Reach through and verify life exists on the other side.

## Hints
1. `page.expect_popup()` captures a window.open or target=_blank event
2. `popup_info.value` is the new `Page` object
3. Assert `popup is not None`

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
    assert popup is not None
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
    # assert popup is not None and print LEVEL_PASSED
    browser.close()
```
