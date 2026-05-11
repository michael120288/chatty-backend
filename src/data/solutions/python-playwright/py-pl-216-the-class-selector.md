# The Class Selector

**Level:** 216
**ID:** `py-pl-216`
**Difficulty:** medium
**XP:** 260
**Tags:** `select_option`, `select`, `input_value`, `forms`


## Objective

Navigate to level-64. Use `page.locator("#hero-class").select_option("mage")` to choose the Mage class. Assert `locator("#hero-class").input_value()` equals `"mage"`. Print `LEVEL_PASSED`.

## Story

Every hero must choose their class. Wield the select_option incantation to assign your destiny.

## Hints
1. `locator.select_option(value)` selects by option value
2. `locator.input_value()` returns the current value

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-64/')
    page.locator('#hero-class').select_option('mage')
    assert page.locator('#hero-class').input_value() == 'mage'
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-64/')
    # select "mage" from #hero-class, assert input_value, print LEVEL_PASSED
    browser.close()
```
