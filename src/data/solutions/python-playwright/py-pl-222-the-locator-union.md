# The Locator Union

**Level:** 222
**ID:** `py-pl-222`
**Difficulty:** medium
**XP:** 320
**Tags:** `locator.or_`, `combining-locators`, `advanced-locators`


## Objective

Navigate to level-01. Create `loc = page.get_by_role("heading").or_(page.get_by_role("paragraph"))`. Assert `loc.count()` is greater than 0. Print `LEVEL_PASSED`.

## Story

Either spell will do. Combine two locators with OR to match the first element that satisfies either condition.

## Hints
1. `locator_a.or_(locator_b)` returns a union locator
2. `loc.count()` returns how many elements match

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    loc = page.get_by_role('heading').or_(page.get_by_role('paragraph'))
    assert loc.count() > 0
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
    # combine headings OR paragraphs with or_(), assert count > 0
    browser.close()
```
