# The Enabled Checker

**Level:** 74
**ID:** `py-pl-74`
**Difficulty:** medium
**XP:** 220
**Tags:** `expect`, `to_be_enabled`, `assertions`


## Objective

On level-02 use expect(page.locator('#reveal-btn')).to_be_enabled(). Print 'LEVEL_PASSED'.

## Story

The Gatekeeper ensures a button is enabled before the hero attempts to use it.

## Hints
1. to_be_enabled() checks that the element is not disabled.
2. The button on level-02 is always enabled.
3. Print 'LEVEL_PASSED' after the assertion.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    expect(page.locator('#reveal-btn')).to_be_enabled()
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')

    # TODO: expect(page.locator('#reveal-btn')).to_be_enabled()
    # print 'LEVEL_PASSED'

    browser.close()
```
