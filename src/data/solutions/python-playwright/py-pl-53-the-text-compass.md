# The Text Compass

**Level:** 53
**ID:** `py-pl-53`
**Difficulty:** medium
**XP:** 220
**Tags:** `get_by_text`, `locator`, `click`


## Objective

Use page.get_by_text('Reveal Secret') to find the button on level-02 and click it. Then check #secret-message is visible and print 'LEVEL_PASSED'.

## Story

The Navigator shows you how to find elements by their visible text — no IDs needed.

## Hints
1. page.get_by_text('Reveal Secret') finds the element with that exact text.
2. After clicking, the #secret-message becomes visible.
3. is_visible() returns True when display is not 'none'.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    page.get_by_text('Reveal Secret').click()
    if page.locator('#secret-message').is_visible():
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

    # TODO: get_by_text('Reveal Secret').click()
    # TODO: check #secret-message visible, print 'LEVEL_PASSED'

    browser.close()
```
