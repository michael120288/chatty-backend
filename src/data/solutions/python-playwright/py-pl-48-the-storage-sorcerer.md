# The Storage Sorcerer

**Level:** 48
**ID:** `py-pl-48`
**Difficulty:** medium
**XP:** 200
**Tags:** `localStorage`, `evaluate`, `storage`


## Objective

Use page.evaluate() to set localStorage['key'] = 'value'. Then read it back. If it equals 'value', print 'LEVEL_PASSED'.

## Story

The Sorcerer stores secrets in the browser's localStorage. Set a value and read it back.

## Hints
1. Use page.evaluate("() => { localStorage.setItem('key', 'value'); }") to set.
2. Then page.evaluate("() => localStorage.getItem('key')") to get.
3. Compare the result to 'value' and print 'LEVEL_PASSED'.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.evaluate("() => localStorage.setItem('key', 'value')")
    val = page.evaluate("() => localStorage.getItem('key')")
    if val == 'value':
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

    # TODO: Use page.evaluate to set and get localStorage, check value equals 'value'

    browser.close()
```
