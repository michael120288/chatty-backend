# The Element Awaiter

**Level:** 26
**ID:** `py-pl-26`
**Difficulty:** medium
**XP:** 100
**Tags:** `wait_for_selector`, `waiting`, `selector`


## Objective

Use page.wait_for_selector('#featured-item') after navigation. Then print 'LEVEL_PASSED'.

## Story

The Summoner must wait for the relic to appear before claiming it. Use wait_for_selector to wait patiently.

## Hints
1. page.wait_for_selector(selector) waits until the element appears in DOM.
2. Default timeout is 30 seconds.
3. It returns the ElementHandle — you can ignore the return value.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.wait_for_selector('#featured-item')
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

    # TODO: Use page.wait_for_selector('#featured-item') then print 'LEVEL_PASSED'

    browser.close()
```
