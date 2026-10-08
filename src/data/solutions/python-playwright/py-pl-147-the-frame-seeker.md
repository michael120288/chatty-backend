# The Frame Seeker

**Level:** 147
**ID:** `py-pl-147`
**Difficulty:** medium
**XP:** 270
**Tags:** `frames`, `iframe`, `navigation`


## Objective

On level-01 use page.frame_locator to find a hypothetical iframe. Since level-01 has no iframe, instead use page.frames to check the list length. If >= 1, print 'LEVEL_PASSED'.

## Story

Iframes are portals to nested realms. The Frame Seeker knows how to enter them.

## Hints
1. page.frames returns a list of all frames (includes the main frame).
2. Even without iframes, there's at least 1 frame (the main one).
3. Check len >= 1.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    frames = page.frames
    if len(frames) >= 1:
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

    # TODO: frames = page.frames
    # print 'LEVEL_PASSED' if len(frames) >= 1

    browser.close()
```
