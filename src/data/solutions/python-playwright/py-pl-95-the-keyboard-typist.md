# The Keyboard Typist

**Level:** 95
**ID:** `py-pl-95`
**Difficulty:** medium
**XP:** 250
**Tags:** `keyboard`, `type`, `interaction`


## Objective

On level-03 click #username, then use page.keyboard.type('wizard') to type. Read the value back — if it contains 'wizard', print 'LEVEL_PASSED'.

## Story

The Scribe types characters one by one using the keyboard API.

## Hints
1. Click the input first to focus it.
2. page.keyboard.type() dispatches real keydown/keypress/keyup events.
3. Use .input_value() to read back.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    page.locator('#username').click()
    page.keyboard.type('wizard')
    val = page.locator('#username').input_value()
    if 'wizard' in val:
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')

    # TODO: Click #username, then page.keyboard.type('wizard')
    # Read value and check

    browser.close()
```
