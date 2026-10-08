# The Eval On All

**Level:** 140
**ID:** `py-pl-140`
**Difficulty:** medium
**XP:** 280
**Tags:** `eval_on_selector_all`, `javascript`, `array`


## Objective

On level-01 use page.eval_on_selector_all('p', 'els => els.length') to count paragraphs via JS. If > 0, print 'LEVEL_PASSED'.

## Story

The Mass Channeler runs JavaScript against all matching elements at once.

## Hints
1. eval_on_selector_all passes all matched elements as an array.
2. 'els => els.length' returns the count.
3. Check > 0.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    count = page.eval_on_selector_all('p', 'els => els.length')
    if count > 0:
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

    # TODO: count = page.eval_on_selector_all('p', 'els => els.length')
    # print 'LEVEL_PASSED' if count > 0

    browser.close()
```
