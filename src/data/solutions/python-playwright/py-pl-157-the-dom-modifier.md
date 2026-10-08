# The DOM Modifier

**Level:** 157
**ID:** `py-pl-157`
**Difficulty:** medium
**XP:** 290
**Tags:** `evaluate`, `dom_manipulation`, `inject`


## Objective

On level-01 use page.evaluate to inject a new div with id='injected'. Then check it exists with locator('#injected').count(). Print 'LEVEL_PASSED'.

## Story

The Architect reshapes the DOM itself — adding elements that weren't there before.

## Hints
1. Use document.createElement and appendChild via evaluate.
2. Then page.locator('#injected').count() should be 1.
3. Print 'LEVEL_PASSED' if found.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.evaluate("const d = document.createElement('div'); d.id = 'injected'; document.body.appendChild(d);")
    if page.locator('#injected').count() == 1:
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

    # TODO: Inject a div with id='injected' via evaluate
    # Check it exists
    # print 'LEVEL_PASSED'

    browser.close()
```
