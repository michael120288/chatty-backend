# The Not Hidden Asserter

**Level:** 75
**ID:** `py-pl-75`
**Difficulty:** medium
**XP:** 220
**Tags:** `expect`, `not_to_be_hidden`, `assertions`


## Objective

On level-01 assert the h1 is NOT hidden using expect(locator).not_to_be_hidden(). Print 'LEVEL_PASSED'.

## Story

The Investigator uses negation — confirming an element is NOT hidden.

## Hints
1. not_to_be_hidden() is the negation of to_be_hidden().
2. The h1 is always visible on level-01.
3. Print 'LEVEL_PASSED' after.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    expect(page.locator('h1')).not_to_be_hidden()
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

    # TODO: expect(page.locator('h1')).not_to_be_hidden()
    # print 'LEVEL_PASSED'

    browser.close()
```
