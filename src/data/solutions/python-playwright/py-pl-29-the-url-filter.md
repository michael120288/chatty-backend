# The URL Filter

**Level:** 29
**ID:** `py-pl-29`
**Difficulty:** medium
**XP:** 100
**Tags:** `route`, `counter`, `closure`


## Objective

Set up a counter that increments every time a route is triggered. Navigate, then print 'LEVEL_PASSED' if count > 0.

## Story

The Filter Mage only allows requests to certain URLs. Count how many routes are triggered during navigation.

## Hints
1. Define a function that increments counter['value'] and calls route.continue_().
2. Use a dict (not int) for the counter so the closure can mutate it.
3. After goto, if counter['value'] > 0: print('LEVEL_PASSED').

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    counter = {'value': 0}
    def handler(route):
        counter['value'] += 1
        route.continue_()
    page.route('**/*', handler)
    page.goto('http://localhost:5000/pages/level-01/')
    if counter['value'] > 0:
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    counter = {'value': 0}

    # TODO: Create a route handler that increments counter['value'] and calls route.continue_()
    # page.route('**/*', handler)
    # Then goto and check counter['value'] > 0

    browser.close()
```
