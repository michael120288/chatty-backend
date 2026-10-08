# The Focused Typer

**Level:** 125
**ID:** `py-pl-125`
**Difficulty:** medium
**XP:** 280
**Tags:** `press_sequentially`, `keyboard`, `forms`


## Objective

On level-03 use page.locator('#username').press_sequentially('wizard') to type character by character. Verify value. Print 'LEVEL_PASSED'.

## Story

The Careful Scribe fills in each character individually using press_sequentially.

## Hints
1. press_sequentially dispatches individual key events for each character.
2. It's slower but more realistic than fill().
3. Use input_value() to verify.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    page.locator('#username').press_sequentially('wizard')
    if page.locator('#username').input_value() == 'wizard':
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

    # TODO: page.locator('#username').press_sequentially('wizard')
    # Check value and print 'LEVEL_PASSED'

    browser.close()
```
