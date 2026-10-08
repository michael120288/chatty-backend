# The Dark Mode Conjurer

**Level:** 236
**ID:** `py-pl-236`
**Difficulty:** medium
**XP:** 295
**Tags:** `emulate_media`, `dark-mode`, `color-scheme`, `media-emulation`


## Objective

Call `page.emulate_media(color_scheme="dark")` after navigating to level-01. Assert `page.evaluate("window.matchMedia('(prefers-color-scheme: dark)').matches")` is True. Print `LEVEL_PASSED`.

## Story

The realm shifts to night mode. Emulate a dark-mode preference and verify the browser respects it.

## Hints
1. `page.emulate_media(color_scheme="dark")` sets the media feature
2. `window.matchMedia("(prefers-color-scheme: dark)").matches` returns a boolean

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.emulate_media(color_scheme='dark')
    matches = page.evaluate("window.matchMedia('(prefers-color-scheme: dark)').matches")
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
    page.emulate_media(color_scheme='dark')
    # assert prefers-color-scheme: dark matches, print LEVEL_PASSED
    browser.close()
```
