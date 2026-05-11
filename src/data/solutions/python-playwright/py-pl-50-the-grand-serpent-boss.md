# The Grand Serpent Boss

**Level:** 50
**ID:** `py-pl-50`
**Difficulty:** medium
**XP:** 500
**Tags:** `boss`, `comprehensive`, `network`, `assertions`, `evaluate`


## Objective

Complete all 5 tasks: (1) Navigate to the page. (2) Assert h1 not empty. (3) Mock all JSON requests. (4) Check li count > 0 via evaluate. (5) Get #featured-item text and verify it contains 'Sword'. Print 'LEVEL_PASSED' after all pass.

## Story

The final trial of the Python Playwright track. The Grand Serpent demands a full audit: navigate, assert, intercept, evaluate, and extract — all in one script.

## Hints
1. Set up the route BEFORE goto.
2. Use expect(page.locator('h1')).not_to_be_empty() for assertion.
3. page.evaluate("() => document.querySelectorAll('div').length") returns div count — level-01 has divs, not li elements.
4. page.locator('#featured-item').text_content() returns the text — check 'Sword' in text.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.route('**/*.json', lambda route: route.fulfill(json={'boss': True}))
    page.goto('http://localhost:5000/pages/level-01/')
    expect(page.locator('h1')).not_to_be_empty()
    count = page.evaluate("() => document.querySelectorAll('div').length")
    assert count > 0
    text = page.locator('#featured-item').text_content()
    assert text and 'Sword' in text
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # TODO: 1. Route JSON mocking
    # TODO: 2. Navigate
    # TODO: 3. Assert h1 not empty
    # TODO: 4. Evaluate div count > 0 via page.evaluate
    # TODO: 5. Check #featured-item contains 'Sword'
    # TODO: print('LEVEL_PASSED')

    browser.close()
```
