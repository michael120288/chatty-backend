# The Visibility Asserter

**Level:** 68
**ID:** `py-pl-68`
**Difficulty:** medium
**XP:** 230
**Tags:** `expect`, `to_be_visible`, `assertions`


## Objective

On level-02 click the reveal button. Then use expect(page.locator('#secret-message')).to_be_visible() to assert it appeared. Print 'LEVEL_PASSED'.

## Story

The Guardian uses expect to assert visibility — stricter than is_visible().

## Hints
1. Click #reveal-btn first.
2. to_be_visible() will wait up to 5s for the element to appear.
3. Print 'LEVEL_PASSED' after the assertion.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    page.locator('#reveal-btn').click()
    expect(page.locator('#secret-message')).to_be_visible()
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

    # TODO: Click reveal button
    # TODO: expect(page.locator('#secret-message')).to_be_visible()
    # print 'LEVEL_PASSED'

    browser.close()
```
