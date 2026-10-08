# The Expose Binding Caller

**Level:** 133
**ID:** `py-pl-133`
**Difficulty:** medium
**XP:** 300
**Tags:** `expose_function`, `python_js_bridge`, `advanced`


## Objective

Use page.expose_function('pyAdd', lambda a, b: a + b). Call it from JS via evaluate. If result == 7, print 'LEVEL_PASSED'.

## Story

The Bridge Builder exposes a Python function to the browser's JavaScript context.

## Hints
1. expose_function makes a Python callable available in JS.
2. Call it with await since it's async in JS.
3. Check result == 7.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.expose_function('pyAdd', lambda a, b: a + b)
    page.goto('http://localhost:5000/pages/level-01/')
    result = page.evaluate('async () => await pyAdd(3, 4)')
    if result == 7:
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.expose_function('pyAdd', lambda a, b: a + b)
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: result = page.evaluate('async () => await pyAdd(3, 4)')
    # print 'LEVEL_PASSED' if result == 7

    browser.close()
```
