# The Key Down Holder

**Level:** 119
**ID:** `py-pl-119`
**Difficulty:** medium
**XP:** 280
**Tags:** `keyboard`, `down`, `up`


## Objective

Use page.keyboard.down('Shift') and page.keyboard.up('Shift') as separate calls on level-01. Between them, click a link to simulate shift-click. Print 'LEVEL_PASSED'.

## Story

The Sustained Spellcaster holds a key down to trigger held-key interactions.

## Hints
1. keyboard.down() holds a key.
2. keyboard.up() releases it.
3. No assertion needed — just demonstrate the API.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.keyboard.down('Shift')
    page.keyboard.up('Shift')
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

    # TODO: page.keyboard.down('Shift')
    # TODO: page.keyboard.up('Shift')
    # print 'LEVEL_PASSED'

    browser.close()
```
