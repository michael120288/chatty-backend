# The Attribute Reader

**Level:** 60
**ID:** `py-pl-60`
**Difficulty:** medium
**XP:** 240
**Tags:** `get_attribute`, `data-attribute`, `wait`


## Objective

On level-05 after the treasure chest appears, use locator.get_attribute('data-treasure') on #treasure-chest. If the value is non-empty, print 'LEVEL_PASSED'.

## Story

The Rune Master reads hidden runes carved into element attributes.

## Hints
1. page.wait_for_selector('#treasure-chest.visible') waits until the class appears.
2. locator.get_attribute('data-treasure') returns the attribute value.
3. The chest appears after ~2.5 seconds.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-05/')
    page.wait_for_selector('#treasure-chest.visible')
    val = page.locator('#treasure-chest').get_attribute('data-treasure')
    if val:
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-05/')

    # TODO: Wait for #treasure-chest to be visible
    # TODO: Get its data-treasure attribute
    # print 'LEVEL_PASSED' if non-empty

    browser.close()
```
