# The All Gatherer

**Level:** 58
**ID:** `py-pl-58`
**Difficulty:** medium
**XP:** 230
**Tags:** `all`, `locator`, `list`


## Objective

On level-01 use page.locator('div').all() to get all div elements. If the list is non-empty, print 'LEVEL_PASSED'.

## Story

The Chronicler wants a full census — collect every element of a type at once.

## Hints
1. locator.all() returns a Python list of Locator objects.
2. Check len(elements) > 0.
3. Each element in the list is a separate Locator you can interact with.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    elements = page.locator('div').all()
    if len(elements) > 0:
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

    # TODO: Use page.locator('div').all() to get all divs
    # print 'LEVEL_PASSED' if list is non-empty

    browser.close()
```
