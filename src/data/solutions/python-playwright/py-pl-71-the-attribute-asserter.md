# The Attribute Asserter

**Level:** 71
**ID:** `py-pl-71`
**Difficulty:** medium
**XP:** 240
**Tags:** `expect`, `to_have_attribute`, `assertions`


## Objective

On level-05 wait for the treasure chest, then use expect(locator).to_have_attribute('data-treasure', 'golden-key'). Print 'LEVEL_PASSED'.

## Story

The Enchanter verifies attributes without reading them — the assertion holds the magic.

## Hints
1. Wait for the chest: page.wait_for_selector('#treasure-chest.visible')
2. to_have_attribute(name, value) checks exact attribute value.
3. Print 'LEVEL_PASSED' after assertion.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-05/')
    page.wait_for_selector('#treasure-chest.visible')
    expect(page.locator('#treasure-chest')).to_have_attribute('data-treasure', 'golden-key')
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-05/')

    # TODO: Wait for #treasure-chest.visible
    # TODO: expect(page.locator('#treasure-chest')).to_have_attribute('data-treasure', 'golden-key')
    # print 'LEVEL_PASSED'

    browser.close()
```
