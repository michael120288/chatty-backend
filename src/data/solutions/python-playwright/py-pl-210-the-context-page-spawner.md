# The Context Page Spawner

**Level:** 210
**ID:** `py-pl-210`
**Difficulty:** medium
**XP:** 280
**Tags:** `new_page`, `context`, `multi-tab`, `browser-context`


## Objective

Create a second page with `page2 = context.new_page()`. Navigate `page2` to `${BASE}/level-01/`. Assert `page2.title()` is not empty. Print `LEVEL_PASSED`.

## Story

Rather than waiting for window.open, you can summon a new page directly from the browser context.

## Hints
1. `context.new_page()` opens a fresh page in the same context
2. Call `page2.goto(url)` then check `page2.title()`

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page2 = context.new_page()
    page2.goto('http://localhost:5000/pages/level-01/')
    assert page2.title() != ''
    print('LEVEL_PASSED')
    context.close()
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page2 = context.new_page()
    # navigate page2 to level-01, assert title, print LEVEL_PASSED
    context.close()
    browser.close()
```
