# The Interval Controller

**Level:** 235
**ID:** `py-pl-235`
**Difficulty:** medium
**XP:** 370
**Tags:** `clock`, `setInterval`, `fake-timers`, `advance`


## Objective

Install the clock at 0. Navigate to level-01. Inject a setInterval counter. Advance by 10000ms. Assert the counter equals 10. Print `LEVEL_PASSED`.

## Story

A setInterval fires every second. Advance the clock ten seconds and verify it fired ten times.

## Hints
1. Each 1000ms interval fires once per 1000ms advanced
2. 10000ms / 1000ms interval = 10 firings

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.clock.install(time=0)
    page.goto('http://localhost:5000/pages/level-01/')
    page.evaluate("window._count = 0; setInterval(() => { window._count++; }, 1000)")
    page.clock.advance(10000)
    count = page.evaluate("window._count")
    assert count == 10
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
    page.evaluate("window._count = 0; setInterval(() => { window._count++; }, 1000)")
    page.clock.advance(10000)
    count = page.evaluate("window._count")
    # assert count == 10, print LEVEL_PASSED
    browser.close()
```
