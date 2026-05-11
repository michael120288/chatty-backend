# The Interaction Recorder

**Level:** 184
**ID:** `py-pl-184`
**Difficulty:** medium
**XP:** 340
**Tags:** `logging`, `loop`, `interaction`


## Objective

On level-02 log the button click using a list. Click 3 times. If log has 3 entries and secret is visible, print 'LEVEL_PASSED'.

## Story

The Historian logs every click interaction for an audit trail.

## Hints
1. log already has 3 entries after the loop.
2. The secret is visible after the first click.
3. Check both conditions.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    log = []
    for i in range(3):
        page.locator('#reveal-btn').click()
        log.append(f'click_{i+1}')
    if len(log) == 3 and page.locator('#secret-message').is_visible():
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    log = []

    for i in range(3):
        page.locator('#reveal-btn').click()
        log.append(f'click_{i+1}')

    # TODO: if len(log) == 3 and secret visible: print 'LEVEL_PASSED'

    browser.close()
```
