# The Portal Title Reader

**Level:** 207
**ID:** `py-pl-207`
**Difficulty:** medium
**XP:** 290
**Tags:** `popup`, `title`, `wait_for_load_state`, `multi-tab`


## Objective

Capture the popup from `#open-portal-btn`. Wait for it to load with `popup.wait_for_load_state()`. Assert `popup.title()` is not empty, then print `LEVEL_PASSED`.

## Story

The new dimension has a name. Read the title of the popup page to confirm you landed in the right realm.

## Hints
1. `popup.wait_for_load_state()` ensures the page is fully loaded
2. `popup.title()` returns the document title string

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
    title = popup.title()
    assert title != ''
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
    # get title, assert not empty, print LEVEL_PASSED
    browser.close()
```
