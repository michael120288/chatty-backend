# The Reduced Motion Enchanter

**Level:** 239
**ID:** `py-pl-239`
**Difficulty:** medium
**XP:** 285
**Tags:** `emulate_media`, `reduced-motion`, `accessibility`, `media-emulation`


## Objective

Set `page.emulate_media(reduced_motion="reduce")`. Assert `window.matchMedia("(prefers-reduced-motion: reduce)").matches` is True. Print `LEVEL_PASSED`.

## Story

Some warriors are sensitive to animation. Honour their preference by emulating reduced motion.

## Hints
1. `reduced_motion="reduce"` or `"no-preference"` are the valid values

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.emulate_media(reduced_motion='reduce')
    matches = page.evaluate("window.matchMedia('(prefers-reduced-motion: reduce)').matches")
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
    page.emulate_media(reduced_motion='reduce')
    # assert prefers-reduced-motion: reduce matches, print LEVEL_PASSED
    browser.close()
```
