# The Before-After Tester

**Level:** 172
**ID:** `py-pl-172`
**Difficulty:** medium
**XP:** 320
**Tags:** `before_after`, `state_change`, `assertion`


## Objective

On level-02 record click count text BEFORE and AFTER clicking the button. If they differ, print 'LEVEL_PASSED'.

## Story

The Change Detector records state before and after an action to verify the difference.

## Hints
1. #click-count shows 'Clicks: 0' before, 'Clicks: 1' after.
2. before != after should be True.
3. Print 'LEVEL_PASSED' if different.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    before = page.locator('#click-count').text_content()
    page.locator('#reveal-btn').click()
    after = page.locator('#click-count').text_content()
    if before != after:
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')

    before = page.locator('#click-count').text_content()
    page.locator('#reveal-btn').click()
    after = page.locator('#click-count').text_content()

    # TODO: If before != after, print 'LEVEL_PASSED'

    browser.close()
```
