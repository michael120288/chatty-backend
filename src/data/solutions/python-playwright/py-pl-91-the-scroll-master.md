# The Scroll Master

**Level:** 91
**ID:** `py-pl-91`
**Difficulty:** medium
**XP:** 240
**Tags:** `scroll`, `evaluate`, `interaction`


## Objective

On level-01 use page.evaluate('window.scrollTo(0, document.body.scrollHeight)') to scroll to the bottom. Then print 'LEVEL_PASSED'.

## Story

The Explorer scrolls down to reveal hidden content below the fold.

## Hints
1. page.evaluate('window.scrollTo(0, document.body.scrollHeight)') scrolls to bottom.
2. No assertion needed — just execute and print.
3. You can also use page.keyboard.press('End') to scroll.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
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

    # TODO: Scroll to bottom using page.evaluate()
    # print 'LEVEL_PASSED'

    browser.close()
```
