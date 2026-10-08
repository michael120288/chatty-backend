# The CSS Property Reader

**Level:** 156
**ID:** `py-pl-156`
**Difficulty:** medium
**XP:** 280
**Tags:** `css`, `computed_style`, `evaluate`


## Objective

On level-01 use page.eval_on_selector('h1', 'el => getComputedStyle(el).color') to get the color. If non-empty, print 'LEVEL_PASSED'.

## Story

The Style Inspector reads computed CSS properties to verify visual styling.

## Hints
1. getComputedStyle(el).color returns the computed color as 'rgb(...)' string.
2. Any non-empty result means success.
3. Print 'LEVEL_PASSED' if color is truthy.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    color = page.eval_on_selector('h1', 'el => getComputedStyle(el).color')
    if color:
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

    # TODO: color = page.eval_on_selector('h1', 'el => getComputedStyle(el).color')
    # print 'LEVEL_PASSED' if non-empty

    browser.close()
```
