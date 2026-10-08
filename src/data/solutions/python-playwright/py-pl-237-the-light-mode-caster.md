# The Light Mode Caster

**Level:** 237
**ID:** `py-pl-237`
**Difficulty:** medium
**XP:** 270
**Tags:** `emulate_media`, `light-mode`, `color-scheme`


## Objective

Set `color_scheme="light"`. Assert `window.matchMedia("(prefers-color-scheme: light)").matches` is True. Print `LEVEL_PASSED`.

## Story

Banish the darkness. Switch to light mode and confirm the realm sees daylight again.

## Hints
1. `color_scheme="light"` is the other option alongside `"dark"`

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.emulate_media(color_scheme='light')
    matches = page.evaluate("window.matchMedia('(prefers-color-scheme: light)').matches")
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
    page.emulate_media(color_scheme='light')
    # assert prefers-color-scheme: light matches, print LEVEL_PASSED
    browser.close()
```
