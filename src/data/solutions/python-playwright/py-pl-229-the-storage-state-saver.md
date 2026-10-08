# The Storage State Saver

**Level:** 229
**ID:** `py-pl-229`
**Difficulty:** medium
**XP:** 340
**Tags:** `storage_state`, `context`, `auth`, `cookies`


## Objective

Create a context, navigate to level-01, then call `context.storage_state(path="/tmp/state.json")` to save cookies and localStorage. Assert the file exists. Print `LEVEL_PASSED`.

## Story

An authenticated warrior should not have to re-prove their identity on every quest. Save the kingdom's state.

## Hints
1. `context.storage_state(path=...)` saves to a JSON file
2. `os.path.exists("/tmp/state.json")` verifies it was written

## Solution

```python
import os
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    context.storage_state(path='/tmp/state.json')
    assert os.path.exists('/tmp/state.json')
    print('LEVEL_PASSED')
    context.close()
    browser.close()
```

## Starter Code

```python
import os
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    # save storage state to /tmp/state.json, assert file exists, print LEVEL_PASSED
    context.close()
    browser.close()
```
