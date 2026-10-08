# The Visibility Guard

**Level:** 65
**ID:** `py-pl-65`
**Difficulty:** medium
**XP:** 240
**Tags:** `is_visible`, `visibility`, `assertion`


## Objective

On level-02 before clicking, verify #secret-message is NOT visible with is_visible(). Then click the button. Then verify it IS visible. Print 'LEVEL_PASSED' if both checks pass.

## Story

The Sentinel checks whether spirits are truly visible before acting.

## Hints
1. is_visible() returns True/False.
2. Initially the message is hidden (display: none).
3. After clicking 'Reveal Secret', it becomes visible.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    before = not page.locator('#secret-message').is_visible()
    page.locator('#reveal-btn').click()
    after = page.locator('#secret-message').is_visible()
    if before and after:
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

    # TODO: Check #secret-message is NOT visible initially
    # TODO: Click the reveal button
    # TODO: Check #secret-message IS visible after click
    # print 'LEVEL_PASSED' if both pass

    browser.close()
```
