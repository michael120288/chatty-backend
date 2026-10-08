# The Init Script Injector

**Level:** 134
**ID:** `py-pl-134`
**Difficulty:** medium
**XP:** 290
**Tags:** `add_init_script`, `javascript`, `injection`


## Objective

Use page.add_init_script('window.__injected = true') then navigate. Verify via evaluate. If true, print 'LEVEL_PASSED'.

## Story

The Enchanter injects JavaScript that runs before any page script — the first spell cast.

## Hints
1. add_init_script runs before the page's own scripts.
2. window.__injected will be true.
3. page.evaluate('window.__injected') returns the value.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.add_init_script('window.__injected = true')
    page.goto('http://localhost:5000/pages/level-01/')
    val = page.evaluate('window.__injected')
    if val:
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.add_init_script('window.__injected = true')
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: val = page.evaluate('window.__injected')
    # print 'LEVEL_PASSED' if val is True

    browser.close()
```
