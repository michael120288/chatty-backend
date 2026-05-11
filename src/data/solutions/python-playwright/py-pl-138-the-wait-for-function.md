# The Wait For Function

**Level:** 138
**ID:** `py-pl-138`
**Difficulty:** medium
**XP:** 290
**Tags:** `wait_for_function`, `javascript`, `waiting`


## Objective

On level-05 use page.wait_for_function('document.querySelector("#treasure-chest.visible") !== null') to wait for the treasure. Then print 'LEVEL_PASSED'.

## Story

The Oracle waits until a custom JavaScript condition becomes true.

## Hints
1. wait_for_function polls JS until it returns truthy.
2. querySelector returns null if not found.
3. !== null is truthy when found.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-05/')
    page.wait_for_function('document.querySelector("#treasure-chest.visible") !== null')
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-05/')

    # TODO: page.wait_for_function(js_expression)
    # print 'LEVEL_PASSED'

    browser.close()
```
