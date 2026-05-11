# The Grand Python Master

**Level:** 200
**ID:** `py-pl-200`
**Difficulty:** medium
**XP:** 750
**Tags:** `boss`, `grand_finale`, `comprehensive`, `master`


## Objective

Complete all 7 tasks: (1) Navigate to level-01. (2) Assert URL. (3) Assert h1 visible. (4) Mock JSON routes. (5) Evaluate document.title. (6) Wait for selector 'h1'. (7) Take a screenshot. Print 'LEVEL_PASSED'.

## Story

The final trial. The Grandmaster of Python Playwright demands mastery of all disciplines — locators, assertions, network, context, waiting, and evaluation — in one script.

## Hints
1. Set route before goto.
2. Use assert 'level-01' in page.url.
3. expect(page.locator('h1')).to_be_visible()
4. page.evaluate('document.title')
5. page.wait_for_selector('h1')
6. page.screenshot(path='/tmp/master.png')

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    page = context.new_page()
    page.route('**/*.json', lambda r: r.fulfill(json={}))
    page.goto('http://localhost:5000/pages/level-01/')
    assert 'level-01' in page.url
    expect(page.locator('h1')).to_be_visible()
    title = page.evaluate('document.title')
    assert title
    page.wait_for_selector('h1')
    page.screenshot(path='/tmp/master.png')
    print('LEVEL_PASSED')
    context.close()
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    page = context.new_page()

    # TODO: 1. Set up JSON mock route
    # TODO: 2. Navigate to level-01
    # TODO: 3. Assert URL contains 'level-01'
    # TODO: 4. Assert h1 is visible
    # TODO: 5. Evaluate document.title and check non-empty
    # TODO: 6. Wait for selector 'h1'
    # TODO: 7. Take screenshot
    # TODO: print('LEVEL_PASSED')

    context.close()
    browser.close()
```
