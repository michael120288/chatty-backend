# The Offline Tester

**Level:** 169
**ID:** `py-pl-169`
**Difficulty:** medium
**XP:** 310
**Tags:** `offline`, `network`, `error_handling`


## Objective

Set context.set_offline(True), try to goto level-01, catch the error, then set offline(False). Print 'LEVEL_PASSED'.

## Story

The Isolation Mage cuts the network connection to test offline behavior.

## Hints
1. set_offline(True) disconnects the network.
2. goto will raise an error when offline.
3. Catch any Exception, then set_offline(False) and print.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    page = context.new_page()
    context.set_offline(True)
    try:
        page.goto('http://localhost:5000/pages/level-01/', timeout=3000)
    except Exception:
        pass
    context.set_offline(False)
    print('LEVEL_PASSED')
    context.close()
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    page = context.new_page()
    context.set_offline(True)

    # TODO: Try goto, expect failure, catch exception
    # Set offline(False), print 'LEVEL_PASSED'

    context.close()
    browser.close()
```
