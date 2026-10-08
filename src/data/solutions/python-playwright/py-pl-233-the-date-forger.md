# The Date Forger

**Level:** 233
**ID:** `py-pl-233`
**Difficulty:** medium
**XP:** 340
**Tags:** `clock`, `date`, `timestamp`, `fake-timers`


## Objective

Install the clock with `time=1_700_000_000_000` (a specific timestamp). Navigate to level-01. Assert `page.evaluate("Date.now()")` equals 1700000000000. Print `LEVEL_PASSED`.

## Story

Set the clock to a specific moment in history. Verify the browser reports that exact timestamp.

## Hints
1. `time` is in milliseconds since epoch
2. JavaScript `Date.now()` also returns ms since epoch

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.clock.install(time=1_700_000_000_000)
    page.goto('http://localhost:5000/pages/level-01/')
    now = page.evaluate('Date.now()')
    assert now == 1_700_000_000_000
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.clock.install(time=1_700_000_000_000)
    page.goto('http://localhost:5000/pages/level-01/')
    # assert Date.now() == 1_700_000_000_000, print LEVEL_PASSED
    browser.close()
```
