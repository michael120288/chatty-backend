# The JS Evaluator

**Level:** 30
**ID:** `py-pl-30`
**Difficulty:** medium
**XP:** 100
**Tags:** `evaluate`, `javascript`, `browser-context`


## Objective

Use page.evaluate() to run JavaScript that returns document.title. If the result is not empty, print 'LEVEL_PASSED'.

## Story

The Code Sorcerer reaches into the browser realm to execute JavaScript directly. Evaluate a script and capture the result.

## Hints
1. page.evaluate(expression) runs JS in the browser context and returns the result.
2. Pass a string with a JS arrow function: "() => document.title".
3. The return value is a Python string.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    title = page.evaluate('() => document.title')
    if title:
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

    # TODO: Use page.evaluate("() => document.title") and print 'LEVEL_PASSED' if not empty

    browser.close()
```
