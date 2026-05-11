# The Eval on Element

**Level:** 139
**ID:** `py-pl-139`
**Difficulty:** medium
**XP:** 280
**Tags:** `eval_on_selector`, `javascript`, `element`


## Objective

On level-01 use page.eval_on_selector('h1', 'el => el.tagName') to get the tag name. If it equals 'H1', print 'LEVEL_PASSED'.

## Story

The Channeler runs JavaScript with a specific element as its context.

## Hints
1. eval_on_selector(selector, expression) passes the matched element as el.
2. el.tagName returns uppercase tag name.
3. Check tag == 'H1'.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    tag = page.eval_on_selector('h1', 'el => el.tagName')
    if tag == 'H1':
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

    # TODO: tag = page.eval_on_selector('h1', 'el => el.tagName')
    # print 'LEVEL_PASSED' if tag == 'H1'

    browser.close()
```
