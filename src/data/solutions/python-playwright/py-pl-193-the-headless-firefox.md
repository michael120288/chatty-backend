# The Headless Firefox

**Level:** 193
**ID:** `py-pl-193`
**Difficulty:** medium
**XP:** 320
**Tags:** `firefox`, `cross-browser`, `browser`


## Objective

Launch Firefox (p.firefox) instead of Chromium. Navigate to level-01. Print 'LEVEL_PASSED'.

## Story

The Versatile Tester switches browsers — using Firefox instead of Chromium.

## Hints
1. p.firefox.launch() uses Firefox.
2. p.webkit.launch() would use Safari.
3. The same API works across browsers.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.firefox.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.firefox.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: print 'LEVEL_PASSED'

    browser.close()
```
