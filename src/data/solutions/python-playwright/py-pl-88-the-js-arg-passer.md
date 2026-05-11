# The JS Arg Passer

**Level:** 88
**ID:** `py-pl-88`
**Difficulty:** medium
**XP:** 250
**Tags:** `evaluate`, `javascript`, `arguments`


## Objective

Use page.evaluate('([a, b]) => a + b', [10, 20]) to compute 10+20. If result == 30, print 'LEVEL_PASSED'.

## Story

The Messenger passes Python data into JavaScript for processing.

## Hints
1. page.evaluate(expression, arg) passes arg as argument to the JS function.
2. The JS receives [10, 20] as its parameter.
3. Check result == 30.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    result = page.evaluate('([a, b]) => a + b', [10, 20])
    if result == 30:
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

    # TODO: result = page.evaluate('([a, b]) => a + b', [10, 20])
    # print 'LEVEL_PASSED' if result == 30

    browser.close()
```
