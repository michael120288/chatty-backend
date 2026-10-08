# The Print Media Summoner

**Level:** 238
**ID:** `py-pl-238`
**Difficulty:** medium
**XP:** 280
**Tags:** `emulate_media`, `print`, `media-type`


## Objective

Call `page.emulate_media(media="print")`. Assert `window.matchMedia("print").matches` is True. Print `LEVEL_PASSED`.

## Story

Before printing a scroll, the realm must be rendered in print mode. Emulate the print media type.

## Hints
1. The `media` parameter accepts `"screen"`, `"print"`, or `"null"`
2. `window.matchMedia("print").matches` returns True when in print mode

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.emulate_media(media='print')
    matches = page.evaluate("window.matchMedia('print').matches")
    assert matches is True
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.emulate_media(media='print')
    # assert matchMedia('print').matches, print LEVEL_PASSED
    browser.close()
```
