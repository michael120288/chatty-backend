# The Content Clicker

**Level:** 146
**ID:** `py-pl-146`
**Difficulty:** medium
**XP:** 270
**Tags:** `get_by_role`, `name`, `accessibility`


## Objective

On level-02 use page.get_by_role('button', name='Reveal Secret').click(). Check #secret-message visible. Print 'LEVEL_PASSED'.

## Story

The Finder uses get_by_role with name= to click by accessible name.

## Hints
1. name= matches the button's accessible name (its text content).
2. This is preferred over ID-based selectors.
3. Check is_visible() on #secret-message.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    page.get_by_role('button', name='Reveal Secret').click()
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

    # TODO: get_by_role('button', name='Reveal Secret').click()
    # Check visible
    # print 'LEVEL_PASSED'

    browser.close()
```
