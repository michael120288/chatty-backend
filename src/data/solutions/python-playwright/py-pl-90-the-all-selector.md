# The All Selector

**Level:** 90
**ID:** `py-pl-90`
**Difficulty:** medium
**XP:** 230
**Tags:** `query_selector_all`, `element_handle`, `list`


## Objective

On level-01 use page.query_selector_all('p') to get all paragraph handles. If len > 0, print 'LEVEL_PASSED'.

## Story

The Cataloger queries all matching elements as handles at once.

## Hints
1. query_selector_all returns a list of ElementHandles.
2. It never returns None — just an empty list if nothing matches.
3. Check len(els) > 0.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    els = page.query_selector_all('p')
    if len(els) > 0:
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

    # TODO: els = page.query_selector_all('p')
    # print 'LEVEL_PASSED' if len(els) > 0

    browser.close()
```
