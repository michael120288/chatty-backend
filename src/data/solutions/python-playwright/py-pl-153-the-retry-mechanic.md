# The Retry Mechanic

**Level:** 153
**ID:** `py-pl-153`
**Difficulty:** medium
**XP:** 300
**Tags:** `retry`, `polling`, `loop`


## Objective

On level-05 poll every 500ms until #treasure-chest has the 'visible' class (max 10 tries). When found, print 'LEVEL_PASSED'.

## Story

The Persistent One retries an assertion multiple times using a custom loop.

## Hints
1. page.locator('#treasure-chest.visible').count() > 0 means it's there.
2. time.sleep(0.5) waits half a second.
3. Break the loop when count > 0.

## Solution

```python
from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-05/')
    for _ in range(10):
        if page.locator('#treasure-chest.visible').count() > 0:
            print('LEVEL_PASSED')
            break
        time.sleep(0.5)
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-05/')

    # TODO: Loop up to 10 times, wait 0.5s each
    # Check if #treasure-chest.visible exists
    # Break and print 'LEVEL_PASSED' when found

    browser.close()
```
