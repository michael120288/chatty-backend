# The Device Emulator

**Level:** 167
**ID:** `py-pl-167`
**Difficulty:** medium
**XP:** 310
**Tags:** `devices`, `mobile`, `emulation`


## Objective

Use playwright.devices['iPhone 14'] to get device settings. Create a context with them, navigate to level-01, print 'LEVEL_PASSED'.

## Story

The Shape Shifter emulates a mobile device using a predefined device descriptor.

## Hints
1. p.devices['iPhone 14'] returns a dict of viewport, user_agent, etc.
2. **iphone unpacks it as kwargs to new_context().
3. Just navigate and print.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    iphone = p.devices['iPhone 14']
    browser = p.chromium.launch()
    context = browser.new_context(**iphone)
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    print('LEVEL_PASSED')
    context.close()
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    iphone = p.devices['iPhone 14']
    browser = p.chromium.launch()
    context = browser.new_context(**iphone)
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: print 'LEVEL_PASSED'

    context.close()
    browser.close()
```
