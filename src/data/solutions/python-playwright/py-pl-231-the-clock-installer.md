# The Clock Installer

**Level:** 231
**ID:** `py-pl-231`
**Difficulty:** medium
**XP:** 330
**Tags:** `clock`, `page.clock`, `fake-timers`, `date`


## Objective

Navigate to level-01. Call `page.clock.install(time=0)` to freeze the clock at epoch zero. Assert `page.evaluate("Date.now()")` returns 0. Print `LEVEL_PASSED`.

## Story

Time itself can be frozen. Install a fake clock to stop the sands of time mid-flow.

## Hints
1. Install the clock BEFORE navigating to ensure it takes effect
2. `page.evaluate("Date.now()")` returns the current fake time as an int

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.clock.install(time=0)
    page.goto('http://localhost:5000/pages/level-01/')
    now = page.evaluate('Date.now()')
    assert now == 0
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.clock.install(time=0)
    page.goto('http://localhost:5000/pages/level-01/')
    # assert Date.now() == 0 and print LEVEL_PASSED
    browser.close()
```
