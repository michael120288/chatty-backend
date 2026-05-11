# The Async Await Flow

**Level:** 176
**ID:** `py-pl-176`
**Difficulty:** medium
**XP:** 340
**Tags:** `wait`, `attribute`, `assert`, `flow`


## Objective

On level-05: (1) goto, (2) wait for treasure to appear, (3) get its data-treasure attribute, (4) assert it equals 'golden-key'. Print 'LEVEL_PASSED'.

## Story

The Patient Elder waits for multiple async conditions in sequence.

## Hints
1. wait_for_selector('#treasure-chest.visible') waits for it.
2. get_attribute('data-treasure') gets the value.
3. Assert == 'golden-key' then print.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-05/')
    page.wait_for_selector('#treasure-chest.visible')
    val = page.locator('#treasure-chest').get_attribute('data-treasure')
    assert val == 'golden-key'
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-05/')

    # TODO: Wait, get attribute, assert, print 'LEVEL_PASSED'

    browser.close()
```
