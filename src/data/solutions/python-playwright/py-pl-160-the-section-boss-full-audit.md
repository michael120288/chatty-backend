# The Section Boss: Full Audit

**Level:** 160
**ID:** `py-pl-160`
**Difficulty:** medium
**XP:** 450
**Tags:** `boss`, `comprehensive`, `assertions`


## Objective

On level-01: (1) Assert URL contains level-01. (2) Assert title non-empty. (3) Assert h1 visible. (4) Assert p count > 0. (5) Assert div count > 0. All pass = print 'LEVEL_PASSED'.

## Story

The Grand Auditor verifies multiple page properties in a systematic sweep.

## Hints
1. Chain all 5 assertions.
2. Use 'level-01' in page.url, page.title(), expect().to_be_visible(), .count().
3. Print 'LEVEL_PASSED' only after all pass.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    assert 'level-01' in page.url
    assert page.title()
    expect(page.locator('h1')).to_be_visible()
    assert page.locator('p').count() > 0
    assert page.locator('div').count() > 0
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

    # TODO: 5 assertions, then print 'LEVEL_PASSED'

    browser.close()
```
