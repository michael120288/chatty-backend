# The Label Chooser

**Level:** 217
**ID:** `py-pl-217`
**Difficulty:** medium
**XP:** 270
**Tags:** `select_option`, `label`, `select`, `forms`


## Objective

Navigate to level-64. Select the option with label `"Archer"` using `select_option(label="Archer")`. Assert `input_value()` equals `"archer"`. Print `LEVEL_PASSED`.

## Story

Some options must be selected by their displayed label, not their hidden value.

## Hints
1. `select_option(label="Archer")` selects by the visible text
2. Use a dict: `select_option({"label": "Archer"})` or keyword arg

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-64/')
    page.locator('#hero-class').select_option(label='Archer')
    assert page.locator('#hero-class').input_value() == 'archer'
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
    # select by label "Archer", assert value "archer", print LEVEL_PASSED
    browser.close()
```
