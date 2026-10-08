# The Dialog Handler

**Level:** 110
**ID:** `py-pl-110`
**Difficulty:** medium
**XP:** 280
**Tags:** `dialog`, `alert`, `events`


## Objective

On level-01 use page.on('dialog', lambda d: d.accept()) to auto-accept any dialog. Then trigger one via page.evaluate('alert("hello")') and print 'LEVEL_PASSED'.

## Story

The Diplomat handles browser dialog boxes — alert, confirm, and prompt.

## Hints
1. page.on('dialog', lambda d: d.accept()) auto-dismisses dialogs.
2. page.evaluate('alert("hello")') triggers an alert.
3. Without the handler, the alert would block the script.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.on('dialog', lambda d: d.accept())
    page.evaluate('alert("hello")')
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

    # TODO: Set up dialog handler
    # TODO: Trigger an alert via evaluate
    # print 'LEVEL_PASSED'

    browser.close()
```
