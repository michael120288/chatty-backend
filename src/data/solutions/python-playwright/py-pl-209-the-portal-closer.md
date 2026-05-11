# The Portal Closer

**Level:** 209
**ID:** `py-pl-209`
**Difficulty:** medium
**XP:** 300
**Tags:** `popup`, `close`, `multi-tab`, `page-lifecycle`


## Objective

Capture the popup, call `popup.close()`, then assert the original `page.url` still contains `"level-18"`. Print `LEVEL_PASSED`.

## Story

After visiting the parallel realm, the gateway must be sealed. Close the popup and verify the original page remains.

## Hints
1. After `popup.close()`, the original `page` is unaffected
2. `assert "level-18" in page.url`

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
    popup.close()
    assert 'level-18' in page.url
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
    popup.close()
    # assert original page url still contains level-18 then print LEVEL_PASSED
    browser.close()
```
