# The Heading Herald

**Level:** 9
**ID:** `py-pl-09`
**Difficulty:** medium
**XP:** 100
**Tags:** `inner_text`, `h1`, `text`


## Objective

Get the inner_text() of the 'h1' element. If it is not empty, print 'LEVEL_PASSED'.

## Story

The Herald must proclaim the realm's name from the great h1 banner. Read its inner text.

## Hints
1. inner_text() is like text_content() but strips hidden elements.
2. Check: if text: print('LEVEL_PASSED').
3. This is a synchronous call — no await needed in the sync API.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    text = page.locator('h1').inner_text()
    if text:
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

    # TODO: Use page.locator('h1').inner_text() and print 'LEVEL_PASSED' if not empty

    browser.close()
```
