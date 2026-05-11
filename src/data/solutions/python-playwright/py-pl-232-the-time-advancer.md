# The Time Advancer

**Level:** 232
**ID:** `py-pl-232`
**Difficulty:** medium
**XP:** 340
**Tags:** `clock`, `advance`, `fake-timers`, `setTimeout`


## Objective

Install the clock at time 0. Navigate to level-01. Call `page.clock.advance(3_600_000)` to jump 1 hour. Assert `page.evaluate("Date.now()")` equals 3600000. Print `LEVEL_PASSED`.

## Story

With time frozen, you command when it moves forward. Advance the clock by exactly one hour.

## Hints
1. `page.clock.advance(ms)` moves the fake clock forward by that many milliseconds
2. 3600000 ms = 1 hour

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.clock.install(time=0)
    page.goto('http://localhost:5000/pages/level-01/')
    page.clock.advance(3_600_000)
    now = page.evaluate('Date.now()')
    assert now == 3_600_000
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
    page.clock.advance(3_600_000)
    # assert Date.now() == 3600000, print LEVEL_PASSED
    browser.close()
```
