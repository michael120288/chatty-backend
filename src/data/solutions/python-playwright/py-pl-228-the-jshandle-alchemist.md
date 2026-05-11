# The JSHandle Alchemist

**Level:** 228
**ID:** `py-pl-228`
**Difficulty:** medium
**XP:** 330
**Tags:** `evaluate_handle`, `jshandle`, `js-bridge`, `page.evaluate`


## Objective

Navigate to level-01. Use `page.evaluate_handle("document.title")` to get a JS handle. Call `.json_value()` on it to extract the string. Assert it is non-empty. Print `LEVEL_PASSED`.

## Story

To work with live JavaScript objects — not just DOM elements — you need an evaluate_handle.

## Hints
1. `page.evaluate_handle(expression)` returns a `JSHandle` or `ElementHandle`
2. `handle.json_value()` serialises the JS value to Python

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    handle = page.evaluate_handle('document.title')
    title = handle.json_value()
    assert isinstance(title, str) and title != ''
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
    handle = page.evaluate_handle('document.title')
    # call json_value() on handle, assert non-empty, print LEVEL_PASSED
    browser.close()
```
