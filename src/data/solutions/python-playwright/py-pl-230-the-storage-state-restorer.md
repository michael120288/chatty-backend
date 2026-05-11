# The Storage State Restorer

**Level:** 230
**ID:** `py-pl-230`
**Difficulty:** medium
**XP:** 350
**Tags:** `storage_state`, `restore`, `context`, `auth`


## Objective

First save state from a context visiting level-01 to `/tmp/state2.json`. Then create a new context with `browser.new_context(storage_state="/tmp/state2.json")`. Navigate to level-01 and assert `page.title()` is non-empty. Print `LEVEL_PASSED`.

## Story

The saved state can seed a new context — pick up exactly where you left off.

## Hints
1. `browser.new_context(storage_state=path)` loads saved state into the new context
2. After navigation assert `pg2.title() != ""`

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx1 = browser.new_context()
    pg1 = ctx1.new_page()
    pg1.goto('http://localhost:5000/pages/level-01/')
    ctx1.storage_state(path='/tmp/state2.json')
    ctx1.close()

    ctx2 = browser.new_context(storage_state='/tmp/state2.json')
    pg2 = ctx2.new_page()
    pg2.goto('http://localhost:5000/pages/level-01/')
    assert pg2.title() != ''
    print('LEVEL_PASSED')
    ctx2.close()
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx1 = browser.new_context()
    pg1 = ctx1.new_page()
    pg1.goto('http://localhost:5000/pages/level-01/')
    ctx1.storage_state(path='/tmp/state2.json')
    ctx1.close()

    ctx2 = browser.new_context(storage_state='/tmp/state2.json')
    pg2 = ctx2.new_page()
    pg2.goto('http://localhost:5000/pages/level-01/')
    # assert title non-empty, print LEVEL_PASSED
    ctx2.close()
    browser.close()
```
