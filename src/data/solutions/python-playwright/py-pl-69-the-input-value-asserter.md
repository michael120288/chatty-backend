# The Input Value Asserter

**Level:** 69
**ID:** `py-pl-69`
**Difficulty:** medium
**XP:** 230
**Tags:** `expect`, `to_have_value`, `forms`


## Objective

On level-03 fill username with 'playwright'. Use expect(locator).to_have_value('playwright') to assert it. Print 'LEVEL_PASSED'.

## Story

The Auditor confirms what was typed is truly stored in the field.

## Hints
1. page.locator('#username').fill('playwright')
2. to_have_value() checks the current input value.
3. Print 'LEVEL_PASSED' after the assertion passes.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    page.locator('#username').fill('playwright')
    expect(page.locator('#username')).to_have_value('playwright')
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')

    # TODO: Fill username with 'playwright'
    # TODO: expect(page.locator('#username')).to_have_value('playwright')
    # print 'LEVEL_PASSED'

    browser.close()
```
