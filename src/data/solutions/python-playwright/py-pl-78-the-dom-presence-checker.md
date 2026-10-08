# The DOM Presence Checker

**Level:** 78
**ID:** `py-pl-78`
**Difficulty:** medium
**XP:** 230
**Tags:** `expect`, `to_be_in_dom`, `dom`


## Objective

On level-02 use expect(page.locator('#secret-message')).to_be_in_dom() before revealing it. Then print 'LEVEL_PASSED'.

## Story

The Warden checks whether an element exists in the DOM at all — even if invisible.

## Hints
1. to_be_in_dom() checks that an element exists in the DOM — it can be hidden.
2. #secret-message is in the DOM from page load, just hidden with display:none.
3. Print 'LEVEL_PASSED' after the assertion.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    expect(page.locator('#secret-message')).to_be_in_dom()
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

    # TODO: Verify #secret-message is in DOM (even though hidden)
    # expect(page.locator('#secret-message')).to_be_in_dom()
    # print 'LEVEL_PASSED'

    browser.close()
```
