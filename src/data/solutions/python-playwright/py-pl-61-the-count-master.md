# The Count Master

**Level:** 61
**ID:** `py-pl-61`
**Difficulty:** medium
**XP:** 210
**Tags:** `count`, `locator`, `basics`


## Objective

On level-01 use page.locator('p').count() to get the number of paragraphs. If > 0, print 'LEVEL_PASSED'.

## Story

The Census Taker measures how many spirits inhabit the realm.

## Hints
1. locator.count() returns an integer.
2. No need to call .all() first — count() is direct.
3. If count > 0: print('LEVEL_PASSED')

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    count = page.locator('p').count()
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

    # TODO: Use page.locator('p').count() and print 'LEVEL_PASSED' if > 0

    browser.close()
```
