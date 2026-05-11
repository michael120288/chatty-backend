# The Locator Combiner

**Level:** 221
**ID:** `py-pl-221`
**Difficulty:** medium
**XP:** 320
**Tags:** `locator.and_`, `combining-locators`, `advanced-locators`


## Objective

Navigate to level-01. Use `page.get_by_role("heading").and_(page.get_by_text("Scroll"))` to find the heading that also contains "Scroll". Assert it is visible. Print `LEVEL_PASSED`.

## Story

When one filter is not enough, combine two locators with the AND operator to narrow the search.

## Hints
1. `locator_a.and_(locator_b)` returns an intersection locator
2. Both conditions must match the same element

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    combined = page.get_by_role('heading').and_(page.get_by_text('Scroll'))
    expect(combined.first).to_be_visible()
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    # combine get_by_role("heading") AND get_by_text("Scroll"), assert visible
    browser.close()
```
