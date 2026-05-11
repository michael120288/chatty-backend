# The Test-ID Seeker

**Level:** 223
**ID:** `py-pl-223`
**Difficulty:** medium
**XP:** 265
**Tags:** `get_by_test_id`, `data-testid`, `locators`


## Objective

Navigate to level-01. Use `page.get_by_test_id("scroll-description")` to locate the element. Assert it is visible. Print `LEVEL_PASSED`.

## Story

Wise enchanters inscribe data-testid runes on their elements. Use get_by_test_id to read them.

## Hints
1. `page.get_by_test_id("id")` targets `data-testid="id"` attributes
2. It is the most resilient selector strategy

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    el = page.get_by_test_id('scroll-description')
    expect(el).to_be_visible()
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
    # use get_by_test_id('scroll-description'), assert visible
    browser.close()
```
