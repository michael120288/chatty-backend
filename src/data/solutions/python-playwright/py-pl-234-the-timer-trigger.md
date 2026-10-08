# The Timer Trigger

**Level:** 234
**ID:** `py-pl-234`
**Difficulty:** medium
**XP:** 360
**Tags:** `clock`, `setTimeout`, `fake-timers`, `advance`


## Objective

Navigate to level-01. Inject a 5-minute setTimeout via `page.evaluate`. Install clock, advance by 5 minutes. Assert the timeout's side-effect occurred. Print `LEVEL_PASSED`.

## Story

A setTimeout fires after 5 minutes normally. With the fake clock, you trigger it in milliseconds.

## Hints
1. `page.clock.advance(ms)` triggers all pending timers in range
2. Check `window._fired` after advancing

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.clock.install(time=0)
    page.goto('http://localhost:5000/pages/level-01/')
    page.evaluate("window._fired = false; setTimeout(() => { window._fired = true; }, 5 * 60 * 1000)")
    page.clock.advance(5 * 60 * 1000)
    fired = page.evaluate("window._fired")
    assert fired is True
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
    page.evaluate("window._fired = false; setTimeout(() => { window._fired = true; }, 5 * 60 * 1000)")
    page.clock.advance(5 * 60 * 1000)
    fired = page.evaluate("window._fired")
    # assert fired is True, print LEVEL_PASSED
    browser.close()
```
