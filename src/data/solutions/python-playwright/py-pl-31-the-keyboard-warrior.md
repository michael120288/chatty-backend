# The Keyboard Warrior

**Level:** 31
**ID:** `py-pl-31`
**Difficulty:** medium
**XP:** 100
**Tags:** `keyboard`, `press`, `Tab`


## Objective

Press the Tab key using page.keyboard.press('Tab'). Then print 'LEVEL_PASSED'.

## Story

The Keyboard Knight strikes keys with precision. Press Tab to move focus and prove your mastery.

## Hints
1. page.keyboard.press(key) simulates a keyboard key press.
2. Common keys: 'Tab', 'Enter', 'Escape', 'ArrowDown'.
3. Print 'LEVEL_PASSED' after pressing.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    page.keyboard.press('Tab')
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

    # TODO: Use page.keyboard.press('Tab') then print 'LEVEL_PASSED'

    browser.close()
```
