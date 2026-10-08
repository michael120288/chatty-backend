# The Load Event Waiter

**Level:** 129
**ID:** `py-pl-129`
**Difficulty:** medium
**XP:** 260
**Tags:** `wait_for_load_state`, `navigation`, `events`


## Objective

Use page.wait_for_load_state('domcontentloaded') after goto. Then print 'LEVEL_PASSED'.

## Story

The Watcher listens for the DOMContentLoaded event before proceeding.

## Hints
1. wait_for_load_state() waits for a specific load event.
2. Options: 'load', 'domcontentloaded', 'networkidle'.
3. It often resolves immediately if already in that state.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.wait_for_load_state('domcontentloaded')
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: page.wait_for_load_state('domcontentloaded')
    # print 'LEVEL_PASSED'

    browser.close()
```
