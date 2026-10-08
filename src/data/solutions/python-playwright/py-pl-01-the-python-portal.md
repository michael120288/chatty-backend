# The Python Portal

**Level:** 1
**ID:** `py-pl-01`
**Difficulty:** medium
**XP:** 100
**Tags:** `navigation`, `goto`, `basics`


## Objective

Navigate to the target page and print 'LEVEL_PASSED' to confirm you reached it.

## Story

A mystical gateway has opened to the realm of Python automation. The ancient serpent Monty guards the entrance — prove you can navigate the web with Python Playwright.

## Hints
1. Use print('LEVEL_PASSED') after page.goto().
2. The string must be exactly 'LEVEL_PASSED'.
3. page.goto() already navigated — just add the print statement.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
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

    # TODO: Print 'LEVEL_PASSED' to confirm navigation succeeded

    browser.close()
```
