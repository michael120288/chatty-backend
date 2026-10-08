# The Multi-Assertion Master

**Level:** 41
**ID:** `py-pl-41`
**Difficulty:** medium
**XP:** 200
**Tags:** `expect`, `multiple-assertions`, `boss`


## Objective

Assert: (1) page title not empty, (2) body visible, (3) at least one .item-card exists, (4) h1 not empty. Print 'LEVEL_PASSED'.

## Story

The Grand Tribunal demands multiple proofs. Chain four assertions without a single failure.

## Hints
1. Use expect() for assertions
2. Level-01 has 3 .item-card elements and a non-empty h1

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    assert page.title() != ''
    expect(page.locator('body')).to_be_visible()
    assert page.locator('.item-card').count() > 0
    assert page.locator('h1').inner_text() != ''
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
    assert page.title() != ''
    expect(page.locator('body')).to_be_visible()
    assert page.locator('.item-card').count() > 0
    assert page.locator('h1').inner_text() != ''
    print('LEVEL_PASSED')
    browser.close()
```
