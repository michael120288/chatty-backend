# The Empty Asserter

**Level:** 79
**ID:** `py-pl-79`
**Difficulty:** medium
**XP:** 230
**Tags:** `expect`, `to_be_empty`, `forms`


## Objective

On level-03 assert the username input is empty using expect(locator).to_be_empty() before filling it. Then fill it and print 'LEVEL_PASSED'.

## Story

The Void Keeper asserts that an element starts empty before any action.

## Hints
1. to_be_empty() checks that an input's value is empty string.
2. The username field starts empty.
3. Fill it after the assertion to confirm the flow.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    expect(page.locator('#username')).to_be_empty()
    page.locator('#username').fill('test')
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

    # TODO: expect(page.locator('#username')).to_be_empty()
    # TODO: fill it with something
    # print 'LEVEL_PASSED'

    browser.close()
```
