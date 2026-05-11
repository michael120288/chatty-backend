# The State Snapshot

**Level:** 173
**ID:** `py-pl-173`
**Difficulty:** medium
**XP:** 310
**Tags:** `snapshot`, `state`, `dict`


## Objective

On level-01 collect: title, h1 text, p count, div count into a dict. If all values are truthy/positive, print 'LEVEL_PASSED'.

## Story

The Historian captures the state of multiple elements at once.

## Hints
1. state = {'title': page.title(), 'h1': ..., 'p_count': ..., 'div_count': ...}
2. Check title truthy, h1 truthy, p_count > 0, div_count > 0.
3. Print 'LEVEL_PASSED' if all pass.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    state = {'title': page.title(), 'h1': page.locator('h1').text_content(), 'p_count': page.locator('p').count(), 'div_count': page.locator('div').count()}
    if state['title'] and state['h1'] and state['p_count'] > 0 and state['div_count'] > 0:
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

    # TODO: Build state dict, verify all values, print 'LEVEL_PASSED'

    browser.close()
```
