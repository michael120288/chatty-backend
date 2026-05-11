# The Visibility Sage

**Level:** 7
**ID:** `py-pl-07`
**Difficulty:** medium
**XP:** 100
**Tags:** `is_visible`, `visibility`, `locator`


## Objective

Check if '#featured-item' is visible using is_visible(). If True, print 'LEVEL_PASSED'.

## Story

The Sage will only speak if you can confirm the featured relic is visible to the naked eye. Prove it.

## Hints
1. Use page.locator('#featured-item').is_visible() — it returns True or False.
2. Wrap in: if page.locator('#featured-item').is_visible(): print('LEVEL_PASSED').
3. No need to store the result in a variable.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    if page.locator('#featured-item').is_visible():
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

    # TODO: Check page.locator('#featured-item').is_visible() and print 'LEVEL_PASSED' if True

    browser.close()
```
