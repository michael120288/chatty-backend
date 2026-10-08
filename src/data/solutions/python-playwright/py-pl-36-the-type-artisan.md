# The Type Artisan

**Level:** 36
**ID:** `py-pl-36`
**Difficulty:** medium
**XP:** 100
**Tags:** `type`, `keyboard`, `delay`


## Objective

Type 'automation' into the first input with a 30ms delay per character. Then print 'LEVEL_PASSED'.

## Story

The Artisan types each keystroke with deliberate care. Use type() with a delay to simulate human typing.

## Hints
1. locator.type(text, delay=ms) simulates character-by-character typing.
2. Unlike fill(), type() fires keydown/keypress/keyup for each character.
3. Print 'LEVEL_PASSED' after typing.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    page.locator('input').first.type('automation', delay=30)
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

    # TODO: Use page.locator('input').first.type('automation', delay=30) then print 'LEVEL_PASSED'

    browser.close()
```
