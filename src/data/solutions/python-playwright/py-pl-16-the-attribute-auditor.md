# The Attribute Auditor

**Level:** 16
**ID:** `py-pl-16`
**Difficulty:** medium
**XP:** 100
**Tags:** `expect`, `to_have_attribute`, `attribute`


## Objective

Use expect(page.locator('#featured-item')).to_have_attribute('id', 'featured-item'), then print 'LEVEL_PASSED'.

## Story

The Auditor inspects each element's properties. Assert that the featured item has an id attribute.

## Hints
1. Use expect(locator).to_have_attribute(name, value).
2. The first arg is the attribute name, second is the expected value.
3. Print 'LEVEL_PASSED' after the assertion passes.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    expect(page.locator('#featured-item')).to_have_attribute('id', 'featured-item')
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

    # TODO: Assert #featured-item has attribute id='featured-item'
    # Then print 'LEVEL_PASSED'

    browser.close()
```
