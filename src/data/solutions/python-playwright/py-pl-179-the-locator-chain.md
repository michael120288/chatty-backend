# The Locator Chain

**Level:** 179
**ID:** `py-pl-179`
**Difficulty:** medium
**XP:** 290
**Tags:** `locator_chain`, `scope`, `nested`


## Objective

On level-03 use page.locator('form').locator('#username') to find the input inside the form. Fill it and print 'LEVEL_PASSED'.

## Story

The Chain Master composes locators together to target deeply nested elements.

## Hints
1. Chaining locators scopes the second to within the first.
2. page.locator('form').locator('#username') finds #username inside form.
3. Fill it and print.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    page.locator('form').locator('#username').fill('wizard')
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')

    # TODO: page.locator('form').locator('#username').fill('wizard')
    # print 'LEVEL_PASSED'

    browser.close()
```
