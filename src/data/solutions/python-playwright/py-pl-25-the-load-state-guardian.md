# The Load State Guardian

**Level:** 25
**ID:** `py-pl-25`
**Difficulty:** medium
**XP:** 100
**Tags:** `wait_for_load_state`, `networkidle`, `loading`


## Objective

Navigate to the page and wait for 'networkidle' load state. Then print 'LEVEL_PASSED'.

## Story

The Guardian only allows passage when the realm is fully loaded. Wait for networkidle before proceeding.

## Hints
1. page.wait_for_load_state('networkidle') waits until no network requests for 500ms.
2. Call it after page.goto().
3. Other options: 'load', 'domcontentloaded'.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.wait_for_load_state('networkidle')
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

    # TODO: Call page.wait_for_load_state('networkidle') after goto, then print 'LEVEL_PASSED'

    browser.close()
```
