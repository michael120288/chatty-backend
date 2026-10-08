# The Soft Assertion Mage

**Level:** 77
**ID:** `py-pl-77`
**Difficulty:** medium
**XP:** 250
**Tags:** `soft`, `expect`, `assertions`


## Objective

Use expect.soft() to make two assertions on level-01. Even if one fails, both run. Print 'LEVEL_PASSED' at the end regardless.

## Story

The Tolerant Judge uses soft assertions — collecting failures without stopping the run.

## Hints
1. expect.soft() does not throw on failure — it records and continues.
2. You still print 'LEVEL_PASSED' because the test flow continues.
3. Both h1 and p are visible on level-01, so both should pass.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    expect.soft(page.locator('h1')).to_be_visible()
    expect.soft(page.locator('p')).to_be_visible()
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

    # TODO: Use expect.soft(page.locator('h1')).to_be_visible()
    # TODO: Use expect.soft(page.locator('p')).to_be_visible()
    # print 'LEVEL_PASSED'

    browser.close()
```
