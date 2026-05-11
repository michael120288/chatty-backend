# The Drag Initiator

**Level:** 123
**ID:** `py-pl-123`
**Difficulty:** medium
**XP:** 280
**Tags:** `mouse`, `drag`, `down`, `up`


## Objective

On level-01 use page.mouse.move(), then mouse.down() and mouse.up() at another position. Print 'LEVEL_PASSED'.

## Story

The Sculptor starts a drag action — holding the mouse down as it moves.

## Hints
1. mouse.down() presses the left button.
2. mouse.move() while down simulates drag.
3. mouse.up() releases.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.mouse.move(100, 100)
    page.mouse.down()
    page.mouse.move(200, 200)
    page.mouse.up()
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

    # TODO: Simulate drag from (100,100) to (200,200)
    # page.mouse.move(100, 100)
    # page.mouse.down()
    # page.mouse.move(200, 200)
    # page.mouse.up()
    # print 'LEVEL_PASSED'

    browser.close()
```
